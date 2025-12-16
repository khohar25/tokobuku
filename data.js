/* =====================================================
   KATEGORI
   ===================================================== */
const categories = {
    fiksi: {
        label: "Fiksi (Imajinatif)",
        icon: "fa-book-open",
        subs: {
            romantis: "Roman / Romantis",
            fantasi: "Fantasi",
            sejarah: "Fiksi Sejarah"
        }
    },
    nonfiksi: {
        label: "Non-Fiksi (Fakta)",
        icon: "fa-lightbulb",
        subs: {
            motivasi: "Pengembangan Diri",
            psikologi: "Psikologi",
            biografi: "Biografi"
        }
    },
    referensi: {
        label: "Referensi & Pendidikan",
        icon: "fa-graduation-cap",
        subs: {
            panduan: "Buku Panduan",
            pengembangan: "Pengembangan Diri"
        }
    }
};

/* =====================================================
   DATA PRODUK (LENGKAP DENGAN LINK)
   ===================================================== */
const products = [

/* ================= NON-FIKSI ================= */

{
    id: 1,
    title: "Tuhan, Beri Aku Alasan Untuk Tidak Menyerah",
    price: 73892,
    main: "nonfiksi",
    sub: "motivasi",
    author: "Syalmahat Publishing",
    img: "https://down-tx-id.img.susercontent.com/sg-11134201-23020-g5bbllf7g5mvd9.webp",
    links: {
        shopee: "https://s.shopee.co.id/13H8JZDbR"
    },
    keywords: ["motivasi","islami","healing","self love","menyerah"]
},
{
    id: 2,
    title: "Nanti Juga Sembuh Sendiri",
    price: 79000,
    main: "nonfiksi",
    sub: "motivasi",
    author: "Helo Bagas",
    img: "https://down-bs-id.img.susercontent.com/ffb4ca321a33d8a02d21e8351b453b28.webp",
    links: {
        shopee: "https://s.shopee.co.id/AKTTRbJ8Fr"
    },
    keywords: ["galau","healing","self love","sedih"]
},
{
    id: 3,
    title: "Be Calm, Be Happy",
    price: 64000,
    main: "nonfiksi",
    sub: "psikologi",
    author: "Johan Anggara",
    img: "https://down-bs-id.img.susercontent.com/id-11134207-8224w-mi144ymso5xd95.webp",
    links: {
        shopee: "https://s.shopee.co.id/Lg7lxeNp5"
    },
    keywords: ["tenang","bahagia","psikologi","stress"]
},
{
    id: 4,
    title: "The Principles of Power",
    price: 59999,
    main: "nonfiksi",
    sub: "psikologi",
    author: "Dion Yulianto",
    img: "https://down-bs-id.img.susercontent.com/id-11134207-8224w-mg8xjr25v3ew1f.webp",
    links: {
        shopee: "https://s.shopee.co.id/5AlNWuODWQ"
    },
    keywords: ["psikologi","manipulasi","kekuatan","mental"]
},
{
    id: 5,
    title: "Berdamai Dengan Diri Sendiri",
    price: 25550,
    main: "nonfiksi",
    sub: "psikologi",
    author: "Embrase",
    img: "https://down-bs-id.img.susercontent.com/id-11134207-7r98u-lxt511t2kvmm33.webp",
    links: {
        shopee: "https://s.shopee.co.id/qcON1zJMm"
    },
    keywords: ["self healing","menerima diri","psikologi"]
},
{
    id: 6,
    title: "Hidup Tanpa Rasa Insecure",
    price: 42000,
    main: "nonfiksi",
    sub: "psikologi",
    author: "Embrase",
    img: "https://down-bs-id.img.susercontent.com/id-11134207-7ra0g-mbsyk3ltihk4a7.webp",
    links: {
        shopee: "https://s.shopee.co.id/5q14KWPSUf"
    },
    keywords: ["insecure","percaya diri","mental"]
},
{
    id: 7,
    title: "Umur 40 Kok Gini Amat?",
    price: 9762,
    main: "nonfiksi",
    sub: "psikologi",
    author: "Han Seonghee",
    img: "https://down-bs-id.img.susercontent.com/sg-11134201-7rd70-m7q09bgr5g1kba.webp",
    links: {
        shopee: "https://s.shopee.co.id/2qNSkxGEKM"
    },
    keywords: ["umur","kehidupan","refleksi"]
},

/* ================= FIKSI ================= */

{
    id: 8,
    title: "Hujan",
    price: 85500,
    main: "fiksi",
    sub: "romantis",
    author: "Tere Liye",
    img: "https://down-bs-id.img.susercontent.com/sg-11134201-22120-gdbg2iotbykv3d.webp",
    links: {
        shopee: "https://s.shopee.co.id/gIxvyqupV"
    },
    keywords: ["novel","romantis","cinta"]
},
{
    id: 9,
    title: "Dompet Ayah Sepatu Ibu",
    price: 88000,
    main: "fiksi",
    sub: "romantis",
    author: "J.S Khairen",
    img: "https://down-bs-id.img.susercontent.com/id-11134207-7r98s-lnqpgo7msd5212.webp",
    links: {
        shopee: "https://s.shopee.co.id/9KawV0Fb5N"
    },
    keywords: ["keluarga","haru","kehidupan"]
},
{
    id: 10,
    title: "Petualangan Don Quixote",
    price: 36750,
    main: "fiksi",
    sub: "fantasi",
    author: "Miguel De Cervantes",
    img: "https://down-bs-id.img.susercontent.com/id-11134207-7r98t-lqvf0igir4hp0c.webp",
    links: {
        shopee: "https://s.shopee.co.id/3Vd9Iqaemg"
    },
    keywords: ["fantasi","petualangan","klasik"]
},
{
    id: 11,
    title: "Ketika Kemenangan Menjadi Kenangan",
    price: 49000,
    main: "fiksi",
    sub: "romantis",
    author: "Zetta Saja",
    img: "https://down-bs-id.img.susercontent.com/id-11134207-8224s-mhx2lh3x026e31.webp",
    links: {
        shopee: "https://s.shopee.co.id/5fhe8OdWWn"
    },
    keywords: ["kehidupan","romantis","refleksi"]
},

/* ================= REFERENSI ================= */

{
    id: 12,
    title: "The Alpha Girls Guide",
    price: 79200,
    main: "referensi",
    sub: "pengembangan",
    author: "Henry Manampiring",
    img: "https://down-bs-id.img.susercontent.com/sg-11134201-22100-pns3coq93vivd6.webp",
    links: {
        shopee: "https://s.shopee.co.id/30gsx7AhsD"
    },
    keywords: ["pengembangan diri","panduan","perempuan"]
}

];

/* =====================================================
   END DATA
   ===================================================== */
