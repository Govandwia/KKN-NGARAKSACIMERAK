import os
import glob
import re

files = glob.glob('src/components/*.tsx')
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace container limits
    content = content.replace('max-w-[1200px]', 'w-full')
    content = content.replace('max-w-[1400px]', 'w-full')
    content = content.replace('max-w-[1600px]', 'w-full')
    content = content.replace('max-w-7xl', 'w-full')
    
    # also reduce padding on sections if any
    content = content.replace('px-6 md:px-12', 'px-4 md:px-6')
    content = content.replace('px-6 md:px-10', 'px-4 md:px-6')
    content = content.replace('px-4 md:px-8', 'px-4 md:px-6')
    
    # For About and Location cards
    content = content.replace('p-8 md:p-12', 'p-6 md:p-8')
    content = content.replace('p-4 md:p-8', 'p-4 md:p-6')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
print('Replaced successfully')
