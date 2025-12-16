/* =====================================================
   SCRIPT.JS – FULL VERSION (FLOATING CHATBOT)
   ===================================================== */

/* ======================
   DUMMY DATA PRODUK
   ====================== */
/* kalau kamu sudah punya data.js, HAPUS BAGIAN INI */
const products = [
    {
        title: "Nanti Juga Sembuh Sendiri",
        price: 79000,
        img: "https://down-bs-id.img.susercontent.com/ffb4ca321a33d8a02d21e8351b453b28.webp",
        links: { shopee: "https://s.shopee.co.id/AKTTRbJ8Fr" },
        keywords: ["galau","sedih","healing","self love"]
    },
    {
        title: "Be Calm, Be Happy",
        price: 64000,
        img: "https://down-bs-id.img.susercontent.com/id-11134207-8224w-mi144ymso5xd95.webp",
        links: { shopee: "https://s.shopee.co.id/Lg7lxeNp5" },
        keywords: ["tenang","bahagia","stress"]
    }
];

/* ======================
   CHATBOT TOGGLE
   ====================== */
function toggleChat(){
    const chat = document.getElementById("chatbot");
    const tip  = document.getElementById("chatTooltip");

    if(chat.style.display === "flex"){
        chat.style.display = "none";
        if(tip) tip.style.display = "block";
    } else {
        chat.style.display = "flex";
        if(tip) tip.style.display = "none";
    }
}

/* ======================
   CHAT INPUT
   ====================== */
function handleEnter(e){
    if(e.key === "Enter") handleUserChat();
}

function handleUserChat(){
    const input = document.getElementById("chatInput");
    const text = input.value.trim().toLowerCase();
    if(!text) return;

    const body = document.getElementById("chatBody");

    /* pesan user */
    body.innerHTML += `<div class="user-msg">${input.value}</div>`;
    input.value = "";

    /* cari produk berdasarkan keyword */
    const found = products.filter(p =>
        p.keywords && p.keywords.some(k => text.includes(k))
    );

    /* respon bot */
    if(found.length === 0){
        body.innerHTML += `
        <div class="bot-msg">
            Maaf kak 😅 aku belum nemu buku yang cocok.<br>
            Coba pakai kata: <b>galau, sedih, healing, motivasi</b>
        </div>`;
    } else {
        body.innerHTML += `
        <div class="bot-msg">
            Aku nemu beberapa buku yang cocok 👇
        </div>`;

        found.slice(0,3).forEach(b=>{
            body.innerHTML += `
            <div class="chat-book-card" onclick="openLink('${b.links.shopee}')">
                <img src="${b.img}">
                <div>
                    <b>${b.title}</b><br>
                    <span style="color:#ee4d2d;font-size:.75rem">
                        Rp ${b.price.toLocaleString("id-ID")}
                    </span>
                </div>
            </div>`;
        });
    }

    body.scrollTop = body.scrollHeight;
}

/* ======================
   OPEN LINK
   ====================== */
function openLink(url){
    window.open(url, "_blank");
}

/* ======================
   AUTO INIT (OPTIONAL)
   ====================== */
window.addEventListener("load", () => {
    const body = document.getElementById("chatBody");
    if(body){
        body.scrollTop = body.scrollHeight;
    }
});
