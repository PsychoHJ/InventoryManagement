'use strict';

/* =========================================================
   Inventory app – one small script, no build step.
   All amounts are whole Iraqi dinars (integers).
   ========================================================= */

const I18N = {
  en: {
    appName: 'Inventory', cur: 'IQD', loading: 'Loading…',
    home: 'Home', pos: 'New sale', posSub: 'Sell products from the inventory',
    products: 'Inventory', productsSub: '{n} products · {low} low on stock',
    customers: 'Customers', customersSub: '{n} customers',
    invoices: 'Invoices', invoicesSub: '{n} invoices',
    reports: 'Reports', reportsSub: 'Today: {v}',
    settings: 'Settings', settingsSub: 'Store, logo and invoice design',
    switchLang: 'العربية',
    search: 'Search…', addProduct: 'Add product', editProduct: 'Edit product',
    name: 'Name', price: 'Price', pieces: 'Pieces in stock', pictures: 'Pictures',
    addPictures: 'Add pictures', mainPicture: 'Make main picture', removePicture: 'Remove picture',
    save: 'Save', cancel: 'Cancel', delete: 'Delete', edit: 'Edit', close: 'Close', back: 'Back',
    noProducts: 'No products yet. Add your first product.', noResults: 'Nothing found.',
    inStock: '{n} in stock', outOfStock: 'Out of stock', lowStock: 'Low stock',
    confirmDeleteProduct: 'Delete the product “{name}”? Old invoices keep their copy of it.',
    saved: 'Saved', deleted: 'Deleted',
    cart: 'Cart', emptyCart: 'Tap a product to add it to the cart.', clearCart: 'Clear cart',
    customer: 'Customer', customerName: 'Customer name', phone: 'Phone number', address: 'Address',
    total: 'Total', items: 'Items', pcs: 'pcs', completeSale: 'Complete sale', saleDone: 'Sale saved',
    onlyLeft: 'Only {n} left in stock',
    addCustomer: 'Add customer', editCustomer: 'Edit customer', noCustomers: 'No customers yet. They are added automatically with each sale.',
    invoicesCount: 'Invoices', totalSpent: 'Total bought', viewInvoices: 'Invoices',
    confirmDeleteCustomer: 'Delete the customer “{name}”? Their invoices are kept.',
    invoice: 'Invoice', invoiceNo: 'Invoice no.', date: 'Date', product: 'Product', qty: 'Qty',
    noInvoices: 'No invoices yet.', print: 'Print', shown: '{n} invoices shown', sum: 'Sum',
    filterCustomer: 'Invoices of {name}', showAll: 'Show all',
    deleteInvoice: 'Delete invoice', deleteInvoiceQ: 'Delete invoice #{n}?',
    deleteRestock: 'Delete and return the pieces to stock', deleteOnly: 'Delete only (keep stock as it is)',
    invoiceGone: 'This invoice does not exist.',
    today: 'Today', thisMonth: 'This month', allTime: 'All time', salesCount: '{n} invoices',
    stockValue: 'Inventory value', stockPieces: '{n} pieces in stock', lowStockList: 'Low stock',
    topProducts: 'Best selling products', soldQty: 'Sold', revenue: 'Revenue', nothing: 'Nothing to show yet.',
    general: 'General', language: 'Language', storeName: 'Store name', showStoreName: 'Show store name on the invoice',
    logo: 'Logo', uploadLogo: 'Upload logo', removeLogo: 'Remove logo', logoSize: 'Logo size',
    logoAlign: 'Logo position', alignStart: 'Start', alignCenter: 'Center', alignEnd: 'End',
    invoiceDesign: 'Invoice', invoiceTitle: 'Invoice title', invoiceTitlePh: 'Invoice',
    header: 'Header text', headerPh: 'Address, phone numbers…', footer: 'Footer text', footerPh: 'Thank you for your visit!',
    paid: 'PAID', showPaid: 'Show “PAID” under the total',
    accentColor: 'Accent color (text)', rowColor: 'Even rows fill color (A4)',
    paper: 'Paper size', paperA4: 'A4 page', paperReceipt: 'Receipt printer (80 mm)',
    lowStockAt: 'Warn about low stock at (pieces)', preview: 'Preview', dataFolder: 'Data folder',
    dataNote: 'All data and pictures are saved in this folder. To back up or move the app, copy the whole app folder.',
    sampleCustomer: 'Sample customer', sampleProduct: 'Sample product',
    unsaved: 'You have unsaved changes. Leave without saving?',
    'err.notFound': 'It was not found. It may have been deleted.',
    'err.badRequest': 'The request was not valid.',
    'err.nameRequired': 'Please enter a name.',
    'err.badPrice': 'Please enter a valid price (whole dinars).',
    'err.badStock': 'Please enter a valid number of pieces.',
    'err.badQty': 'Please enter a valid quantity.',
    'err.phoneTaken': 'Another customer already has this phone number.',
    'err.customerRequired': 'Please enter the customer name.',
    'err.cartEmpty': 'The cart is empty.',
    'err.productGone': 'A product in the cart no longer exists.',
    'err.notEnoughStock': 'There are not enough pieces in stock. The cart was updated, please check it.',
    'err.tooLarge': 'The total is too large.',
    'err.badImage': 'This file is not a supported picture (JPG, PNG, WEBP or GIF).',
    'err.save': 'The data could not be saved to the app folder.',
    'err.server': 'Something went wrong.',
    'err.offline': 'The app is not running. Start it again from the app folder.',
  },
  ar: {
    appName: 'المخزون', cur: 'د.ع', loading: 'جارٍ التحميل…',
    home: 'الرئيسية', pos: 'بيع جديد', posSub: 'بيع منتجات من المخزون',
    products: 'المخزون', productsSub: '{n} منتج · {low} قليل المخزون',
    customers: 'الزبائن', customersSub: '{n} زبون',
    invoices: 'الفواتير', invoicesSub: '{n} فاتورة',
    reports: 'التقارير', reportsSub: 'اليوم: {v}',
    settings: 'الإعدادات', settingsSub: 'المتجر والشعار وتصميم الفاتورة',
    switchLang: 'English',
    search: 'بحث…', addProduct: 'إضافة منتج', editProduct: 'تعديل المنتج',
    name: 'الاسم', price: 'السعر', pieces: 'عدد القطع في المخزون', pictures: 'الصور',
    addPictures: 'إضافة صور', mainPicture: 'اجعلها الصورة الرئيسية', removePicture: 'حذف الصورة',
    save: 'حفظ', cancel: 'إلغاء', delete: 'حذف', edit: 'تعديل', close: 'إغلاق', back: 'رجوع',
    noProducts: 'لا توجد منتجات بعد. أضف أول منتج.', noResults: 'لا توجد نتائج.',
    inStock: '{n} في المخزون', outOfStock: 'نفد المخزون', lowStock: 'مخزون قليل',
    confirmDeleteProduct: 'حذف المنتج «{name}»؟ الفواتير السابقة تحتفظ بنسختها منه.',
    saved: 'تم الحفظ', deleted: 'تم الحذف',
    cart: 'السلة', emptyCart: 'اضغط على منتج لإضافته إلى السلة.', clearCart: 'إفراغ السلة',
    customer: 'الزبون', customerName: 'اسم الزبون', phone: 'رقم الهاتف', address: 'العنوان',
    total: 'المجموع', items: 'المواد', pcs: 'قطعة', completeSale: 'إتمام البيع', saleDone: 'تم حفظ البيع',
    onlyLeft: 'المتبقي في المخزون {n} فقط',
    addCustomer: 'إضافة زبون', editCustomer: 'تعديل الزبون', noCustomers: 'لا يوجد زبائن بعد. يُضافون تلقائياً مع كل عملية بيع.',
    invoicesCount: 'الفواتير', totalSpent: 'مجموع المشتريات', viewInvoices: 'الفواتير',
    confirmDeleteCustomer: 'حذف الزبون «{name}»؟ ستبقى فواتيره محفوظة.',
    invoice: 'فاتورة', invoiceNo: 'رقم الفاتورة', date: 'التاريخ', product: 'المنتج', qty: 'الكمية',
    noInvoices: 'لا توجد فواتير بعد.', print: 'طباعة', shown: 'عدد الفواتير المعروضة: {n}', sum: 'المجموع',
    filterCustomer: 'فواتير {name}', showAll: 'عرض الكل',
    deleteInvoice: 'حذف الفاتورة', deleteInvoiceQ: 'حذف الفاتورة رقم {n}؟',
    deleteRestock: 'حذف وإرجاع القطع إلى المخزون', deleteOnly: 'حذف فقط (بدون تغيير المخزون)',
    invoiceGone: 'هذه الفاتورة غير موجودة.',
    today: 'اليوم', thisMonth: 'هذا الشهر', allTime: 'الكل', salesCount: '{n} فاتورة',
    stockValue: 'قيمة المخزون', stockPieces: '{n} قطعة في المخزون', lowStockList: 'مخزون قليل',
    topProducts: 'المنتجات الأكثر مبيعاً', soldQty: 'المباع', revenue: 'المبيعات', nothing: 'لا يوجد شيء لعرضه بعد.',
    general: 'عام', language: 'اللغة', storeName: 'اسم المتجر', showStoreName: 'إظهار اسم المتجر في الفاتورة',
    logo: 'الشعار', uploadLogo: 'رفع الشعار', removeLogo: 'إزالة الشعار', logoSize: 'حجم الشعار',
    logoAlign: 'موضع الشعار', alignStart: 'البداية', alignCenter: 'الوسط', alignEnd: 'النهاية',
    invoiceDesign: 'الفاتورة', invoiceTitle: 'عنوان الفاتورة', invoiceTitlePh: 'فاتورة',
    header: 'نص الترويسة', headerPh: 'العنوان، أرقام الهاتف…', footer: 'نص التذييل', footerPh: 'شكراً لزيارتكم!',
    paid: 'مدفوع', showPaid: 'إظهار «مدفوع» تحت المجموع',
    accentColor: 'لون التمييز (النصوص)', rowColor: 'لون تعبئة الصفوف الزوجية (A4)',
    paper: 'حجم الورق', paperA4: 'ورقة A4', paperReceipt: 'طابعة إيصالات (80 ملم)',
    lowStockAt: 'التنبيه عند انخفاض المخزون إلى (قطعة)', preview: 'معاينة', dataFolder: 'مجلد البيانات',
    dataNote: 'كل البيانات والصور محفوظة في هذا المجلد. للنسخ الاحتياطي أو النقل انسخ مجلد التطبيق كاملاً.',
    sampleCustomer: 'زبون تجريبي', sampleProduct: 'منتج تجريبي',
    unsaved: 'لديك تغييرات غير محفوظة. هل تريد المغادرة بدون حفظ؟',
    'err.notFound': 'غير موجود. ربما تم حذفه.',
    'err.badRequest': 'الطلب غير صالح.',
    'err.nameRequired': 'يرجى إدخال الاسم.',
    'err.badPrice': 'يرجى إدخال سعر صحيح (بالدينار بدون كسور).',
    'err.badStock': 'يرجى إدخال عدد قطع صحيح.',
    'err.badQty': 'يرجى إدخال كمية صحيحة.',
    'err.phoneTaken': 'رقم الهاتف هذا مسجل لزبون آخر.',
    'err.customerRequired': 'يرجى إدخال اسم الزبون.',
    'err.cartEmpty': 'السلة فارغة.',
    'err.productGone': 'أحد المنتجات في السلة لم يعد موجوداً.',
    'err.notEnoughStock': 'لا توجد قطع كافية في المخزون. تم تحديث السلة، يرجى مراجعتها.',
    'err.tooLarge': 'المجموع كبير جداً.',
    'err.badImage': 'هذا الملف ليس صورة مدعومة (JPG أو PNG أو WEBP أو GIF).',
    'err.save': 'تعذّر حفظ البيانات في مجلد التطبيق.',
    'err.server': 'حدث خطأ ما.',
    'err.offline': 'التطبيق لا يعمل. شغّله مرة أخرى من مجلد التطبيق.',
  },
};

const state = {
  db: null,
  dataDir: '',
  cart: [],                               // [{ productId, qty }]
  cust: { name: '', phone: '', address: '' },
  productSearch: '',
  posSearch: '',
};

/* ---------------- helpers ---------------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function lang() { return state.db && state.db.settings.language === 'ar' ? 'ar' : 'en'; }

function t(key, vars) {
  let s = I18N[lang()][key] ?? I18N.en[key] ?? key;
  if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}

function esc(v) {
  return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Escapes text and keeps groups of numbers such as "0770 123 4567" in
// left-to-right order, so phone numbers do not come out reversed inside
// Arabic lines.
function rich(v) {
  const s = String(v ?? '');
  let out = '', last = 0;
  for (const m of s.matchAll(/\+?\d+(?:[ \-\/.:]\d+)+/g)) {
    out += esc(s.slice(last, m.index)) + `<span dir="ltr">${esc(m[0])}</span>`;
    last = m.index + m[0].length;
  }
  return out + esc(s.slice(last));
}

// 25000 -> "25,000 IQD" / "25,000 د.ع"
function money(n) {
  return `<span class="num" dir="ltr">${Number(n || 0).toLocaleString('en-US')}</span> ${t('cur')}`;
}
function moneyText(n) { return `${Number(n || 0).toLocaleString('en-US')} ${t('cur')}`; }
function int(n) { return Number(n || 0).toLocaleString('en-US'); }

// Turns Arabic-Indic / Persian digits into 0-9 and drops commas, spaces and
// anything else, then reads a whole number. Returns NaN when nothing is left.
function parseWhole(v) {
  const s = String(v ?? '')
    .replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 0x06F0))
    .replace(/[^0-9]/g, '');
  return s === '' ? NaN : Number(s);
}

function normPhone(v) {
  const s = String(v ?? '').trim()
    .replace(/[٠-٩]/g, d => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, d => String(d.charCodeAt(0) - 0x06F0));
  return (s.startsWith('+') ? '+' : '') + s.replace(/[^0-9]/g, '');
}

function pad(n) { return String(n).padStart(2, '0'); }
function fmtDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function imgUrl(name) { return 'images/' + encodeURIComponent(name); }

function toast(msg, isError) {
  const el = document.createElement('div');
  el.className = 'toast-msg' + (isError ? ' error' : '');
  el.textContent = msg;
  $('#toasts').appendChild(el);
  setTimeout(() => el.remove(), isError ? 6000 : 2500);
}

async function api(method, url, body) {
  let res;
  try {
    res = await fetch(url, {
      method,
      headers: body instanceof Blob ? { 'Content-Type': body.type } : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : (body instanceof Blob ? body : JSON.stringify(body)),
    });
  } catch (e) {
    throw new Error(t('err.offline'));
  }
  let data = {};
  try { data = await res.json(); } catch (e) { /* empty answer */ }
  if (!res.ok) {
    const err = new Error(t(data.error || 'err.server'));
    err.key = data.error;
    throw err;
  }
  if (data.db) { state.db = data.db; state.dataDir = data.dataDir; }
  return data;
}

const productById = id => state.db.products.find(p => p.id === id);
const lowLimit = () => Number(state.db.settings.lowStock || 0);

function stockBadge(p) {
  if (p.stock <= 0) return `<span class="badge text-bg-danger">${t('outOfStock')}</span>`;
  if (p.stock <= lowLimit()) return `<span class="badge text-bg-warning">${esc(t('inStock', { n: int(p.stock) }))}</span>`;
  return `<span class="badge text-bg-light border">${esc(t('inStock', { n: int(p.stock) }))}</span>`;
}

function matches(q, ...fields) {
  q = q.trim().toLowerCase();
  if (!q) return true;
  return fields.some(f => String(f ?? '').toLowerCase().includes(q));
}

/* ---------------- modal ---------------- */

let modal;
function openModal(html, opts = {}) {
  const dialog = $('#modal .modal-dialog');
  dialog.className = 'modal-dialog modal-dialog-centered modal-dialog-scrollable' + (opts.size ? ' modal-' + opts.size : '');
  $('#modal-content').innerHTML = html;
  modal = modal || new bootstrap.Modal($('#modal'));
  modal.show();
  return $('#modal-content');
}
function closeModal() { if (modal) modal.hide(); }

function confirmBox(message, okText, danger = true) {
  return new Promise(resolve => {
    const box = openModal(`
      <div class="modal-body fs-5 py-4">${esc(message)}</div>
      <div class="modal-footer">
        <button class="btn btn-secondary" data-r="0">${t('cancel')}</button>
        <button class="btn ${danger ? 'btn-danger' : 'btn-brand'}" data-r="1">${esc(okText)}</button>
      </div>`);
    let answer = false;
    box.querySelectorAll('[data-r]').forEach(b => b.onclick = () => { answer = b.dataset.r === '1'; closeModal(); });
    $('#modal').addEventListener('hidden.bs.modal', () => resolve(answer), { once: true });
  });
}

/* ---------------- layout ---------------- */

function applyLang() {
  const l = lang();
  document.documentElement.lang = l;
  document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
  const href = l === 'ar' ? 'vendor/bootstrap/bootstrap.rtl.min.css' : 'vendor/bootstrap/bootstrap.min.css';
  const link = $('#bs-css');
  if (!link.href.endsWith(href)) link.href = href;
}

function topbar(title, extra = '') {
  const s = state.db.settings;
  return `<nav class="topbar no-print">
    <a href="#/" class="btn btn-sm btn-outline-light" title="${esc(t('home'))}"><i class="bi bi-house-fill"></i></a>
    <h1>${esc(title)}</h1>${extra}
    <span class="store"><bdi>${esc(s.storeName)}</bdi></span>
  </nav>`;
}

/* ---------------- router ---------------- */

let leaveGuard = null; // returns true when the page may be left

const routes = {
  '': renderHome,
  pos: renderPos,
  products: renderProducts,
  customers: renderCustomers,
  invoices: renderInvoices,
  invoice: renderInvoice,
  reports: renderReports,
  settings: renderSettings,
};

function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
  const fn = routes[parts[0]] || renderHome;
  $('#page-style').textContent = '';
  document.title = state.db.settings.storeName || t('appName');
  fn(...parts.slice(1));
  window.scrollTo(0, 0);
}

let lastHash = location.hash;
window.addEventListener('hashchange', () => {
  if (leaveGuard && !leaveGuard()) {
    history.replaceState(null, '', lastHash);
    return;
  }
  leaveGuard = null;
  lastHash = location.hash;
  route();
});

/* ---------------- home ---------------- */

function isSameDay(a, b) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }

function renderHome() {
  const { products, customers, invoices, settings } = state.db;
  const low = products.filter(p => p.stock <= lowLimit()).length;
  const now = new Date();
  const today = invoices.filter(i => isSameDay(new Date(i.date), now)).reduce((s, i) => s + i.total, 0);
  const tile = (href, icon, color, title, sub) => `
    <a class="tile" href="${href}">
      <i class="bi ${icon}" style="color:${color}"></i>
      <div class="tile-title">${esc(title)}</div>
      <div class="tile-sub">${sub}</div>
    </a>`;
  $('#app').innerHTML = `
    <div class="home">
      <div class="home-head">
        ${settings.logo ? `<img src="${imgUrl(settings.logo)}" alt="">` : '<i class="bi bi-shop fs-1 text-brand"></i>'}
        <h1><bdi>${esc(settings.storeName || t('appName'))}</bdi></h1>
        <button class="btn btn-outline-secondary ms-auto" id="lang-btn"><i class="bi bi-translate"></i> ${t('switchLang')}</button>
      </div>
      <div class="tiles">
        ${tile('#/pos', 'bi-cart-plus', '#714b67', t('pos'), esc(t('posSub')))}
        ${tile('#/products', 'bi-box-seam', '#0d6efd', t('products'), esc(t('productsSub', { n: int(products.length), low: int(low) })))}
        ${tile('#/customers', 'bi-people', '#198754', t('customers'), esc(t('customersSub', { n: int(customers.length) })))}
        ${tile('#/invoices', 'bi-receipt', '#fd7e14', t('invoices'), esc(t('invoicesSub', { n: int(invoices.length) })))}
        ${tile('#/reports', 'bi-graph-up', '#6f42c1', t('reports'), esc(t('reportsSub', { v: moneyText(today) })))}
        ${tile('#/settings', 'bi-gear', '#6c757d', t('settings'), esc(t('settingsSub')))}
      </div>
    </div>`;
  $('#lang-btn').onclick = async () => {
    const s = { ...state.db.settings, language: lang() === 'ar' ? 'en' : 'ar' };
    try { await api('PUT', '/api/settings', s); applyLang(); route(); } catch (e) { toast(e.message, true); }
  };
}

/* ---------------- product cards ---------------- */

function productCard(p, opts = {}) {
  const img = p.images[0]
    ? `<img src="${imgUrl(p.images[0])}" alt="" loading="lazy">`
    : '<i class="bi bi-image"></i>';
  const left = p.stock - (opts.inCart || 0);
  const disabled = opts.pos && left <= 0;
  return `<button type="button" class="pcard${disabled ? ' disabled' : ''}" data-id="${esc(p.id)}">
    <div class="pimg">${img}</div>
    <span class="pstock">${opts.pos ? (left <= 0 ? `<span class="badge text-bg-danger">${t('outOfStock')}</span>` :
      `<span class="badge ${left <= lowLimit() ? 'text-bg-warning' : 'text-bg-light border'}">${int(left)}</span>`) : stockBadge(p)}</span>
    ${opts.inCart ? `<span class="pincart badge rounded-pill" style="background:var(--brand)">${int(opts.inCart)}</span>` : ''}
    <div class="pname"><bdi>${esc(p.name)}</bdi></div>
    <div class="pprice">${money(p.price)}</div>
  </button>`;
}

/* ---------------- products (inventory) ---------------- */

function renderProducts() {
  $('#app').innerHTML = `
    ${topbar(t('products'))}
    <div class="page">
      <div class="d-flex gap-2 mb-3">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input class="form-control" id="p-search" placeholder="${esc(t('search'))}" value="${esc(state.productSearch)}" dir="auto">
        </div>
        <button class="btn btn-brand text-nowrap" id="p-add"><i class="bi bi-plus-lg"></i> ${t('addProduct')}</button>
      </div>
      <div id="p-list"></div>
    </div>`;
  const draw = () => {
    const list = state.db.products.filter(p => matches(state.productSearch, p.name));
    $('#p-list').innerHTML = list.length
      ? `<div class="cards">${list.map(p => productCard(p)).join('')}</div>`
      : `<div class="text-center text-secondary p-5">${state.db.products.length ? t('noResults') : t('noProducts')}</div>`;
    $$('#p-list .pcard').forEach(c => c.onclick = () => productForm(productById(c.dataset.id)));
  };
  $('#p-search').oninput = e => { state.productSearch = e.target.value; draw(); };
  $('#p-add').onclick = () => productForm(null);
  draw();
}

// Shrinks a picture before upload so the data folder stays small.
// JPEG gets a white background (it has no transparency); PNG keeps it.
function resizeImage(file, maxSide, type) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      if (type === 'image/jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); }
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      c.toBlob(b => b ? resolve(b) : reject(new Error(t('err.badImage'))), type, 0.85);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error(t('err.badImage'))); };
    img.src = url;
  });
}

async function uploadImage(file, maxSide, type) {
  const blob = await resizeImage(file, maxSide, type);
  const res = await api('POST', '/api/images', blob);
  return res.name;
}

function productForm(p) {
  const draft = p ? { ...p, images: [...p.images] } : { id: '', name: '', price: '', stock: '', images: [] };
  const box = openModal(`
    <div class="modal-header">
      <h5 class="modal-title">${p ? t('editProduct') : t('addProduct')}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <form class="modal-body" id="pf" novalidate>
      <div class="mb-3">
        <label class="form-label">${t('name')}</label>
        <input class="form-control form-control-lg" name="name" required maxlength="200" dir="auto" value="${esc(draft.name)}">
      </div>
      <div class="row g-3 mb-3">
        <div class="col-6">
          <label class="form-label">${t('price')} (${t('cur')})</label>
          <input class="form-control form-control-lg" name="price" inputmode="numeric" dir="ltr" value="${draft.price === '' ? '' : int(draft.price)}">
        </div>
        <div class="col-6">
          <label class="form-label">${t('pieces')}</label>
          <div class="input-group input-group-lg">
            <button class="btn btn-outline-secondary" type="button" data-step="-1"><i class="bi bi-dash-lg"></i></button>
            <input class="form-control text-center" name="stock" inputmode="numeric" dir="ltr" value="${draft.stock === '' ? '' : int(draft.stock)}">
            <button class="btn btn-outline-secondary" type="button" data-step="1"><i class="bi bi-plus-lg"></i></button>
          </div>
        </div>
      </div>
      <label class="form-label">${t('pictures')}</label>
      <div class="thumbs mb-2" id="pf-thumbs"></div>
      <label class="btn btn-outline-secondary btn-sm">
        <i class="bi bi-image"></i> ${t('addPictures')}
        <input type="file" accept="image/*" multiple hidden id="pf-files">
      </label>
      <span class="spinner-border spinner-border-sm d-none ms-2" id="pf-spin"></span>
    </form>
    <div class="modal-footer">
      ${p ? `<button class="btn btn-outline-danger me-auto" id="pf-del"><i class="bi bi-trash"></i> ${t('delete')}</button>` : ''}
      <button class="btn btn-secondary" data-bs-dismiss="modal">${t('cancel')}</button>
      <button class="btn btn-brand" id="pf-save"><i class="bi bi-check-lg"></i> ${t('save')}</button>
    </div>`);
  const f = $('#pf', box);

  const drawThumbs = () => {
    $('#pf-thumbs', box).innerHTML = draft.images.map((img, i) => `
      <div class="thumb${i === 0 ? ' main' : ''}">
        <img src="${imgUrl(img)}" alt="">
        ${i > 0 ? `<button type="button" class="tbtn star" data-i="${i}" title="${esc(t('mainPicture'))}"><i class="bi bi-star-fill"></i></button>` : ''}
        <button type="button" class="tbtn del" data-i="${i}" title="${esc(t('removePicture'))}"><i class="bi bi-x-lg"></i></button>
      </div>`).join('');
    $$('.tbtn.del', box).forEach(b => b.onclick = () => { draft.images.splice(+b.dataset.i, 1); drawThumbs(); });
    $$('.tbtn.star', box).forEach(b => b.onclick = () => {
      const [img] = draft.images.splice(+b.dataset.i, 1);
      draft.images.unshift(img);
      drawThumbs();
    });
  };
  drawThumbs();

  $$('[data-step]', box).forEach(b => b.onclick = () => {
    const cur = parseWhole(f.stock.value) || 0;
    f.stock.value = int(Math.max(0, cur + Number(b.dataset.step)));
  });
  // Show thousands separators while typing the price.
  f.price.oninput = () => {
    const v = parseWhole(f.price.value);
    f.price.value = isNaN(v) ? '' : int(v);
  };

  $('#pf-files', box).onchange = async e => {
    const files = Array.from(e.target.files);
    e.target.value = '';
    $('#pf-spin', box).classList.remove('d-none');
    for (const file of files) {
      if (draft.images.length >= 10) break;
      try { draft.images.push(await uploadImage(file, 1000, 'image/jpeg')); drawThumbs(); }
      catch (err) { toast(err.message, true); }
    }
    $('#pf-spin', box).classList.add('d-none');
  };

  f.onsubmit = e => { e.preventDefault(); $('#pf-save', box).click(); };
  $('#pf-save', box).onclick = async () => {
    const name = f.name.value.trim();
    const price = parseWhole(f.price.value);
    const stock = parseWhole(f.stock.value);
    if (!name) return toast(t('err.nameRequired'), true);
    if (isNaN(price) || price > 1e9) return toast(t('err.badPrice'), true);
    if (isNaN(stock) || stock > 1e6) return toast(t('err.badStock'), true);
    try {
      await api('POST', '/api/products', { id: draft.id, name, price, stock, images: draft.images });
      closeModal(); toast(t('saved')); route();
    } catch (err) { toast(err.message, true); }
  };
  if (p) $('#pf-del', box).onclick = async () => {
    if (!await confirmBox(t('confirmDeleteProduct', { name: p.name }), t('delete'))) return;
    try {
      await api('DELETE', '/api/products/' + encodeURIComponent(p.id));
      state.cart = state.cart.filter(l => l.productId !== p.id);
      toast(t('deleted')); route();
    } catch (err) { toast(err.message, true); }
  };
  setTimeout(() => f.name.focus(), 300);
}

/* ---------------- POS (new sale) ---------------- */

const cartQty = id => (state.cart.find(l => l.productId === id) || {}).qty || 0;

// Drops cart lines whose product is gone and caps each line at the stock.
function fixCart() {
  state.cart = state.cart
    .map(l => { const p = productById(l.productId); return p ? { ...l, qty: Math.min(l.qty, p.stock) } : null; })
    .filter(l => l && l.qty > 0);
}

function cartTotal() {
  return state.cart.reduce((sum, l) => sum + productById(l.productId).price * l.qty, 0);
}

function renderPos() {
  fixCart();
  $('#app').innerHTML = `
    ${topbar(t('pos'))}
    <div class="page pos">
      <div>
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input class="form-control form-control-lg" id="pos-search" placeholder="${esc(t('search'))}" value="${esc(state.posSearch)}" dir="auto">
        </div>
        <div id="pos-list"></div>
      </div>
      <div class="pos-cart">
        <div class="d-flex align-items-center p-3 border-bottom">
          <h5 class="m-0"><i class="bi bi-cart3"></i> ${t('cart')}</h5>
          <button class="btn btn-sm btn-outline-danger ms-auto" id="cart-clear"><i class="bi bi-trash"></i> ${t('clearCart')}</button>
        </div>
        <div class="cart-lines" id="cart-lines"></div>
        <div class="p-3 border-top">
          <div class="d-flex justify-content-between align-items-baseline mb-3">
            <span class="text-secondary" id="cart-count"></span>
            <span class="cart-total" id="cart-total"></span>
          </div>
          <h6><i class="bi bi-person"></i> ${t('customer')}</h6>
          <input class="form-control mb-2" id="c-name" list="c-list" placeholder="${esc(t('customerName'))} *" dir="auto" value="${esc(state.cust.name)}" autocomplete="off">
          <datalist id="c-list">${state.db.customers.map(c => `<option value="${esc(c.name)}">${esc(c.phone)}</option>`).join('')}</datalist>
          <input class="form-control mb-2" id="c-phone" placeholder="${esc(t('phone'))}" dir="ltr" inputmode="tel" value="${esc(state.cust.phone)}">
          <textarea class="form-control mb-3" id="c-address" rows="2" placeholder="${esc(t('address'))}" dir="auto">${esc(state.cust.address)}</textarea>
          <button class="btn btn-brand btn-lg w-100" id="sale-btn"><i class="bi bi-check2-circle"></i> ${t('completeSale')}</button>
        </div>
      </div>
    </div>`;

  const drawProducts = () => {
    const list = state.db.products.filter(p => matches(state.posSearch, p.name));
    $('#pos-list').innerHTML = list.length
      ? `<div class="cards">${list.map(p => productCard(p, { pos: true, inCart: cartQty(p.id) })).join('')}</div>`
      : `<div class="text-center text-secondary p-5">${state.db.products.length ? t('noResults') : t('noProducts')}</div>`;
    $$('#pos-list .pcard').forEach(c => c.onclick = () => addToCart(c.dataset.id));
  };

  const drawCart = () => {
    const box = $('#cart-lines');
    if (!state.cart.length) {
      box.innerHTML = `<div class="text-center text-secondary p-4">${t('emptyCart')}</div>`;
    } else {
      box.innerHTML = state.cart.map(l => {
        const p = productById(l.productId);
        return `<div class="cart-line" data-id="${esc(p.id)}">
          <div class="cl-name">
            <div><bdi>${esc(p.name)}</bdi></div>
            <small class="text-secondary">${money(p.price)} × <span class="num">${int(l.qty)}</span></small>
          </div>
          <div class="input-group input-group-sm" style="width:auto">
            <button class="btn btn-outline-secondary" data-act="dec"><i class="bi bi-dash"></i></button>
            <input class="form-control qty" value="${l.qty}" inputmode="numeric" dir="ltr">
            <button class="btn btn-outline-secondary" data-act="inc"><i class="bi bi-plus"></i></button>
          </div>
          <div class="text-end fw-semibold" style="min-width:110px">${money(p.price * l.qty)}</div>
          <button class="btn btn-sm text-danger" data-act="del"><i class="bi bi-x-lg"></i></button>
        </div>`;
      }).join('');
    }
    const pieces = state.cart.reduce((s, l) => s + l.qty, 0);
    $('#cart-count').textContent = `${t('items')}: ${int(state.cart.length)} · ${int(pieces)} ${t('pcs')}`;
    $('#cart-total').innerHTML = money(cartTotal());
    $('#sale-btn').disabled = !state.cart.length;

    $$('.cart-line').forEach(row => {
      const id = row.dataset.id;
      row.querySelector('[data-act=dec]').onclick = () => setQty(id, cartQty(id) - 1);
      row.querySelector('[data-act=inc]').onclick = () => setQty(id, cartQty(id) + 1);
      row.querySelector('[data-act=del]').onclick = () => setQty(id, 0);
      row.querySelector('.qty').onchange = e => {
        const v = parseWhole(e.target.value);
        setQty(id, isNaN(v) ? cartQty(id) : v);
      };
    });
  };

  const redraw = () => { drawProducts(); drawCart(); };

  function setQty(id, qty) {
    const p = productById(id);
    const line = state.cart.find(l => l.productId === id);
    if (!p || !line) return;
    if (qty > p.stock) { toast(t('onlyLeft', { n: int(p.stock) }), true); qty = p.stock; }
    if (qty <= 0) state.cart = state.cart.filter(l => l.productId !== id);
    else line.qty = qty;
    redraw();
  }

  function addToCart(id) {
    const p = productById(id);
    if (!p) return;
    const line = state.cart.find(l => l.productId === id);
    if ((line ? line.qty : 0) + 1 > p.stock) { toast(p.stock > 0 ? t('onlyLeft', { n: int(p.stock) }) : t('outOfStock'), true); return; }
    if (line) line.qty++; else state.cart.push({ productId: id, qty: 1 });
    redraw();
  }

  $('#pos-search').oninput = e => { state.posSearch = e.target.value; drawProducts(); };
  $('#cart-clear').onclick = () => { state.cart = []; redraw(); };

  // Customer fields: picking a known name or typing a known phone fills the rest.
  const nameIn = $('#c-name'), phoneIn = $('#c-phone'), addrIn = $('#c-address');
  nameIn.oninput = () => {
    state.cust.name = nameIn.value;
    const same = state.db.customers.filter(c => c.name.trim().toLowerCase() === nameIn.value.trim().toLowerCase());
    if (same.length === 1 && !phoneIn.value.trim()) {
      phoneIn.value = state.cust.phone = same[0].phone;
      if (!addrIn.value.trim()) addrIn.value = state.cust.address = same[0].address;
    }
  };
  phoneIn.oninput = () => {
    state.cust.phone = phoneIn.value;
    const np = normPhone(phoneIn.value);
    const c = np && state.db.customers.find(c => normPhone(c.phone) === np);
    if (c) {
      if (!nameIn.value.trim()) nameIn.value = state.cust.name = c.name;
      if (!addrIn.value.trim()) addrIn.value = state.cust.address = c.address;
    }
  };
  addrIn.oninput = () => { state.cust.address = addrIn.value; };

  $('#sale-btn').onclick = async () => {
    if (!state.cart.length) return toast(t('err.cartEmpty'), true);
    if (!state.cust.name.trim()) { nameIn.focus(); return toast(t('err.customerRequired'), true); }
    const btn = $('#sale-btn');
    btn.disabled = true;
    try {
      await api('POST', '/api/sales', { customer: state.cust, items: state.cart });
      const inv = state.db.invoices[state.db.invoices.length - 1];
      state.cart = [];
      state.cust = { name: '', phone: '', address: '' };
      toast(t('saleDone'));
      location.hash = '#/invoice/' + inv.id;
    } catch (err) {
      toast(err.message, true);
      if (err.key === 'err.notEnoughStock' || err.key === 'err.productGone') {
        try { await api('GET', '/api/data'); } catch (e) { /* shown already */ }
        fixCart(); redraw();
      }
      btn.disabled = !state.cart.length;
    }
  };

  redraw();
}

/* ---------------- customers ---------------- */

function customerStats() {
  const stats = {};
  for (const inv of state.db.invoices) {
    const s = stats[inv.customerId] || (stats[inv.customerId] = { count: 0, total: 0 });
    s.count++;
    s.total += inv.total;
  }
  return stats;
}

function renderCustomers() {
  let q = '';
  $('#app').innerHTML = `
    ${topbar(t('customers'))}
    <div class="page">
      <div class="d-flex gap-2 mb-3">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input class="form-control" id="c-search" placeholder="${esc(t('search'))}" dir="auto">
        </div>
        <button class="btn btn-brand text-nowrap" id="c-add"><i class="bi bi-person-plus"></i> ${t('addCustomer')}</button>
      </div>
      <div id="c-table"></div>
    </div>`;
  const draw = () => {
    const stats = customerStats();
    const list = state.db.customers
      .filter(c => matches(q, c.name, c.phone, normPhone(c.phone), c.address))
      .sort((a, b) => a.name.localeCompare(b.name, lang()));
    if (!list.length) {
      $('#c-table').innerHTML = `<div class="text-center text-secondary p-5">${state.db.customers.length ? t('noResults') : t('noCustomers')}</div>`;
      return;
    }
    $('#c-table').innerHTML = `<div class="table-responsive bg-white rounded shadow-sm"><table class="table table-hover align-middle m-0">
      <thead><tr><th>${t('name')}</th><th>${t('phone')}</th><th>${t('address')}</th><th class="text-end">${t('invoicesCount')}</th><th class="text-end">${t('totalSpent')}</th><th></th></tr></thead>
      <tbody>${list.map(c => {
        const s = stats[c.id] || { count: 0, total: 0 };
        return `<tr data-id="${esc(c.id)}">
          <td class="fw-semibold"><bdi>${esc(c.name)}</bdi></td>
          <td class="num"><span dir="ltr">${esc(c.phone)}</span></td>
          <td class="prewrap">${rich(c.address)}</td>
          <td class="text-end num">${int(s.count)}</td>
          <td class="text-end">${money(s.total)}</td>
          <td class="text-end text-nowrap">
            <a class="btn btn-sm btn-outline-secondary" href="#/invoices/${encodeURIComponent(c.id)}" title="${esc(t('viewInvoices'))}"><i class="bi bi-receipt"></i></a>
            <button class="btn btn-sm btn-outline-primary" data-edit title="${esc(t('edit'))}"><i class="bi bi-pencil"></i></button>
          </td>
        </tr>`;
      }).join('')}</tbody></table></div>`;
    $$('#c-table [data-edit]').forEach(b => b.onclick = () => customerForm(state.db.customers.find(c => c.id === b.closest('tr').dataset.id)));
  };
  $('#c-search').oninput = e => { q = e.target.value; draw(); };
  $('#c-add').onclick = () => customerForm(null);
  draw();
}

function customerForm(c) {
  const box = openModal(`
    <div class="modal-header">
      <h5 class="modal-title">${c ? t('editCustomer') : t('addCustomer')}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
    </div>
    <form class="modal-body" id="cf" novalidate>
      <div class="mb-3"><label class="form-label">${t('name')}</label>
        <input class="form-control" name="name" maxlength="200" dir="auto" value="${esc(c ? c.name : '')}"></div>
      <div class="mb-3"><label class="form-label">${t('phone')}</label>
        <input class="form-control" name="phone" maxlength="40" dir="ltr" inputmode="tel" value="${esc(c ? c.phone : '')}"></div>
      <div class="mb-3"><label class="form-label">${t('address')}</label>
        <textarea class="form-control" name="address" rows="2" maxlength="500" dir="auto">${esc(c ? c.address : '')}</textarea></div>
    </form>
    <div class="modal-footer">
      ${c ? `<button class="btn btn-outline-danger me-auto" id="cf-del"><i class="bi bi-trash"></i> ${t('delete')}</button>` : ''}
      <button class="btn btn-secondary" data-bs-dismiss="modal">${t('cancel')}</button>
      <button class="btn btn-brand" id="cf-save"><i class="bi bi-check-lg"></i> ${t('save')}</button>
    </div>`);
  const f = $('#cf', box);
  f.onsubmit = e => { e.preventDefault(); $('#cf-save', box).click(); };
  $('#cf-save', box).onclick = async () => {
    if (!f.name.value.trim()) return toast(t('err.nameRequired'), true);
    try {
      await api('POST', '/api/customers', { id: c ? c.id : '', name: f.name.value, phone: f.phone.value, address: f.address.value });
      closeModal(); toast(t('saved')); route();
    } catch (err) { toast(err.message, true); }
  };
  if (c) $('#cf-del', box).onclick = async () => {
    if (!await confirmBox(t('confirmDeleteCustomer', { name: c.name }), t('delete'))) return;
    try { await api('DELETE', '/api/customers/' + encodeURIComponent(c.id)); toast(t('deleted')); route(); }
    catch (err) { toast(err.message, true); }
  };
  setTimeout(() => f.name.focus(), 300);
}

/* ---------------- invoices ---------------- */

function renderInvoices(customerId) {
  let q = '';
  const cust = customerId && state.db.customers.find(c => c.id === customerId);
  $('#app').innerHTML = `
    ${topbar(t('invoices'))}
    <div class="page">
      ${customerId ? `<div class="alert alert-light border d-flex align-items-center">
        <i class="bi bi-person me-2"></i><span>${t('filterCustomer', { name: `<bdi>${esc(cust ? cust.name : '')}</bdi>` })}</span>
        <a href="#/invoices" class="ms-auto">${t('showAll')}</a></div>` : ''}
      <div class="input-group mb-3">
        <span class="input-group-text"><i class="bi bi-search"></i></span>
        <input class="form-control" id="i-search" placeholder="${esc(t('search'))}" dir="auto">
      </div>
      <div id="i-table"></div>
    </div>`;
  const draw = () => {
    const list = state.db.invoices
      .filter(i => !customerId || i.customerId === customerId)
      .filter(i => matches(q.replace(/^#/, ''), i.number, i.customerName, i.customerPhone, normPhone(i.customerPhone)))
      .sort((a, b) => b.number - a.number);
    if (!list.length) {
      $('#i-table').innerHTML = `<div class="text-center text-secondary p-5">${state.db.invoices.length ? t('noResults') : t('noInvoices')}</div>`;
      return;
    }
    const sum = list.reduce((s, i) => s + i.total, 0);
    $('#i-table').innerHTML = `<div class="table-responsive bg-white rounded shadow-sm"><table class="table table-hover table-click align-middle m-0">
      <thead><tr><th>#</th><th>${t('date')}</th><th>${t('customer')}</th><th>${t('phone')}</th><th class="text-end">${t('pcs')}</th><th class="text-end">${t('total')}</th></tr></thead>
      <tbody>${list.map(i => `<tr data-id="${esc(i.id)}">
        <td class="num fw-semibold">${i.number}</td>
        <td class="num"><span dir="ltr">${fmtDate(i.date)}</span></td>
        <td><bdi>${esc(i.customerName)}</bdi></td>
        <td class="num"><span dir="ltr">${esc(i.customerPhone)}</span></td>
        <td class="text-end num">${int(i.items.reduce((s, it) => s + it.qty, 0))}</td>
        <td class="text-end fw-semibold">${money(i.total)}</td>
      </tr>`).join('')}</tbody>
      <tfoot><tr class="table-light"><td colspan="5">${esc(t('shown', { n: int(list.length) }))}</td><td class="text-end fw-bold">${money(sum)}</td></tr></tfoot>
    </table></div>`;
    $$('#i-table tbody tr').forEach(r => r.onclick = () => { location.hash = '#/invoice/' + r.dataset.id; });
  };
  $('#i-search').oninput = e => { q = e.target.value; draw(); };
  draw();
}

// Builds the printable invoice. Used by the invoice page and the settings preview.
function invoiceHtml(inv, s) {
  const align = ['start', 'center', 'end'].includes(s.logoAlign) ? s.logoAlign : 'center';
  const showName = s.showStoreName && s.storeName;
  const headText = (showName ? `<div class="inv-store"><bdi>${esc(s.storeName)}</bdi></div>` : '') +
    (s.header ? `<div class="prewrap">${rich(s.header)}</div>` : '');
  const logo = s.logo ? `<img src="${imgUrl(s.logo)}" alt="" style="height:${Number(s.logoSize) || 80}px">` : '';
  const pieces = inv.items.reduce((sum, it) => sum + it.qty, 0);
  const style = `--accent:${safeColor(s.accentColor, '#714b67')};--row:${safeColor(s.rowColor, '#f3edf2')}`;
  return `<div class="invoice paper-${s.paper === 'receipt' ? 'receipt' : 'a4'}" style="${style}">
    ${logo || headText ? `<div class="inv-head align-${align}">${logo}${headText ? `<div class="inv-head-text">${headText}</div>` : ''}</div>` : ''}
    <div class="inv-title"><bdi>${esc(s.invoiceTitle || t('invoice'))}</bdi></div>
    <div class="inv-meta">
      <div>${t('invoiceNo')}: <b class="num">${inv.number}</b></div>
      <div>${t('date')}: <b class="num" dir="ltr">${fmtDate(inv.date)}</b></div>
    </div>
    <div class="inv-cust">
      <div>${t('customer')}: <b><bdi>${esc(inv.customerName)}</bdi></b></div>
      ${inv.customerPhone ? `<div>${t('phone')}: <b dir="ltr" class="num">${esc(inv.customerPhone)}</b></div>` : ''}
      ${inv.customerAddress ? `<div>${t('address')}: <span class="prewrap">${rich(inv.customerAddress)}</span></div>` : ''}
    </div>
    <table class="inv-table">
      <thead><tr><th>#</th><th>${t('product')}</th><th class="r">${t('price')}</th><th class="r">${t('qty')}</th><th class="r">${t('total')}</th></tr></thead>
      <tbody>${inv.items.map((it, i) => `<tr>
        <td class="num">${i + 1}</td>
        <td><bdi>${esc(it.name)}</bdi></td>
        <td class="r num">${int(it.price)}</td>
        <td class="r num">${int(it.qty)}</td>
        <td class="r num">${int(it.total)}</td>
      </tr>`).join('')}</tbody>
      <tfoot><tr class="inv-total">
        <td colspan="3">${t('total')}</td>
        <td class="r num">${int(pieces)}</td>
        <td class="r">${money(inv.total)}</td>
      </tr></tfoot>
    </table>
    ${s.showPaid ? `<div class="inv-paid-row"><span class="inv-paid">${t('paid')}</span></div>` : ''}
    ${s.footer ? `<div class="inv-foot">${rich(s.footer)}</div>` : ''}
  </div>`;
}

// Only a plain #rrggbb value goes into the page, never anything else.
function safeColor(v, fallback) { return /^#[0-9a-fA-F]{6}$/.test(v || '') ? v : fallback; }

function pageCss(s) {
  return s.paper === 'receipt'
    ? '@page { size: 80mm auto; margin: 3mm; }'
    : '@page { size: A4; margin: 12mm; }';
}

function renderInvoice(id) {
  const inv = state.db.invoices.find(i => i.id === id);
  if (!inv) {
    $('#app').innerHTML = `${topbar(t('invoice'))}<div class="page text-center text-secondary p-5">${t('invoiceGone')}</div>`;
    return;
  }
  const s = state.db.settings;
  $('#page-style').textContent = pageCss(s);
  $('#app').innerHTML = `
    ${topbar(t('invoice') + ' #' + inv.number)}
    <div class="page">
      <div class="d-flex gap-2 mb-3 no-print">
        <a class="btn btn-outline-secondary" href="#/invoices"><i class="bi bi-arrow-${lang() === 'ar' ? 'right' : 'left'}"></i> ${t('invoices')}</a>
        <a class="btn btn-outline-secondary" href="#/pos"><i class="bi bi-cart-plus"></i> ${t('pos')}</a>
        <button class="btn btn-outline-danger ms-auto" id="inv-del"><i class="bi bi-trash"></i> ${t('delete')}</button>
        <button class="btn btn-brand" id="inv-print"><i class="bi bi-printer"></i> ${t('print')}</button>
      </div>
      ${invoiceHtml(inv, s)}
    </div>`;
  $('#inv-print').onclick = () => window.print();
  $('#inv-del').onclick = () => {
    const box = openModal(`
      <div class="modal-header"><h5 class="modal-title">${t('deleteInvoice')}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <p class="fs-5">${esc(t('deleteInvoiceQ', { n: inv.number }))}</p>
        <div class="d-grid gap-2">
          <button class="btn btn-danger" data-restock="1"><i class="bi bi-arrow-counterclockwise"></i> ${t('deleteRestock')}</button>
          <button class="btn btn-outline-danger" data-restock="0"><i class="bi bi-trash"></i> ${t('deleteOnly')}</button>
          <button class="btn btn-secondary" data-bs-dismiss="modal">${t('cancel')}</button>
        </div>
      </div>`);
    $$('[data-restock]', box).forEach(b => b.onclick = async () => {
      try {
        await api('DELETE', `/api/invoices/${encodeURIComponent(inv.id)}?restock=${b.dataset.restock}`);
        closeModal(); toast(t('deleted')); location.hash = '#/invoices';
      } catch (err) { toast(err.message, true); }
    });
  };
}

/* ---------------- reports ---------------- */

function renderReports() {
  const { invoices, products } = state.db;
  const now = new Date();
  const sumOf = list => ({ count: list.length, total: list.reduce((s, i) => s + i.total, 0) });
  const today = sumOf(invoices.filter(i => isSameDay(new Date(i.date), now)));
  const month = sumOf(invoices.filter(i => { const d = new Date(i.date); return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth(); }));
  const all = sumOf(invoices);
  const stockValue = products.reduce((s, p) => s + p.price * p.stock, 0);
  const stockPieces = products.reduce((s, p) => s + p.stock, 0);
  const low = products.filter(p => p.stock <= lowLimit()).sort((a, b) => a.stock - b.stock);

  // Best sellers, grouped by product. The name shown is the current one
  // when the product still exists, otherwise the name on the last invoice.
  const sold = {};
  for (const inv of invoices) for (const it of inv.items) {
    const r = sold[it.productId] || (sold[it.productId] = { name: it.name, qty: 0, total: 0 });
    r.qty += it.qty; r.total += it.total; r.name = it.name;
  }
  const top = Object.entries(sold)
    .map(([id, r]) => ({ ...r, name: (productById(id) || r).name }))
    .sort((a, b) => b.qty - a.qty || b.total - a.total)
    .slice(0, 10);

  const card = (icon, title, value, sub) => `<div class="col-sm-6 col-lg-3"><div class="bg-white rounded shadow-sm p-3 h-100">
    <div class="text-secondary"><i class="bi ${icon}"></i> ${esc(title)}</div>
    <div class="fs-4 fw-bold my-1">${value}</div><div class="small text-secondary">${esc(sub)}</div></div></div>`;

  $('#app').innerHTML = `
    ${topbar(t('reports'))}
    <div class="page">
      <div class="row g-3 mb-4">
        ${card('bi-calendar-day', t('today'), money(today.total), t('salesCount', { n: int(today.count) }))}
        ${card('bi-calendar-month', t('thisMonth'), money(month.total), t('salesCount', { n: int(month.count) }))}
        ${card('bi-graph-up', t('allTime'), money(all.total), t('salesCount', { n: int(all.count) }))}
        ${card('bi-box-seam', t('stockValue'), money(stockValue), t('stockPieces', { n: int(stockPieces) }))}
      </div>
      <div class="row g-3">
        <div class="col-lg-6"><div class="bg-white rounded shadow-sm p-3 h-100">
          <h6><i class="bi bi-trophy"></i> ${t('topProducts')}</h6>
          ${top.length ? `<table class="table table-sm m-0"><thead><tr><th>${t('product')}</th><th class="text-end">${t('soldQty')}</th><th class="text-end">${t('revenue')}</th></tr></thead>
            <tbody>${top.map(r => `<tr><td><bdi>${esc(r.name)}</bdi></td><td class="text-end num">${int(r.qty)}</td><td class="text-end">${money(r.total)}</td></tr>`).join('')}</tbody></table>`
            : `<div class="text-secondary">${t('nothing')}</div>`}
        </div></div>
        <div class="col-lg-6"><div class="bg-white rounded shadow-sm p-3 h-100">
          <h6><i class="bi bi-exclamation-triangle text-warning"></i> ${t('lowStockList')} (≤ ${int(lowLimit())})</h6>
          ${low.length ? `<table class="table table-sm m-0"><tbody>${low.map(p => `<tr><td><bdi>${esc(p.name)}</bdi></td><td class="text-end">${stockBadge(p)}</td></tr>`).join('')}</tbody></table>`
            : `<div class="text-secondary">${t('nothing')}</div>`}
        </div></div>
      </div>
    </div>`;
}

/* ---------------- settings ---------------- */

function renderSettings() {
  const saved = JSON.stringify(state.db.settings);
  const d = JSON.parse(saved); // draft
  const opt = (v, label, cur) => `<option value="${v}"${v === cur ? ' selected' : ''}>${esc(label)}</option>`;
  $('#app').innerHTML = `
    ${topbar(t('settings'))}
    <div class="page">
      <div class="row g-4">
        <div class="col-lg-5">
          <form id="sf" class="bg-white rounded shadow-sm p-3" novalidate>
            <h5 class="mb-3">${t('general')}</h5>
            <div class="mb-3"><label class="form-label">${t('language')}</label>
              <select class="form-select" name="language">${opt('en', 'English', d.language)}${opt('ar', 'العربية', d.language)}</select></div>
            <div class="mb-3"><label class="form-label">${t('storeName')}</label>
              <input class="form-control" name="storeName" maxlength="200" dir="auto" value="${esc(d.storeName)}"></div>
            <div class="mb-3"><label class="form-label">${t('lowStockAt')}</label>
              <input class="form-control" name="lowStock" inputmode="numeric" dir="ltr" value="${int(d.lowStock)}"></div>

            <h5 class="mt-4 mb-3">${t('logo')}</h5>
            <div class="d-flex gap-2 mb-3 align-items-center">
              <label class="btn btn-outline-secondary"><i class="bi bi-upload"></i> ${t('uploadLogo')}
                <input type="file" accept="image/*" hidden id="sf-logo"></label>
              <button type="button" class="btn btn-outline-danger" id="sf-logo-del"><i class="bi bi-x-lg"></i> ${t('removeLogo')}</button>
              <span class="spinner-border spinner-border-sm d-none" id="sf-spin"></span>
            </div>
            <div class="mb-3"><label class="form-label">${t('logoSize')}: <span id="sf-size-v" class="num">${d.logoSize}</span> px</label>
              <input type="range" class="form-range" name="logoSize" min="20" max="300" step="5" value="${d.logoSize}"></div>
            <div class="mb-3"><label class="form-label">${t('logoAlign')}</label>
              <select class="form-select" name="logoAlign">${opt('start', t('alignStart'), d.logoAlign)}${opt('center', t('alignCenter'), d.logoAlign)}${opt('end', t('alignEnd'), d.logoAlign)}</select></div>

            <h5 class="mt-4 mb-3">${t('invoiceDesign')}</h5>
            <div class="form-check mb-3"><input class="form-check-input" type="checkbox" name="showStoreName" id="sf-show"${d.showStoreName ? ' checked' : ''}>
              <label class="form-check-label" for="sf-show">${t('showStoreName')}</label></div>
            <div class="form-check mb-3"><input class="form-check-input" type="checkbox" name="showPaid" id="sf-paid"${d.showPaid ? ' checked' : ''}>
              <label class="form-check-label" for="sf-paid">${t('showPaid')}</label></div>
            <div class="row g-3 mb-3">
              <div class="col-6"><label class="form-label">${t('accentColor')}</label>
                <input type="color" class="form-control form-control-color w-100" name="accentColor" value="${esc(d.accentColor)}"></div>
              <div class="col-6"><label class="form-label">${t('rowColor')}</label>
                <input type="color" class="form-control form-control-color w-100" name="rowColor" value="${esc(d.rowColor)}"></div>
            </div>
            <div class="mb-3"><label class="form-label">${t('invoiceTitle')}</label>
              <input class="form-control" name="invoiceTitle" maxlength="100" dir="auto" placeholder="${esc(t('invoiceTitlePh'))}" value="${esc(d.invoiceTitle)}"></div>
            <div class="mb-3"><label class="form-label">${t('header')}</label>
              <textarea class="form-control" name="header" rows="3" dir="auto" placeholder="${esc(t('headerPh'))}">${esc(d.header)}</textarea></div>
            <div class="mb-3"><label class="form-label">${t('footer')}</label>
              <textarea class="form-control" name="footer" rows="3" dir="auto" placeholder="${esc(t('footerPh'))}">${esc(d.footer)}</textarea></div>
            <div class="mb-3"><label class="form-label">${t('paper')}</label>
              <select class="form-select" name="paper">${opt('a4', t('paperA4'), d.paper)}${opt('receipt', t('paperReceipt'), d.paper)}</select></div>

            <button class="btn btn-brand btn-lg w-100" id="sf-save"><i class="bi bi-check-lg"></i> ${t('save')}</button>

            <div class="mt-4 small text-secondary">
              <div class="fw-semibold"><i class="bi bi-folder2-open"></i> ${t('dataFolder')}</div>
              <div dir="ltr" class="text-start text-break"><code>${esc(state.dataDir)}</code></div>
              <div>${t('dataNote')}</div>
            </div>
          </form>
        </div>
        <div class="col-lg-7">
          <h5>${t('preview')}</h5>
          <div id="sf-preview"></div>
        </div>
      </div>
    </div>`;

  const f = $('#sf');
  const sample = {
    number: state.db.nextInvoice, date: new Date().toISOString(),
    customerName: t('sampleCustomer'), customerPhone: '0770 000 0000', customerAddress: lang() === 'ar' ? 'بغداد' : 'Baghdad',
    items: [
      { name: t('sampleProduct') + ' 1', price: 25000, qty: 2, total: 50000 },
      { name: t('sampleProduct') + ' 2', price: 7500, qty: 3, total: 22500 },
      { name: t('sampleProduct') + ' 3', price: 12000, qty: 1, total: 12000 },
    ],
    total: 84500, // 50,000 + 22,500 + 12,000
  };
  const preview = () => { $('#sf-preview').innerHTML = invoiceHtml(sample, d); };
  const read = () => {
    d.language = f.language.value;
    d.storeName = f.storeName.value;
    const low = parseWhole(f.lowStock.value);
    d.lowStock = isNaN(low) ? 0 : low;
    d.logoSize = Number(f.logoSize.value);
    d.logoAlign = f.logoAlign.value;
    d.showStoreName = f.showStoreName.checked;
    d.invoiceTitle = f.invoiceTitle.value;
    d.header = f.header.value;
    d.footer = f.footer.value;
    d.paper = f.paper.value;
    d.showPaid = f.showPaid.checked;
    d.accentColor = f.accentColor.value;
    d.rowColor = f.rowColor.value;
    $('#sf-size-v').textContent = d.logoSize;
    preview();
  };
  f.oninput = read;
  f.onchange = read;
  f.onsubmit = async e => {
    e.preventDefault();
    read();
    try {
      await api('PUT', '/api/settings', d);
      leaveGuard = null;
      applyLang(); toast(t('saved')); route();
    } catch (err) { toast(err.message, true); }
  };
  $('#sf-logo').onchange = async e => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    $('#sf-spin').classList.remove('d-none');
    try { d.logo = await uploadImage(file, 600, 'image/png'); preview(); }
    catch (err) { toast(err.message, true); }
    $('#sf-spin').classList.add('d-none');
  };
  $('#sf-logo-del').onclick = () => { d.logo = ''; preview(); };

  leaveGuard = () => JSON.stringify(d) === saved || confirm(t('unsaved'));
  preview();
}

/* ---------------- start ---------------- */

(async function start() {
  try {
    await api('GET', '/api/data');
  } catch (e) {
    $('#app').innerHTML = `<div class="p-5 text-center text-danger">${esc(e.message)}</div>`;
    return;
  }
  applyLang();
  route();
})();
