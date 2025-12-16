/* ================= INIT ================= */
updateCartIcon();
showMainCategories();

/* ================= HOMEPAGE ================= */
function showMainCategories() {
    const today = new Date();
    const dayName = today.toLocaleDateString("id-ID", { weekday: "long" });

    let html = `
        <h2 style="margin-bottom:20px;color:var(--primary)">
            📚 Rekomendasi Buku
        </h2>

        <div class="grid-container" style="margin-bottom:40px">
    `;

    for (let key in categories) {
        html += `
            <div class="cat-card" onclick="showCategory('${key}')">
                <i class="fas ${categories[key].icon}"></i>
                <h3>${categories[key].label}</h3>
            </div>
        `;
    }

    html += `</div>`;

    // === PRODUK HIGHLIGHT (LOGIKA ASLI TETAP) ===
    const highlight = products.filter(
        p => p.status === 'bestseller' || p.status === 'flashsale'
    );

    if (highlight.length > 0) {
        html += `
            <div class="grid-container">
        `;

        highlight.forEach(b => {
            html += renderProductCard(b);
        });

        html += `</div>`;
    }

    document.getElementById("breadcrumb").style.display = "none";
    document.getElementById("contentArea").innerHTML = html;
}

/* ================= CATEGORY ================= */
function showCategory(cat) {
    const filtered = products.filter(p => p.main === cat);

    document.getElementById("breadcrumb").style.display = "block";
    document.getElementById("breadcrumb").innerHTML =
        `<span onclick="showMainCategories()" style="cursor:pointer">Beranda</span> / ${categories[cat].label}`;

    renderGrid(filtered, categories[cat].label);
}

/* ================= GRID ================= */
function renderGrid(list, title) {
    if (list.length === 0) {
        document.getElementById("contentArea").innerHTML =
            `<p>Produk belum tersedia</p>`;
        return;
    }

    let html = `<h2>${title}</h2><div class="grid-container">`;

    list.forEach(b => {
        html += renderProductCard(b);
    });

    html += `</div>`;
    document.getElementById("contentArea").innerHTML = html;
}

/* ================= PRODUCT CARD ================= */
function renderProductCard(b) {
    return `
        <div class="product-card">
            <img src="${b.img}" alt="${b.title}">
            <h3>${b.title}</h3>
            <p>Rp ${b.price.toLocaleString("id-ID")}</p>
            <a href="${b.links.shopee}" target="_blank">Beli di Shopee</a>
        </div>
    `;
}

/* ================= SEARCH ================= */
function handleHeaderSearch(e) {
    if (e.key === "Enter") executeSearch();
}

function executeSearch() {
    const q = document.getElementById("globalSearch").value.toLowerCase();
    const result = products.filter(p =>
        p.title.toLowerCase().includes(q)
    );
    renderGrid(result, "Hasil Pencarian");
}

/* ================= CART ================= */
let cart = [];

function updateCartIcon() {
    document.getElementById("cartCount").innerText = cart.length;
}

function toggleCart() {
    alert("Fitur simpan belum diaktifkan");
}

/* ================= CHATBOT ================= */
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
            Fitur rekomendasi akan segera aktif.
        </div>
    `;
    body.scrollTop = body.scrollHeight;
}
