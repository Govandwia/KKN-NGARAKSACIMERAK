export default function ThemeVision() {
  return (
    <section className="w-full bg-background text-foreground transition-colors duration-300">
      <div className="w-full mx-auto border-l border-black/10 dark:border-white/10 flex flex-col">
        
        {/* Top: Tema */}
        <div className="flex flex-col md:flex-row border-b border-black/10 dark:border-white/10 bg-zinc-200 dark:bg-zinc-800">
           <div className="p-8 md:p-16 flex-1 relative">
             <div className="absolute top-8 right-8 text-zinc-500 font-mono text-sm hidden md:block">✽</div>
             <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans font-normal tracking-tight mb-8 md:mt-4 text-zinc-900 dark:text-white leading-[1.1] max-w-4xl">
               Pengembangan Potensi Wilayah Berbasis Masyarakat melalui Pendekatan Ramah Lingkungan & Inovasi Kreatif
             </h2>
           </div>
           <div className="md:w-1/3 p-8 md:p-12 border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10 flex items-end">
             <p className="text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed text-sm md:text-base">
               Tema KKN-PPM UGM Unit JB-015 Tahun 2026 berfokus pada pemberdayaan ekonomi, pelestarian budaya, hingga mitigasi bencana di Kecamatan Cimerak, Kabupaten Pangandaran.
             </p>
           </div>
        </div>

        {/* Bottom: Visi & Misi */}
        <div className="flex flex-col md:flex-row">
           <div className="flex-1 p-8 md:p-16 border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 bg-white dark:bg-black relative hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-[#FBA0A0] hidden md:block"></div>
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-[#FBA0A0] hidden md:block"></div>
              
              <div className="text-[#B07070] font-serif text-lg font-light mb-12">✽</div>
              <h3 className="text-4xl md:text-5xl font-sans font-normal tracking-tight mb-6 text-zinc-900 dark:text-white">Visi</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans text-sm md:text-base max-w-md">
                Mewujudkan Kecamatan Cimerak sebagai pusat pertumbuhan ekonomi lokal yang mandiri, berbudaya, dan tangguh bencana melalui kolaborasi lintas sektor yang berkelanjutan.
              </p>
           </div>
           
           <div className="flex-1 p-8 md:p-16 bg-[#7A9FA7] text-white relative hover:bg-[#577278] transition-colors">
              <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-white hidden md:block"></div>
              
              <div className="text-white font-serif text-lg font-light mb-12">✽</div>
              <h3 className="text-4xl md:text-5xl font-sans font-normal tracking-tight mb-6">Misi</h3>
              <ul className="space-y-4 text-white/90 leading-relaxed font-sans text-sm md:text-base max-w-md">
                <li className="flex gap-4">
                  <span className="font-mono text-xs mt-1">01</span>
                  <span>Pemberdayaan UMKM dan literasi keuangan digital.</span>
                </li>
                <li className="flex gap-4 border-t border-white/20 pt-4">
                  <span className="font-mono text-xs mt-1">02</span>
                  <span>Pelestarian lingkungan dan mitigasi bencana pesisir.</span>
                </li>
                <li className="flex gap-4 border-t border-white/20 pt-4">
                  <span className="font-mono text-xs mt-1">03</span>
                  <span>Peningkatan literasi pendidikan dan pelestarian budaya lokal.</span>
                </li>
                <li className="flex gap-4 border-t border-white/20 pt-4">
                  <span className="font-mono text-xs mt-1">04</span>
                  <span>Advokasi infrastruktur penunjang aksesibilitas antar desa.</span>
                </li>
              </ul>
           </div>
        </div>

      </div>
    </section>
  );
}
