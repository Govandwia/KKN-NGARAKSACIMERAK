"use client";

import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700 ${
      isScrolled ? "pt-4 px-4" : "pt-0 px-0"
    }`}>
      <nav className={`flex items-center justify-between transition-all duration-700 mx-auto ${
        isScrolled 
          ? "w-full md:w-[85%] lg:w-[75%] max-w-5xl py-2 md:py-3 px-4 md:px-6 bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/10 dark:border-white/10 rounded-full" 
          : "w-full py-6 md:py-8 px-4 md:px-8 bg-gradient-to-b from-white/40 via-white/20 dark:from-black/80 dark:via-black/40 to-transparent rounded-none border-transparent"
      }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 md:gap-5 bg-black/5 dark:bg-[#cccccc] py-1.5 px-3 md:py-2 md:px-5 rounded-full shadow-inner transition-transform hover:scale-105 duration-300 shrink-0">
          <Image src="/images/logos/logo-ugm.png" alt="Logo UGM" width={120} height={32} className="h-6 md:h-8 w-auto object-contain" />
          <Image src="/images/logos/logo-kkn.png" alt="Logo KKN" width={32} height={32} className="h-6 md:h-8 w-auto object-contain" />
          <Image src="/images/logos/logo-tim.png" alt="Logo Tim" width={32} height={32} className="h-6 md:h-8 w-auto object-contain drop-shadow-sm" />
        </Link>

        {/* Center Content */}
        <div className="hidden md:flex flex-1 justify-center relative items-center h-10">
          {/* Tagline (Visible at top) */}
          <div className={`absolute font-sans text-xs tracking-[0.2em] uppercase text-zinc-800 dark:text-white/80 drop-shadow-sm bg-white/40 dark:bg-transparent px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-700 ${
            isScrolled ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'
          }`}>
            Pengabdian Untuk Cimerak
          </div>

          {/* Navigation Menu (Visible when scrolled) */}
          <ul className={`absolute flex items-center gap-8 font-sans text-sm font-medium text-zinc-900 dark:text-white transition-all duration-700 ${
            isScrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
          }`}>
            <li className="hover:text-[#EB9365] dark:hover:text-[#EB9365] cursor-pointer transition">
              <Link href="/">Beranda</Link>
            </li>
            <li className="hover:text-[#F6E769] dark:hover:text-[#F6E769] cursor-pointer transition">
              <Link href="/program">Program</Link>
            </li>
            <li className="hover:text-[#FBA0A0] dark:hover:text-[#FBA0A0] cursor-pointer transition">
              <Link href="/artikel">Artikel</Link>
            </li>
            <li className="hover:text-[#EB9365] dark:hover:text-[#EB9365] cursor-pointer transition">
              <Link href="/anggota">Anggota</Link>
            </li>
            <li className="hover:text-[#EB9365] dark:hover:text-[#EB9365] cursor-pointer transition">
              <Link href="/galeri">Galeri</Link>
            </li>
          </ul>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-10 h-10 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/80 dark:border-white/20 shadow-sm text-zinc-900 dark:text-white hover:bg-white/90 dark:hover:bg-black/60 transition-colors duration-300 shrink-0"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          {/* Desktop Hamburger Wrapper (Smooth disappear) */}
          <div className={`hidden md:flex items-center overflow-hidden transition-all duration-700 ${
            isScrolled ? 'w-0 opacity-0 pointer-events-none' : 'w-10 opacity-100'
          }`}>
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="w-10 h-10 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/80 dark:border-white/20 shadow-sm text-zinc-900 dark:text-white hover:bg-white/90 dark:hover:bg-black/60 transition-colors duration-300 shrink-0"
            >
              <Menu size={18} className="shrink-0" />
            </button>
          </div>

          {/* Mobile Hamburger Menu (Always visible on mobile) */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden flex w-10 h-10 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur-md items-center justify-center border border-white/80 dark:border-white/20 shadow-sm text-zinc-900 dark:text-white hover:bg-white/90 dark:hover:bg-black/60 transition-colors duration-300 shrink-0"
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {/* Full Screen Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white dark:bg-[#0a0a0a] z-[100] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] flex flex-col ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Header inside overlay */}
        <div className="flex items-center justify-between p-6 md:p-8">
          <div className="font-sans text-xs tracking-[0.2em] uppercase text-zinc-500">Menu Navigasi</div>
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Huge Links */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-32 gap-6">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="group text-6xl md:text-8xl font-sans font-normal uppercase transition-colors border-b border-black/10 dark:border-white/10 pb-4 flex items-center justify-between">
            <span>Beranda</span>
            <span className="font-serif opacity-0 group-hover:opacity-100 text-[#EB9365] transition-opacity text-5xl md:text-7xl">✽</span>
          </Link>
          <Link href="/program" onClick={() => setIsMobileMenuOpen(false)} className="group text-6xl md:text-8xl font-sans font-normal uppercase transition-colors border-b border-black/10 dark:border-white/10 pb-4 flex items-center justify-between">
            <span>Program</span>
            <span className="font-serif opacity-0 group-hover:opacity-100 text-[#F6E769] transition-opacity text-5xl md:text-7xl">✽</span>
          </Link>
          <Link href="/artikel" onClick={() => setIsMobileMenuOpen(false)} className="group text-6xl md:text-8xl font-sans font-normal uppercase transition-colors border-b border-black/10 dark:border-white/10 pb-4 flex items-center justify-between">
            <span>Artikel</span>
            <span className="font-serif opacity-0 group-hover:opacity-100 text-[#FBA0A0] transition-opacity text-5xl md:text-7xl">✽</span>
          </Link>
          <Link href="/anggota" onClick={() => setIsMobileMenuOpen(false)} className="group text-6xl md:text-8xl font-sans font-normal uppercase transition-colors border-b border-black/10 dark:border-white/10 pb-4 flex items-center justify-between">
            <span>Anggota</span>
            <span className="font-serif opacity-0 group-hover:opacity-100 text-[#CCF7C9] transition-opacity text-5xl md:text-7xl">✽</span>
          </Link>
          <Link href="/galeri" onClick={() => setIsMobileMenuOpen(false)} className="group text-6xl md:text-8xl font-sans font-normal uppercase transition-colors flex items-center justify-between">
            <span>Galeri</span>
            <span className="font-serif opacity-0 group-hover:opacity-100 text-[#AEE3EF] transition-opacity text-5xl md:text-7xl">✽</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
