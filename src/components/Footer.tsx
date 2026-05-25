import Image from "next/image";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white py-16 md:py-24 px-4 md:px-6 font-sans border-t border-white/10">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          
          {/* Left: Brand & Logos */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-xl md:text-2xl font-bold tracking-wider uppercase mb-6">Ngaraksa Cimerak</h3>
            <p className="text-sm text-white/60 leading-relaxed font-sans mb-8 pr-0 md:pr-12">
              Tim KKN-PPM UGM Unit JB-015 Tahun 2026 yang berdedikasi untuk pemberdayaan ekonomi, inovasi komoditas lokal, mitigasi bencana, dan pelestarian budaya di Kecamatan Cimerak, Pangandaran.
            </p>
            <div className="flex items-center gap-6 md:gap-8 bg-[#cccccc] py-3 px-6 md:py-4 md:px-8 rounded-full w-max shadow-inner">
              <Image src="/images/logos/logo-ugm.png" alt="Logo UGM" width={200} height={64} className="h-10 md:h-14 w-auto object-contain" />
              <Image src="/images/logos/logo-kkn.png" alt="Logo KKN" width={64} height={64} className="h-10 md:h-14 w-auto object-contain" />
              <Image src="/images/logos/logo-tim.png" alt="Logo Tim" width={64} height={64} className="h-10 md:h-14 w-auto object-contain drop-shadow-sm" />
            </div>
          </div>

          {/* Center: Nav */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold mb-2 uppercase tracking-widest text-sm text-white/40">Tautan</h4>
            <ul className="flex flex-col gap-3 text-sm font-medium text-white/70">
              <li className="hover:text-white cursor-pointer transition">Beranda</li>
              <li className="hover:text-white cursor-pointer transition">Program</li>
              <li className="hover:text-white cursor-pointer transition">Anggota</li>
              <li className="hover:text-white cursor-pointer transition">Galeri</li>
            </ul>
          </div>

          {/* Right: Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold mb-2 uppercase tracking-widest text-sm text-white/40">Kontak Kami</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition text-white font-medium text-sm">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition text-white font-medium text-sm">
                YT
              </a>
              <a href="mailto:kknrampakcimerak@gmail.com" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition text-white">
                <Mail size={18} />
              </a>
            </div>
          </div>

        </div>
        <div className="pt-8 border-t border-white/10 text-center text-white/40 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 KKN-PPM UGM Ngaraksa Cimerak. All rights reserved.</p>
          <p>Unit JB-015 • Kecamatan Cimerak, Pangandaran</p>
        </div>
      </div>
    </footer>
  );
}
