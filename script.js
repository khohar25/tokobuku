/* =========================================
   SCRIPT.JS – FINAL FULL VERSION
   ========================================= */

/* ========= CONFIG ========= */
const flashSaleSchedule = [0, 6, 9, 12, 15, 18, 21];
let lastSearchResults = [];
let lastShownIndex = 0;

/* ========= CHATBOT DATABASE ========= */
const conversationDb = {
    "halo": ["Halo kak 👋", "Hai! Mau cari buku apa hari ini?"],
    "pagi": ["Pagi kak! Semoga harinya menyenangkan 🌤️"],
    "malam": ["Malam kak! Lagi nyari bacaan? 🌙"],
    "makasih": ["Sama-sama kak 😊", "Senang bisa bantu!"],
    "siapa": ["Aku Pena Mimin 🤖 Asisten buku kamu!"]
};

const curhatMap = {
    "sedih": { keys: ["healing","motivasi","agama"], msg: "Peluk jauh kak 🤍 Coba buku ini:" },
    "galau": { keys: ["galau","romantis","move on"], msg: "Galau itu manusiawi 😌 Ini rekomendasinya:" },
    "insecure": { keys: ["insecure","self love"], msg: "Kamu berharga kak ✨ Ini bacaan yang cocok:" },
    "malas": { keys: ["malas","produktif"], msg: "Yuk bangkit pelan-pelan 💪" }
};

/* ========= LOGIN ========= */
function checkLogin(){
    const user = localStorage.getItem("username");
    const greet = document.getElementById("userGreeting");
    if(user && greet){
        greet.innerText = `Halo, ${user}!`;
        greet.style.display = "block";
    }
}
function saveUser(){
    const val = document.getElementById("usernameInput").value.trim();
    if(!val) return alert("Isi nama dulu ya kak 😊");
    localStorage.setItem("username", val);
    document.getElementById("loginModal").style.display="none";
    checkLogin();
}

/* ========= CART ========= */
let cart = JSON.parse(localStorage.getItem("myCart")) || [];

function saveToCart(title){
    const book = products.find(p=>p.title===decodeURIComponent(title));
    if(!book) return;
    if(cart.find(i=>i.title===book.title)){
        alert("Sudah disimpan");
        return;
    }
    cart.push(book);
    localStorage.setItem("myCart", JSON.stringify(cart));
    updateCartIcon();
    alert("Disimpan!");
}
function updateCartIcon(){
    const badge = document.getElementById("cartCount");
    if(badge) badge.innerText = cart.length;
}
function toggleCart(){
    const m = document.getElementById("cartModal");
    m.style.display = m.style.display==="flex"?"none":"flex";
    renderCartItems();
}
function renderCartItems(){
    const el = document.getElementById("cartItems");
    if(cart.length===0){
        el.innerHTML = "<p style='text-align:center'>Belum ada buku</p>";
        return;
    }
    el.innerHTML="";
    cart.forEach((b,i)=>{
        el.innerHTML+=`
        <div class="cart-item">
            <img src="${b.img}" width="40">
            <div style="flex:1">
                <b>${b.title}</b><br>
                Rp ${b.price.toLocaleString("id-ID")}
            </div>
            <button onclick="removeFromCart(${i})">❌</button>
        </div>`;
    });
}
function removeFromCart(i){
    cart.splice(i,1);
    localStorage.setItem("myCart",JSON.stringify(cart));
    renderCartItems();
    updateCartIcon();
}

/* ========= SEARCH ========= */
function handleHeaderSearch(e){
    if(e.key==="Enter") executeSearch();
}
function executeSearch(){
    const q = document.getElementById("globalSearch").value.toLowerCase();
    const res = products.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.keywords && p.keywords.some(k=>q.includes(k)))
    );
    renderGrid(res, `Hasil pencarian: "${q}"`);
}

/* ========= GRID ========= */
function renderGrid(list, title){
    if(list.length===0){
        document.getElementById("contentArea").innerHTML=
        `<p style="text-align:center;padding:40px">Produk tidak ditemukan</p>`;
        return;
    }
    let html = `<h2>${title}</h2><div class="grid-container">`;
    list.forEach(b=>{
        const safe = encodeURIComponent(b.title);
        html+=`
        <div class="product-card">
            <div onclick="openProductDetail('${safe}')">
                <img src="${b.img}" class="product-img">
                <div class="product-info">
                    <div class="p-title">${b.title}</div>
                    <div class="p-price">Rp ${b.price.toLocaleString("id-ID")}</div>
                </div>
            </div>
            <div class="btn-group">
                <button class="btn-save" onclick="saveToCart('${safe}')">🔖</button>
                <a href="${b.links.shopee}" target="_blank" class="btn-marketplace btn-shopee">Beli</a>
            </div>
        </div>`;
    });
    html+=`</div>`;
    document.getElementById("contentArea").innerHTML=html;
}

/* ========= DETAIL ========= */
function openProductDetail(title){
    const book = products.find(p=>p.title===decodeURIComponent(title));
    if(!book) return;
    document.getElementById("detailImg").src = book.img;
    document.getElementById("detailTitle").innerText = book.title;
    document.getElementById("detailAuthor").innerText = book.author||"-";
    document.getElementById("detailPrice").innerText = "Rp "+book.price.toLocaleString("id-ID");
    document.getElementById("detailDesc").innerText = book.desc||"";
    document.getElementById("detailButtons").innerHTML =
        `<a href="${book.links.shopee}" target="_blank" class="btn-marketplace btn-shopee">Beli di Shopee</a>`;
    document.getElementById("productDetailModal").style.display="flex";
}
function closeDetail(){
    document.getElementById("productDetailModal").style.display="none";
}

/* ========= FOLDER KATEGORI ========= */
function showMainCategories(){
    document.getElementById("breadcrumb").style.display="none";
    document.getElementById("contentArea").innerHTML=`
    <div class="folder-grid">
        <div class="folder-card" onclick="showSubCategoryCustom('fiksi')">
            <div class="folder-title">📁 Fiksi (Imajinatif)</div>
            <div class="folder-desc">Cerita imajinatif & novel</div>
        </div>
        <div class="folder-card" onclick="showSubCategoryCustom('nonfiksi')">
            <div class="folder-title">📁 Non-Fiksi</div>
            <div class="folder-desc">Motivasi, psikologi, fakta</div>
        </div>
        <div class="folder-card" onclick="showSubCategoryCustom('referensi')">
            <div class="folder-title">📁 Referensi & Pendidikan</div>
            <div class="folder-desc">Buku panduan & pembelajaran</div>
        </div>
    </div>`;
}

/* ========= SUB FOLDER ========= */
function showSubCategoryCustom(type){
    const map={
        fiksi:[
            {l:"Romantis",k:"romansa"},
            {l:"Novel Umum",k:"novel"}
        ],
        nonfiksi:[
            {l:"Motivasi",k:"motivasi"},
            {l:"Panduan",k:"panduan"}
        ],
        referensi:[
            {l:"Akademik",k:"akademik"}
        ]
    };
    let html=`<div class="grid-container">`;
    map[type].forEach(s=>{
        html+=`
        <div class="cat-card" onclick="showProductsByAcademic('${type}','${s.k}','${s.l}')">
            <i class="fas fa-folder-open"></i>
            <h3>${s.l}</h3>
        </div>`;
    });
    html+=`</div>`;
    document.getElementById("breadcrumb").style.display="block";
    document.getElementById("contentArea").innerHTML=html;
}

/* ========= FILTER ========= */
function showProductsByAcademic(main,sub,label){
    const res = products.filter(p=>p.main===main && p.sub===sub);
    renderGrid(res,label);
}

/* ========= CHATBOT ========= */
function toggleChat(){
    const c=document.getElementById("chatbot");
    c.style.display=c.style.display==="flex"?"none":"flex";
}
function handleEnter(e){
    if(e.key==="Enter") handleUserChat();
}
function handleUserChat(){
    const inp=document.getElementById("chatInput");
    let txt=inp.value.toLowerCase();
    inp.value="";
    const body=document.getElementById("chatBody");
    body.innerHTML+=`<div class="user-msg">${txt}</div>`;

    let reply="Maaf kak, belum nemu bukunya 😅";
    for(const mood in curhatMap){
        if(txt.includes(mood)){
            const found=products.filter(p=>p.keywords && p.keywords.some(k=>curhatMap[mood].keys.includes(k)));
            if(found.length){
                reply=curhatMap[mood].msg;
                found.slice(0,3).forEach(b=>{
                    reply+=`<div class="chat-book-card" onclick="openProductDetail('${encodeURIComponent(b.title)}')">
                        <img src="${b.img}" width="40">
                        <div>${b.title}</div>
                    </div>`;
                });
            }
        }
    }
    body.innerHTML+=`<div class="bot-msg">${reply}</div>`;
    body.scrollTop=body.scrollHeight;
}

/* ========= INIT ========= */
checkLogin();
updateCartIcon();
showMainCategories();
