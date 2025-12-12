// ==========================================
// FILE: data.js (DATA LENGKAP ALA GRAMEDIA)
// ==========================================

const categories = {
    "fiksi": {
        label: "Fiksi & Sastra", icon: "fa-rocket",
        subs: [
            { key: "romansa", label: "Romansa", icon: "fa-heart" },
            { key: "fantasi", label: "Fantasi", icon: "fa-dragon" },
            { key: "scifi", label: "Sci-Fi", icon: "fa-rocket" },
            { key: "misteri", label: "Misteri", icon: "fa-user-secret" },
            { key: "horor", label: "Horor", icon: "fa-ghost" },
            { key: "sejarah_fiksi", label: "Sejarah Fiksi", icon: "fa-landmark" },
            { key: "realistic", label: "Realistic", icon: "fa-street-view" },
            { key: "fanfic", label: "Fanfiction", icon: "fa-users" },
            { key: "klasik", label: "Klasik", icon: "fa-crown" },
            { key: "novel", label: "Novel Umum", icon: "fa-book" }
        ]
    },
    "nonfiksi": {
        label: "Non-Fiksi", icon: "fa-brain",
        subs: [
            { key: "biografi", label: "Biografi", icon: "fa-user-tie" },
            { key: "akademik", label: "Akademik", icon: "fa-graduation-cap" },
            { key: "panduan", label: "Panduan", icon: "fa-tools" },
            { key: "referensi", label: "Referensi", icon: "fa-atlas" },
            { key: "motivasi", label: "Motivasi", icon: "fa-lightbulb" },
            { key: "bisnis", label: "Bisnis", icon: "fa-chart-line" },
            { key: "agama", label: "Agama", icon: "fa-praying-hands" },
            { key: "kuliner", label: "Kuliner", icon: "fa-utensils" },
            { key: "travel", label: "Travel", icon: "fa-plane-departure" }
        ]
    },
    "lainnya": {
        label: "Lainnya", icon: "fa-layer-group",
        subs: [
            { key: "buku_anak", label: "Buku Anak", icon: "fa-child" },
            { key: "komik", label: "Komik", icon: "fa-mask" },
            { key: "antologi", label: "Antologi", icon: "fa-copy" },
            { key: "cergam", label: "Cergam", icon: "fa-palette" },
            { key: "dongeng", label: "Dongeng", icon: "fa-frog" },
            { key: "teks_anak", label: "Buku Teks", icon: "fa-shapes" }
        ]
    }
};

const products = [
    { 
        title: "Tuhan, Beri Aku Alasan Untuk Tidak Menyerah", 
        author: "Syalmahat", 
        publisher: "Syalmahat Publishing", year: 2021, pages: 224, isbn: "978-623-956-880-1",
        desc: "Ketika hidup terasa berat dan kamu merasa sendirian, buku ini hadir sebagai teman. Berisi kumpulan tulisan motivasi islami yang menyentuh hati, mengajakmu untuk bangkit dari keterpurukan.",
        keywords: ["self healing", "self love", "motivasi islam", "agama"], 
        main: "nonfiksi", sub: "motivasi", price: 73892, 
        img: "https://down-tx-id.img.susercontent.com/sg-11134201-23020-g5bbllf7g5mvd9.webp", 
        links: { shopee: "https://s.shopee.co.id/13H8JZDbR", tokopedia: "", lazada: "" }, status: "bestseller" 
    },
    { 
        title: "Petualangan Don Quixote", 
        author: "Miguel De Cervantes", 
        publisher: "Shira Media", year: 2019, pages: 844, isbn: "978-602-526-478-9",
        desc: "Karya sastra klasik tentang bangsawan yang terobsesi menjadi kesatria. Lucu, satir, dan penuh petualangan melawan kincir angin.",
        keywords: ["don quixote", "sastra klasik", "petualangan"], 
        main: "fiksi", sub: "klasik", price: 36750, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-7r98t-lqvf0igir4hp0c.webp", 
        links: { shopee: "https://s.shopee.co.id/3Vd9Iqaemg", tokopedia: "", lazada: "" }, status: "ready" 
    },
    { 
        title: "Nanti Juga Sembuh Sendiri", 
        author: "Helo Bagas", 
        publisher: "Gradien Mediatama", year: 2020, pages: 188, isbn: "978-602-208-189-0",
        desc: "Buku self-improvement yang relate dengan anak muda. Membahas patah hati, kegagalan, dan cara berdamai dengan diri sendiri.",
        keywords: ["self improvement", "healing", "psikologi"], 
        main: "nonfiksi", sub: "motivasi", price: 79000, 
        img: "https://down-bs-id.img.susercontent.com/ffb4ca321a33d8a02d21e8351b453b28.webp", 
        links: { shopee: "https://s.shopee.co.id/AKTTRbJ8Fr", tokopedia: "", lazada: "" }, status: "bestseller" 
    },
    { 
        title: "Hujan", 
        author: "Tere Liye", 
        publisher: "Gramedia Pustaka Utama", year: 2016, pages: 320, isbn: "978-602-032-478-4",
        desc: "Novel Sci-Fi Romantis tentang Lail dan Esok yang dipertemukan oleh bencana alam. Tentang persahabatan, cinta, dan melupakan.",
        keywords: ["hujan", "tere liye", "novel remaja", "fiksi"], 
        main: "fiksi", sub: "novel", price: 85500, 
        img: "https://down-bs-id.img.susercontent.com/sg-11134201-22120-gdbg2iotbykv3d.webp", 
        links: { shopee: "https://s.shopee.co.id/gIxvyqupV", tokopedia: "", lazada: "" }, status: "bestseller" 
    },
    { 
        title: "My Lecturer My Husband", 
        author: "Gitlicious", 
        publisher: "RDM Publishers", year: 2018, pages: 360, isbn: "978-602-516-920-5",
        desc: "Kisah Inggit yang dijodohkan dengan Pak Arya, dosen killer di kampusnya. Cerita benci jadi cinta yang menggemaskan.",
        keywords: ["romansa", "wattpad", "kampus", "cinta"], 
        main: "fiksi", sub: "romansa", price: 34999, 
        img: "https://down-bs-id.img.susercontent.com/0433370059fdcf5dbeee9a99b74a9c7e.webp", 
        links: { shopee: "https://s.shopee.co.id/5AlNWlFGw2", tokopedia: "", lazada: "" }, status: "ready" 
    },
    { 
        title: "Be Calm, Be Happy", 
        author: "Johan Anggara", 
        publisher: "Jendela Penerbit", year: 2019, pages: 200, isbn: "978-623-712-345-6",
        desc: "Rahasia bersikap tenang dalam segala kondisi. Teknik mengelola emosi dan berpikir jernih di tengah kekacauan.",
        keywords: ["tenang", "bahagia", "motivasi", "stress"], 
        main: "nonfiksi", sub: "motivasi", price: 64000, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-8224w-mi144ymso5xd95.webp", 
        links: { shopee: "https://s.shopee.co.id/Lg7lxeNp5", tokopedia: "", lazada: "" }, status: "ready" 
    },
    { 
        title: "The Principles Of Power", 
        author: "Dion Yulianto", 
        publisher: "Jendela Penerbit", year: 2020, pages: 248, isbn: "978-623-888-112-3",
        desc: "Rahasia psikologi untuk memenangkan negosiasi dan menjadi pribadi yang dominan namun disukai.",
        keywords: ["manipulasi", "karir", "bisnis"], 
        main: "nonfiksi", sub: "bisnis", price: 59999, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-8224w-mg8xjr25v3ew1f.webp", 
        links: { shopee: "https://s.shopee.co.id/5AlNWuODWQ", tokopedia: "", lazada: "" }, status: "ready" 
    },
    { 
        title: "Berdamai Dengan Diri Sendiri (Lite)", 
        author: "Muthia Sayekti", 
        publisher: "Embrase", year: 2021, pages: 120, isbn: "978-602-555-123-4",
        desc: "Seni menerima diri apa adanya. Buku saku ringan untuk berhenti membenci diri sendiri dan mulai mencintai kekurangan.",
        keywords: ["menerima diri", "self love", "damai"], 
        main: "nonfiksi", sub: "motivasi", price: 25550, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-7r98u-lxt511t2kvmm33.webp", 
        links: { shopee: "https://s.shopee.co.id/qcON1zJMm", tokopedia: "", lazada: "" }, status: "ready" 
    },
    { 
        title: "Paket Novel Fiksi Kerajaan", 
        author: "Kumpulan Penulis", 
        publisher: "Penerbit Indie", year: 2022, pages: 1200, isbn: "PAKET-EKSKLUSIF-01",
        desc: "Paket hemat novel fiksi sejarah Nusantara. Kisah epik intrik istana dan percintaan terlarang.",
        keywords: ["kerajaan", "sejarah", "fiksi sejarah"], 
        main: "fiksi", sub: "sejarah_fiksi", price: 87000, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-7rasg-m330rjubteqda3.webp", 
        links: { shopee: "https://s.shopee.co.id/AKTTgXaRfu", tokopedia: "", lazada: "" }, status: "ready" 
    },
    { 
        title: "The Alpha Girls Guide", 
        author: "Henry Manampiring", 
        publisher: "GagasMedia", year: 2020, pages: 280, isbn: "978-979-780-954-6",
        desc: "Panduan menjadi cewek keren, mandiri, dan berkelas. Membahas pendidikan, karir, dan percintaan.",
        keywords: ["alpha female", "wanita karir", "mandiri"], 
        main: "nonfiksi", sub: "motivasi", price: 79200, 
        img: "https://down-bs-id.img.susercontent.com/sg-11134201-22100-pns3coq93vivd6.webp", 
        links: { shopee: "https://s.shopee.co.id/30gsx7AhsD", tokopedia: "", lazada: "" }, status: "bestseller" 
    },
    { 
        title: "Jadilah Baik Walaupun Dunia Jahat", 
        author: "Ashana Nada", 
        publisher: "TransMedia Pustaka", year: 2021, pages: 180, isbn: "978-623-710-099-1",
        desc: "Buku ini mengingatkan kita untuk tetap sabar dan ikhlas meski dunia sering tidak adil.",
        keywords: ["kebaikan", "sabar", "motivasi"], 
        main: "nonfiksi", sub: "motivasi", price: 52000, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-7ra0t-md5fr2kvxh0jfb.webp", 
        links: { shopee: "https://s.shopee.co.id/5fhe83uo1U", tokopedia: "", lazada: "" }, status: "ready" 
    },
    { 
        title: "Berdamai Dengan Rasa Malas", 
        author: "Tim Embrase", 
        publisher: "Embrase", year: 2022, pages: 140, isbn: "978-602-555-567-8",
        desc: "Teknik Kaizen dan manajemen waktu untuk melawan rasa mager dan menunda pekerjaan.",
        keywords: ["produktif", "disiplin", "malas"], 
        main: "nonfiksi", sub: "panduan", price: 25500, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-7rbk8-m8wzai0p3s3faf.webp", 
        links: { shopee: "https://s.shopee.co.id/30gsxDY3wF", tokopedia: "", lazada: "" }, status: "ready" 
    },
    { 
        title: "Umur 40 Kok Gini Amat?", 
        author: "Han Seonghee", 
        publisher: "Penerbit Haru", year: 2019, pages: 312, isbn: "978-623-735-102-3",
        desc: "Psikologi menenangkan tentang krisis paruh baya dan kegelisahan orang dewasa.",
        keywords: ["midlife crisis", "umur 40", "dewasa"], 
        main: "nonfiksi", sub: "motivasi", price: 9762, 
        img: "https://down-bs-id.img.susercontent.com/sg-11134201-7rd70-m7q09bgr5g1kba.webp", 
        links: { shopee: "https://s.shopee.co.id/2qNSkxGEKM", tokopedia: "", lazada: "" }, status: "flashsale" 
    },
    { 
        title: "Hidup Tanpa Rasa Insecure", 
        author: "Tim Embrase", 
        publisher: "Embrase", year: 2021, pages: 160, isbn: "978-602-555-789-0",
        desc: "Membongkar akar masalah insecure dan langkah praktis membangun kepercayaan diri.",
        keywords: ["insecure", "percaya diri", "mental health"], 
        main: "nonfiksi", sub: "motivasi", price: 42000, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-7ra0g-mbsyk3ltihk4a7.webp", 
        links: { shopee: "https://s.shopee.co.id/5q14KWPSUf", tokopedia: "", lazada: "" }, status: "ready" 
    },
    { 
        title: "Dompet Ayah Sepatu Ibu", 
        author: "J.S Khairen", 
        publisher: "Gramedia Widiasarana", year: 2023, pages: 340, isbn: "978-602-052-998-1",
        desc: "Kisah perjuangan orang tua dan anak rantau. Jenaka namun sangat menyentuh hati.",
        keywords: ["keluarga", "ayah ibu", "novel sedih"], 
        main: "fiksi", sub: "novel", price: 88000, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-7r98s-lnqpgo7msd5212.webp", 
        links: { shopee: "https://s.shopee.co.id/9KawV0Fb5N", tokopedia: "", lazada: "" }, status: "bestseller" 
    },
    { 
        title: "Slow Living", 
        author: "Syalmahat Team", 
        publisher: "Syalmahat Publishing", year: 2022, pages: 190, isbn: "978-623-956-112-2",
        desc: "Mengajakmu melambat di dunia yang serba cepat. Menemukan kebahagiaan dalam kesederhanaan.",
        keywords: ["gaya hidup", "tenang", "slow living"], 
        main: "nonfiksi", sub: "motivasi", price: 33745, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-7qula-lhd5zri1u2eja8.webp", 
        links: { shopee: "https://s.shopee.co.id/qcONQKCyr", tokopedia: "", lazada: "" }, status: "ready" 
    },
    { 
        title: "Dark Psychology & Manipulation", 
        author: "Unknown", 
        publisher: "Indoliterasi", year: 2021, pages: 250, isbn: "978-602-086-999-9",
        desc: "Memahami sisi gelap pikiran manusia, teknik manipulasi, dan pertahanan diri mental.",
        keywords: ["psikologi gelap", "manipulasi", "dark psychology"], 
        main: "nonfiksi", sub: "motivasi", price: 66000, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-7ra0i-mcwykfhrv8602d.webp", 
        links: { shopee: "https://s.shopee.co.id/6VGl7sbHvc", tokopedia: "", lazada: "" }, status: "ready" 
    },
    { 
        title: "Ketika Kemenangan Menjadi Kenangan", 
        author: "Zetta Saja", 
        publisher: "Ranah Buku", year: 2020, pages: 210, isbn: "978-623-999-111-1",
        desc: "Novel tentang perjuangan meraih mimpi dan menyikapi kesuksesan yang berlalu.",
        keywords: ["novel", "kenangan", "fiksi"], 
        main: "fiksi", sub: "novel", price: 49000, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-8224s-mhx2lh3x026e31.webp", 
        links: { shopee: "https://s.shopee.co.id/5fhe8OdWWn", tokopedia: "", lazada: "" }, status: "ready" 
    },
    { 
        title: "Teruntuk Masa Kecil", 
        author: "Gagas Rofie Fauzie", 
        publisher: "GagasMedia", year: 2019, pages: 180, isbn: "978-979-780-888-8",
        desc: "Kumpulan tulisan puitis untuk menyembuhkan luka batin masa kecil (inner child).",
        keywords: ["masa kecil", "memori", "self improvement"], 
        main: "nonfiksi", sub: "motivasi", price: 68530, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-7r98v-lodh906gywm123.webp", 
        links: { shopee: "https://s.shopee.co.id/6AdujQCAuq", tokopedia: "", lazada: "" }, status: "ready" 
    },
    { 
        title: "Sebuah Seni untuk Memahami Kekasih", 
        author: "Agus Mulyadi", 
        publisher: "Shira Media", year: 2018, pages: 200, isbn: "978-602-123-456-7",
        desc: "Buku kocak yang membahas dinamika hubungan asmara yang rumit dengan bahasa santai.",
        keywords: ["hubungan", "cinta", "romansa"], 
        main: "nonfiksi", sub: "motivasi", price: 41650, 
        img: "https://down-bs-id.img.susercontent.com/id-11134207-7r98t-lr6twfzhp7pl8c.webp", 
        links: { shopee: "https://s.shopee.co.id/qcONg0oxr", tokopedia: "", lazada: "" }, status: "ready" 
    }
];