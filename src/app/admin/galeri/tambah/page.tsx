"use client";

import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Loader2, Link as LinkIcon, Folder } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { extractFolderId } from "@/lib/gdrive";

export default function TambahGaleri() {
    const router = useRouter();
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Form state
    const [section, setSection] = useState("");
    const [sections, setSections] = useState<any[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [driveUrl, setDriveUrl] = useState("");
    const [fetchedImages, setFetchedImages] = useState<any[]>([]);
    const [selectedThumbnail, setSelectedThumbnail] = useState<string>("");
    const [isLoadingImages, setIsLoadingImages] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.push("/admin/login");
            } else {
                setLoadingAuth(false);
                try {
                    const q = query(collection(db, "gallery_sections"), orderBy("createdAt", "desc"));
                    const querySnapshot = await getDocs(q);
                    const fetched: any[] = [];
                    querySnapshot.forEach((doc) => {
                        fetched.push({ id: doc.id, ...doc.data() });
                    });
                    setSections(fetched);
                    if (fetched.length > 0 && !section) {
                        setSection(fetched[0].name);
                    }
                } catch (error) {
                    console.error("Error fetching sections:", error);
                }
            }
        });
        return () => unsubscribe();
    }, [router, section]);

    const handleLoadImages = async () => {
        if (!driveUrl) return;
        setIsLoadingImages(true);
        try {
            const { fetchImagesFromDriveFolder } = await import("@/lib/gdrive");
            const images = await fetchImagesFromDriveFolder(driveUrl);
            setFetchedImages(images);
            if (images && images.length > 0) {
                setSelectedThumbnail(images[0].url);
            }
        } catch (error) {
            console.error(error);
            alert("Gagal memuat gambar dari Drive. Pastikan link benar dan folder memiliki akses publik (Anyone with the link).");
        } finally {
            setIsLoadingImages(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!section || !name || !driveUrl || !date || !location) {
            setErrorMsg("Section, Nama kegiatan, Tanggal, Lokasi, dan link Google Drive wajib diisi.");
            return;
        }

        // Validasi link gdrive
        const folderId = extractFolderId(driveUrl);
        if (!folderId) {
            setErrorMsg("Link Google Drive tidak valid. Pastikan Anda menyalin link folder yang benar.");
            return;
        }

        setIsSaving(true);

        try {
            await addDoc(collection(db, "galleries"), {
                section,
                name,
                description,
                date,
                location,
                driveUrl,
                folderId,
                thumbnailUrl: selectedThumbnail,
                createdAt: serverTimestamp(),
            });
            
            router.push("/admin/dashboard");
        } catch (error: any) {
            console.error("Error saving gallery:", error);
            setErrorMsg("Terjadi kesalahan saat menyimpan data galeri: " + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (loadingAuth) {
        return <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950"><Loader2 className="w-8 h-8 animate-spin text-zinc-400" /></div>;
    }

    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50 text-foreground">
            <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/dashboard">
                            <Button variant="ghost" size="icon" title="Kembali ke Dashboard">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                        </Link>
                        <h1 className="font-semibold text-lg">Tambah Album Galeri</h1>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-3xl">
                <form onSubmit={handleSave} className="space-y-6">
                    {errorMsg && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-md text-sm">
                            {errorMsg}
                        </div>
                    )}

                    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="section">Section / Kategori Utama</Label>
                            {sections.length > 0 ? (
                                <select 
                                    id="section"
                                    value={section}
                                    onChange={(e) => setSection(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300"
                                    required
                                >
                                    {sections.map(s => (
                                        <option key={s.id} value={s.name}>{s.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <div className="text-sm text-red-500 border border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-900 dark:text-red-400 p-3 rounded-md">
                                    Belum ada Section yang dibuat. Silakan buat Section terlebih dahulu di Dashboard.
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Kegiatan / Album</Label>
                            <Input 
                                id="name" 
                                placeholder="Cth: Lomba 17an" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi (Opsional)</Label>
                            <Textarea 
                                id="description" 
                                placeholder="Ceritakan sedikit tentang kegiatan ini..." 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="date">Tanggal Kegiatan</Label>
                                <Input 
                                    id="date" 
                                    placeholder="Cth: 17 Agustus 2026" 
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Lokasi Kegiatan</Label>
                                <Input 
                                    id="location" 
                                    placeholder="Cth: Balai Desa Masawah" 
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="driveUrl" className="flex items-center gap-2">
                                <Folder className="h-4 w-4 text-blue-500" />
                                Link Google Drive (Wajib "Anyone with the link")
                            </Label>
                            <div className="flex gap-2">
                                <Input 
                                    id="driveUrl" 
                                    type="url"
                                    placeholder="https://drive.google.com/drive/folders/..." 
                                    value={driveUrl}
                                    onChange={(e) => setDriveUrl(e.target.value)}
                                    required
                                />
                                <Button 
                                    type="button" 
                                    variant="outline" 
                                    onClick={handleLoadImages} 
                                    disabled={!driveUrl || isLoadingImages}
                                >
                                    {isLoadingImages ? <Loader2 className="h-4 w-4 animate-spin" /> : "Muat Foto"}
                                </Button>
                            </div>
                            <p className="text-xs text-zinc-500">
                                Masukkan link Google Drive yang berisi foto-foto kegiatan. Pastikan folder di-set ke "Anyone with the link" (Siapa saja yang memiliki link).
                            </p>
                        </div>

                        {fetchedImages.length > 0 && (
                            <div className="space-y-2 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50">
                                <Label>Pilih Thumbnail (Sampul)</Label>
                                <p className="text-xs text-zinc-500 mb-2">Klik salah satu foto di bawah ini untuk menjadikannya gambar sampul galeri.</p>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto p-2">
                                    {fetchedImages.map((img) => (
                                        <div 
                                            key={img.id} 
                                            className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedThumbnail === img.url ? 'border-[#EB9365] scale-95 ring-2 ring-[#EB9365]/50' : 'border-transparent hover:border-zinc-300'}`}
                                            onClick={() => setSelectedThumbnail(img.url)}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={img.url} alt="Thumbnail preview" className="object-cover w-full h-full" />
                                            {selectedThumbnail === img.url && (
                                                <div className="absolute top-2 right-2 bg-[#EB9365] text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                                    TERPILIH
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex justify-end gap-4 border-t border-zinc-200 dark:border-zinc-800">
                        <Link href="/admin/dashboard">
                            <Button type="button" variant="outline">Batal</Button>
                        </Link>
                        <Button type="submit" className="bg-[#EB9365] text-white hover:bg-[#d7794a] gap-2" disabled={isSaving}>
                            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            {isSaving ? 'Menyimpan...' : 'Simpan Album'}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
