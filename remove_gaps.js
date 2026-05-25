const fs = require('fs');
const files = [
  'src/components/About.tsx',
  'src/components/ThemeVision.tsx',
  'src/components/ProgramsPreview.tsx',
  'src/components/Location.tsx',
  'src/components/Timeline.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove padding from section
  content = content.replace(/px-4 md:px-6 (?:pt|py)-16 md:(?:pt|py)-24 /g, '');
  content = content.replace(/px-4 md:px-6 py-16 md:py-24 /g, '');
  content = content.replace(/w-full px-4 md:px-6 py-16 md:py-24/g, 'w-full');
  
  // Specifically for About.tsx which has pt-16 md:pt-24
  content = content.replace(/w-full px-4 md:px-6 pt-16 md:pt-24/g, 'w-full');
  
  // Remove double borders by removing top border on wrappers EXCEPT maybe we keep it on About.tsx
  // Because if sections touch, border-t of the bottom section touches border-b of the top section.
  if (file !== 'src/components/About.tsx') {
      content = content.replace(/border-t border-l border-black\/10 dark:border-white\/10/, 'border-l border-black/10 dark:border-white/10');
  }

  fs.writeFileSync(file, content, 'utf8');
}
console.log('Removed gaps and double borders');
