"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, LogOut, LayoutDashboard, Loader2 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Dynamically import ReactQuill to prevent SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function RedaksiTulis() {
    const router = useRouter();
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [user, setUser] = useState<any>(null);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("Berita Utama");
    const [excerpt, setExcerpt] = useState("");
    const [author, setAuthor] = useState("Tim Publikasi");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{type: "success" | "error", text: string} | null>(null);

    // Quill Toolbar settings
    const modules = {
        toolbar: [
            [{ 'header': [2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'blockquote', 'code-block'],
            ['clean']
        ],
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push("/redaksi/login");
            } else {
                setUser(currentUser);
                setLoadingAuth(false);
            }
        });
        return () => unsubscribe();
    }, [router]);

    const generateSlug = (text: string) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           
            .replace(/[^\w\-]+/g, '')       
            .replace(/\-\-+/g, '-')         
            .replace(/^-+/, '')             
            .replace(/-+$/, '');            
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content || !image || !excerpt) {
            setMessage({ type: "error", text: "Mohon lengkapi semua kolom!" });
            return;
        }

        setSaving(true);
        setMessage(null);

        try {
            const slug = generateSlug(title);
            
            const dateObj = new Date();
            const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            const dateStr = `${dateObj.getDate().toString().padStart(2, '0')} ${months[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

            await addDoc(collection(db, "articles"), {
                title,
                slug,
                category,
                excerpt,
                author,
                image,
                content,
                date: dateStr,
                createdAt: serverTimestamp()
            });

            setMessage({ type: "success", text: "Artikel berhasil diterbitkan!" });
            setTitle(""); setExcerpt(""); setContent(""); setImage("");
            
            setTimeout(() => {
                router.push("/redaksi/dashboard");
            }, 1500);

        } catch (error: any) {
            setMessage({ type: "error", text: "Gagal menyimpan artikel: " + error.message });
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/redaksi/login");
    }

    if (loadingAuth) {
        return <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950"><Loader2 className="w-8 h-8 animate-spin text-zinc-400" /></div>;
    }

    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50 text-foreground">
            {/* Minimalist Topbar */}
            <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/redaksi/dashboard">
                            <Button variant="ghost" size="icon" title="Kembali ke Dashboard">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2 font-bold font-sans">
                            <LayoutDashboard className="h-5 w-5 text-[#EB9365]" />
                            <span className="hidden sm:inline-block">Tulis Artikel</span>
                        </div>
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

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Artikel Baru</CardTitle>
                        <CardDescription>
                            Lengkapi detail di bawah ini untuk menerbitkan artikel baru ke website.
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                        {message && (
                            <div className={`mb-6 p-4 text-sm rounded-md border ${message.type === 'success' ? 'bg-green-50 text-green-600 border-green-200 dark:bg-green-950/50 dark:border-green-900' : 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/50 dark:border-red-900'}`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-8">
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="title">Judul Artikel</Label>
                                    <Input 
                                        id="title"
                                        required 
                                        value={title} 
                                        onChange={e => setTitle(e.target.value)} 
                                        placeholder="Contoh: Panen Raya Cimerak..." 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Kategori</Label>
                                    <select 
                                        id="category"
                                        value={category} 
                                        onChange={e => setCategory(e.target.value)} 
                                        className="flex h-10 w-full items-center justify-between rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus:ring-zinc-300"
                                    >
                                        <option value="Berita Utama">Berita Utama</option>
                                        <option value="Opini & Potensi">Opini & Potensi</option>
                                        <option value="Kegiatan Program">Kegiatan Program</option>
                                        <option value="Cerita KKN">Cerita KKN</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="author">Penulis</Label>
                                    <Input 
                                        id="author"
                                        required 
                                        value={author} 
                                        onChange={e => setAuthor(e.target.value)} 
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="image">URL Gambar Utama</Label>
                                    <Input 
                                        id="image"
                                        type="url" 
                                        required 
                                        value={image} 
                                        onChange={e => setImage(e.target.value)} 
                                        placeholder="https://..." 
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Kutipan / Ringkasan (Excerpt)</Label>
                                <textarea 
                                    id="excerpt"
                                    required 
                                    value={excerpt} 
                                    onChange={e => setExcerpt(e.target.value)} 
                                    className="flex min-h-[80px] w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300 resize-y" 
                                    rows={3} 
                                    placeholder="Tuliskan ringkasan singkat artikel ini..."
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <Label>Isi Artikel (Editor Visual)</Label>
                                
                                <div className="rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white">
                                    <ReactQuill 
                                        theme="snow" 
                                        value={content} 
                                        onChange={setContent} 
                                        modules={modules}
                                        placeholder="Mulai menulis cerita Anda di sini..."
                                        className="text-black"
                                    />
                                </div>
                                <style jsx global>{`
                                    .ql-toolbar.ql-snow {
                                        border: none !important;
                                        border-bottom: 1px solid #e4e4e7 !important;
                                        background: #fafafa;
                                    }
                                    .dark .ql-toolbar.ql-snow {
                                        border-bottom: 1px solid #27272a !important;
                                    }
                                    .ql-container.ql-snow {
                                        border: none !important;
                                        min-height: 400px;
                                        font-size: 1rem;
                                        font-family: inherit;
                                    }
                                    .ql-editor {
                                        min-height: 400px;
                                    }
                                `}</style>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button 
                                    type="submit" 
                                    disabled={saving || !content} 
                                    className="bg-[#EB9365] text-white hover:bg-[#d7794a] gap-2 px-8"
                                >
                                    <Save className="w-4 h-4" />
                                    {saving ? "Menyimpan..." : "Terbitkan Artikel"}
                                </Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
