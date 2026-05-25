import glob
import os

files = ['src/components/About.tsx', 'src/components/ThemeVision.tsx', 'src/components/ProgramsPreview.tsx']

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Replace the brutalist orange with the design system orange
    content = content.replace('#ff6b00', '#EB9365')
    content = content.replace('#e66000', '#C67A50') # slightly darker for hover
    
    # Replace the brackets with the asterisk element or arrow
    # Let's replace [ \ ] with ?
    content = content.replace('[ \ ]', '?')
    content = content.replace('[ 01 ]', '?')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)

print('Replaced colors and brackets')
