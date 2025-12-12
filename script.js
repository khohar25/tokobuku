// ==========================================
// FILE: script.js (FINAL - ANTI GESER)
// ==========================================

const flashSaleSchedule = [0, 6, 9, 12, 15, 18, 21]; 
let lastSearchResults = []; let lastShownIndex = 0; let chatMode = "normal";

// --- CHATBOT DATABASE ---
const conversationDb = {
    "halo": ["Halo juga Kak! 👋", "Hai! Cari buku apa di sini?", "Halo! Pena Mimin siap bantu."],
    "pagi": ["Pagi kak! Semangat cari ilmunya.", "Selamat pagi! Awali hari dengan baca buku."],
    "siang": ["Siang kak! Jangan lupa makan siang.", "Siang! Enaknya ngadem sambil baca buku."],
    "malam": ["Malam kak! Belum tidur?", "Malam! Pena Mimin siap nemenin begadang."],
    "makasih": ["Sama-sama kak! 😊", "Siap! Happy shopping!"],
    "bego": ["Yah, jangan galak-galak dong kak... 😢", "Maaf kak, Pena Mimin masih belajar."],
    "siapa": ["Kenalin, aku Pena Mimin! Asisten pribadi kakak.", "Aku Pena Mimin, siap bantu carikan buku idaman kakak."],
    "promo": ["Cek bagian atas kak, selalu ada buku murah!", "Pantengin terus jam Flash Sale-nya ya!"]
};

const curhatMap = {
    "sedih": { keys: ["healing", "motivasi", "agama"], msg: "Cup cup... jangan sedih kak. 🤗 Baca ini biar tenang:" },
    "galau": { keys: ["romansa", "move on", "puisi"], msg: "Galau wajar kok. Yuk bangkit bareng buku ini:" },
    "putus": { keys: ["move on", "mandiri", "healing"], msg: "Dia yang rugi kak! Yuk upgrade diri:" },
    "insecure": { keys: ["self love", "percaya diri"], msg: "Kakak itu berharga! Stop bandingin diri ya:" },
    "bosan": { keys: ["fantasi", "scifi", "misteri"], msg: "Butuh petualangan? Gas baca ini:" },
    "pengen kaya": { keys: ["bisnis", "saham", "biografi"], msg: "Amin! Belajar dari para sultan yuk:" },
    "skripsi": { keys: ["akademik", "motivasi"], msg: "Semangat pejuang toga! Kelarin skripsinya:" }
};

// --- FUNGSI TAMPILAN ---
function generateRating() {
    const rating = (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1);
    const sold = Math.floor(Math.random() * (2000 - 50) + 50);
    return `<div style="display:flex; align-items:center; gap:5px; font-size:0.75rem; margin-bottom:5px; color:#555;"><i class="fas fa-star" style="color:#ffc107;"></i><span>${rating}</span><span style="color:#ddd;">|</span><span>${sold}+ Terjual</span></div>`;
}

function generateMarketplaceButtons(links) {
    let html = '';
    if (links.shopee) html += `<a href="${links.shopee}" target="_blank" class="btn-marketplace btn-shopee" style="position:relative; z-index:10;"><i class="fas fa-shopping-bag"></i> Beli</a>`;
    else if (links.tokopedia) html += `<a href="${links.tokopedia}" target="_blank" class="btn-marketplace btn-tokped"><i class="fas fa-store"></i> Beli</a>`;
    return html;
}

// --- LOGIKA UTAMA ---
function checkLogin() {
    const user = localStorage.getItem('username');
    const modal = document.getElementById('loginModal');
    const greeting = document.getElementById('userGreeting');
    if(modal) modal.style.display = 'none';
    if (user && greeting) { greeting.innerHTML = `Halo, ${user}!`; greeting.style.display = 'block'; } 
}
function triggerLogin() { document.getElementById('loginModal').style.display = 'flex'; }
function saveUser() {
    const name = document.getElementById('usernameInput').value.trim();
    if (name) { localStorage.setItem('username', name); checkLogin(); } else { alert("Isi nama dulu ya kak!"); }
}

// --- DETAIL PRODUK (DENGAN FIX LAYOUT HP VIA JS) ---
function openProductDetail(bookTitle) {
    const decodedTitle = decodeURIComponent(bookTitle).replace(/\\'/g, "'");
    const book = products.find(p => p.title === decodedTitle);
    if (!book) return;

    // Isi Data ke HTML
    document.getElementById('detailImg').src = book.img;
    document.getElementById('detailTitle').innerText = book.title;
    document.getElementById('detailAuthor').innerText = book.author || "-";
    document.getElementById('detailPrice').innerText = `Rp ${book.price.toLocaleString('id-ID')}`;
    document.getElementById('detailDesc').innerText = book.desc || "Belum ada deskripsi.";
    document.getElementById('detailPublisher').innerText = book.publisher || "-";
    document.getElementById('detailYear').innerText = book.year || "-";
    document.getElementById('detailPages').innerText = (book.pages || "-") + " Hal";
    document.getElementById('detailIsbn').innerText = book.isbn || "-";

    const badge = document.getElementById('detailBadge');
    if (book.status === 'flashsale') { badge.innerText = '⚡ FLASH SALE'; badge.style.background = 'var(--danger)'; badge.style.color = 'white'; }
    else { badge.innerText = 'BEST SELLER'; badge.style.background = 'var(--accent)'; badge.style.color = 'var(--primary)'; }

    const btns = document.getElementById('detailButtons');
    btns.innerHTML = generateMarketplaceButtons(book.links);

    // --- FIX TAMPILAN HP VIA JAVASCRIPT (ANTI CACHE CSS) ---
    const wrapper = document.querySelector('.detail-wrapper');
    const imgWrapper = document.querySelector('.detail-img-wrapper');
    const infoWrapper = document.querySelector('.detail-info');
    const modalContent = document.querySelector('.detail-content');

    if (window.innerWidth <= 768) {
        // Kodingan Paksa buat HP
        wrapper.style.display = "block"; // Jangan Flexbox
        wrapper.style.flexDirection = "column";
        
        imgWrapper.style.width = "100%";
        imgWrapper.style.height = "auto";
        imgWrapper.style.padding = "10px";
        
        infoWrapper.style.width = "100%";
        infoWrapper.style.padding = "15px";
        
        modalContent.style.width = "95%"; // Jangan 100% biar gak nabrak pinggir
        modalContent.style.margin = "0 auto";
    } else {
        // Balikin ke Laptop
        wrapper.style.display = "flex";
        wrapper.style.flexDirection = "row";
        imgWrapper.style.width = "auto";
        infoWrapper.style.width = "auto";
        modalContent.style.width = "90%";
    }

    document.getElementById('productDetailModal').style.display = 'flex';
    document.body.classList.add('no-scroll'); 
}

function closeDetail() {
    document.getElementById('productDetailModal').style.display = 'none';
    document.body.classList.remove('no-scroll');
}

function openModal(modalId) { const m = document.getElementById(modalId); if(m) { m.style.display = 'flex'; document.body.classList.add('no-scroll'); } }
function closeModal(modalId) { const m = document.getElementById(modalId); if(m) { m.style.display = 'none'; document.body.classList.remove('no-scroll'); } }

// --- SEARCH ---
function handleHeaderSearch(e) { if (e.key === 'Enter') executeSearch(); }
function executeSearch() {
    const query = document.getElementById('globalSearch').value.toLowerCase().trim();
    if (!query) return;
    const results = products.filter(p => p.title.toLowerCase().includes(query) || p.author.toLowerCase().includes(query) || (p.keywords && p.keywords.some(k => query.includes(k))));
    document.getElementById('breadcrumb').style.display = 'block';
    document.getElementById('breadcrumb').innerHTML = `<span onclick="showMainCategories()" style="cursor:pointer">Beranda</span> / <span>Pencarian: "${query}"</span>`;
    renderGrid(results, `Hasil Pencarian: "${query}"`);
}

// --- CART ---
let cart = JSON.parse(localStorage.getItem('myCart')) || [];
function saveToCart(indexFromList) {
    const user = localStorage.getItem('username');
    if (!user) { triggerLogin(); return; }
    const bookTitle = indexFromList; 
    const book = products.find(p => p.title === bookTitle);
    if (book) {
        if(cart.find(i => i.title === book.title)) { alert("Sudah disimpan!"); return; }
        cart.push(book); localStorage.setItem('myCart', JSON.stringify(cart)); updateCartIcon(); alert("Berhasil disimpan!");
    }
}
function updateCartIcon() { const badge = document.getElementById('cartCount'); if(badge) badge.innerText = cart.length; }
function toggleCart() {
    const m = document.getElementById('cartModal');
    if (m.style.display === 'flex') { closeModal('cartModal'); } else { openModal('cartModal'); renderCartItems(); }
}
function renderCartItems() {
    const c = document.getElementById('cartItems'); c.innerHTML = '';
    if(cart.length===0) { c.innerHTML='<p style="text-align:center; padding:20px; color:#666;">Belum ada buku.</p>'; return; }
    cart.forEach((i, idx) => {
        const link = i.links.shopee || "#";
        c.innerHTML += `<div class="cart-item"><img src="${i.img}" style="width:40px;"><div style="flex:1; font-size:0.9rem;"><b>${i.title}</b><br>Rp ${i.price.toLocaleString()}</div><button onclick="removeFromCart(${idx})" style="border:none;background:none;cursor:pointer;color:red;"><i class="fas fa-trash"></i></button></div>`;
    });
}
function removeFromCart(idx) { cart.splice(idx, 1); localStorage.setItem('myCart', JSON.stringify(cart)); renderCartItems(); updateCartIcon(); }

// --- CHATBOT ---
function toggleChat() { 
    const c = document.getElementById('chatbot'); const t = document.getElementById('chatTooltip');
    if(c.style.display === 'flex') { c.style.display = 'none'; if(t) t.style.display='block'; }
    else { c.style.display = 'flex'; if(t) t.style.display='none'; }
}
function handleEnter(e) { if(e.key==='Enter') handleUserChat(); }
function handleUserChat() {
    const inp = document.getElementById('chatInput'); 
    let txt = inp.value.trim().toLowerCase().replace(/[?!.]/g, "");
    if(!txt) return;
    const body = document.getElementById('chatBody');
    body.innerHTML += `<div class="user-msg">${inp.value}</div>`; 
    inp.value=''; body.scrollTop=body.scrollHeight;
    setTimeout(() => {
        let rep = ""; let isHandled = false;
        for (let key in conversationDb) {
            if (txt.includes(key)) {
                const ans = conversationDb[key]; rep = `<div class="bot-msg">${ans[Math.floor(Math.random()*ans.length)]}</div>`; isHandled = true; break;
            }
        }
        if (!isHandled) {
            for (let mood in curhatMap) {
                if (txt.includes(mood)) {
                    const cfg = curhatMap[mood];
                    const found = products.filter(p => p.keywords && p.keywords.some(k => cfg.keys.some(mk => k.includes(mk))));
                    if (found.length > 0) {
                        lastSearchResults = found; lastShownIndex = 3;
                        rep += `<div class="bot-msg">${cfg.msg}</div>`;
                        found.slice(0,3).forEach(b => { 
                            const safeTitle = encodeURIComponent(b.title).replace(/'/g, "%27");
                            rep += `<div class="chat-book-card" onclick="openProductDetail('${safeTitle}')" style="cursor:pointer;"><img src="${b.img}" style="width:50px;"><div><b>${b.title}</b><br><span style="color:var(--shopee); font-weight:bold; font-size:0.8rem;">Lihat Detail ></span></div></div>`; 
                        });
                        if(found.length>3) rep+=`<div class="bot-msg" style="font-size:0.8rem;">Ketik "Lagi" buat sisanya.</div>`;
                    } else { rep += `<div class="bot-msg">Pena Mimin belum nemu bukunya nih kak :(</div>`; }
                    isHandled = true; break;
                }
            }
        }
        if (!isHandled) {
            const found = products.filter(p => p.keywords && p.keywords.some(k => txt.includes(k)) || p.title.toLowerCase().includes(txt));
            if (found.length > 0) {
                lastSearchResults = found; lastShownIndex = 3;
                rep += `<div class="bot-msg">Ketemu <b>${found.length} buku</b>:</div>`;
                found.slice(0,3).forEach(b => { 
                    const safeTitle = encodeURIComponent(b.title).replace(/'/g, "%27");
                    rep += `<div class="chat-book-card" onclick="openProductDetail('${safeTitle}')" style="cursor:pointer;"><img src="${b.img}" style="width:50px;"><div><b>${b.title}</b><br><span style="color:var(--shopee); font-weight:bold; font-size:0.8rem;">Lihat Detail ></span></div></div>`; 
                });
                if(found.length>3) rep+=`<div class="bot-msg" style="font-size:0.8rem;">Ketik "Lagi" buat sisanya.</div>`;
            } else { rep += `<div class="bot-msg">Maaf kak, belum nemu. Coba kata kunci lain?</div>`; }
        }
        body.innerHTML += rep; body.scrollTop=body.scrollHeight;
    }, 600);
}

// --- DISPLAY ---
function showMainCategories() {
    const highlight = products.filter(p => p.status === 'bestseller' || p.status === 'flashsale');
    let html = '';
    const now = new Date(); const currentHour = now.getHours();
    let dayTitle = "DAILY"; 
    const isFlashSaleActive = flashSaleSchedule.includes(currentHour);

    if (highlight.length > 0) {
        if (isFlashSaleActive) {
            html += `
            <div style="background: linear-gradient(90deg, #ffebee 0%, #fff 100%); padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 5px solid var(--shopee);">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px; border-bottom:1px solid #ffcdd2; padding-bottom:10px;">
                    <h2 style="color:var(--shopee); margin:0;">⚡ ${dayTitle} | FLASH SALE</h2>
                    <div class="countdown-wrapper" id="flashSaleTimer"><span style="font-size:0.8rem; color:#d32f2f;">Sisa Waktu:</span><div class="countdown-box" id="minutes">00</div>:<div class="countdown-box" id="seconds">00</div></div>
                </div>
                ${renderHighlightGrid(highlight, 'flash')}
            </div>`;
            setTimeout(() => startCountdown(true), 100); 
        } else {
            html += `<div style="margin-bottom: 20px;"><div style="display:flex; align-items:center; gap:10px; margin-bottom:15px; border-bottom:2px solid #ff9800; padding-bottom:10px;"><h2 style="color:#e65100; margin:0;">🔥 ${dayTitle} | BEST SELLER</h2></div>${renderHighlightGrid(highlight, 'normal')}</div>`;
        }
    }
    
    html += `<h2 style="color:var(--primary); margin-top:20px; margin-bottom:20px; border-bottom:1px solid #ddd; padding-bottom:10px;">Jelajahi Kategori</h2><div class="grid-container">`;
    for (let key in categories) {
        html += `<div class="cat-card" onclick="showSubCategories('${key}')"><i class="fas ${categories[key].icon}"></i><h3 style="font-size:1.1rem; margin-top:10px;">${categories[key].label}</h3></div>`;
    }
    html += `</div>`;
    document.getElementById('breadcrumb').style.display='none';
    document.getElementById('contentArea').innerHTML = html;
}

function startCountdown(isActive) {
    if (!isActive) return;
    const timerInterval = setInterval(function() {
        const now = new Date();
        const endOfHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0).getTime();
        const distance = endOfHour - now.getTime();
        if (distance < 0) { clearInterval(timerInterval); showMainCategories(); return; }
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        const elM = document.getElementById("minutes"); const elS = document.getElementById("seconds");
        if (elM && elS) { elM.innerHTML = m<10?"0"+m:m; elS.innerHTML = s<10?"0"+s:s; }
    }, 1000);
}

function renderHighlightGrid(list, mode) {
    let html = `<div class="grid-container">`;
    list.forEach(book => {
        const safeTitle = encodeURIComponent(book.title).replace(/'/g, "%27");
        let badgeColor = '#ff9800'; let badgeText = 'BEST SELLER'; let borderColor = '#ff9800';
        let displayPrice = `Rp ${book.price.toLocaleString('id-ID')}`;
        let ratingHtml = generateRating();

        if (mode === 'flash') {
            badgeColor = 'var(--danger)'; badgeText = '⚡ FLASH SALE'; borderColor = 'var(--danger)';
            let discPercent = 10 + (book.title.length % 16); 
            let finalPrice = book.price - (book.price * (discPercent / 100));
            displayPrice = `<div style="font-size:0.8rem; color:#aaa; text-decoration:line-through;">Rp ${book.price.toLocaleString('id-ID')}</div><div style="font-weight:bold; color:var(--danger); font-size:1.1rem;">Rp ${finalPrice.toLocaleString('id-ID', {maximumFractionDigits:0})}</div>`;
        }

        html += `
        <div class="product-card" style="border:1px solid ${borderColor};">
            <div onclick="openProductDetail('${safeTitle}')">
                <span style="position:absolute; top:0; right:0; background:${badgeColor}; color:white; font-size:0.7rem; padding:3px 8px; border-bottom-left-radius:8px; font-weight:bold; z-index:10;">${badgeText}</span>
                <img src="${book.img}" class="product-img">
                <div class="product-info">
                    <div class="p-title">${book.title}</div>
                    ${ratingHtml}
                    <div style="margin-bottom:10px;">${displayPrice}</div>
                </div>
            </div>
            <div class="btn-group" style="padding:0 10px 15px 10px;">
                <button class="btn-save" onclick="saveToCart('${safeTitle}')"><i class="fas fa-bookmark"></i></button>
                ${generateMarketplaceButtons(book.links)}
            </div>
        </div>`;
    });
    html += `</div>`;
    return html;
}

function renderGrid(list, title) {
    const area = document.getElementById('contentArea');
    if (list.length === 0) { area.innerHTML = `<div style="text-align:center; padding:50px; color:#777;"><h3>Buku kosong.</h3><button onclick="showMainCategories()" class="btn-marketplace btn-shopee" style="max-width:200px; margin:20px auto; cursor:pointer;">Kembali</button></div>`; return; }
    let html = `<h2 style="color:var(--primary); margin-bottom:20px;">${title}</h2><div class="grid-container">`;
    list.forEach(book => {
        const safeTitle = encodeURIComponent(book.title).replace(/'/g, "%27");
        let ratingHtml = generateRating();
        html += `
        <div class="product-card">
            <div onclick="openProductDetail('${safeTitle}')">
                <img src="${book.img}" class="product-img">
                <div class="product-info">
                    <div class="p-title">${book.title}</div>
                    ${ratingHtml}
                    <div class="p-price">Rp ${book.price.toLocaleString('id-ID')}</div>
                </div>
            </div>
            <div class="btn-group" style="padding:0 10px 15px 10px;">
                <button class="btn-save" onclick="saveToCart('${safeTitle}')"><i class="fas fa-bookmark"></i></button>
                ${generateMarketplaceButtons(book.links)}
            </div>
        </div>`;
    });
    html += `</div>`; area.innerHTML = html;
}

function showSubCategories(mainKey) {
    const mainCat = categories[mainKey];
    document.getElementById('breadcrumb').style.display='block';
    document.getElementById('breadcrumb').innerHTML = `<span onclick="showMainCategories()" style="cursor:pointer">Beranda</span> / <span>${mainCat.label}</span>`;
    let html = `<h2 style="color:var(--primary); margin-bottom:20px;">${mainCat.label}</h2><div class="grid-container">`;
    mainCat.subs.forEach(sub => { html += `<div class="cat-card" onclick="showProducts('${mainKey}', '${sub.key}', '${sub.label}')"><i class="fas ${sub.icon}"></i><h3>${sub.label}</h3></div>`; });
    html += `</div>`; document.getElementById('contentArea').innerHTML = html;
}
function showProducts(mainKey, subKey, subLabel) {
    document.getElementById('breadcrumb').innerHTML = `<span onclick="showMainCategories()" style="cursor:pointer">Beranda</span> / <span onclick="showSubCategories('${mainKey}')" style="cursor:pointer">${categories[mainKey].label}</span> / <span>${subLabel}</span>`;
    const filtered = products.filter(p => p.main === mainKey && p.sub === subKey);
    renderGrid(filtered, subLabel);
}

// START
checkLogin(); updateCartIcon(); showMainCategories();
