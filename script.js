/* =====================================================
   INIT
   ===================================================== */
updateCartIcon();
showMainCategories();

/* =====================================================
   HOME – SEMUA PRODUK
   ===================================================== */
function showMainCategories() {
    let html = `
        <h2 style="margin-bottom:20px;color:var(--primary)">
            📚 Semua Buku
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
   PRODUCT CARD
   ===================================================== */
function renderProductCard(p) {
    return `
        <div class="product-card" onclick="openProductPopup(${p.id})">
            <img src="${p.img}" alt="${p.title}">
            <div class="product-title">${p.title}</div>
            <div class="product-price">
                Rp ${p.price.toLocaleString("id-ID")}
            </div>
        </div>
    `;
}

/* =====================================================
   POP-UP DETAIL (MOBILE FULLSCREEN)
   ===================================================== */
function openProductPopup(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    closeProductPopup();
    const isMobile = window.innerWidth <= 768;

    const modal = document.createElement("div");
    modal.id = "productModal";
    modal.style = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.6);
        z-index:99999;
        display:flex;
        justify-content:center;
        align-items:${isMobile ? "stretch" : "center"};
    `;

    modal.innerHTML = `
        <div style="
            background:#fff;
            width:100%;
            max-width:${isMobile ? "100%" : "420px"};
            height:${isMobile ? "100%" : "auto"};
            border-radius:${isMobile ? "0" : "16px"};
            padding:20px;
            overflow-y:auto;
            position:relative;
        ">
            <div style="position:sticky;top:0;background:#fff;padding-bottom:10px">
                <span onclick="closeProductPopup()" style="cursor:pointer">← Kembali</span>
            </div>

            <img src="${p.img}" style="width:100%;height:260px;object-fit:contain;margin:16px 0">

            <h2>${p.title}</h2>
            <p style="font-size:.9rem;color:#555">${p.description}</p>

            <div style="font-size:.9rem;line-height:1.7;margin:14px 0">
                <div><b>Penulis:</b> ${p.author}</div>
                <div><b>Penerbit:</b> ${p.publisher}</div>
                <div><b>Jumlah Halaman:</b> ${p.pages}</div>
            </div>

            <div style="font-weight:bold;color:var(--shopee);font-size:1.1rem">
                Rp ${p.price.toLocaleString("id-ID")}
            </div>

            <div style="
                position:${isMobile ? "fixed" : "static"};
                bottom:0;left:0;width:100%;
                background:#fff;padding:16px;
                display:flex;gap:12px
            ">
                <a href="${p.links.shopee}" target="_blank"
                   style="flex:1;text-align:center;background:var(--shopee);
                          color:#fff;padding:14px;border-radius:12px;text-decoration:none">
                   Beli Sekarang
                </a>

                <button onclick="saveProduct(${p.id})"
                        style="width:52px;border:none;border-radius:12px;
                               background:#f1f5f9;font-size:20px">
                    ⭐
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function closeProductPopup() {
    const m = document.getElementById("productModal");
    if (m) m.remove();
}

/* =====================================================
   SAVE & WISHLIST
   ===================================================== */
function saveProduct(id) {
    let saved = JSON.parse(localStorage.getItem("savedProducts")) || [];

    if (!saved.includes(id)) {
        saved.push(id);
        localStorage.setItem("savedProducts", JSON.stringify(saved));
        updateCartIcon();
        alert("Produk disimpan ⭐");
    } else {
        alert("Produk sudah ada di Wishlist");
    }
}

function removeSavedProduct(id) {
    let saved = JSON.parse(localStorage.getItem("savedProducts")) || [];
    saved = saved.filter(x => x !== id);
    localStorage.setItem("savedProducts", JSON.stringify(saved));
    updateCartIcon();
    showWishlist();
}

function updateCartIcon() {
    const saved = JSON.parse(localStorage.getItem("savedProducts")) || [];
    const el = document.getElementById("cartCount");
    if (el) el.innerText = saved.length;
}

/* =====================================================
   HALAMAN WISHLIST
   ===================================================== */
function showWishlist() {
    const savedIds = JSON.parse(localStorage.getItem("savedProducts")) || [];
    const list = products.filter(p => savedIds.includes(p.id));

    document.getElementById("breadcrumb").style.display = "block";
    document.getElementById("breadcrumb").innerHTML =
        `<span onclick="showMainCategories()" style="cursor:pointer">Beranda</span> / Wishlist`;

    if (list.length === 0) {
        document.getElementById("contentArea").innerHTML =
            `<p style="color:#777">Wishlist masih kosong</p>`;
        return;
    }

    let html = `<h2>⭐ Wishlist</h2><div class="grid-container">`;

    list.forEach(p => {
        html += `
            <div class="product-card">
                <img src="${p.img}" onclick="openProductPopup(${p.id})">
                <div class="product-title">${p.title}</div>
                <div class="product-price">
                    Rp ${p.price.toLocaleString("id-ID")}
                </div>
                <button onclick="removeSavedProduct(${p.id})"
                        style="margin-top:8px;width:100%;
                               border:none;padding:8px;
                               border-radius:8px;background:#fee2e2;
                               color:#991b1b;cursor:pointer">
                    Hapus
                </button>
            </div>
        `;
    });

    html += `</div>`;
    document.getElementById("contentArea").innerHTML = html;
}

/* =====================================================
   SEARCH
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

function renderGrid(list, title) {
    if (list.length === 0) {
        document.getElementById("contentArea").innerHTML =
            `<p style="color:#777">Produk tidak ditemukan</p>`;
        return;
    }

    let html = `<h2>${title}</h2><div class="grid-container">`;
    list.forEach(p => html += renderProductCard(p));
    html += `</div>`;

    document.getElementById("contentArea").innerHTML = html;
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

    body.innerHTML += `<div class="bot-msg">Aku bisa bantu rekomendasi buku 📚</div>`;
    body.scrollTop = body.scrollHeight;
}
