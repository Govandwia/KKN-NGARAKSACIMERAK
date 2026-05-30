import Image from "next/image";

export default function About() {
  return (
    <section className="w-full bg-background text-foreground transition-colors duration-300" id="about">
      <div className="w-full mx-auto border-t border-l border-black/10 dark:border-white/10 flex flex-col lg:flex-row">
        
        {/* Left Column - Image */}
        <div className="w-full lg:w-1/2 relative border-r border-b border-black/10 dark:border-white/10 min-h-[400px] lg:min-h-[600px] overflow-hidden group bg-zinc-200 dark:bg-zinc-800">
          {/* Corner dots */}
          <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-[#EB9365] z-20"></div>
          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-[#EB9365] z-20"></div>

          <Image 
            src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1000&auto=format&fit=crop" 
            alt="About KKN" 
            fill 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700" 
          />
          <div className="absolute bottom-0 right-0 bg-white dark:bg-[#111] p-4 border-t border-l border-black/10 dark:border-white/10 flex items-center gap-6 group-hover:bg-[#EB9365] group-hover:text-white transition-colors duration-300">
             <span className="text-xs font-bold uppercase tracking-widest">Profile KKN</span>
             <span className="font-mono text-lg font-light group-hover:text-white text-[#EB9365]">✽</span>
          </div>
        </div>

        {/* Right Column - Text & Stats */}
        <div className="w-full lg:w-1/2 flex flex-col">
           {/* Top Title Block */}
           <div className="p-8 md:p-16 border-r border-b border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-[#111] flex-1 relative">
             <div className="absolute top-8 left-8 text-[#EB9365] font-mono text-sm hidden md:block">✽</div>
             
             <h2 className="text-5xl md:text-7xl font-sans font-normal tracking-tight mb-8 md:mt-4 text-zinc-900 dark:text-zinc-100 leading-[0.9]">
               Siapa<br/>Kami
             </h2>
             
             <div className="text-zinc-600 dark:text-zinc-400 font-sans text-sm md:text-base leading-relaxed space-y-6 max-w-lg md:pl-8 border-l border-transparent md:border-black/10 md:dark:border-white/10">
                <p>
                  Kami adalah tim KKN-PPM UGM Tim Ngaraksa Cimerak Tahun 2026 yang memiliki satu tekad kuat: berbakti untuk negeri melalui pengabdian nyata di Kecamatan Cimerak, Pangandaran.
                </p>
                <p>
                  Desa Masawah, Legokjawa, dan Batumalang menyimpan segudang potensi. Namun ada tantangan berupa minimnya diversifikasi pangan dan pengelolaan limbah.
                </p>
                <p>
                  Berkolaborasi bersama masyarakat, kami berupaya menciptakan solusi inovatif dan memberdayakan ekonomi warga secara berkelanjutan.
                </p>
             </div>
           </div>

           {/* Bottom Stats Grid */}
           <div className="grid grid-cols-3 border-r border-b border-black/10 dark:border-white/10">
              <div className="p-6 md:p-8 border-r border-black/10 dark:border-white/10 bg-white dark:bg-black relative hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                 <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-[#F6E769]"></div>
                 <div className="text-4xl md:text-5xl font-sans tracking-tighter mb-2 text-zinc-900 dark:text-white">50</div>
                 <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Hari</div>
              </div>
              <div className="p-6 md:p-8 border-r border-black/10 dark:border-white/10 bg-white dark:bg-black relative hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                 <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-[#AEE3EF]"></div>
                 <div className="text-4xl md:text-5xl font-sans tracking-tighter mb-2 text-zinc-900 dark:text-white">3</div>
                 <div className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Desa</div>
              </div>
              <div className="p-6 md:p-8 bg-[#504702] text-white relative flex flex-col justify-center">
                 <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-[#F6E769]"></div>
                 <div className="text-4xl md:text-5xl font-sans tracking-tighter mb-2">30</div>
                 <div className="text-xs uppercase tracking-widest font-bold">Anggota</div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}
