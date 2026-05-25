const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/components/*.tsx');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf-8');
  content = content.replace(/max-w-\[1200px\]/g, 'w-full');
  content = content.replace(/max-w-\[1400px\]/g, 'w-full');
  content = content.replace(/max-w-\[1600px\]/g, 'w-full');
  content = content.replace(/max-w-7xl/g, 'w-full');
  
  // also reduce padding on sections if any
  content = content.replace(/px-6 md:px-12/g, 'px-4 md:px-6');
  content = content.replace(/px-6 md:px-10/g, 'px-4 md:px-6');
  content = content.replace(/px-4 md:px-8/g, 'px-4 md:px-6');
  
  // For About and Location cards
  content = content.replace(/p-8 md:p-12/g, 'p-6 md:p-8');
  content = content.replace(/p-4 md:p-8/g, 'p-4 md:p-6');
  
  fs.writeFileSync(f, content, 'utf-8');
});
console.log('Replaced successfully');
