export default function Timeline() {
  const milestones = [
    { title: "Observasi & Sosialisasi", date: "Minggu 1-2", color: "#EB9365" },
    { title: "Implementasi & Pelatihan", date: "Minggu 3-4", color: "#F6E769" },
    { title: "Puncak Program (Hari Anak)", date: "Minggu 5-6", color: "#CCF7C9" },
    { title: "Evaluasi & Transisi", date: "Minggu 7", color: "#AEE3EF" },
    { title: "Keberlanjutan", date: "Pasca KKN", color: "#FBA0A0" }
  ];

  return (
    <section className="w-full bg-background text-foreground transition-colors duration-300 font-serif">
      <div className="w-full mx-auto">
        
        {/* Header */}
        <div className="border-l border-black/10 dark:border-white/10 bg-white dark:bg-[#111]">
          <div className="p-8 md:p-12 border-r border-b border-black/10 dark:border-white/10 relative">
            <div className="absolute top-6 left-6 w-1.5 h-1.5 bg-[#EB9365]"></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal text-zinc-900 dark:text-white tracking-tight">
              Linimasa Program
            </h2>
          </div>
        </div>
        
        {/* Grid Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 border-l border-black/10 dark:border-white/10">
          {milestones.map((m, i) => (
            <div 
              key={i} 
              className="flex flex-col p-6 md:p-8 border-r border-b border-black/10 dark:border-white/10 bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group relative min-h-[250px]"
              style={{ '--hover-color': m.color } as React.CSSProperties}
            >
              
              {/* Top Row: Left Icon, Number, Right Icon */}
              <div className="flex justify-between items-center mb-8 w-full">
                <div 
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-xl"
                  style={{ color: 'var(--hover-color)' }}
                >✦</div>
                
                <div 
                  className="font-normal text-3xl text-center flex-1"
                  style={{ color: m.color }}
                >
                  0{i + 1}
                </div>
                
                <div 
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-xl"
                  style={{ color: 'var(--hover-color)' }}
                >✿</div>
              </div>
              
              <h4 className="text-lg lg:text-xl font-normal text-zinc-900 dark:text-white mb-auto leading-tight text-center">
                {m.title}
              </h4>
              
              <div 
                className="text-xs tracking-widest uppercase font-bold text-zinc-400 mt-6 pt-4 border-t border-black/10 dark:border-white/10 transition-colors text-center w-full"
                style={{ borderTopColor: 'var(--hover-color)' }}
              >
                <div className="group-hover:text-[var(--hover-color)] transition-colors">
                  {m.date}
                </div>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
