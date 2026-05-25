export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // HTML or Markdown content
    author: string;
    date: string;
    category: string;
    image: string;
}

const PLACEHOLDER_IMG_1 = "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop";
const PLACEHOLDER_IMG_2 = "https://images.unsplash.com/photo-1526976663112-00d1b24e6500?q=80&w=2070&auto=format&fit=crop";
const PLACEHOLDER_IMG_3 = "https://images.unsplash.com/photo-1506869640319-ce1a44e667d7?q=80&w=2070&auto=format&fit=crop";

export const ARTICLES: Article[] = [
    {
        id: "1",
        slug: "penerjunan-mahasiswa-kkn-ugm-cimerak-2026",
        title: "Penerjunan Mahasiswa KKN Ngaraksa Cimerak 2026",
        excerpt: "Mahasiswa UGM resmi diterjunkan di Kecamatan Cimerak untuk mengabdi dan bersinergi dengan masyarakat lokal.",
        content: `
            <p><strong>Cimerak</strong> – Semangat pengabdian membara di wajah para mahasiswa Universitas Gadjah Mada (UGM) yang tergabung dalam Tim KKN-PPM Unit Ngaraksa Cimerak 2026. Mereka resmi diterjunkan untuk memulai masa pengabdian selama 50 hari di Kecamatan Cimerak.</p>
            
            <p>Acara penyambutan berlangsung hangat di Kantor Kecamatan. Camat Cimerak menyambut baik kehadiran mahasiswa dan berharap program-program yang dibawa dapat memberikan dampak nyata bagi masyarakat, khususnya dalam sektor pariwisata, pendidikan, dan UMKM yang menjadi fokus utama tema KKN tahun ini.</p>

            <h3>Fokus Utama: Sinergi dan Kolaborasi</h3>
            <p>Dengan mengusung tema <em>"Ngaraksa"</em> (Menjaga), KKN Cimerak berfokus pada pelestarian alam dan kolaborasi erat dengan warga lokal. Kormanit KKN, dalam sambutannya, menegaskan bahwa mahasiswa hadir bukan untuk menggurui, melainkan untuk belajar dan tumbuh bersama masyarakat.</p>

            <blockquote>"Kami datang membawa semangat dan ilmu, namun kami sadar pengalaman bapak-ibu sekalian adalah guru terbaik bagi kami. Mari kita bersinergi membangun Cimerak," ujarnya.</blockquote>

            <p>Setelah upacara, mahasiswa langsung menuju lokasi penempatan masing-masing di desa-desa seperti Batumalang, Legokjawa, dan Masawah untuk melakukan observasi awal dan silaturahmi dengan perangkat desa setempat.</p>
        `,
        author: "Tim Publikasi",
        date: "01 Juli 2026",
        category: "Berita Utama",
        image: PLACEHOLDER_IMG_1
    },
    {
        id: "2",
        slug: "potensi-wisata-pantai-cimerak",
        title: "Menyingkap Surga Tersembunyi di Pesisir Cimerak",
        excerpt: "Kecamatan Cimerak tidak hanya kaya akan hasil laut, tetapi juga menyimpan pesona alam pesisir yang memukau dan belum tergarap maksimal.",
        content: `
            <p>Cimerak tidak hanya kaya akan hasil bumi, tetapi juga menyimpan pesona alam pesisir yang memukau. Pantai-pantai di sekitar Cimerak, dengan ciri khas bebatuan karang dan pasir putih yang masih alami, menjadi daya tarik utama yang belum tergarap maksimal.</p>

            <p>Tim KKN Cimerak melakukan pemetaan potensi wisata di kawasan ini. "Kami melihat potensi <em>ecotourism</em> yang kuat. Lanskap ini punya nilai estetika dan geologi yang tinggi," ujar salah satu anggota tim pariwisata.</p>
            
            <p>Rencana ke depan meliputi pembuatan peta wisata digital, pelatihan sadar wisata untuk pemuda lokal, dan penataan area spot foto yang menarik tanpa merusak ekosistem alam. Diharapkan langkah ini dapat membuka lapangan kerja baru bagi pemuda desa di sektor ekonomi kreatif.</p>

            <h3>Mengutamakan Kelestarian (Ngaraksa)</h3>
            <p>Sesuai dengan nama unit KKN "Ngaraksa", setiap program pengembangan wisata wajib menyertakan amdal mini dan pendekatan ramah lingkungan. Kami percaya pariwisata yang baik adalah pariwisata yang tidak merusak rumahnya sendiri.</p>
        `,
        author: "Divisi Pariwisata",
        date: "05 Juli 2026",
        category: "Opini & Potensi",
        image: PLACEHOLDER_IMG_2
    },
    {
        id: "3",
        slug: "digitalisasi-umkm-cimerak",
        title: "Digitalisasi UMKM: Membawa Produk Cimerak ke Pasar Global",
        excerpt: "Pelatihan digital marketing bagi pelaku UMKM di Cimerak antusias diikuti oleh ibu-ibu PKK dan kelompok tani.",
        content: `
            <p>Produk olahan lokal dari Cimerak memiliki kualitas unggulan, namun seringkali terkendala dalam pemasaran yang masih tradisional. Menjawab tantangan ini, Tim KKN mengadakan pelatihan Digital Marketing secara maraton di beberapa Balai Desa.</p>

            <p>Pelatihan ini mencakup cara memfoto produk secara profesional hanya bermodalkan HP, membuat desain kemasan sederhana, mengelola akun media sosial bisnis, hingga mendaftar dan berjualan di <em>e-commerce</em> nasional. "Ternyata mudah ya, saya jadi semangat jualan online keripik pisang saya," kata Ibu Wati, salah satu peserta pelatihan.</p>

            <p>Tindak lanjut dari pelatihan ini adalah pendampingan intensif dari rumah ke rumah selama 2 minggu penuh untuk memastikan setiap UMKM binaan memiliki minimal satu platform penjualan digital yang aktif dan mampu merespons pesanan pertama mereka.</p>
        `,
        author: "Divisi Ekonomi Kreatif",
        date: "10 Juli 2026",
        category: "Kegiatan Program",
        image: PLACEHOLDER_IMG_3
    }
];
