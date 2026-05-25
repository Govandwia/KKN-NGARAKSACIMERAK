import { Fish, Leaf, Users, Recycle, ShieldAlert, Droplets } from "lucide-react";

export default function ProgramsPreview() {
  const clusters = [
    {
      id: "pangan",
      name: "Diversifikasi Pangan",
      desc: "Sosialisasi diversifikasi pangan lokal, pencegahan stunting melalui skrining kesehatan, dan inovasi bakso ikan bersayur.",
      icon: <Fish size={32} strokeWidth={1.5} />,
      color: "#EB9365"
    },
    {
      id: "komoditas",
      name: "Komoditas Lokal",
      desc: "Peningkatan nilai tambah kelapa menjadi briket biomassa, cocopeat, sabun saponifikasi, dan praktik agroforestri.",
      icon: <Leaf size={32} strokeWidth={1.5} />,
      color: "#F6E769"
    },
    {
      id: "anak",
      name: "Peringatan Hari Anak",
      desc: "Edukasi PHBS, pemilahan sampah, bahasa Inggris dasar, serta pelestarian Kaulinan Lembur (permainan tradisional).",
      icon: <Users size={32} strokeWidth={1.5} />,
      color: "#CCF7C9"
    },
    {
      id: "sampah",
      name: "Pengolahan Sampah",
      desc: "Pembuatan insinerator minim asap, jalan sehat peduli lingkungan, dan produksi rodentisida alami dari sereh.",
      icon: <Recycle size={32} strokeWidth={1.5} />,
      color: "#AEE3EF"
    },
    {
      id: "bencana",
      name: "Mitigasi Bencana",
      desc: "Pemetaan daerah rawan longsor & gempa, pemasangan plakat evakuasi, serta pelatihan P3K dan pengamanan aset.",
      icon: <ShieldAlert size={32} strokeWidth={1.5} />,
      color: "#FBA0A0"
    },
    {
      id: "air",
      name: "Air & Sanitasi",
      desc: "Pemetaan zona akuifer air tanah, demonstrasi alat filtrasi sederhana, dan edukasi penanganan awal diare (oralit).",
      icon: <Droplets size={32} strokeWidth={1.5} />,
      color: "#ACA24A" // Using Dark Yellow / Olive-ish as it works better for hover text than the very dark Olive
    }
  ];

  return (
    <section className="w-full bg-background text-foreground transition-colors duration-300">
      <div className="w-full mx-auto">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row border-l border-black/10 dark:border-white/10 bg-white dark:bg-black">
           <div className="p-8 md:p-12 lg:p-16 flex-1 border-r border-b border-black/10 dark:border-white/10 relative">
             <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-[#EB9365]"></div>
             <h2 className="text-5xl md:text-6xl lg:text-7xl font-sans font-normal tracking-tight mb-6 mt-4 text-zinc-900 dark:text-white leading-none">
               Program<br/>Kerja
             </h2>
             <p className="text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed text-sm md:text-base max-w-2xl">
               Kami membawa 6 rangkaian program kerja multidisiplin untuk memberikan solusi komprehensif bagi permasalahan di Cimerak.
             </p>
           </div>
           
           <div className="p-8 md:p-12 md:w-1/3 flex items-center justify-center border-r border-b border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-[#111] hover:bg-[#EB9365] hover:text-white transition-colors group cursor-pointer">
             <div className="flex items-center gap-6">
                <span className="font-sans font-medium text-xl">Lihat Semua</span>
                <span className="font-mono text-[#EB9365] group-hover:text-white transition-colors text-xl font-light">✽</span>
             </div>
           </div>
        </div>

        {/* Grid 3x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-black/10 dark:border-white/10 font-sans">
          {clusters.map((cluster) => (
            <div 
              key={cluster.id} 
              className="bg-white dark:bg-black border-r border-b border-black/10 dark:border-white/10 p-8 md:p-12 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group cursor-pointer relative flex flex-col h-[380px]"
              style={{ '--hover-color': cluster.color } as React.CSSProperties}
            >
              
              {/* Corner dot */}
              <div 
                className="absolute top-6 right-6 w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: cluster.color }}
              ></div>
              
              <div className="mb-auto">
                 <div 
                   className="w-12 h-12 mb-8 flex items-center justify-start transition-colors duration-300 text-zinc-400"
                   style={{ color: 'var(--hover-color, currentColor)' }}
                 >
                   <div className="group-hover:text-[var(--hover-color)] transition-colors">
                     {cluster.icon}
                   </div>
                 </div>
                 <h3 
                   className="text-2xl md:text-3xl font-sans font-normal tracking-tight mb-4 text-zinc-900 dark:text-white transition-colors"
                 >
                   <span className="group-hover:text-[var(--hover-color)] transition-colors">
                     {cluster.name}
                   </span>
                 </h3>
                 <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 line-clamp-4 leading-relaxed">{cluster.desc}</p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold group-hover:text-[var(--hover-color)] transition-colors">Jelajahi</span>
                <span className="font-serif text-zinc-300 dark:text-zinc-700 group-hover:text-[var(--hover-color)] transition-colors text-lg font-light">✽</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
