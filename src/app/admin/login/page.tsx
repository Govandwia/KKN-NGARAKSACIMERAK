"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { AsteriskLines } from "@/components/Decorations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function RedaksiLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin/dashboard");
        } catch (err: any) {
            setError(err.message || "Gagal masuk. Periksa kembali email dan password Anda.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
            
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-md">
                <div className="flex flex-col items-center mb-8 text-center">
                    <AsteriskLines className="w-12 h-12 text-[#EB9365] animate-[spin_10s_linear_infinite] mb-4" />
                    <h1 className="text-2xl font-bold font-sans tracking-tight">Portal Redaksi</h1>
                    <p className="text-sm text-muted-foreground mt-1">KKN Ngaraksa Cimerak</p>
                </div>

                <Card className="shadow-lg border-zinc-200 dark:border-zinc-800">
                    <CardHeader>
                        <CardTitle>Login Administrator</CardTitle>
                        <CardDescription>
                            Masukkan email dan password Anda untuk masuk ke sistem manajemen konten.
                        </CardDescription>
                    </CardHeader>
                    
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4">
                            {error && (
                                <div className="p-3 bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-sm rounded-md border border-red-200 dark:border-red-900">
                                    {error}
                                </div>
                            )}
                            
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email"
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@cimerak.com"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password"
                                    type="password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                />
                            </div>
                        </CardContent>
                        
                        <CardFooter>
                            <Button 
                                type="submit" 
                                className="w-full bg-[#EB9365] text-white hover:bg-[#d7794a]" 
                                disabled={loading}
                            >
                                {loading ? "Memproses..." : "Masuk ke Sistem"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </main>
    );
}
