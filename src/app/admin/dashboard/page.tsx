"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs, orderBy, query, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Plus, LogOut, Trash2, Edit, LayoutDashboard, Loader2 } from "lucide-react";
import Link from "next/link";
import { Article } from "@/data/articles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    const [mounted, setMounted] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [user, setUser] = useState<any>(null);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loadingArticles, setLoadingArticles] = useState(true);
    const [activeTab, setActiveTab] = useState<"articles" | "sections" | "gallery">("articles");
    const [galleries, setGalleries] = useState<any[]>([]);
    const [sections, setSections] = useState<any[]>([]);
    const [loadingGalleries, setLoadingGalleries] = useState(true);
    
    // Modal states
    const [isAddSectionModalOpen, setIsAddSectionModalOpen] = useState(false);
    const [newSectionName, setNewSectionName] = useState("");
    const [isSavingSection, setIsSavingSection] = useState(false);

    const [isEditSectionModalOpen, setIsEditSectionModalOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<{id: string, name: string} | null>(null);
    const [isUpdatingSection, setIsUpdatingSection] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push("/admin/login");
            } else {
                setUser(currentUser);
                setLoadingAuth(false);
                fetchArticles();
                fetchGalleries();
                fetchSections();
            }
        });
        setMounted(true);
        return () => unsubscribe();
    }, [router]);

    const fetchSections = async () => {
        try {
            const q = query(collection(db, "gallery_sections"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const fetched: any[] = [];
            querySnapshot.forEach((doc) => {
                fetched.push({ id: doc.id, ...doc.data() });
            });
            setSections(fetched);
        } catch (error) {
            console.error("Error fetching sections:", error);
        }
    };

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

    const fetchGalleries = async () => {
        setLoadingGalleries(true);
        try {
            const q = query(collection(db, "galleries"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);
            const fetched: any[] = [];
            querySnapshot.forEach((doc) => {
                fetched.push({ id: doc.id, ...doc.data() });
            });
            setGalleries(fetched);
        } catch (error) {
            console.error("Error fetching galleries:", error);
        } finally {
            setLoadingGalleries(false);
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

    const handleDeleteGallery = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus album galeri ini?")) {
            try {
                await deleteDoc(doc(db, "galleries", id));
                setGalleries(galleries.filter(g => g.id !== id));
            } catch (error) {
                console.error("Error deleting gallery:", error);
                alert("Gagal menghapus galeri.");
            }
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/admin/login");
    };

    const handleAddSectionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newSectionName.trim()) return;
        setIsSavingSection(true);
        try {
            const newDoc = await addDoc(collection(db, "gallery_sections"), {
                name: newSectionName.trim(),
                createdAt: new Date().getTime() // using simple timestamp for sorting
            });
            setSections([{ id: newDoc.id, name: newSectionName.trim() }, ...sections]);
            setIsAddSectionModalOpen(false);
            setNewSectionName("");
        } catch (error) {
            console.error("Error adding section:", error);
            alert("Gagal menambahkan section.");
        } finally {
            setIsSavingSection(false);
        }
    };

    const handleEditSectionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingSection || !editingSection.name.trim()) return;
        setIsUpdatingSection(true);
        try {
            await updateDoc(doc(db, "gallery_sections", editingSection.id), {
                name: editingSection.name.trim()
            });
            setSections(sections.map(s => s.id === editingSection.id ? { ...s, name: editingSection.name.trim() } : s));
            setIsEditSectionModalOpen(false);
            setEditingSection(null);
        } catch (error) {
            console.error("Error updating section:", error);
            alert("Gagal memperbarui section.");
        } finally {
            setIsUpdatingSection(false);
        }
    };

    const handleDeleteSection = async (id: string) => {
        if (confirm("Apakah Anda yakin ingin menghapus section ini? Ini tidak menghapus galeri di dalamnya.")) {
            try {
                await deleteDoc(doc(db, "gallery_sections", id));
                setSections(sections.filter(s => s.id !== id));
            } catch (error) {
                console.error("Error deleting section:", error);
                alert("Gagal menghapus section.");
            }
        }
    };

    if (!mounted) {
        return null; // Prevent SSR hydration mismatch
    }

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
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
                        <p className="text-muted-foreground mt-1">Kelola publikasi, konten, dan galeri website KKN.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg">
                            <Button 
                                variant={activeTab === "articles" ? "default" : "ghost"} 
                                className={activeTab === "articles" ? "bg-white text-black shadow-sm dark:bg-zinc-800 dark:text-white" : ""}
                                onClick={() => setActiveTab("articles")}
                            >
                                Artikel
                            </Button>
                            <Button 
                                variant={activeTab === "sections" ? "default" : "ghost"}
                                className={activeTab === "sections" ? "bg-white text-black shadow-sm dark:bg-zinc-800 dark:text-white" : ""}
                                onClick={() => setActiveTab("sections")}
                            >
                                Section Galeri
                            </Button>
                            <Button 
                                variant={activeTab === "gallery" ? "default" : "ghost"}
                                className={activeTab === "gallery" ? "bg-white text-black shadow-sm dark:bg-zinc-800 dark:text-white" : ""}
                                onClick={() => setActiveTab("gallery")}
                            >
                                Album Galeri
                            </Button>
                        </div>
                        {activeTab === "articles" && (
                            <Link href="/admin/tulis">
                                <Button className="bg-[#EB9365] text-white hover:bg-[#d7794a] gap-2">
                                    <Plus className="h-4 w-4" />
                                    Buat Artikel Baru
                                </Button>
                            </Link>
                        )}
                        {activeTab === "sections" && (
                            <Button onClick={() => setIsAddSectionModalOpen(true)} className="bg-[#EB9365] text-white hover:bg-[#d7794a] gap-2">
                                <Plus className="h-4 w-4" />
                                Tambah Section
                            </Button>
                        )}
                        {activeTab === "gallery" && (
                            <Link href="/admin/galeri/tambah">
                                <Button className="bg-[#EB9365] text-white hover:bg-[#d7794a] gap-2">
                                    <Plus className="h-4 w-4" />
                                    Tambah Galeri
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {activeTab === "articles" ? (

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
                ) : activeTab === "sections" ? (
                <Card>
                    <CardHeader>
                        <CardTitle>Section Galeri</CardTitle>
                        <CardDescription>
                            Kelola kategori/section yang akan muncul sebagai tab filter di halaman Galeri.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {sections.length === 0 ? (
                            <div className="text-center p-8 text-muted-foreground">
                                Belum ada section yang dibuat.
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Section</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {sections.map((section) => (
                                        <TableRow key={section.id}>
                                            <TableCell>
                                                <div className="font-medium">{section.name}</div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => { setEditingSection(section); setIsEditSectionModalOpen(true); }} title="Edit">
                                                        <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteSection(section.id!)} title="Hapus">
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
                ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Album Galeri</CardTitle>
                        <CardDescription>
                            Daftar album foto kegiatan yang bersumber dari folder Google Drive.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loadingGalleries ? (
                            <div className="flex justify-center p-8">
                                <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
                            </div>
                        ) : galleries.length === 0 ? (
                            <div className="text-center p-8 text-muted-foreground">
                                Belum ada album galeri yang ditambahkan.
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Section</TableHead>
                                        <TableHead>Nama Album</TableHead>
                                        <TableHead className="hidden md:table-cell">Deskripsi</TableHead>
                                        <TableHead className="hidden sm:table-cell">ID Folder Drive</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {galleries.map((gallery) => (
                                        <TableRow key={gallery.id}>
                                            <TableCell>
                                                <span className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-0.5 text-xs font-semibold text-zinc-800 dark:text-zinc-300">
                                                    {gallery.section || "Umum"}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{gallery.name}</div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                                                {gallery.description || "-"}
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell text-sm text-muted-foreground font-mono">
                                                {gallery.folderId}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => router.push(`/admin/galeri/edit/${gallery.id}`)} title="Edit">
                                                        <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteGallery(gallery.id!)} title="Hapus">
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
                )}
            </main>

            {/* Custom Modal for Adding Section */}
            {isAddSectionModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Tambah Section Baru</h2>
                        <form onSubmit={handleAddSectionSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="sectionName">Nama Section</Label>
                                    <Input
                                        id="sectionName"
                                        placeholder="Contoh: Pra Penerjunan"
                                        value={newSectionName}
                                        onChange={(e) => setNewSectionName(e.target.value)}
                                        autoFocus
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={() => {
                                            setIsAddSectionModalOpen(false);
                                            setNewSectionName("");
                                        }}
                                    >
                                        Batal
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        className="bg-[#EB9365] text-white hover:bg-[#d7794a]"
                                        disabled={isSavingSection}
                                    >
                                        {isSavingSection ? <Loader2 className="h-4 w-4 animate-spin" /> : "Simpan"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Custom Modal for Editing Section */}
            {isEditSectionModalOpen && editingSection && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-zinc-950 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-lg w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Section</h2>
                        <form onSubmit={handleEditSectionSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="editSectionName">Nama Section</Label>
                                    <Input
                                        id="editSectionName"
                                        placeholder="Contoh: Pra Penerjunan"
                                        value={editingSection.name}
                                        onChange={(e) => setEditingSection({...editingSection, name: e.target.value})}
                                        autoFocus
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button 
                                        type="button" 
                                        variant="outline" 
                                        onClick={() => {
                                            setIsEditSectionModalOpen(false);
                                            setEditingSection(null);
                                        }}
                                    >
                                        Batal
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        className="bg-[#EB9365] text-white hover:bg-[#d7794a]"
                                        disabled={isUpdatingSection}
                                    >
                                        {isUpdatingSection ? <Loader2 className="h-4 w-4 animate-spin" /> : "Perbarui"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
