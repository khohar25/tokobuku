/* ================= INIT ================= */
updateCartIcon();
showMainCategories();

/* ================= HOMEPAGE ================= */
function showMainCategories(){
    let html = `
        <h2 style="margin-bottom:20px;color:var(--primary)">
            📚 Jelajahi Kategori Buku
        </h2>
        <div class="grid-container">
    `;

    for(let key in categories){
        html += `
            <div class="cat-card" onclick="showCategory('${key}')">
                <i class="fas ${categories[key].icon}"></i>
                <h3>${categories[key].label}</h3>
            </div>
        `;
    }

    html += `</div>`;
    document.getElementById("breadcrumb").style.display="none";
    document.getElementById("contentArea").innerHTML = html;
}

function showCategory(cat){
    const filtered = products.filter(p=>p.main===cat);
    renderGrid(filtered, categories[cat].label);
}

/* ================= GRID ================= */
function renderGrid(list,title){
    if(list.length===0){
        document.getElementById("contentArea").innerHTML =
        `<p>Produk belum tersedia</p>`;
        return;
    }

    let html=`<h2>${title}</h2><div class="grid-container">`;
    list.forEach(b=>{
        html+=`
            <div class="cat-card">
                <h3>${b.title}</h3>
                <p>Rp ${b.price.toLocaleString("id-ID")}</p>
            </div>
        `;
    });
    html+=`</div>`;
    document.getElementById("contentArea").innerHTML=html;
}

/* ================= SEARCH ================= */
function handleHeaderSearch(e){
    if(e.key==="Enter") executeSearch();
}
function executeSearch(){
    const q=document.getElementById("globalSearch").value.toLowerCase();
    const res=products.filter(p=>p.title.toLowerCase().includes(q));
    renderGrid(res,"Hasil Pencarian");
}

/* ================= CART (SIMPLE) ================= */
let cart=[];
function updateCartIcon(){
    document.getElementById("cartCount").innerText=cart.length;
}
function toggleCart(){
    alert("Fitur disimpan belum diaktifkan");
}

/* ================= CHATBOT ================= */
function toggleChat(){
    const c=document.getElementById("chatbot");
    c.style.display=c.style.display==="flex"?"none":"flex";
}
function handleUserChat(){
    const input=document.getElementById("chatInput");
    const text=input.value.trim();
    if(!text) return;

    const body=document.getElementById("chatBody");
    body.innerHTML+=`<div class="user-msg">${text}</div>`;
    input.value="";

    body.innerHTML+=`
        <div class="bot-msg">
            Siap kak 👍<br>
            Fitur rekomendasi akan segera aktif.
        </div>
    `;
    body.scrollTop=body.scrollHeight;
}
