import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import membersData from "@/data/members.json";
import { PixelStar, FlowerStar } from "@/components/Decorations";

const colors = ['#EB9365', '#F6E769', '#CCF7C9', '#AEE3EF', '#FBA0A0', '#504702'];

export default function AnggotaPage() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />
      
      {/* Header Spacer for Navbar */}
      <div className="pt-24 md:pt-32"></div>

      {/* Header Section */}
      <section className="w-full border-b border-black/10 dark:border-white/10 flex flex-col lg:flex-row min-h-[400px]">
        {/* Left Side: Text */}
        <div className="flex-1 p-8 md:p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10 ml-0 md:ml-4 bg-white dark:bg-[#111] relative z-10 flex flex-col justify-center">
          <div className="absolute top-6 left-6 w-2 h-2 bg-[#CCF7C9]"></div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-normal tracking-tight uppercase">
            Anggota<br/>Tim
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Mengenal lebih dekat 30 individu luar biasa di balik KKN PPM UGM 2026 Ngaraksa Cimerak, yang tersebar di Masawah, Legokjawa, dan Batumalang.
          </p>
        </div>
        
        {/* Right Side: Geometric Decorations */}
        <div className="w-full lg:w-[45%] bg-[#CCF7C9] dark:bg-[#051105] relative flex items-center justify-center p-12 overflow-hidden border-black/10 dark:border-white/10 min-h-[300px]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="relative w-full h-full flex items-center justify-center">
             <PixelStar className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 text-black/10 dark:text-[#CCF7C9]/20" />
             <FlowerStar className="absolute top-4 left-12 w-20 h-20 text-white dark:text-[#CCF7C9] animate-[spin_20s_linear_infinite]" />
          </div>
        </div>
      </section>

      {/* Villages List */}
      <section className="w-full flex flex-col">
        {membersData.map((village, vIdx) => {
          const villageColor = colors[vIdx % colors.length];
          return (
            <div key={village.id} className="w-full flex flex-col">
              {/* Village Banner */}
              <div 
                className="w-full border-b border-black/10 dark:border-white/10 py-12 px-8 md:px-12 lg:px-24 flex items-center gap-8 relative overflow-hidden"
                style={{ backgroundColor: villageColor }}
              >
                {/* Optional subtle pattern */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,1)_25%,rgba(0,0,0,1)_50%,transparent_50%,transparent_75%,rgba(0,0,0,1)_75%,rgba(0,0,0,1)_100%)] bg-[size:20px_20px]"></div>
                
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold uppercase text-black relative z-10 tracking-tight">
                  {village.name}
                </h2>
                <div className="flex-1 h-px bg-black/20 relative z-10 hidden md:block"></div>
                <div className="text-3xl font-serif text-black/50 relative z-10 hidden md:block">✽</div>
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-zinc-50 dark:bg-black border-l border-black/10 dark:border-white/10">
                {village.members.map((member, mIdx) => (
                  <div 
                    key={mIdx} 
                    className="group border-r border-b border-black/10 dark:border-white/10 p-6 flex flex-col bg-white dark:bg-[#0a0a0a] transition-all hover:bg-zinc-50 dark:hover:bg-[#111] relative overflow-hidden min-h-[350px]"
                  >
                    {/* Hover Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" style={{ backgroundColor: villageColor }}></div>
                    
                    {/* Photo Flip Container */}
                    <div className="w-full aspect-square mb-6 relative group/flip cursor-pointer" style={{ perspective: '1000px' }}>
                      <div 
                        className="w-full h-full relative transition-transform duration-[800ms] group-hover/flip:[transform:rotateY(180deg)]"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        {/* Front Face (Foto) */}
                        <div 
                          className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900/50 flex flex-col items-center justify-center"
                          style={{ backfaceVisibility: 'hidden' }}
                        >
                           <span className="font-sans text-xs tracking-widest text-zinc-400 dark:text-zinc-600 uppercase transition-colors group-hover/flip:text-black dark:group-hover/flip:text-white">Foto</span>
                           <div className="absolute inset-0 border border-black/5 dark:border-white/5"></div>
                        </div>

                        {/* Back Face (Quote) */}
                        <div 
                          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border border-black/10 dark:border-white/10"
                          style={{ 
                            backfaceVisibility: 'hidden', 
                            transform: 'rotateY(180deg)',
                            backgroundColor: villageColor 
                          }}
                        >
                           <p className="font-serif italic text-black text-sm leading-relaxed">
                             "Kutipan atau pesan berkesan dari anggota akan tampil di sini."
                           </p>
                           <div className="mt-4 w-4 h-px bg-black/30"></div>
                        </div>
                      </div>
                    </div>

                    {/* Member Info */}
                    <div className="mt-auto flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="text-[10px] font-mono uppercase tracking-widest font-bold" style={{ color: villageColor }}>
                          {member.divisi || "Anggota"}
                        </div>
                        {member.klaster && (
                          <div className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-full border border-black/10 dark:border-white/20 bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-zinc-300">
                            {member.klaster}
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl font-sans font-bold uppercase leading-tight">{member.name}</h3>
                      <div className="text-xs text-zinc-500 font-serif italic mb-4">{member.fullName}</div>
                      
                      <div className="text-sm text-zinc-600 dark:text-zinc-400 font-sans border-t border-black/10 dark:border-white/10 pt-4">
                        <div className="font-bold mb-1 text-zinc-900 dark:text-white text-[10px] uppercase tracking-wider">Program Studi</div>
                        <div className="leading-snug">{member.prodi}</div>
                        <div className="text-xs text-zinc-500 mt-0.5">{member.fakultas}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <Footer />
    </main>
  );
}
