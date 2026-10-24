package main

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

type payload struct {
	DB    DB     `json:"db"`
	Error string `json:"error"`
	Name  string `json:"name"`
}

func newTestServer(t *testing.T) (*httptest.Server, *Store, string) {
	t.Helper()
	dir := t.TempDir()
	s, err := OpenStore(dir)
	if err != nil {
		t.Fatal(err)
	}
	mux := http.NewServeMux()
	s.routes(mux)
	srv := httptest.NewServer(mux)
	t.Cleanup(srv.Close)
	return srv, s, dir
}

func call(t *testing.T, srv *httptest.Server, method, path string, body any) (int, payload) {
	t.Helper()
	var r *bytes.Reader
	if b, ok := body.([]byte); ok {
		r = bytes.NewReader(b)
	} else {
		raw, _ := json.Marshal(body)
		r = bytes.NewReader(raw)
	}
	req, _ := http.NewRequest(method, srv.URL+path, r)
	if _, ok := body.([]byte); ok {
		req.Header.Set("Content-Type", "application/octet-stream")
	} else {
		req.Header.Set("Content-Type", "application/json")
	}
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	defer res.Body.Close()
	var p payload
	json.NewDecoder(res.Body).Decode(&p)
	return res.StatusCode, p
}

func TestSaleTotalsStockAndArabic(t *testing.T) {
	srv, _, dir := newTestServer(t)

	_, p := call(t, srv, "POST", "/api/products", Product{Name: "عطر ورد", Price: 25000, Stock: 10})
	rose := p.DB.Products[0].ID
	_, p = call(t, srv, "POST", "/api/products", Product{Name: "Soap", Price: 7500, Stock: 3})
	soap := p.DB.Products[1].ID

	// Same product twice in the request must be merged: 2 + 1 = 3 pieces.
	code, p := call(t, srv, "POST", "/api/sales", map[string]any{
		"customer": map[string]string{"name": "أحمد علي", "phone": "٠٧٧٠ ١٢٣ ٤٥٦٧", "address": "بغداد - الكرادة"},
		"items": []map[string]any{
			{"productId": rose, "qty": 2},
			{"productId": soap, "qty": 3},
			{"productId": rose, "qty": 1},
		},
	})
	if code != 200 {
		t.Fatalf("sale failed: %d %s", code, p.Error)
	}
	inv := p.DB.Invoices[0]
	// 25,000 x 3 = 75,000 and 7,500 x 3 = 22,500, total 97,500
	if len(inv.Items) != 2 || inv.Items[0].Qty != 3 || inv.Items[0].Total != 75000 || inv.Items[1].Total != 22500 || inv.Total != 97500 {
		t.Fatalf("wrong invoice: %+v", inv)
	}
	if inv.Number != 1 || p.DB.NextInvoice != 2 {
		t.Fatalf("wrong numbering: %d next %d", inv.Number, p.DB.NextInvoice)
	}
	if p.DB.Products[0].Stock != 7 || p.DB.Products[1].Stock != 0 {
		t.Fatalf("wrong stock: %d %d", p.DB.Products[0].Stock, p.DB.Products[1].Stock)
	}
	if len(p.DB.Customers) != 1 || p.DB.Customers[0].Name != "أحمد علي" {
		t.Fatalf("customer not saved: %+v", p.DB.Customers)
	}

	// Arabic must be stored as real UTF-8 text in the file.
	raw, _ := os.ReadFile(filepath.Join(dir, "db.json"))
	if !strings.Contains(string(raw), "عطر ورد") || !strings.Contains(string(raw), "بغداد - الكرادة") {
		t.Fatal("Arabic text not found in db.json")
	}

	// Selling more than the stock is refused and changes nothing.
	code, p = call(t, srv, "POST", "/api/sales", map[string]any{
		"customer": map[string]string{"name": "x"},
		"items":    []map[string]any{{"productId": rose, "qty": 1}, {"productId": soap, "qty": 1}},
	})
	if code != http.StatusConflict || p.Error != "err.notEnoughStock" {
		t.Fatalf("expected stock error, got %d %s", code, p.Error)
	}
	_, p = call(t, srv, "GET", "/api/data", nil)
	if p.DB.Products[0].Stock != 7 || len(p.DB.Invoices) != 1 || len(p.DB.Customers) != 1 {
		t.Fatal("a refused sale changed the data")
	}

	// The same phone typed with Latin digits finds the same customer.
	_, p = call(t, srv, "POST", "/api/sales", map[string]any{
		"customer": map[string]string{"name": "أحمد علي", "phone": "07701234567"},
		"items":    []map[string]any{{"productId": rose, "qty": 1}},
	})
	if len(p.DB.Customers) != 1 || p.DB.Invoices[1].CustomerID != p.DB.Invoices[0].CustomerID {
		t.Fatal("customer was duplicated")
	}
	if p.DB.Invoices[1].CustomerAddress != "بغداد - الكرادة" {
		t.Fatal("saved address was not used on the invoice")
	}
	if p.DB.Invoices[1].Total != 25000 || p.DB.Invoices[1].Number != 2 || p.DB.Products[0].Stock != 6 {
		t.Fatal("second sale wrong")
	}

	// Deleting an invoice with restock returns the pieces.
	first := p.DB.Invoices[0].ID
	_, p = call(t, srv, "DELETE", "/api/invoices/"+first+"?restock=1", nil)
	if p.DB.Products[0].Stock != 9 || p.DB.Products[1].Stock != 3 || len(p.DB.Invoices) != 1 {
		t.Fatalf("restock wrong: %d %d", p.DB.Products[0].Stock, p.DB.Products[1].Stock)
	}
	// Deleting without restock leaves stock alone.
	_, p = call(t, srv, "DELETE", "/api/invoices/"+p.DB.Invoices[0].ID, nil)
	if p.DB.Products[0].Stock != 9 || len(p.DB.Invoices) != 0 {
		t.Fatal("delete without restock changed stock")
	}

	// Invoice numbers never repeat, even after deleting invoices and reopening.
	s2, err := OpenStore(dir)
	if err != nil {
		t.Fatal(err)
	}
	if s2.db.NextInvoice != 3 {
		t.Fatalf("next invoice after reopen = %d, want 3", s2.db.NextInvoice)
	}
}

func TestValidation(t *testing.T) {
	srv, _, _ := newTestServer(t)
	if code, p := call(t, srv, "POST", "/api/products", Product{Name: " ", Price: 1}); code != 400 || p.Error != "err.nameRequired" {
		t.Fatalf("empty name accepted: %d %s", code, p.Error)
	}
	if code, _ := call(t, srv, "POST", "/api/products", Product{Name: "a", Price: -1}); code != 400 {
		t.Fatal("negative price accepted")
	}
	if code, _ := call(t, srv, "POST", "/api/products", Product{Name: "a", Price: 1, Stock: -2}); code != 400 {
		t.Fatal("negative stock accepted")
	}
	_, p := call(t, srv, "POST", "/api/products", Product{Name: "a", Price: 1000, Stock: 5})
	id := p.DB.Products[0].ID
	if code, p := call(t, srv, "POST", "/api/sales", map[string]any{"customer": map[string]string{"name": ""}, "items": []map[string]any{{"productId": id, "qty": 1}}}); code != 400 || p.Error != "err.customerRequired" {
		t.Fatal("sale without customer accepted")
	}
	if code, _ := call(t, srv, "POST", "/api/sales", map[string]any{"customer": map[string]string{"name": "a"}, "items": []map[string]any{{"productId": id, "qty": 0}}}); code != 400 {
		t.Fatal("zero quantity accepted")
	}
	if code, _ := call(t, srv, "POST", "/api/sales", map[string]any{"customer": map[string]string{"name": "a"}, "items": []map[string]any{}}); code != 400 {
		t.Fatal("empty cart accepted")
	}
	call(t, srv, "POST", "/api/customers", Customer{Name: "A", Phone: "0770 111 2222"})
	if code, p := call(t, srv, "POST", "/api/customers", Customer{Name: "B", Phone: "07701112222"}); code != 400 || p.Error != "err.phoneTaken" {
		t.Fatal("duplicate phone accepted")
	}
}

func TestImagesAndSettings(t *testing.T) {
	srv, _, dir := newTestServer(t)
	png := []byte("\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89")
	code, p := call(t, srv, "POST", "/api/images", png)
	if code != 200 || !validImageName(p.Name) {
		t.Fatalf("upload failed: %d %+v", code, p)
	}
	if code, _ := call(t, srv, "POST", "/api/images", []byte("not an image")); code != 400 {
		t.Fatal("text accepted as an image")
	}
	_, p2 := call(t, srv, "POST", "/api/products", Product{Name: "a", Price: 1, Images: []string{p.Name, "../../etc/passwd"}})
	if got := p2.DB.Products[0].Images; len(got) != 1 || got[0] != p.Name {
		t.Fatalf("bad image list kept: %v", got)
	}
	// Removing the picture from the product deletes the file.
	prod := p2.DB.Products[0]
	prod.Images = nil
	call(t, srv, "POST", "/api/products", prod)
	if _, err := os.Stat(filepath.Join(dir, "images", p.Name)); !os.IsNotExist(err) {
		t.Fatal("unused picture file was not removed")
	}

	_, p = call(t, srv, "PUT", "/api/settings", Settings{Language: "ar", StoreName: "متجر النور", LogoSize: 1000, LogoAlign: "x", Paper: "receipt", LowStock: -3})
	st := p.DB.Settings
	if st.AccentColor != "#714b67" || st.RowColor != "#f3edf2" || st.ShowPaid {
		t.Fatalf("bad colors not replaced with defaults: %+v", st)
	}
	_, p = call(t, srv, "PUT", "/api/settings", Settings{AccentColor: "#1A2B3C", RowColor: "#eeeeee", ShowPaid: true})
	if p.DB.Settings.AccentColor != "#1a2b3c" || p.DB.Settings.RowColor != "#eeeeee" || !p.DB.Settings.ShowPaid {
		t.Fatalf("colors not saved: %+v", p.DB.Settings)
	}
	if st.Language != "ar" || st.StoreName != "متجر النور" || st.LogoSize != 300 || st.LogoAlign != "center" || st.Paper != "receipt" || st.LowStock != 0 {
		t.Fatalf("settings not cleaned: %+v", st)
	}
}

func TestRejectsNonJSON(t *testing.T) {
	srv, _, _ := newTestServer(t)
	res, err := http.Post(srv.URL+"/api/products", "text/plain", strings.NewReader(`{"name":"x","price":1}`))
	if err != nil {
		t.Fatal(err)
	}
	res.Body.Close()
	if res.StatusCode != 400 {
		t.Fatalf("text/plain body accepted: %d", res.StatusCode)
	}
}

func TestNormalizePhone(t *testing.T) {
	cases := map[string]string{
		"٠٧٧٠ ١٢٣ ٤٥٦٧":     "07701234567",
		"+964 770-123-4567": "+9647701234567",
		"۰۷۷۰۱۲۳":           "0770123",
		"":                  "",
	}
	for in, want := range cases {
		if got := normalizePhone(in); got != want {
			t.Errorf("normalizePhone(%q) = %q, want %q", in, got, want)
		}
	}
}

func TestOldDataGetsNewDefaults(t *testing.T) {
	dir := t.TempDir()
	old := `{"version":1,"nextInvoice":4,"settings":{"language":"ar","storeName":"متجر"},"products":[],"customers":[],"invoices":[]}`
	if err := os.WriteFile(filepath.Join(dir, "db.json"), []byte(old), 0o644); err != nil {
		t.Fatal(err)
	}
	s, err := OpenStore(dir)
	if err != nil {
		t.Fatal(err)
	}
	st := s.db.Settings
	if st.StoreName != "متجر" || st.AccentColor != "#714b67" || st.RowColor != "#f3edf2" || !st.ShowPaid || s.db.NextInvoice != 4 {
		t.Fatalf("defaults missing after upgrade: %+v next %d", st, s.db.NextInvoice)
	}
}
