/* =====================================================
   INIT
   ===================================================== */
updateCartIcon();
showMainCategories();

/* =====================================================
   HOME (KATEGORI + SEMUA PRODUK)
   ===================================================== */
function showMainCategories() {

    let html = `
        <h2 style="margin-bottom:20px;color:var(--primary)">
            📚 Kategori Buku
        </h2>

        <div class="grid-container" style="margin-bottom:40px">
    `;

    // === KATEGORI UTAMA ===
    for (let key in categories) {
        html += `
            <div class="cat-card" onclick="showCategory('${key}')">
                <i class="fas ${categories[key].icon}"></i>
                <h3>${categories[key].label}</h3>
            </div>
        `;
    }

    html += `</div>`;

    // === SEMUA PRODUK DI HOME ===
    html += `
        <h2 style="margin-bottom:20px;color:var(--primary)">
            📦 Semua Buku
        </h2>

        <div class="grid-container">
    `;

    products.forEach(p => {
        html += renderProductCard(p);
    });

    html += `</div>`;

    document.getElementById("breadcrumb").style.display = "none";
    document.getElementById("contentArea").innerHTML = html;
}

/* =====================================================
   KATEGORI → TAMPILKAN SUB-KATEGORI
   ===================================================== */
function showCategory(catKey) {

    const cat = categories[catKey];

    let html = `
        <h2 style="margin-bottom:20px">
            ${cat.label}
        </h2>

        <div class="grid-container">
    `;

    // === SUB-KATEGORI ===
    for (let subKey in cat.subs) {
        html += `
            <div class="cat-card"
                 onclick="showSubCategory('${catKey}','${subKey}')">
                <h3>${cat.subs[subKey]}</h3>
            </div>
        `;
    }

    html += `</div>`;

    document.getElementById("breadcrumb").style.display = "block";
    document.getElementById("breadcrumb").innerHTML =
        `<span style="cursor:pointer" onclick="showMainCategories()">Beranda</span> / ${cat.label}`;

    document.getElementById("contentArea").innerHTML = html;
}

/* =====================================================
   SUB-KATEGORI → TAMPILKAN PRODUK
   ===================================================== */
function showSubCategory(mainKey, subKey) {

    const filtered = products.filter(
        p => p.main === mainKey && p.sub === subKey
    );

    document.getElementById("breadcrumb").innerHTML =
        `<span style="cursor:pointer" onclick="showMainCategories()">Beranda</span> / 
         <span style="cursor:pointer" onclick="showCategory('${mainKey}')">
            ${categories[mainKey].label}
         </span> / 
         ${categories[mainKey].subs[subKey]}`;

    renderGrid(filtered, categories[mainKey].subs[subKey]);
}

/* =====================================================
   GRID PRODUK (TIDAK DIUBAH)
   ===================================================== */
function renderGrid(list, title) {

    if (list.length === 0) {
        document.getElementById("contentArea").innerHTML =
            `<p style="color:#777">Produk belum tersedia</p>`;
        return;
    }

    let html = `
        <h2 style="margin-bottom:20px">${title}</h2>
        <div class="grid-container">
    `;

    list.forEach(p => {
        html += renderProductCard(p);
    });

    html += `</div>`;

    document.getElementById("contentArea").innerHTML = html;
}

/* =====================================================
   PRODUCT CARD (TETAP)
   ===================================================== */
function renderProductCard(p) {
    return `
        <div class="product-card">
            <img src="${p.img}" alt="${p.title}">
            <div class="product-title">${p.title}</div>
            <div class="product-price">
                Rp ${p.price.toLocaleString("id-ID")}
            </div>
            <a href="${p.links.shopee}" target="_blank"
               style="
                   text-align:center;
                   background:var(--shopee);
                   color:#fff;
                   padding:8px;
                   border-radius:8px;
                   text-decoration:none;
                   font-size:.85rem;
               ">
               Beli di Shopee
            </a>
        </div>
    `;
}

/* =====================================================
   SEARCH (TETAP)
   ===================================================== */
function handleHeaderSearch(e) {
    if (e.key === "Enter") executeSearch();
}

function executeSearch() {
    const q = document.getElementById("globalSearch").value.toLowerCase();
    const result = products.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.keywords && p.keywords.some(k => q.includes(k)))
    );

    renderGrid(result, `Hasil pencarian: "${q}"`);
}

/* =====================================================
   CART (TETAP)
   ===================================================== */
let cart = [];

function updateCartIcon() {
    document.getElementById("cartCount").innerText = cart.length;
}

function toggleCart() {
    alert("Fitur simpan belum diaktifkan");
}

/* =====================================================
   CHATBOT (TETAP)
   ===================================================== */
function toggleChat() {
    const c = document.getElementById("chatbot");
    c.style.display = c.style.display === "flex" ? "none" : "flex";
}

function handleUserChat() {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return;

    const body = document.getElementById("chatBody");
    body.innerHTML += `<div class="user-msg">${text}</div>`;
    input.value = "";

    body.innerHTML += `
        <div class="bot-msg">
            Siap kak 👍<br>
            Aku bisa bantu cari buku berdasarkan genre 📚
        </div>
    `;

    body.scrollTop = body.scrollHeight;
}
