"use client";

import Image from "next/image";
import { MapPin, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [latestArticle, setLatestArticle] = useState<any>(null);

  useEffect(() => {
    const fetchLatestArticle = async () => {
      try {
        const q = query(collection(db, "articles"), orderBy("createdAt", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setLatestArticle({ id: doc.id, ...doc.data() });
        }
      } catch (error) {
        console.error("Error fetching latest article:", error);
      }
    };

    fetchLatestArticle();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Jika tersisa kurang dari 0.5 detik, mulai fade out
      if (video.duration - video.currentTime < 0.5) {
        setIsFadingOut(true);
      } else if (video.currentTime < 0.5 && isFadingOut) {
        // Saat video kembali ke awal, fade in kembali
        setIsFadingOut(false);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isFadingOut]);

  return (
    <section className="relative w-full h-[100svh] min-h-[650px] md:min-h-[800px] flex flex-col font-serif overflow-hidden transition-colors duration-500">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-background">
        <video
          ref={videoRef}
          src="/video/bg-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          onCanPlay={() => setIsLoaded(true)}
          className={`object-cover object-center w-full h-full transition-opacity duration-500 ease-in-out ${isLoaded && !isFadingOut ? 'opacity-100 dark:opacity-80' : 'opacity-0'}`}
        />
        {/* Subtle gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/50 to-transparent dark:from-black/90 dark:via-black/50 dark:to-transparent transition-colors duration-500 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 dark:from-black/40 via-transparent to-background transition-colors duration-500 pointer-events-none"></div>
      </div>

      {/* --- Main Content --- */}
      <div className="w-full mx-auto px-4 md:px-6 relative z-10 flex-1 flex flex-col justify-end pb-6 md:pb-16 pt-24 md:pt-32">
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 md:gap-12 w-full w-full mx-auto">

          {/* Left: Hero Typography */}
          <div className="flex flex-col text-zinc-900 dark:text-white max-w-3xl transition-colors duration-500">
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] md:leading-[0.85] font-bold tracking-tighter uppercase mb-6 md:mb-8 text-zinc-900 dark:text-white transition-colors duration-500">

              <span className="text-zinc-700 dark:text-white/90 transition-colors duration-500">Ngaraksa</span>
              <br />
              Cimerak
            </h1>

            <div className="flex items-start gap-3 md:gap-4 max-w-md">
              <span className="text-ngaraksa-orange-primary dark:text-ngaraksa-green-primary text-xl mt-1 animate-pulse shrink-0 transition-colors duration-500">✳</span>
              <p className="font-sans text-zinc-800 dark:text-white/80 text-sm md:text-base leading-relaxed transition-colors duration-500">
                Sinergi untuk pertumbuhan, pemberdayaan, dan pelestarian lingkungan masyarakat Cimerak, Pangandaran.
              </p>
            </div>
          </div>

          {/* Right: Floating Latest Article Card */}
          <Link href={latestArticle ? `/artikel/${latestArticle.slug}` : "/artikel"} className="hidden lg:flex w-[400px] h-[500px] bg-white/70 dark:bg-[#222220]/80 backdrop-blur-xl rounded-[2rem] border border-black/10 dark:border-white/10 p-8 flex-col relative overflow-hidden group transition-colors duration-500 shadow-xl dark:shadow-none">
            <div className="flex justify-between items-start z-10">
              <h3 className="text-zinc-900 dark:text-white font-sans text-sm font-semibold tracking-wider uppercase max-w-[150px] leading-tight transition-colors duration-500">
                Artikel<br />Terbaru
              </h3>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center text-zinc-600 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-all duration-300">
                  <ArrowRight size={16} className="-rotate-45" />
                </button>
              </div>
            </div>

            {/* Tilted Image Preview */}
            <div className="absolute inset-0 mt-28 mx-auto w-[280px] h-[320px] rounded-3xl overflow-hidden transform rotate-[-8deg] shadow-2xl transition-all duration-500 group-hover:rotate-[-5deg] group-hover:scale-105 border-4 border-white/50 dark:border-white/10">
              {latestArticle?.image ? (
                  <>
                    <Image
                      src={latestArticle.image}
                      alt={latestArticle.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                        <h4 className="text-white font-sans font-bold text-lg leading-tight line-clamp-2">
                            {latestArticle.title}
                        </h4>
                    </div>
                  </>
              ) : (
                  <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 animate-pulse flex items-center justify-center">
                      <span className="text-xs font-mono uppercase text-zinc-400">Memuat Artikel...</span>
                  </div>
              )}
            </div>
          </Link>

        </div>

        {/* --- Bottom Info Bar --- */}
        <div className="mt-12 flex flex-col md:flex-row gap-4 items-center w-full w-full mx-auto">

          {/* Info Grid */}
          <div className="flex-1 w-full bg-black/5 dark:bg-white/5 backdrop-blur-md rounded-2xl border border-black/10 dark:border-white/10 p-2 flex flex-wrap md:flex-nowrap gap-2 transition-colors duration-500">

            <div className="flex-1 flex justify-between items-center bg-black/5 dark:bg-white/5 rounded-xl px-5 py-4 min-w-[150px] hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300 cursor-default">
              <span className="text-zinc-800 dark:text-white/80 font-sans text-sm font-medium transition-colors duration-500">Batumalang</span>
              <MapPin size={18} className="text-zinc-500 dark:text-white/50 transition-colors duration-500" />
            </div>

            <div className="flex-1 flex justify-between items-center bg-black/5 dark:bg-white/5 rounded-xl px-5 py-4 min-w-[150px] hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300 cursor-default">
              <span className="text-zinc-800 dark:text-white/80 font-sans text-sm font-medium transition-colors duration-500">Legokjawa</span>
              <MapPin size={18} className="text-zinc-500 dark:text-white/50 transition-colors duration-500" />
            </div>

            <div className="flex-1 flex justify-between items-center bg-black/5 dark:bg-white/5 rounded-xl px-5 py-4 min-w-[150px] hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300 cursor-default">
              <span className="text-zinc-800 dark:text-white/80 font-sans text-sm font-medium transition-colors duration-500">Masawah</span>
              <MapPin size={18} className="text-zinc-500 dark:text-white/50 transition-colors duration-500" />
            </div>

            <div className="flex-1 flex justify-between items-center bg-black/5 dark:bg-white/5 rounded-xl px-5 py-4 min-w-[150px] hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300 cursor-default">
              <span className="text-zinc-800 dark:text-white/80 font-sans text-sm font-medium transition-colors duration-500">Periode II '26</span>
              <Calendar size={18} className="text-zinc-500 dark:text-white/50 transition-colors duration-500" />
            </div>

          </div>

          {/* CTA Button */}
          <button className="w-full md:w-auto px-12 py-6 bg-ngaraksa-orange-primary text-white dark:bg-white dark:text-black font-sans font-semibold rounded-2xl hover:bg-ngaraksa-orange-dark dark:hover:bg-ngaraksa-yellow-light transition-colors duration-300 whitespace-nowrap text-lg flex items-center justify-center shadow-lg dark:shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            Jelajahi
          </button>

        </div>
      </div>
    </section>
  );
}
