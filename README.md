# Inventory Management

A small, portable inventory and sales app for a shop. It runs on your own
computer with nothing to install, keeps all data in its own folder, works fully
offline, and supports Arabic and English (right-to-left layout included).
Prices are in Iraqi dinars (IQD).

## What it does

The home page is a grid with the main parts of the system:

| Tile | What you do there |
| --- | --- |
| **New sale** | Point of sale screen like Odoo POS. Tap products to add them to the cart, enter the customer name, phone and address, and press *Complete sale*. The stock goes down and the invoice opens ready to print. |
| **Inventory** | Your products as picture cards. Add a product with just a name, a price, pictures and the number of pieces in stock. |
| **Customers** | Customers are saved automatically with each sale (matched by phone number). You can also add or edit them and see how much each one bought. |
| **Invoices** | Every sale, newest first, with search. Open one to print it, or delete it and choose whether the pieces go back to stock. |
| **Reports** | Sales today, this month and in total, the value of your stock, low stock items and best sellers. |
| **Settings** | Store name, logo (upload, size and position), invoice title, header and footer text, paper size (A4 or 80 mm receipt printer), language and low stock warning level. A live preview shows the invoice as you change things. |

## How to use it (Windows)

1. Download `InventoryApp-windows.zip` from the
   [Releases page](../../releases/latest) and unzip it anywhere, for example
   on the desktop or a USB stick.
2. Double click `InventoryApp.exe`. A small black window opens and the app
   opens in your browser. Keep the black window open while you work; closing
   it stops the app.
3. Running `InventoryApp.exe` again while it is already open just opens the
   browser page again.

Windows may show a "Windows protected your PC" message the first time because
the program is not signed. Click **More info** and then **Run anyway**.

## Where the data is saved

Everything is saved next to the program, in a folder called `data`:

```
InventoryApp/
  InventoryApp.exe
  data/
    db.json        all products, customers, invoices and settings (UTF-8, Arabic safe)
    images/        product pictures and the store logo
    backups/       an automatic daily copy of db.json (the last 30 days the app was used)
```

To back up the app or move it to another computer, copy the whole
`InventoryApp` folder. To restore an older day, close the app and copy a file
from `backups` over `data/db.json`.

## Calculations

All amounts are whole dinars stored as whole numbers, so there is never any
rounding. The line total is *price × quantity*, and the invoice total is the
sum of the line totals. Prices and totals are always worked out by the
program from the saved product prices, never typed by hand, and a sale is
refused if there are not enough pieces in stock. A finished invoice keeps its
own copy of the product names and prices, so changing a price later does not
change old invoices.

## Building from source

You need [Go](https://go.dev/dl/) 1.24 or newer.

- Windows: double click `build.bat`. The program is written to `dist\InventoryApp.exe`.
- macOS / Linux: run `./build.sh`. Programs for all three systems are written to `dist/`.
- To run it while developing: `go run .` (data is then saved in `./data`).
- Tests: `go test ./...`

Options: `InventoryApp.exe -port 8750 -data D:\ShopData -no-browser`.

Every push to `main` builds the Windows zip and publishes it on the Releases
page automatically (see `.github/workflows/build.yml`).

The app is one Go program with the web pages built in (`web/`). It uses
[Bootstrap](https://getbootstrap.com/) and
[Bootstrap Icons](https://icons.getbootstrap.com/), both included in
`web/vendor` so nothing is loaded from the internet.

---

## بالعربية

تطبيق بسيط وخفيف لإدارة المخزون والمبيعات، يعمل على الحاسوب مباشرة بدون تثبيت
وبدون إنترنت، ويدعم اللغة العربية بالكامل. العملة هي الدينار العراقي (د.ع).

**طريقة الاستخدام:** فك ضغط الملف `InventoryApp-windows.zip` في أي مكان (مثلاً
على فلاش USB) ثم شغّل `InventoryApp.exe`. سيفتح التطبيق في المتصفح. أبقِ النافذة
السوداء مفتوحة أثناء العمل، وإغلاقها يوقف التطبيق. لتغيير اللغة اضغط زر
«العربية» في الصفحة الرئيسية أو من الإعدادات.

**حفظ البيانات:** كل البيانات تُحفظ في مجلد `data` بجانب البرنامج (ملف
`db.json` بترميز UTF-8 ومجلد الصور). يُحفظ تلقائياً نسخة احتياطية يومية لآخر
30 يوماً في مجلد `backups`. للنسخ الاحتياطي أو النقل إلى حاسوب آخر انسخ مجلد
التطبيق كاملاً.

**الحسابات:** كل المبالغ بالدينار وبدون كسور. مجموع السطر = السعر × الكمية،
ومجموع الفاتورة = مجموع الأسطر. لا يمكن بيع كمية أكبر من الموجود في المخزون.
