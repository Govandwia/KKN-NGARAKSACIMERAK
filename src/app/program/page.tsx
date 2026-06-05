"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Program Kerja",
  description: "Rangkaian 6 klaster program kerja multidisiplin KKN-PPM UGM Ngaraksa Cimerak 2026.",
  openGraph: {
    title: "Program Kerja | Ngaraksa Cimerak",
    description: "Pelajari lebih lanjut mengenai program pemberdayaan ekonomi, inovasi, dan mitigasi bencana kami."
  }
};
import programsData from "@/data/programs.json";

const colors = ['#EB9365', '#F6E769', '#CCF7C9', '#AEE3EF', '#FBA0A0', '#504702'];

type TabType = "inter" | "mono";
type Program = { name: string; pic: string; description: string };

import { PixelStar, AsteriskLines, FlowerStar } from "@/components/Decorations";

export default function ProgramPage() {
  const [activeTab, setActiveTab] = useState<TabType>("inter");
  const [selectedProgram, setSelectedProgram] = useState<{ program: Program; clusterName: string; color: string } | null>(null);
  
  const data = programsData[activeTab];

  const openModal = (program: Program, clusterName: string, color: string) => {
    setSelectedProgram({ program, clusterName, color });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProgram(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      
      {/* Header Spacer for Navbar */}
      <div className="pt-24 md:pt-32"></div>

      {/* Header Section */}
      <section className="w-full border-b border-black/10 dark:border-white/10 flex flex-col lg:flex-row min-h-[400px]">
        {/* Left Side: Text */}
        <div className="flex-1 p-8 md:p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10 ml-0 md:ml-4 bg-white dark:bg-[#111] relative z-10 flex flex-col justify-center">
          {/* Decorative Corner */}
          <div className="absolute top-6 left-6 w-2 h-2 bg-[#EB9365]"></div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-normal tracking-tight uppercase">
            Program<br/>Kerja
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Daftar lengkap program kerja KKN PPM UGM 2026 Ngaraksa Cimerak, meliputi pendekatan interdisipliner dan klaster monodisipliner.
          </p>
        </div>
        
        {/* Right Side: Geometric Decorations */}
        <div className="w-full lg:w-[45%] bg-zinc-50 dark:bg-black relative flex items-center justify-center p-12 overflow-hidden border-black/10 dark:border-white/10 min-h-[300px]">
          {/* Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          
          <div className="relative w-full h-full flex items-center justify-center">
             {/* The large white/black pixel star from the image */}
             <PixelStar className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 text-black/5 dark:text-white/5" />
             
             {/* The Yellow Flower Star */}
             <FlowerStar className="absolute bottom-4 right-12 w-16 h-16 md:w-20 md:h-20 text-[#F6E769] animate-[spin_20s_linear_infinite]" />
             
             {/* The Orange Asterisk */}
             <AsteriskLines className="absolute top-8 left-12 w-20 h-20 md:w-24 md:h-24 text-[#EB9365]" />
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="w-full border-b border-black/10 dark:border-white/10 flex flex-col md:flex-row">
        <button 
          onClick={() => setActiveTab('inter')}
          className={`flex-1 p-6 md:p-8 text-xl md:text-3xl font-sans font-bold uppercase transition-colors border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 ${
            activeTab === 'inter' 
              ? 'bg-[#EB9365] text-white dark:text-black' 
              : 'bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-400'
          }`}
        >
          Interdisipliner
        </button>
        <button 
          onClick={() => setActiveTab('mono')}
          className={`flex-1 p-6 md:p-8 text-xl md:text-3xl font-sans font-bold uppercase transition-colors ${
            activeTab === 'mono' 
              ? 'bg-[#F6E769] text-black' 
              : 'bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-400'
          }`}
        >
          Monodisipliner
        </button>
      </section>

      {/* Content Grid */}
      <section className="w-full bg-zinc-50 dark:bg-[#0a0a0a]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-black/10 dark:border-white/10">
          {data.map((cluster, idx) => {
            const color = colors[idx % colors.length];
            return (
              <div 
                key={idx}
                className="p-8 md:p-12 border-r border-b border-black/10 dark:border-white/10 bg-white dark:bg-[#111] group transition-colors flex flex-col relative hover:bg-zinc-50 dark:hover:bg-black"
                style={{ '--hover-color': color } as React.CSSProperties}
              >
                {/* Accent Top Border on Hover */}
                <div 
                  className="absolute top-0 left-0 right-0 h-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                  style={{ backgroundColor: color }}
                ></div>
                
                {/* Cluster Title */}
                <h3 className="text-3xl font-serif font-normal mb-8 transition-colors group-hover:text-[var(--hover-color)]">
                  {cluster.name}
                </h3>
                
                {/* Sub-Programs List */}
                <div className="flex flex-col gap-6 mt-auto">
                  {cluster.programs.length === 0 ? (
                    <div className="border-t border-black/10 dark:border-white/10 pt-4 text-zinc-500 italic">
                      Belum ada program terdaftar.
                    </div>
                  ) : (
                    cluster.programs.map((prog, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => openModal(prog as Program, cluster.name, color)}
                        className="border-t border-black/10 dark:border-white/10 pt-6 text-left group/item hover:pl-2 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-lg font-sans font-bold mb-2 leading-snug group-hover/item:text-[var(--hover-color)] transition-colors">{prog.name}</h4>
                            {prog.pic && (
                              <div className="text-sm font-mono text-zinc-500 uppercase tracking-wider">
                                PIC: <span className="text-zinc-900 dark:text-zinc-300 ml-2 font-bold">{prog.pic}</span>
                              </div>
                            )}
                          </div>
                          <ChevronRight className="w-5 h-5 mt-1 text-zinc-300 dark:text-zinc-600 group-hover/item:text-[var(--hover-color)] group-hover/item:translate-x-1 transition-all flex-shrink-0" />
                        </div>
                      </button>
                    ))
                  )}
                </div>

                {/* Decorative Asterisk */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-xl" style={{ color: 'var(--hover-color)' }}>
                  ✽
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* MODAL POPUP */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-zinc-900/90 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#0a0a0a] border-4 border-black dark:border-white overflow-hidden shadow-[16px_16px_0_0_var(--modal-color)]"
              style={{ '--modal-color': selectedProgram.color } as React.CSSProperties}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Accent Top Bar */}
              <div className="h-3 w-full" style={{ backgroundColor: selectedProgram.color }}></div>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-7 right-4 z-10 p-2 bg-black text-white dark:bg-white dark:text-black border-2 border-black dark:border-white hover:bg-[#EB9365] dark:hover:bg-[#EB9365] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-8 md:p-12">
                {/* Cluster Badge */}
                <div 
                  className="inline-block px-4 py-1 border-2 border-black dark:border-white text-[10px] font-mono font-bold uppercase tracking-widest mb-6 shadow-[2px_2px_0_0_#000] dark:shadow-[2px_2px_0_0_#fff]"
                  style={{ backgroundColor: selectedProgram.color, color: selectedProgram.color === '#504702' || selectedProgram.color === '#EB9365' ? '#fff' : '#000' }}
                >
                  {selectedProgram.clusterName}
                </div>

                {/* Program Title */}
                <h2 className="text-3xl md:text-4xl font-sans font-bold uppercase leading-tight mb-6 tracking-tight">
                  {selectedProgram.program.name}
                </h2>

                {/* Divider */}
                <div className="w-full h-1 bg-black/10 dark:bg-white/10 mb-6"></div>

                {/* Description */}
                <p className="text-zinc-700 dark:text-zinc-300 text-base md:text-lg leading-relaxed mb-8 font-sans">
                  {selectedProgram.program.description}
                </p>

                {/* Metadata */}
                {selectedProgram.program.pic && (
                  <div className="p-4 border-2 border-black dark:border-white bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 border-2 border-black dark:border-white" style={{ backgroundColor: selectedProgram.color }}>
                        <User className="w-5 h-5" style={{ color: selectedProgram.color === '#504702' || selectedProgram.color === '#EB9365' ? '#fff' : '#000' }} />
                      </div>
                      <div>
                        <p className="font-mono text-black/50 dark:text-white/50 text-[10px] uppercase mb-0.5">Penanggung Jawab (PIC)</p>
                        <p className="text-black dark:text-white font-bold text-base">{selectedProgram.program.pic}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
