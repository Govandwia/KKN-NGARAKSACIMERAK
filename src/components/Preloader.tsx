"use client";

import { useEffect, useState, useRef } from "react";

// Using the 6 colors from the palette
const colors = ['#EB9365', '#F6E769', '#CCF7C9', '#AEE3EF', '#FBA0A0', '#504702'];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const [colorIndex, setColorIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const isMediaReady = useRef(false);

  useEffect(() => {
    // Hide scrollbar on body while loading
    document.body.style.overflow = "hidden";
    setMounted(true);
    let current = 0;
    
    const handleMediaReady = () => {
      isMediaReady.current = true;
    };
    
    window.addEventListener("heroMediaLoaded", handleMediaReady);
    
    // Rapidly cycle colors during load
    const colorInterval = setInterval(() => {
      setColorIndex(prev => (prev + 1) % colors.length);
    }, 150);

    // Increment progress
    const progressInterval = setInterval(() => {
      const limit = isMediaReady.current ? 100 : 90;
      
      current += Math.floor(Math.random() * 12) + 2;
      
      if (current >= limit && !isMediaReady.current) {
        current = limit;
      }
      
      if (current >= 100) {
        current = 100;
        clearInterval(progressInterval);
        clearInterval(colorInterval);
        
        // Lock to primary orange at the end
        setColorIndex(0); 
        
        // Wait at 100% for a dramatic pause
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "auto";
        }, 700);
        
        // Completely remove from DOM after the sliding animation finishes
        setTimeout(() => {
          setVisible(false);
        }, 1700);
      }
      
      setProgress(current);
    }, 80);

    return () => {
      clearInterval(progressInterval);
      clearInterval(colorInterval);
      window.removeEventListener("heroMediaLoaded", handleMediaReady);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#0a0a0a] text-white flex flex-col justify-between p-8 md:p-12 transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        loading ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-start font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-zinc-500 overflow-hidden">
        <div className={`transition-transform duration-700 delay-100 ${loading ? 'translate-y-0' : '-translate-y-full'}`}>Ngaraksa Cimerak</div>
        <div className={`transition-transform duration-700 delay-100 ${loading ? 'translate-y-0' : '-translate-y-full'}`}>Sistem Memuat</div>
      </div>

      {/* Center Counter */}
      <div className="flex flex-col items-center justify-center flex-1 relative w-full overflow-hidden">
        
        {/* Background Giant Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
           <span className="text-[20vw] font-serif font-black whitespace-nowrap tracking-tighter">CIMERAK</span>
        </div>
        
        <div 
          className="text-7xl md:text-9xl lg:text-[14rem] font-serif font-normal flex items-center gap-4 md:gap-8 transition-colors duration-200 z-10"
          style={{ color: colors[colorIndex] }}
        >
          <span 
            className="inline-block transition-transform duration-75"
            style={{ transform: `rotate(${progress * 3.6}deg)` }}
          >
            ✽
          </span>
          <div className="flex items-baseline">
            <span className="tabular-nums tracking-tighter">{progress}</span>
            <span className="text-4xl md:text-7xl lg:text-9xl font-sans font-light opacity-50 ml-2 md:ml-4">%</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end font-sans text-xs md:text-sm tracking-[0.2em] uppercase text-zinc-500 overflow-hidden">
        <div className={`transition-transform duration-700 delay-100 ${loading ? 'translate-y-0' : 'translate-y-full'}`}>KKN PPM UGM</div>
        <div className={`transition-transform duration-700 delay-100 ${loading ? 'translate-y-0' : 'translate-y-full'}`}>2026</div>
      </div>
      
    </div>
  );
}
