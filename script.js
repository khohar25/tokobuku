/* =====================================================
   INIT
===================================================== */
updateCartIcon();
showMainCategories();
injectQuickReplies();

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
}

/* =====================================================
   HOME – SEMUA PRODUK
===================================================== */
function showMainCategories() {
    let html = `<h2>📚 Semua Buku</h2><div class="grid-container">`;
    products.forEach(p => html += renderProductCard(p));
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
            <img src="${p.img}">
            <div class="product-title">${p.title}</div>
            <div class="product-price">
                Rp ${p.price.toLocaleString("id-ID")}
            </div>
        </div>
    `;
}

/* =====================================================
   TRACK USER INTEREST
===================================================== */
function trackInterest(p) {
    let interest = JSON.parse(localStorage.getItem("userInterest")) || {};
    (p.keywords || []).forEach(k => {
        interest[k] = (interest[k] || 0) + 1;
    });
    localStorage.setItem("userInterest", JSON.stringify(interest));
}

/* =====================================================
   PRODUCT POPUP (MOBILE FULLSCREEN)
===================================================== */
function openProductPopup(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;

    trackInterest(p);
    closeProductPopup();

    const isMobile = window.innerWidth <= 768;

    const modal = document.createElement("div");
    modal.id = "productModal";
    modal.style = `
        position:fixed;inset:0;
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
            padding:20px;
            overflow-y:auto;
        ">
            <span onclick="closeProductPopup()">← Kembali</span>

            <img src="${p.img}" style="width:100%;height:260px;object-fit:contain;margin:16px 0">

            <h2>${p.title}</h2>
            <p>${p.description}</p>

            <div>
                <div><b>Penulis:</b> ${p.author}</div>
                <div><b>Penerbit:</b> ${p.publisher}</div>
                <div><b>Halaman:</b> ${p.pages}</div>
            </div>

            <div style="font-weight:bold;margin:12px 0">
                Rp ${p.price.toLocaleString("id-ID")}
            </div>

            <div style="display:flex;gap:10px">
                <a href="${p.links.shopee}" target="_blank"
                   style="flex:1;background:#f97316;color:#fff;padding:12px;text-align:center">
                   Beli Sekarang
                </a>
                <button onclick="saveProduct(${p.id})">⭐</button>
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
   SAVE / WISHLIST
===================================================== */
function saveProduct(id) {
    let saved = JSON.parse(localStorage.getItem("savedProducts")) || [];
    if (!saved.includes(id)) {
        saved.push(id);
        localStorage.setItem("savedProducts", JSON.stringify(saved));
        updateCartIcon();
        alert("Produk disimpan ⭐");
    }
}

function updateCartIcon() {
    const saved = JSON.parse(localStorage.getItem("savedProducts")) || [];
    const el = document.getElementById("cartCount");
    if (el) el.innerText = saved.length;
}

/* =====================================================
   WISHLIST PAGE
===================================================== */
function showWishlist() {
    const savedIds = JSON.parse(localStorage.getItem("savedProducts")) || [];
    const list = products.filter(p => savedIds.includes(p.id));

    if (!list.length) {
        document.getElementById("contentArea").innerHTML = "<p>Wishlist kosong</p>";
        return;
    }

    let html = `<h2>⭐ Wishlist</h2><div class="grid-container">`;
    list.forEach(p => html += renderProductCard(p));
    html += `
        </div>
        <button onclick="exportWishlistToWA()">Share WhatsApp</button>
        <button onclick="exportWishlistPDF()">Export PDF</button>
    `;
    document.getElementById("contentArea").innerHTML = html;
}

/* =====================================================
   EXPORT WISHLIST
===================================================== */
function exportWishlistToWA() {
    const savedIds = JSON.parse(localStorage.getItem("savedProducts")) || [];
    const list = products.filter(p => savedIds.includes(p.id));
    let text = "📚 Wishlist Buku Saya:\n\n";
    list.forEach((b,i)=>{
        text += `${i+1}. ${b.title}\nRp ${b.price}\n\n`;
    });
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
}

function exportWishlistPDF() {
    const savedIds = JSON.parse(localStorage.getItem("savedProducts")) || [];
    const list = products.filter(p => savedIds.includes(p.id));
    let html = "<h1>Wishlist Buku</h1>";
    list.forEach(b=>{
        html += `<p><b>${b.title}</b><br>Rp ${b.price}</p>`;
    });
    const w = window.open("", "_blank");
    w.document.write(html);
    w.print();
}

/* =====================================================
   EMBEDDING OFFLINE (SIMILARITY)
===================================================== */
function similarityScore(input, keywords) {
    let score = 0;
    keywords.forEach(k => {
        if (input.includes(k)) score += 2;
    });
    return score;
}

/* =====================================================
   CHATBOT QUICK REPLY
===================================================== */
function injectQuickReplies() {
    const body = document.getElementById("chatBody");
    if (!body) return;
    body.innerHTML += `
        <div class="bot-msg">
            Pilih cepat:
            <div>
                <button onclick="quickChat('rekomendasi')">🎯 Rekomendasi</button>
                <button onclick="quickChat('wishlist')">⭐ Wishlist</button>
                <button onclick="quickChat('motivasi')">Motivasi</button>
                <button onclick="quickChat('novel')">Novel</button>
            </div>
        </div>
    `;
}

function quickChat(text) {
    document.getElementById("chatInput").value = text;
    handleUserChat();
}

/* =====================================================
   CHATBOT INTENT ENGINE
===================================================== */
function handleUserChat() {
    const input = document.getElementById("chatInput");
    const text = input.value.toLowerCase();
    if (!text) return;

    const body = document.getElementById("chatBody");
    body.innerHTML += `<div class="user-msg">${input.value}</div>`;
    input.value = "";

    const savedIds = JSON.parse(localStorage.getItem("savedProducts")) || [];
    const wishlist = products.filter(p => savedIds.includes(p.id));
    const interest = JSON.parse(localStorage.getItem("userInterest")) || {};

    let response = "";

    if (text.includes("wishlist")) {
        response = wishlist.length
            ? wishlist.map(b=>"• "+b.title).join("<br>")
            : "Wishlist kamu kosong";
    }
    else if (text.includes("rekomendasi")) {
        const topKey = Object.keys(interest).sort((a,b)=>interest[b]-interest[a])[0];
        const rec = products.filter(p =>
            p.keywords?.includes(topKey) && !savedIds.includes(p.id)
        ).slice(0,3);
        response = rec.length
            ? rec.map(b=>"• "+b.title).join("<br>")
            : "Belum cukup data minatmu";
    }
    else {
        const rec = products.filter(p =>
            p.keywords?.some(k => text.includes(k))
        ).slice(0,3);
        response = rec.length
            ? rec.map(b=>"• "+b.title).join("<br>")
            : "Coba kata lain 😊";
    }

    body.innerHTML += `<div class="bot-msg">${response}</div>`;
    body.scrollTop = body.scrollHeight;
}

/* =====================================================
   ADMIN DASHBOARD
===================================================== */
function showAdminDashboard() {
    const interest = JSON.parse(localStorage.getItem("userInterest")) || {};
    let html = "<h2>📊 Minat User</h2><ul>";
    Object.entries(interest)
        .sort((a,b)=>b[1]-a[1])
        .forEach(([k,v])=>{
            html += `<li>${k} : ${v} klik</li>`;
        });
    html += "</ul>";
    document.getElementById("contentArea").innerHTML = html;
}

/* =====================================================
   CHAT TOGGLE
===================================================== */
function toggleChat() {
    const c = document.getElementById("chatbot");
    c.style.display = c.style.display === "flex" ? "none" : "flex";
}
