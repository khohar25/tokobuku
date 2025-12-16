/* =====================================================
   INIT
   ===================================================== */
updateCartIcon();
showMainCategories();

/* =====================================================
   HOME (SEMUA PRODUK)
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
   PRODUCT CARD (CLICKABLE)
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
   POPUP DETAIL PRODUK
   ===================================================== */
function openProductPopup(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    closeProductPopup(); // pastikan tidak dobel

    const modal = document.createElement("div");
    modal.id = "productModal";
    modal.style = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.6);
        z-index:99999;
        display:flex;
        justify-content:center;
        align-items:center;
        padding:20px;
    `;

    modal.innerHTML = `
        <div style="
            background:#fff;
            max-width:420px;
            width:100%;
            border-radius:16px;
            padding:20px;
            position:relative;
        ">
            <span onclick="closeProductPopup()"
                  style="position:absolute;top:12px;right:14px;
                         cursor:pointer;font-size:18px;">✕</span>

            <img src="${p.img}" style="
                width:100%;
                height:220px;
                object-fit:contain;
                margin-bottom:12px;
            ">

            <h3 style="margin-bottom:6px">${p.title}</h3>
            <p style="font-size:.85rem;color:#666;margin-bottom:10px">
                ${p.description}
            </p>

            <ul style="font-size:.85rem;line-height:1.6;margin-bottom:12px">
                <li><b>Penulis:</b> ${p.author}</li>
                <li><b>Penerbit:</b> ${p.publisher}</li>
                <li><b>Jumlah Halaman:</b> ${p.pages}</li>
            </ul>

            <div style="font-weight:bold;color:var(--shopee);margin-bottom:12px">
                Rp ${p.price.toLocaleString("id-ID")}
            </div>

            <div style="display:flex;gap:10px">
                <a href="${p.links.shopee}" target="_blank"
                   style="
                     flex:1;
                     text-align:center;
                     background:var(--shopee);
                     color:#fff;
                     padding:10px;
                     border-radius:10px;
                     text-decoration:none;
                     font-size:.85rem;
                   ">
                   Beli Sekarang
                </a>

                <button onclick="saveProduct(${p.id})"
                        style="
                          width:44px;
                          border:none;
                          border-radius:10px;
                          background:#e5e7eb;
                          cursor:pointer;
                        ">
                        ⭐
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

/* =====================================================
   CLOSE POPUP
   ===================================================== */
function closeProductPopup() {
    const modal = document.getElementById("productModal");
    if (modal) modal.remove();
}

/* =====================================================
   SAVE PRODUK (LOCAL STORAGE)
   ===================================================== */
function saveProduct(id) {
    let saved = JSON.parse(localStorage.getItem("savedProducts")) || [];

    if (!saved.includes(id)) {
        saved.push(id);
        localStorage.setItem("savedProducts", JSON.stringify(saved));
        alert("Produk disimpan ⭐");
        updateCartIcon();
    } else {
        alert("Produk sudah disimpan");
    }
}

function updateCartIcon() {
    const saved = JSON.parse(localStorage.getItem("savedProducts")) || [];
    const el = document.getElementById("cartCount");
    if (el) el.innerText = saved.length;
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

function renderGrid(list, title) {
    if (list.length === 0) {
        document.getElementById("contentArea").innerHTML =
            `<p style="color:#777">Produk tidak ditemukan</p>`;
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
   CHATBOT (TIDAK DIUBAH)
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
            Aku bisa bantu rekomendasi buku 📚
        </div>
    `;

    body.scrollTop = body.scrollHeight;
}
