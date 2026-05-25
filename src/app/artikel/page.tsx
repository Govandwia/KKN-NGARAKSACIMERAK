"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowUpRight } from "lucide-react";
import { AsteriskLines } from "@/components/Decorations";
import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Article } from "@/data/articles";

export default function ArtikelPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const fetchedArticles: Article[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedArticles.push({ id: doc.id, ...doc.data() } as Article);
                });
                setArticles(fetchedArticles);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-foreground transition-colors duration-300">
            <Navbar />
            
            {/* Header Spacer */}
            <div className="pt-24 md:pt-32"></div>

            {/* Brutalist Header */}
            <section className="w-full border-b border-black/20 dark:border-white/20 px-8 py-16 md:p-24 relative overflow-hidden bg-[#EB9365] dark:bg-[#4a2614] text-black dark:text-white">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
                
                <div className="relative z-10 max-w-5xl">
                    <div className="inline-flex items-center gap-4 mb-8">
                        <AsteriskLines className="w-12 h-12 animate-[spin_10s_linear_infinite]" />
                        <span className="font-mono uppercase tracking-widest text-sm md:text-base font-bold">Kabar dari Lapangan</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-black tracking-tight uppercase leading-[0.9]">
                        Berita <br/> & Cerita
                    </h1>
                    <p className="mt-8 max-w-2xl text-lg md:text-xl font-medium border-l-4 border-black dark:border-white pl-6">
                        Catatan perjalanan, liputan program, dan opini dari tim KKN PPM UGM Ngaraksa Cimerak 2026.
                    </p>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="container mx-auto px-4 md:px-8 py-16 md:py-24">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <AsteriskLines className="w-16 h-16 text-[#EB9365] animate-[spin_3s_linear_infinite]" />
                    </div>
                ) : articles.length === 0 ? (
                    <div className="text-center py-20 font-mono text-zinc-500 uppercase">
                        Belum ada artikel yang diterbitkan.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {articles.map((article) => (
                            <Link href={`/artikel/${article.slug}`} key={article.id} className="group block h-full">
                                <article className="flex flex-col h-full bg-white dark:bg-zinc-900 border-4 border-black dark:border-white transition-transform duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2 shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#fff] group-hover:shadow-[16px_16px_0_0_#EB9365] dark:group-hover:shadow-[16px_16px_0_0_#EB9365]">
                                    
                                    {/* Image Container */}
                                    <div className="relative w-full aspect-[16/10] overflow-hidden border-b-4 border-black dark:border-white bg-zinc-200">
                                        <Image
                                            src={article.image || "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop"}
                                            alt={article.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4 bg-[#F6E769] text-black px-3 py-1 font-mono text-xs font-bold uppercase border-2 border-black shadow-[4px_4px_0_0_#000]">
                                            {article.category}
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                                        <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase leading-tight mb-4 text-black dark:text-white group-hover:text-[#EB9365] transition-colors">
                                            {article.title}
                                        </h2>
                                        
                                        <p className="text-zinc-600 dark:text-zinc-400 mb-8 flex-grow line-clamp-3">
                                            {article.excerpt}
                                        </p>

                                        {/* Footer / Meta */}
                                        <div className="flex items-center justify-between pt-6 border-t-2 border-black/10 dark:border-white/10 mt-auto">
                                            <div className="flex flex-col">
                                                <span className="font-mono text-xs font-bold uppercase text-black dark:text-white">{article.author}</span>
                                                <span className="font-mono text-[10px] text-zinc-500">{article.date}</span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center group-hover:bg-[#EB9365] transition-colors">
                                                <ArrowUpRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>

                                </article>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
            
            <Footer />
        </main>
    );
}
