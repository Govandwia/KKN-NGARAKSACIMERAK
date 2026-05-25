"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Plus, LogOut, Trash2, Edit, LayoutDashboard, Loader2 } from "lucide-react";
import Link from "next/link";
import { Article } from "@/data/articles";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AsteriskLines } from "@/components/Decorations";

export default function RedaksiDashboard() {
    const router = useRouter();
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loadingArticles, setLoadingArticles] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push("/redaksi/login");
            } else {
                setUser(currentUser);
                setLoadingAuth(false);
                fetchArticles();
            }
        });
        return () => unsubscribe();
    }, [router]);

    const fetchArticles = async () => {
        setLoadingArticles(true);
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
            setLoadingArticles(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.")) {
            try {
                await deleteDoc(doc(db, "articles", id));
                setArticles(articles.filter(a => a.id !== id));
            } catch (error) {
                console.error("Error deleting article:", error);
                alert("Gagal menghapus artikel.");
            }
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/redaksi/login");
    };

    if (loadingAuth) {
        return <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950"><Loader2 className="w-8 h-8 animate-spin text-zinc-400" /></div>;
    }

    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50 text-foreground">
            
            {/* Minimalist Topbar */}
            <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2 font-bold font-sans">
                        <LayoutDashboard className="h-5 w-5 text-[#EB9365]" />
                        <span>CMS Ngaraksa</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden sm:inline-block">
                            {user?.email}
                        </span>
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                            <LogOut className="h-4 w-4" />
                            Keluar
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard Artikel</h1>
                        <p className="text-muted-foreground mt-1">Kelola publikasi dan konten website KKN.</p>
                    </div>
                    <Link href="/redaksi/tulis">
                        <Button className="bg-[#EB9365] text-white hover:bg-[#d7794a] gap-2">
                            <Plus className="h-4 w-4" />
                            Buat Artikel Baru
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Semua Artikel</CardTitle>
                        <CardDescription>
                            Daftar artikel yang telah dipublikasikan di website.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loadingArticles ? (
                            <div className="flex justify-center p-8">
                                <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
                            </div>
                        ) : articles.length === 0 ? (
                            <div className="text-center p-8 text-muted-foreground">
                                Belum ada artikel yang dipublikasikan.
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Judul Artikel</TableHead>
                                        <TableHead className="hidden md:table-cell">Kategori</TableHead>
                                        <TableHead className="hidden sm:table-cell">Tanggal</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {articles.map((article) => (
                                        <TableRow key={article.id}>
                                            <TableCell>
                                                <div className="font-medium">{article.title}</div>
                                                <div className="text-xs text-muted-foreground">/{article.slug}</div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-zinc-800 dark:text-zinc-300">
                                                    {article.category}
                                                </span>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                                                {article.date}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => alert("Fitur edit akan datang.")} title="Edit">
                                                        <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id!)} title="Hapus">
                                                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
