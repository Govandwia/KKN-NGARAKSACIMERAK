"use client";

import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
import { villages } from "../data/villages";

export default function Location() {
  const [activeVillage, setActiveVillage] = useState<number>(0);
  const [hoveredVillage, setHoveredVillage] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Update posisi tooltip mengikuti kursor
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (hoveredVillage !== null) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [hoveredVillage]);

  return (
    <section className="w-full bg-background text-foreground transition-colors duration-300 font-serif" id="location">
      
      {/* TOOLTIP INTERAKTIF */}
      {hoveredVillage !== null && (
        <div 
          className="fixed z-50 pointer-events-none bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-bold shadow-2xl transition-opacity duration-150 ease-out border border-black/10 dark:border-white/10 font-serif"
          style={{ 
            top: mousePos.y - 45, 
            left: mousePos.x,
            transform: 'translateX(-50%)'
          }}
        >
          Desa {villages[hoveredVillage].name}
        </div>
      )}

      <div className="w-full mx-auto border-l border-black/10 dark:border-white/10 flex flex-col">
        
        {/* Header Title */}
        <div className="p-8 md:p-12 border-b border-r border-black/10 dark:border-white/10 bg-white dark:bg-[#111] relative">
          <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-[#EB9365]"></div>
          <span className="text-[#EB9365] font-bold tracking-widest uppercase text-sm mb-4 block font-serif">Peta Wilayah</span>
          <h2 className="text-5xl md:text-6xl font-normal text-zinc-900 dark:text-white font-serif tracking-tight">Lokasi Pengabdian</h2>
        </div>

        <div className="flex flex-col lg:flex-row">
          
          {/* KIRI: Peta Interaktif SVG */}
          <div className="w-full lg:w-3/5 bg-zinc-100 dark:bg-zinc-900 p-4 md:p-6 border-b border-r border-black/10 dark:border-white/10 relative min-h-[400px] md:min-h-[550px] flex items-center justify-center overflow-hidden">
            
            {/* Corner dot */}
            <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-[#EB9365] z-20"></div>

            <div className="relative w-full aspect-[1.24] z-10">
              <svg 
                viewBox="0 0 7202 5806" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-2xl"
              >
                {villages.map((v, i) => {
                  const isHovered = hoveredVillage === i;
                  const isActive = activeVillage === i;
                  
                  return (
                    <path 
                      key={v.id}
                      d={v.d}
                      // Pengaturan warna langsung melalui style agar tidak di-override tailwind saat aktif
                      style={{
                        fill: isActive || isHovered ? v.fill : undefined,
                        opacity: isActive ? 1 : (isHovered ? 0.9 : 1),
                        strokeWidth: isActive || isHovered ? "40" : "20",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        transformOrigin: "center",
                        transform: (isActive || isHovered) ? "translateY(-10px) scale(1.002)" : "translateY(0) scale(1)"
                      }}
                      className={`cursor-pointer outline-none
                        ${isActive || isHovered 
                          ? 'stroke-white dark:stroke-zinc-900 drop-shadow-lg' 
                          : 'fill-zinc-300 dark:fill-white/5 stroke-white dark:stroke-white/10 hover:fill-zinc-400 dark:hover:fill-white/10'}
                      `}
                      onClick={() => setActiveVillage(i)}
                      onMouseEnter={() => setHoveredVillage(i)}
                      onMouseLeave={() => setHoveredVillage(null)}
                    />
                  );
                })}
              </svg>
            </div>
            
            {/* Label Peta Aktif (Fallback di bawah) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-black/90 px-8 py-3 shadow-lg border border-black/10 dark:border-white/10 pointer-events-none transition-all duration-300 z-20">
              <span className={`text-sm font-bold uppercase tracking-widest font-serif ${villages[activeVillage].color}`}>Desa {villages[activeVillage].name}</span>
            </div>
          </div>

          {/* KANAN: Panel Info Kanan & Daftar Desa Scrollable */}
          <div className="w-full lg:w-2/5 flex flex-col h-full border-r border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1a]">
            
            {/* Panel Info (Atas) */}
            <div className={`p-8 md:p-12 transition-all duration-500 border-b border-black/10 dark:border-white/10 relative overflow-hidden bg-zinc-50 dark:bg-[#111]`}>
              <h3 className={`text-3xl md:text-4xl font-normal font-serif mb-4 ${villages[activeVillage].color}`}>
                Desa {villages[activeVillage].name}
              </h3>
              <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif text-sm md:text-base">
                {villages[activeVillage].desc}
              </p>
            </div>

            {/* Daftar Desa Scrollable (Bawah) */}
            <div className="flex-1 flex flex-col relative bg-white dark:bg-[#1a1a1a] min-h-0">
              <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-[#EB9365]"></div>
              <h4 className="text-xs font-bold font-serif text-zinc-400 uppercase tracking-widest mb-4 px-8 pt-6">Daftar Desa ({villages.length})</h4>
              
              <div className="flex-1 flex flex-col overflow-y-auto custom-scrollbar border-t border-black/10 dark:border-white/10">
                {villages.map((v, i) => (
                  <button
                    key={v.id}
                    onMouseEnter={() => setHoveredVillage(i)}
                    onMouseLeave={() => setHoveredVillage(null)}
                    onClick={() => setActiveVillage(i)}
                    className={`flex items-center justify-between w-full px-8 py-5 transition-all duration-300 text-left outline-none border-b border-black/10 dark:border-white/10 last:border-b-0
                      ${activeVillage === i 
                        ? 'bg-zinc-100 dark:bg-white/10' 
                        : (hoveredVillage === i ? 'bg-zinc-50 dark:bg-white/5' : 'bg-transparent')}`}
                  >
                    <span className={`font-normal font-serif text-lg md:text-xl flex items-center gap-2 transition-colors ${activeVillage === i ? v.color : 'text-zinc-600 dark:text-zinc-400'}`}>
                      {v.name}
                      {['masawah', 'legokjawa', 'batumalang'].includes(v.id) && (
                        <MapPin size={16} className="text-[#EB9365] shrink-0" />
                      )}
                    </span>
                    
                    {/* Indikator Aktif */}
                    <span className={`font-serif text-lg transition-all duration-300 ${activeVillage === i ? v.color : 'text-transparent opacity-0'}`}>
                      ✽
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
