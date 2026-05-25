import xml.etree.ElementTree as ET
import json

tree = ET.parse('public/images/desa/Group 143727362.svg')
root = tree.getroot()

paths = [path.attrib['d'] for path in root.findall('.//{http://www.w3.org/2000/svg}path')]

# Based on previous match
villages = [
  {"id": "masawah", "name": "Masawah", "color": "text-amber-600 dark:text-amber-400", "border": "border-amber-600 dark:border-amber-400", "bg": "bg-amber-50 dark:bg-amber-900/20", "dot": "bg-amber-600 dark:bg-amber-400", "fill": "#d97706", "desc": "Desa Masawah kaya akan kearifan lokal dan budaya tradisional, dipadukan dengan potensi maritim pesisir."},
  {"id": "legokjawa", "name": "Legokjawa", "color": "text-cyan-600 dark:text-cyan-400", "border": "border-cyan-600 dark:border-cyan-400", "bg": "bg-cyan-50 dark:bg-cyan-900/20", "dot": "bg-cyan-600 dark:bg-cyan-400", "fill": "#0891b2", "desc": "Desa Legokjawa menawarkan pesona wisata dan pesisir yang indah. Sektor pariwisata menjadi pilar utama."},
  {"id": "batumalang", "name": "Batumalang", "color": "text-blue-600 dark:text-blue-400", "border": "border-blue-600 dark:border-blue-400", "bg": "bg-blue-50 dark:bg-blue-900/20", "dot": "bg-blue-600 dark:bg-blue-400", "fill": "#2563eb", "desc": "Desa Batumalang memiliki potensi luar biasa di sektor agrikultur dan perkebunan, serta komunitas warga yang aktif dalam pengembangan inovasi lokal."},
  {"id": "cimerak", "name": "Cimerak", "color": "text-emerald-600 dark:text-emerald-400", "border": "border-emerald-600 dark:border-emerald-400", "bg": "bg-emerald-50 dark:bg-emerald-900/20", "dot": "bg-emerald-600 dark:bg-emerald-400", "fill": "#059669", "desc": "Sebagai pusat pemerintahan kecamatan, Cimerak merupakan urat nadi pergerakan ekonomi dan sosial masyarakat, dengan potensi UMKM yang menjanjikan."},
  {"id": "sukajaya", "name": "Sukajaya", "color": "text-pink-600 dark:text-pink-400", "border": "border-pink-600 dark:border-pink-400", "bg": "bg-pink-50 dark:bg-pink-900/20", "dot": "bg-pink-600 dark:bg-pink-400", "fill": "#db2777", "desc": "Desa Sukajaya memfokuskan pembangunannya pada pemberdayaan SDM dan peningkatan literasi masyarakat."},
  {"id": "sindangsari", "name": "Sindangsari", "color": "text-indigo-600 dark:text-indigo-400", "border": "border-indigo-600 dark:border-indigo-400", "bg": "bg-indigo-50 dark:bg-indigo-900/20", "dot": "bg-indigo-600 dark:bg-indigo-400", "fill": "#4f46e5", "desc": "Sindangsari aktif menggerakkan ekonomi kreatif warganya melalui kelompok tani dan UMKM adaptif teknologi."},
  {"id": "mekarsari", "name": "Mekarsari", "color": "text-fuchsia-600 dark:text-fuchsia-400", "border": "border-fuchsia-600 dark:border-fuchsia-400", "bg": "bg-fuchsia-50 dark:bg-fuchsia-900/20", "dot": "bg-fuchsia-600 dark:bg-fuchsia-400", "fill": "#c026d3", "desc": "Mekarsari merupakan desa yang dinamis dengan perkembangan masyarakat yang berfokus pada kesejahteraan berkelanjutan."},
  {"id": "kertaharja", "name": "Kertaharja", "color": "text-teal-600 dark:text-teal-400", "border": "border-teal-600 dark:border-teal-400", "bg": "bg-teal-50 dark:bg-teal-900/20", "dot": "bg-teal-600 dark:bg-teal-400", "fill": "#0d9488", "desc": "Kertaharja memiliki kekayaan sumber daya alam yang melimpah dan komunitas yang harmonis."},
  {"id": "ciparanti", "name": "Ciparanti", "color": "text-orange-600 dark:text-orange-400", "border": "border-orange-600 dark:border-orange-400", "bg": "bg-orange-50 dark:bg-orange-900/20", "dot": "bg-orange-600 dark:bg-orange-400", "fill": "#ea580c", "desc": "Ciparanti dikenal dengan hamparan alamnya yang asri. Desa ini menjadi salah satu fokus pengabdian untuk pelestarian lingkungan."},
  {"id": "limusgede", "name": "Limusgede", "color": "text-rose-600 dark:text-rose-400", "border": "border-rose-600 dark:border-rose-400", "bg": "bg-rose-50 dark:bg-rose-900/20", "dot": "bg-rose-600 dark:bg-rose-400", "fill": "#e11d48", "desc": "Limusgede berpotensi besar dalam pengembangan komoditas kerajinan lokal dan produk olahan pertanian khas."},
  {"id": "kertamukti", "name": "Kertamukti", "color": "text-purple-600 dark:text-purple-400", "border": "border-purple-600 dark:border-purple-400", "bg": "bg-purple-50 dark:bg-purple-900/20", "dot": "bg-purple-600 dark:bg-purple-400", "fill": "#9333ea", "desc": "Kertamukti memiliki keunggulan di bidang pertanian berkelanjutan. Masyarakatnya terus berinovasi dalam mengelola lahan."}
]

for i in range(11):
    villages[i]['d'] = paths[i]

with open('src/data/villages.ts', 'w') as f:
    f.write('export const villages = ' + json.dumps(villages, indent=2) + ';\n')
