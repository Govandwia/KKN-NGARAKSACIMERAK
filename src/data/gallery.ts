export type Category = "Semua" | "Penerjunan" | "Batumalang" | "Legokjawa" | "Masawah" | "Penarikan";

export const GALLERY_CATEGORIES: Category[] = [
    "Semua", "Penerjunan", "Batumalang", "Legokjawa", "Masawah", "Penarikan"
];

// We use a generic image placeholder for now
const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop";
const PLACEHOLDER_IMG_2 = "https://images.unsplash.com/photo-1526976663112-00d1b24e6500?q=80&w=2070&auto=format&fit=crop";
const PLACEHOLDER_IMG_3 = "https://images.unsplash.com/photo-1506869640319-ce1a44e667d7?q=80&w=2070&auto=format&fit=crop";

export const ALL_PHOTOS = [
    { id: 1, title: "Persiapan Penerjunan", category: "Penerjunan", images: [PLACEHOLDER_IMG, PLACEHOLDER_IMG_2, PLACEHOLDER_IMG_3] },
    { id: 2, title: "Upacara Pelepasan", category: "Penerjunan", images: [PLACEHOLDER_IMG_2] },
    { id: 3, title: "Tiba di Cimerak", category: "Penerjunan", images: [PLACEHOLDER_IMG_3, PLACEHOLDER_IMG] },
    { id: 4, title: "Rapat Desa Batumalang", category: "Batumalang", images: [PLACEHOLDER_IMG_2, PLACEHOLDER_IMG_3] },
    { id: 5, title: "Kerja Bakti Batumalang", category: "Batumalang", images: [PLACEHOLDER_IMG] },
    { id: 6, title: "Mengajar di SD Legokjawa", category: "Legokjawa", images: [PLACEHOLDER_IMG_3, PLACEHOLDER_IMG, PLACEHOLDER_IMG_2] },
    { id: 7, title: "Penyuluhan Kesehatan Legokjawa", category: "Legokjawa", images: [PLACEHOLDER_IMG_2] },
    { id: 8, title: "Sosialisasi Digital Masawah", category: "Masawah", images: [PLACEHOLDER_IMG] },
    { id: 9, title: "Pameran UMKM Masawah", category: "Masawah", images: [PLACEHOLDER_IMG_3, PLACEHOLDER_IMG_2] },
    { id: 10, title: "Perpisahan Warga", category: "Penarikan", images: [PLACEHOLDER_IMG_2] },
    { id: 11, title: "Kembali ke Kampus", category: "Penarikan", images: [PLACEHOLDER_IMG, PLACEHOLDER_IMG_3] },
    // Tambahan dummy data agar mencapai > 16 postingan untuk test pagination
    { id: 12, title: "Diskusi Malam Batumalang", category: "Batumalang", images: [PLACEHOLDER_IMG_3] },
    { id: 13, title: "Kunjungan Puskesmas", category: "Legokjawa", images: [PLACEHOLDER_IMG] },
    { id: 14, title: "Senam Pagi Bersama", category: "Masawah", images: [PLACEHOLDER_IMG_2] },
    { id: 15, title: "Pelatihan Pertanian", category: "Batumalang", images: [PLACEHOLDER_IMG, PLACEHOLDER_IMG_3] },
    { id: 16, title: "Pengecekan Tensi Darah", category: "Legokjawa", images: [PLACEHOLDER_IMG_3] },
    { id: 17, title: "Sosialisasi Cegah Stunting", category: "Masawah", images: [PLACEHOLDER_IMG_2, PLACEHOLDER_IMG] },
    { id: 18, title: "Malam Kesenian Desa", category: "Batumalang", images: [PLACEHOLDER_IMG_3, PLACEHOLDER_IMG_2, PLACEHOLDER_IMG] },
];
