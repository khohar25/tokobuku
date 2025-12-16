/* =====================================================
   INIT
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
    updateCartIcon();
    renderHome();
});

/* =====================================================
   HOME RENDER (KATEGORI + PRODUK)
   ===================================================== */
function renderHome() {
    let html = `
        <h2 style="margin-bottom:20px;color:var(--primary)">
            📚 Jelajahi Kategori Buku
        </h2>

        <div class="grid-container" style="margin-bottom:40px">
    `;

    // === KATEGORI ===
    for (let key in categories) {
        html += `
            <div class="cat-card" onclick="showCategory('${key}')">
                <i class="fas ${categories[key].icon}"></i>
                <h3>${categories[key].label}</h3>
            </div>
        `;
    }

    html += `</div>`;

    // === PRODUK ===
    html += `
        <h2 style="margin-bottom:20px;color:var(--primary)">
            📦 Koleksi Buku
        </h2>

        <div class="grid-container">
    `;

    products.forEach(p => {
        html += productCard(p);
    });

    html += `</div>`;

    document.getElementById("breadcrumb").style.display = "none";
    document.getElementById("contentArea").innerHTML = html;
}

/* =====================================================
   KATEGORI
   ===================================================== */
function showCategory(cat) {
    const filtered = products.filter(p => p.main === cat);

    document.getElementById("breadcrumb").style.display = "block";
    document.getElementById("breadcrumb").innerHTML =
        `<span onclick="renderHome()" style="cursor:pointer">Beranda</span> / ${categories[cat].label}`;

    renderProducts(filtered, categories[cat].label);
}

/* =====================================================
   RENDER PRODUK
   ===================================================== */
function renderProducts(list, title) {
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
        html += productCard(p);
    });

    html += `</div>`;
    document.getElementById("contentArea").innerHTML = html;
}

/* =====================================================
   PRODUCT CARD TEMPLATE
   ===================================================== */
function productCard(p) {
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
    renderProducts(result, `Hasil pencarian: "${q}"`);
}

/* =====================================================
   CART (SIMPLE)
   ===================================================== */
let cart = [];

function updateCartIcon() {
    const el = document.getElementById("cartCount");
    if (el) el.innerText = cart.length;
}

function toggleCart() {
    alert("Fitur simpan akan diaktifkan");
}

/* =====================================================
   CHATBOT
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
            Rekomendasi buku segera aktif.
        </div>
    `;
    body.scrollTop = body.scrollHeight;
}
