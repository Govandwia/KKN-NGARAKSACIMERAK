"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Article } from "@/data/articles";
import { AsteriskLines } from "@/components/Decorations";

export default function ArticlePage() {
    const params = useParams();
    const slug = params.slug as string;
    
    const [article, setArticle] = useState<Article | null>(null);
    const [prevArticle, setPrevArticle] = useState<Article | null>(null);
    const [nextArticle, setNextArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticleData = async () => {
            if (!slug) return;
            try {
                // Decode slug safely
                const normalizedSlug = decodeURIComponent(slug).replace(/\s+/g, '-').toLowerCase();

                // Fetch all articles to determine prev/next easily (since typically not thousands of articles)
                const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                
                const allArticles: Article[] = [];
                querySnapshot.forEach((doc) => {
                    allArticles.push({ id: doc.id, ...doc.data() } as Article);
                });

                const currentIndex = allArticles.findIndex(a => a.slug === normalizedSlug || a.slug === slug);
                
                if (currentIndex === -1) {
                    setArticle(null);
                } else {
                    setArticle(allArticles[currentIndex]);
                    setPrevArticle(currentIndex > 0 ? allArticles[currentIndex - 1] : null);
                    setNextArticle(currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null);
                }
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticleData();
    }, [slug]);

    if (loading) {
        return (
            <main className="min-h-screen bg-white dark:bg-zinc-950 text-foreground flex items-center justify-center">
                <Navbar />
                <AsteriskLines className="w-16 h-16 text-[#EB9365] animate-[spin_3s_linear_infinite]" />
            </main>
        );
    }

    if (!article) {
        return (
            <main className="min-h-screen bg-white dark:bg-zinc-950 text-foreground flex flex-col items-center justify-center gap-4">
                <Navbar />
                <h1 className="text-4xl font-bold">Artikel Tidak Ditemukan</h1>
                <Link href="/artikel" className="text-[#EB9365] hover:underline">Kembali ke Berita</Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white dark:bg-zinc-950 text-foreground transition-colors duration-300 font-sans">
            <Navbar />
            
            {/* Hero Image Section (Full Width / Modern) */}
            <div className="relative w-full h-[50vh] md:h-[70vh] mt-20 md:mt-0">
                <Image
                    src={article.image || "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Back Button Overlay */}
                <div className="absolute top-8 left-4 md:left-12 z-10">
                    <Link href="/artikel" className="inline-flex items-center gap-2 text-white font-medium hover:text-[#EB9365] transition-colors bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Kembali</span>
                    </Link>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 lg:px-24">
                    <div className="max-w-4xl">
                        <div className="inline-block bg-[#EB9365] text-black px-3 py-1 font-mono text-xs font-bold uppercase mb-4 rounded-sm">
                            {article.category}
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white leading-tight mb-6">
                            {article.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/80 text-sm md:text-base font-medium">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center text-white font-bold text-xs">
                                    {article.author ? article.author.charAt(0) : "A"}
                                </div>
                                <span>{article.author}</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-white/50"></span>
                            <span>{article.date}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
                <div className="max-w-3xl mx-auto flex flex-col gap-10">
                    
                    {/* Share Action */}
                    <div className="flex justify-end pb-6 border-b border-zinc-200 dark:border-zinc-800">
                        <button className="flex items-center gap-2 text-zinc-500 hover:text-[#EB9365] transition-colors font-medium">
                            <Share2 className="w-5 h-5" />
                            <span>Bagikan Artikel</span>
                        </button>
                    </div>

                    {/* Excerpt / Lead */}
                    <p className="text-xl md:text-2xl font-serif text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                        {article.excerpt}
                    </p>

                    {/* Main Content */}
                    <article 
                        className="prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-sans prose-headings:font-bold prose-headings:text-black dark:prose-headings:text-white prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-loose prose-a:text-[#EB9365] hover:prose-a:text-[#d7794a] prose-blockquote:border-l-4 prose-blockquote:border-[#EB9365] prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-900 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-img:rounded-xl prose-img:shadow-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                </div>
            </div>

            {/* Pagination / Next Prev Articles */}
            <div className="bg-zinc-100 dark:bg-zinc-900 py-16 border-t border-zinc-200 dark:border-zinc-800">
                <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                    <h3 className="text-2xl font-bold mb-12 text-center text-black dark:text-white">Baca Artikel Lainnya</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Prev Article */}
                        {prevArticle ? (
                            <Link href={`/artikel/${prevArticle.slug}`} className="group flex flex-col gap-4 p-6 bg-white dark:bg-black rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-[#EB9365] dark:hover:border-[#EB9365] hover:shadow-xl transition-all">
                                <span className="flex items-center gap-2 text-sm font-medium text-zinc-500 group-hover:text-[#EB9365] transition-colors">
                                    <ChevronLeft className="w-4 h-4" />
                                    Artikel Sebelumnya
                                </span>
                                <span className="text-lg md:text-xl font-bold text-black dark:text-white line-clamp-2">
                                    {prevArticle.title}
                                </span>
                            </Link>
                        ) : <div></div>}

                        {/* Next Article */}
                        {nextArticle ? (
                            <Link href={`/artikel/${nextArticle.slug}`} className="group flex flex-col gap-4 p-6 bg-white dark:bg-black rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-[#EB9365] dark:hover:border-[#EB9365] hover:shadow-xl transition-all text-right items-end">
                                <span className="flex items-center gap-2 text-sm font-medium text-zinc-500 group-hover:text-[#EB9365] transition-colors">
                                    Artikel Selanjutnya
                                    <ChevronRight className="w-4 h-4" />
                                </span>
                                <span className="text-lg md:text-xl font-bold text-black dark:text-white line-clamp-2">
                                    {nextArticle.title}
                                </span>
                            </Link>
                        ) : <div></div>}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
