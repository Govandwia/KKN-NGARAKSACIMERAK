"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { fetchImagesFromDriveFolder } from "@/lib/gdrive";
import { ALL_PHOTOS } from "@/data/gallery";
import { PixelStar, FlowerStar, AsteriskLines } from "@/components/Decorations";

function seededRandom(seed: number) {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

const COLORS = ["bg-[#CCF7C9]", "bg-[#F6E769]", "bg-[#FBA0A0]", "bg-[#AEE3EF]", "bg-[#EB9365]", "bg-white"];
const ORNAMENTS = ["pixelstar", "flower", "asterisk"];

// Dynamically generate 150 objects to fly through
const HERO_OBJECTS = Array.from({ length: 150 }).map((_, i) => {
    // 1 in 6 chance to be an ornament
    const isOrnament = i % 6 === 0;
    
    // Spread z from -100 down to roughly -27000
    const z = -100 - (i * 180);
    
    // Deterministic random values for hydration safety
    const rand1 = seededRandom(i * 10 + 1);
    const rand2 = seededRandom(i * 10 + 2);
    const rand3 = seededRandom(i * 10 + 3);
    const rand4 = seededRandom(i * 10 + 4);
    const rand5 = seededRandom(i * 10 + 5);

    // Use random side rather than even/odd to prevent patterns
    const side = rand5 > 0.5 ? 1 : -1;
    
    const x = Math.round(side * (300 + rand1 * 900));
    const y = Math.round(-800 + rand2 * 1600);
    const rotate = Math.round(-30 + rand3 * 60);

    if (isOrnament) {
        // i/6 gives 0, 1, 2, 3... which spreads nicely over the 3 ornaments
        const ornamentIndex = (i / 6) % ORNAMENTS.length;
        
        return {
            id: `or${i}`,
            type: "ornament",
            kind: ORNAMENTS[ornamentIndex],
            x, y, z,
            scale: Number((1 + rand4 * 1.5).toFixed(2)),
            rotateSpeed: (rand5 > 0.5 ? 1 : -1) * (1 + rand1 * 3)
        };
    } else {
        return {
            id: i,
            type: "image",
            color: COLORS[i % COLORS.length],
            x, y, z,
            rotate
        };
    }
});

export function GalleryScrollZoom() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const [fetchedPhotos, setFetchedPhotos] = useState<string[]>([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "galleries"));
                let photos: string[] = [];
                for (const document of querySnapshot.docs) {
                    const data = document.data();
                    if (data.driveUrl) {
                        try {
                            const driveImages = await fetchImagesFromDriveFolder(data.driveUrl);
                            if (driveImages && driveImages.length > 0) {
                                driveImages.forEach((img: any) => {
                                    photos.push(img.url);
                                });
                            }
                        } catch (e) {
                            console.error(e);
                        }
                    }
                    // Limit to around 80 photos so it doesn't get too slow loading all galleries
                    if (photos.length >= 80) break; 
                }
                
                // Shuffle array
                photos = photos.sort(() => Math.random() - 0.5);

                if (photos.length > 0) {
                    setFetchedPhotos(photos);
                } else {
                    setFetchedPhotos(ALL_PHOTOS.map(p => p.images[0]));
                }
            } catch (error) {
                console.error("Error fetching photos for scroll zoom:", error);
                setFetchedPhotos(ALL_PHOTOS.map(p => p.images[0]));
            }
        };
        fetchPhotos();
    }, []);

    // Move camera forward by 28000 units to clear all 150 images deeper into the Z space
    const zMovement = useTransform(scrollYProgress, [0, 1], [0, 28000]);

    // Revealed Content Opacity - Fades in as we fly through ONLY at the very end
    const revealOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
    const revealScale = useTransform(scrollYProgress, [0.85, 1], [0.8, 1]);

    return (
        // Height 1500vh to give enough time to scroll through 150 items
        <section ref={containerRef} className="relative w-full h-[1500vh]">
            <div className="sticky top-0 w-full h-screen overflow-hidden bg-zinc-50 dark:bg-black text-black dark:text-white transition-colors duration-300">

                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                {/* REVEALED CONTENT (Fixed at the back) */}
                <motion.div
                    style={{ opacity: revealOpacity, scale: revealScale }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-0 pointer-events-auto"
                >
                    <div className="text-center px-4">
                        <div className="w-24 h-24 bg-[#EB9365] rounded-full mx-auto mb-8 flex items-center justify-center border-4 border-black dark:border-white shadow-[8px_8px_0_0_#F6E769] animate-bounce">
                            <span className="text-3xl text-black">↓</span>
                        </div>
                        <h2 className="text-6xl md:text-9xl font-sans font-bold text-black dark:text-white uppercase tracking-tight">
                            Momen<br />Abadi
                        </h2>
                        <div className="w-24 h-2 bg-[#CCF7C9] border-2 border-black dark:border-none mx-auto mt-8 mb-4"></div>
                        <p className="font-mono text-zinc-600 dark:text-zinc-400 uppercase tracking-widest text-sm md:text-base font-bold">Terima Kasih Cimerak</p>
                    </div>
                </motion.div>

                {/* 3D SCENE CONTAINER */}
                <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
                    <motion.div
                        style={{
                            transformStyle: "preserve-3d",
                            z: zMovement, 
                        }}
                        className="relative w-full h-full flex items-center justify-center will-change-transform"
                    >
                        {/* IMAGES AND ORNAMENTS */}
                        {HERO_OBJECTS.map((obj) => (
                            <div
                                key={obj.id}
                                style={{
                                    transform: `translate3d(${obj.x}px, ${obj.y}px, ${obj.z}px) rotate(${obj.rotate || 0}deg)`,
                                }}
                                className={`absolute flex items-center justify-center origin-center will-change-transform ${obj.type === 'ornament' ? 'pointer-events-none' : ''}`}
                            >
                                {obj.type === 'image' ? (
                                    <div className={`w-64 h-48 md:w-80 md:h-60 p-4 relative border-4 border-black shadow-[12px_12px_0_0_rgba(0,0,0,1)] dark:border-white dark:shadow-[12px_12px_0_0_rgba(255,255,255,1)] ${obj.color}`}>
                                        {/* Tape Effect */}
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-8 bg-[#EB9365] border-2 border-black z-30 transform -skew-x-12 rotate-2 opacity-90 mix-blend-normal" />

                                        <div className="w-full h-full relative overflow-hidden bg-zinc-200 border-2 border-black">
                                            <Image
                                                src={fetchedPhotos.length > 0 
                                                    ? fetchedPhotos[typeof obj.id === 'number' ? (Math.abs(obj.id) % fetchedPhotos.length) : 0] 
                                                    : (ALL_PHOTOS[typeof obj.id === 'number' ? (Math.abs(obj.id) % ALL_PHOTOS.length) : 0]?.images[0] || "/images/placeholder.jpg")
                                                }
                                                alt="Gallery Photo"
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 300px, 400px"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, ease: "linear", duration: 20 / (Math.abs(obj.rotateSpeed || 1)) }}
                                        className="w-32 h-32 md:w-48 md:h-48 opacity-80"
                                        style={{ scale: obj.scale }}
                                    >
                                        {obj.kind === 'pixelstar' && <PixelStar className="w-full h-full text-black/50 dark:text-white/50" />}
                                        {obj.kind === 'flower' && <FlowerStar className="w-full h-full text-[#F6E769]" />}
                                        {obj.kind === 'asterisk' && <AsteriskLines className="w-full h-full text-[#EB9365]" />}
                                    </motion.div>
                                )}
                            </div>
                        ))}

                        {/* CENTRAL BADGE (At Z=0) */}
                        <div className="absolute z-50 bg-[#CCF7C9] px-12 py-10 md:px-20 md:py-16 border-4 border-black shadow-[16px_16px_0_0_#000] dark:shadow-[16px_16px_0_0_#EB9365] text-center w-[90%] md:w-auto mx-4 origin-center">
                            
                            <div className="absolute -top-12 -left-10 w-24 h-24 md:w-32 md:h-32">
                                <FlowerStar className="w-full h-full text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)] animate-[spin_20s_linear_infinite]" />
                            </div>
                            <div className="absolute -bottom-12 -right-10 w-24 h-24 md:w-32 md:h-32">
                                <AsteriskLines className="w-full h-full text-[#F6E769] drop-shadow-[4px_4px_0_rgba(0,0,0,1)] animate-[spin_25s_linear_infinite_reverse]" />
                            </div>

                            <h1 className="text-4xl md:text-7xl font-bold font-sans text-black uppercase tracking-tight">
                                Lorong <br/> <span className="text-[#EB9365] drop-shadow-[2px_2px_0_#000]">Waktu</span>
                            </h1>
                            <p className="text-black/80 font-bold text-sm md:text-base tracking-widest uppercase mt-6 border-t-2 border-black/30 pt-4">
                                Terus Gulir Ke Bawah
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
