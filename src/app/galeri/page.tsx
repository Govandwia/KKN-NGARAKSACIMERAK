"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Download, Loader2 } from "lucide-react";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { fetchImagesFromDriveFolder } from "@/lib/gdrive";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri Kegiatan",
  description: "Kumpulan foto dokumentasi kegiatan, program kerja, dan keindahan alam Kecamatan Cimerak, Pangandaran.",
  openGraph: {
    title: "Galeri KKN Ngaraksa Cimerak",
    description: "Lihat momen-momen kegiatan KKN-PPM UGM Ngaraksa Cimerak."
  }
};
import { PixelStar, AsteriskLines } from "@/components/Decorations";
import { GalleryScrollZoom } from "@/components/GalleryScrollZoom";

export default function GalleryPage() {
    const [activeCategory, setActiveCategory] = useState<string>("Semua");
    const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const POSTS_PER_PAGE = 16;

    const [galleries, setGalleries] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>(["Semua"]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGalleries = async () => {
            try {
                const q = query(collection(db, "galleries"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                
                const fetchedGalleries: any[] = [];
                const uniqueCategories = new Set<string>();
                uniqueCategories.add("Semua");

                for (const document of querySnapshot.docs) {
                    const data = document.data();
                    const sectionName = data.section || "Umum";
                    uniqueCategories.add(sectionName); 
                    
                    try {
                        const driveImages = await fetchImagesFromDriveFolder(data.driveUrl);
                        if (driveImages && driveImages.length > 0) {
                            // Setiap entri galeri mewakili satu album (dengan satu nama kegiatan)
                            fetchedGalleries.push({
                                id: document.id,
                                category: sectionName,
                                title: data.name,
                                description: data.description,
                                date: data.date || "Jul 2026",
                                location: data.location || "Cimerak",
                                thumbnail: data.thumbnailUrl,
                                images: driveImages.map((img: any) => img.url)
                            });
                        }
                    } catch (err) {
                        console.error("Gagal load gambar dari drive untuk", data.name, err);
                    }
                }
                setCategories(Array.from(uniqueCategories));
                setGalleries(fetchedGalleries);
            } catch (error) {
                console.error("Error fetching galleries:", error);
            } finally {
                setLoading(false);
            }
        };
        loadGalleries();
    }, []);

    const filteredPhotos = activeCategory === "Semua" 
        ? galleries 
        : galleries.filter(p => p.category === activeCategory);

    const totalPages = Math.ceil(filteredPhotos.length / POSTS_PER_PAGE);
    const visiblePhotos = filteredPhotos.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setCurrentPage(1);
    };

    const openPhoto = (photo: any) => {
        setSelectedPhoto(photo);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const closePhoto = () => {
        setSelectedPhoto(null);
        document.body.style.overflow = 'unset';
    };

    // Inner navigation (ganti gambar dalam satu postingan)
    const navigateInner = (direction: 'next' | 'prev') => {
        if (!selectedPhoto || selectedPhoto.images.length <= 1) return;
        if (direction === 'next') {
            setCurrentImageIndex(prev => (prev + 1) % selectedPhoto.images.length);
        } else {
            setCurrentImageIndex(prev => (prev - 1 + selectedPhoto.images.length) % selectedPhoto.images.length);
        }
    };

    // Outer navigation (ganti postingan)
    const navigatePost = (direction: 'next' | 'prev') => {
        if (!selectedPhoto) return;
        const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
        if (currentIndex === -1) return;

        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % filteredPhotos.length;
        } else {
            newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        }
        setSelectedPhoto(filteredPhotos[newIndex]);
        setCurrentImageIndex(0);
    };

    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Navbar />
            
            {/* Header Spacer */}
            <div className="pt-24 md:pt-32"></div>

            {/* Brutalist Header */}
            <section className="w-full border-b border-black/10 dark:border-white/10 flex flex-col lg:flex-row min-h-[300px]">
                <div className="flex-1 p-8 md:p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10 ml-0 md:ml-4 bg-white dark:bg-[#111] relative z-10 flex flex-col justify-center">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-normal tracking-tight uppercase">
                        Galeri<br/>Momen
                    </h1>
                    <p className="mt-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
                        Arsip digital KKN PPM UGM 2026 Ngaraksa Cimerak. Tangkapan lensa dari setiap perjalanan, pengabdian, dan tawa di Masawah, Legokjawa, dan Batumalang.
                    </p>
                </div>
                
                <div className="w-full lg:w-[45%] bg-[#FBA0A0] dark:bg-[#200505] relative flex items-center justify-center p-12 overflow-hidden border-black/10 dark:border-white/10 min-h-[200px]">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                    <PixelStar className="absolute w-48 h-48 md:w-64 md:h-64 text-black/10 dark:text-[#FBA0A0]/20" />
                    <AsteriskLines className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-white dark:text-[#FBA0A0] animate-[spin_20s_linear_infinite]" />
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-8 relative z-10 py-16">
                {/* FILTER TABS - Brutalist Style */}
                <div className="flex flex-wrap justify-start lg:justify-center gap-3 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-6 py-3 font-sans font-bold uppercase tracking-wider text-xs md:text-sm transition-all duration-300 border-2 ${
                                activeCategory === cat
                                ? "bg-black border-black text-white dark:bg-white dark:border-white dark:text-black translate-x-1 translate-y-1 shadow-[[-4px_-4px_0_0_#EB9365]]"
                                : "bg-white border-black text-black hover:bg-zinc-100 dark:bg-black dark:border-white dark:text-white dark:hover:bg-zinc-900 shadow-[4px_4px_0_0_#000] dark:shadow-[4px_4px_0_0_#fff]"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* GALLERY GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12">
                    {loading ? (
                        <div className="col-span-full flex justify-center py-32">
                            <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
                        </div>
                    ) : visiblePhotos.length > 0 ? (
                        visiblePhotos.map((photo, idx) => (
                            <motion.div
                                key={photo.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.02, zIndex: 10 }}
                                onClick={() => openPhoto(photo)}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
                                className="group relative cursor-pointer"
                            >
                                {/* Brutalist Polaroid Card Container */}
                                <div className="relative w-full bg-white dark:bg-[#111] p-4 pb-16 border-2 border-black dark:border-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:group-hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)]">

                                    {/* Abstract Tape Effect */}
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-[#EB9365] z-20 -rotate-2 border-2 border-black dark:border-white transform skew-x-12 mix-blend-multiply dark:mix-blend-normal"></div>

                                    {/* Image Area */}
                                    <div className="relative w-full aspect-[4/3] bg-zinc-200 dark:bg-zinc-800 overflow-hidden mb-4 border-2 border-black dark:border-white">
                                        <Image
                                            src={photo.thumbnail || photo.images[0]}
                                            alt={photo.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        {/* Indicator for multiple images */}
                                        {photo.images.length > 1 && (
                                            <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-sm flex items-center gap-1 backdrop-blur-sm border border-white/20">
                                                <span>+{photo.images.length - 1} foto</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Caption */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="font-sans font-bold text-black dark:text-white text-base md:text-lg uppercase leading-none mb-1 truncate">{photo.title}</h3>
                                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{photo.category}</p>
                                    </div>

                                    {/* Decorative element on hover */}
                                    <div className="absolute bottom-4 right-4 bg-black dark:bg-white text-white dark:text-black p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-32 border-2 border-dashed border-black/20 dark:border-white/20">
                            <p className="font-mono text-zinc-500 uppercase tracking-widest">Belum ada dokumentasi untuk kategori ini.</p>
                        </div>
                    )}
                </div>

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-16">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-3 bg-white border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#EB9365] transition-colors shadow-[4px_4px_0_0_#000]"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        
                        <div className="font-mono font-bold text-lg px-4">
                            {currentPage} / {totalPages}
                        </div>

                        <button 
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-3 bg-white border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#EB9365] transition-colors shadow-[4px_4px_0_0_#000]"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>

            {/* PHOTO DETAIL MODAL */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-8 bg-zinc-900/90 backdrop-blur-sm"
                        onClick={closePhoto}
                    >
                        {/* Modal Content - Brutalist Split Layout */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full h-full md:max-w-7xl md:h-[85vh] bg-white dark:bg-[#0a0a0a] flex flex-col md:flex-row border-4 border-black dark:border-white overflow-hidden shadow-[16px_16px_0_0_#EB9365]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closePhoto}
                                className="absolute top-4 right-4 md:top-6 md:right-6 z-[70] p-2 bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white hover:bg-[#EB9365] dark:hover:bg-[#EB9365] transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Outer Navigation Left (Next Post) - Desktop */}
                            <button
                                onClick={(e) => { e.stopPropagation(); navigatePost('prev'); }}
                                className="absolute -left-16 md:-left-24 top-1/2 -translate-y-1/2 p-4 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#EB9365] dark:hover:bg-[#EB9365] transition-all hidden lg:flex shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff]"
                                title="Postingan Sebelumnya"
                            >
                                <ChevronLeft className="w-8 h-8" />
                            </button>

                            {/* Main Image Container */}
                            <div className="relative flex-1 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center group h-[50vh] md:h-full p-4 border-b-4 md:border-b-0 md:border-r-4 border-black dark:border-white overflow-hidden">
                                
                                {/* Background Grid Pattern */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                                <div className="relative w-full h-full p-4 md:p-12 flex items-center justify-center z-10">
                                    <div className="relative w-full h-full max-h-full border-4 border-black dark:border-white bg-black/5 dark:bg-white/5 shadow-[8px_8px_0_0_rgba(0,0,0,0.2)] flex items-center justify-center">
                                        <Image
                                            src={selectedPhoto.images[currentImageIndex]}
                                            alt={`${selectedPhoto.title} - Foto ${currentImageIndex + 1}`}
                                            fill
                                            className="object-contain p-2"
                                            sizes="100vw"
                                            priority
                                        />
                                    </div>
                                </div>

                                {/* Inner Navigation Buttons (Swipe Image) */}
                                {selectedPhoto.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); navigateInner('prev'); }}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#F6E769] dark:hover:bg-[#F6E769] dark:hover:text-black transition-all z-20 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]"
                                            title="Foto Sebelumnya"
                                        >
                                            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); navigateInner('next'); }}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#F6E769] dark:hover:bg-[#F6E769] dark:hover:text-black transition-all z-20 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]"
                                            title="Foto Selanjutnya"
                                        >
                                            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                                        </button>

                                        {/* Image Pagination Dots */}
                                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                                            {selectedPhoto.images.map((_, i) => (
                                                <div 
                                                    key={i} 
                                                    className={`w-3 h-3 border-2 border-black dark:border-white transition-all duration-300 ${currentImageIndex === i ? 'bg-[#EB9365] scale-125' : 'bg-white dark:bg-black'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Info Sidebar (Brutalist Scrapbook) */}
                            <div className="w-full md:w-[450px] relative flex flex-col h-auto md:h-full bg-[#CCF7C9] dark:bg-[#051105]">
                                
                                {/* Content Scrollable Area */}
                                <div className="relative z-10 p-6 md:p-10 flex flex-col h-full overflow-y-auto">

                                    <div className="mb-auto mt-4">
                                        {/* Category Badge */}
                                        <div className="inline-block px-4 py-1 border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white text-[10px] font-mono font-bold uppercase tracking-widest mb-6 shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff]">
                                            {selectedPhoto.category}
                                        </div>

                                        <h3 className="text-3xl md:text-5xl font-sans font-bold text-black dark:text-white uppercase leading-none mb-6 tracking-tight">
                                            {selectedPhoto.title}
                                        </h3>

                                        <div className="w-full h-1 bg-black/20 dark:bg-white/20 mb-6"></div>

                                        <p className="text-black/70 dark:text-white/70 text-sm md:text-base leading-relaxed mb-8 font-sans">
                                            {selectedPhoto.description || "Ini adalah bagian deskripsi foto. Anda dapat menambahkan cerita atau momen penting yang terjadi di balik tangkapan lensa ini."}
                                        </p>

                                        {/* Metadata Grid */}
                                        <div className="grid grid-cols-2 gap-y-4 gap-x-4 p-4 border-2 border-black dark:border-white bg-white/50 dark:bg-black/50">
                                            <div>
                                                <p className="font-mono text-black/50 dark:text-white/50 text-[10px] uppercase mb-1">Tanggal</p>
                                                <p className="text-black dark:text-white font-bold text-sm">{selectedPhoto.date}</p>
                                            </div>
                                            <div>
                                                <p className="font-mono text-black/50 dark:text-white/50 text-[10px] uppercase mb-1">Lokasi</p>
                                                <p className="text-black dark:text-white font-bold text-sm">{selectedPhoto.location}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-6 border-t-2 border-black/20 dark:border-white/20">
                                        <div className="flex gap-3">
                                            {/* Mobile Nav */}
                                            {/* Outer Navigation Left (Mobile/Tablet) */}
                                            <button
                                                onClick={() => navigatePost('prev')}
                                                className="flex-none p-4 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white lg:hidden"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>

                                            <a
                                                href={selectedPhoto.images[currentImageIndex]}
                                                download
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 flex items-center justify-center gap-2 py-4 bg-black dark:bg-white text-white dark:text-black font-sans font-bold uppercase tracking-wider border-2 border-black dark:border-white hover:bg-[#EB9365] hover:text-black dark:hover:bg-[#EB9365] transition-colors"
                                            >
                                                <Download className="w-5 h-5" />
                                                <span>Unduh</span>
                                            </a>

                                            {/* Outer Navigation Right (Mobile/Tablet) */}
                                            <button
                                                onClick={() => navigatePost('next')}
                                                className="flex-none p-4 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white lg:hidden"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Outer Navigation Right (Next Post) - Desktop */}
                            <button
                                onClick={(e) => { e.stopPropagation(); navigatePost('next'); }}
                                className="absolute -right-16 md:-right-24 top-1/2 -translate-y-1/2 p-4 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white hover:bg-[#EB9365] dark:hover:bg-[#EB9365] transition-all hidden lg:flex shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff]"
                                title="Postingan Selanjutnya"
                            >
                                <ChevronRight className="w-8 h-8" />
                            </button>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <GalleryScrollZoom />
            <Footer />
        </main>
    );
}
