import xml.etree.ElementTree as ET
import glob
import re
import os

# Get individual SVGs
individuals = {}
for f in glob.glob('public/images/desa/*.svg'):
    name = os.path.basename(f)
    if 'Group' in name: continue
    tree = ET.parse(f)
    root = tree.getroot()
    w = float(root.attrib.get('width', 0))
    h = float(root.attrib.get('height', 0))
    individuals[name] = (w, h)

# Get group paths
tree = ET.parse('public/images/desa/Group 143727362.svg')
root = tree.getroot()
paths = []
for idx, path in enumerate(root.findall('.//{http://www.w3.org/2000/svg}path')):
    d = path.attrib['d']
    # find all numbers
    coords = [float(x) for x in re.findall(r'-?\d+\.?\d*', d)]
    # pair them up for x and y (rough approximation since commands vary, but min/max works if we just look at all x and all y)
    # Actually, a simple regex: M x y L x y... all numbers are either x or y. 
    # SVG paths usually have x, y alternating except for H and V.
    # A better way: just get min/max of all numbers. Wait, no. H takes 1 arg (x), V takes 1 arg (y).
    # Let's use svg.path library or just simple regex for H and V.
    
    xs = []
    ys = []
    tokens = re.findall(r'([A-Za-z])|(-?\d+\.?\d*)', d)
    current_cmd = 'M'
    i = 0
    while i < len(tokens):
        if tokens[i][0]:
            current_cmd = tokens[i][0]
            i += 1
            continue
        
        if current_cmd.upper() == 'H':
            xs.append(float(tokens[i][1]))
            i += 1
        elif current_cmd.upper() == 'V':
            ys.append(float(tokens[i][1]))
            i += 1
        elif current_cmd.upper() in ['M', 'L', 'T']:
            xs.append(float(tokens[i][1]))
            ys.append(float(tokens[i+1][1]))
            i += 2
        elif current_cmd.upper() in ['Q', 'S']:
            xs.append(float(tokens[i][1]))
            ys.append(float(tokens[i+1][1]))
            xs.append(float(tokens[i+2][1]))
            ys.append(float(tokens[i+3][1]))
            i += 4
        elif current_cmd.upper() == 'C':
            xs.append(float(tokens[i][1]))
            ys.append(float(tokens[i+1][1]))
            xs.append(float(tokens[i+2][1]))
            ys.append(float(tokens[i+3][1]))
            xs.append(float(tokens[i+4][1]))
            ys.append(float(tokens[i+5][1]))
            i += 6
        elif current_cmd.upper() == 'A':
            xs.append(float(tokens[i+5][1]))
            ys.append(float(tokens[i+6][1]))
            i += 7
        elif current_cmd.upper() == 'Z':
            i += 1
        else:
            i += 1

    w = max(xs) - min(xs)
    h = max(ys) - min(ys)
    paths.append({'index': idx, 'w': w, 'h': h, 'd': d})

# Match
for p in paths:
    best_match = None
    best_diff = float('inf')
    for name, (w, h) in individuals.items():
        diff = abs(p['w'] - w) + abs(p['h'] - h)
        if diff < best_diff:
            best_diff = diff
            best_match = name
    print(f"Path {p['index']} -> {best_match} (diff: {best_diff})")
