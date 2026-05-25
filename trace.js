const potrace = require('potrace');
const fs = require('fs');
const path = require('path');

const dir = 'public/images/desa';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png') && !f.includes('Group') && !f.includes('Vector'));

const promises = files.map(file => {
  return new Promise((resolve, reject) => {
    potrace.trace(path.join(dir, file), { 
      threshold: 128, 
      optTolerance: 0.2,
      blackOnWhite: true
    }, (err, svg) => {
      if (err) return resolve({ file, error: err.message });
      
      const match = svg.match(/<path[^>]*d="([^"]*)"/);
      const d = match ? match[1] : '';
      
      const widthMatch = svg.match(/width="([^"]*)"/);
      const heightMatch = svg.match(/height="([^"]*)"/);
      
      resolve({ file, d, width: widthMatch ? widthMatch[1] : null, height: heightMatch ? heightMatch[1] : null });
    });
  });
});

Promise.all(promises).then(results => {
  fs.writeFileSync('paths.json', JSON.stringify(results, null, 2));
  console.log('Saved to paths.json');
}).catch(console.error);
