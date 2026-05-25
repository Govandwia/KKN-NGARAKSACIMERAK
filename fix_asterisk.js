const fs = require('fs');
const files = ['src/components/About.tsx', 'src/components/ThemeVision.tsx', 'src/components/ProgramsPreview.tsx'];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/\?/g, '?');
  fs.writeFileSync(file, content, 'utf8');
}
console.log('Fixed asterisks');
