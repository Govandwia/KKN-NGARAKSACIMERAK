import csv
import json
import os

scratch_dir = 'C:/Users/asus/.gemini/antigravity-ide/brain/e0fe9d5e-c1b3-44fa-bc2d-b2d040adea94/scratch'
inter_path = os.path.join(scratch_dir, 'inter.csv')
mono_path = os.path.join(scratch_dir, 'mono.csv')

def parse_inter():
    clusters = []
    current_cluster = None
    with open(inter_path, encoding='utf-8') as f:
        reader = csv.reader(f)
        for i, row in enumerate(reader):
            if i < 14:  # skip headers up to row 14 (0-indexed 13)
                continue
            if not any(row):  # skip empty rows
                continue
                
            no = row[0].strip()
            nama_inter = row[1].strip()
            proker = row[2].strip()
            pic = row[3].strip()
            lokasi = row[4].strip()
            
            if nama_inter:
                current_cluster = {
                    'name': nama_inter,
                    'programs': []
                }
                clusters.append(current_cluster)
            
            if proker and current_cluster is not None:
                current_cluster['programs'].append({
                    'name': proker,
                    'pic': pic,
                    'location': lokasi
                })
    return clusters

def parse_mono():
    clusters = []
    current_cluster = None
    with open(mono_path, encoding='utf-8') as f:
        reader = csv.reader(f)
        for i, row in enumerate(reader):
            if i < 14:
                continue
            if not any(row):
                continue
            
            klaster = row[1].strip()
            nama_mono = row[2].strip()
            pic = row[3].strip()
            lokasi = row[4].strip()
            
            if klaster:
                current_cluster = {
                    'name': klaster,
                    'programs': []
                }
                clusters.append(current_cluster)
                
            if nama_mono and current_cluster is not None and nama_mono != '-':
                current_cluster['programs'].append({
                    'name': nama_mono,
                    'pic': pic,
                    'location': lokasi
                })
    return clusters

data = {
    'inter': parse_inter(),
    'mono': parse_mono()
}

out_path = 'src/data/programs.json'
os.makedirs('src/data', exist_ok=True)
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print('Successfully generated src/data/programs.json')
