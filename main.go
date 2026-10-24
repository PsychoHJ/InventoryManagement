// Inventory is a small, portable inventory and sales app for a shop.
//
// It is one program file. When started it serves the web pages on this
// computer only (127.0.0.1), opens the browser, and keeps all data in a
// "data" folder next to the program, so the whole app can be copied to
// another computer or a USB stick.
package main

import (
	"embed"
	"flag"
	"fmt"
	"io/fs"
	"log"
	"net"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"
	"time"
)

const appID = "inventory-app"

//go:embed web
var webFiles embed.FS

func main() {
	port := flag.Int("port", 8750, "port to use on this computer")
	dataFlag := flag.String("data", "", "data folder (default: \"data\" next to the program)")
	noBrowser := flag.Bool("no-browser", false, "do not open the browser")
	flag.Parse()

	dataDir := *dataFlag
	if dataDir == "" {
		dataDir = filepath.Join(appDir(), "data")
	}

	// If the app is already running, just open it again instead of
	// starting a second copy that would write to the same files.
	if alreadyRunning(*port) {
		url := fmt.Sprintf("http://127.0.0.1:%d/", *port)
		fmt.Println("The app is already running:", url)
		openBrowser(url)
		return
	}

	store, err := OpenStore(dataDir)
	if err != nil {
		fail(err)
	}

	ln, err := listen(*port)
	if err != nil {
		fail(err)
	}
	url := fmt.Sprintf("http://%s/", ln.Addr().String())

	mux := http.NewServeMux()
	store.routes(mux)
	static, _ := fs.Sub(webFiles, "web")
	fileServer := http.FileServer(http.FS(static))
	mux.Handle("GET /", http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if !strings.HasPrefix(r.URL.Path, "/vendor/") {
			w.Header().Set("Cache-Control", "no-cache")
		}
		fileServer.ServeHTTP(w, r)
	}))

	fmt.Println("==============================================")
	fmt.Println(" Inventory app is running")
	fmt.Println(" Open:  ", url)
	fmt.Println(" Data:  ", dataDir)
	fmt.Println(" Keep this window open while you use the app.")
	fmt.Println(" Close it to stop the app.")
	fmt.Println(" التطبيق يعمل - أبقِ هذه النافذة مفتوحة أثناء الاستخدام")
	fmt.Println("==============================================")

	if !*noBrowser {
		go func() {
			time.Sleep(300 * time.Millisecond)
			openBrowser(url)
		}()
	}
	log.Fatal(http.Serve(ln, localOnly(mux)))
}

// appDir is the folder that holds the program file. When run with
// "go run" the program lives in a temp folder, so the current folder is used.
func appDir() string {
	exe, err := os.Executable()
	if err != nil {
		return "."
	}
	exe, _ = filepath.EvalSymlinks(exe)
	dir := filepath.Dir(exe)
	if strings.Contains(dir, "go-build") {
		wd, _ := os.Getwd()
		return wd
	}
	return dir
}

// listen tries the chosen port first and then the next ten, so the app
// still starts if another program already uses the port.
func listen(port int) (net.Listener, error) {
	var lastErr error
	for p := port; p <= port+10; p++ {
		ln, err := net.Listen("tcp", fmt.Sprintf("127.0.0.1:%d", p))
		if err == nil {
			return ln, nil
		}
		lastErr = err
	}
	return nil, lastErr
}

// localOnly refuses requests whose address is not this computer, which
// stops other web sites from reaching the app through DNS tricks.
func localOnly(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		host, _, err := net.SplitHostPort(r.Host)
		if err != nil {
			host = r.Host
		}
		if host != "127.0.0.1" && host != "localhost" {
			http.Error(w, "forbidden", http.StatusForbidden)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func alreadyRunning(port int) bool {
	client := http.Client{Timeout: 700 * time.Millisecond}
	resp, err := client.Get(fmt.Sprintf("http://127.0.0.1:%d/api/ping", port))
	if err != nil {
		return false
	}
	defer resp.Body.Close()
	buf := make([]byte, 200)
	n, _ := resp.Body.Read(buf)
	return strings.Contains(string(buf[:n]), appID)
}

func openBrowser(url string) {
	var cmd *exec.Cmd
	switch runtime.GOOS {
	case "windows":
		cmd = exec.Command("rundll32", "url.dll,FileProtocolHandler", url)
	case "darwin":
		cmd = exec.Command("open", url)
	default:
		cmd = exec.Command("xdg-open", url)
	}
	if err := cmd.Start(); err != nil {
		fmt.Println("Open this address in your browser:", url)
	}
}

func fail(err error) {
	fmt.Println("ERROR:", err)
	fmt.Println("Press Enter to close.")
	fmt.Scanln()
	os.Exit(1)
}
