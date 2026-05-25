const fs = require('fs');

const colors = ['#EB9365', '#F6E769', '#CCF7C9', '#AEE3EF', '#FBA0A0', '#504702'];

let progContent = fs.readFileSync('src/components/ProgramsPreview.tsx', 'utf8');

// For each cluster, we want to map it to a color.
// Wait, currently ProgramsPreview has map over clusters and applies hover:text-[#EB9365].
// We should add color to each cluster object!
const clusterColorPattern = /(id: "[^"]+",\n\s+name: "[^"]+",\n\s+desc: "[^"]+",\n\s+icon: <[^>]+>)/g;
let i = 0;
progContent = progContent.replace(clusterColorPattern, (match) => {
    let c = colors[i % colors.length];
    i++;
    return match + ,\n      color: "";
});

// Now replace hardcoded #EB9365 inside the loop with cluster.color
progContent = progContent.replace(/bg-\[#EB9365\]/g, "bg-[]");
progContent = progContent.replace(/text-\[#EB9365\]/g, "text-[]");
progContent = progContent.replace(/border-\[#EB9365\]/g, "border-[]");

// Fix the header styling for ProgramsPreview (which is outside the loop)
// Revert the header to use primary orange, since it's outside the loop.
progContent = progContent.replace(/bg-\[\$\{cluster\.color\}\]/g, (match, offset) => offset < 1500 ? 'bg-[#EB9365]' : match);
progContent = progContent.replace(/text-\[\$\{cluster\.color\}\]/g, (match, offset) => offset < 1500 ? 'text-[#EB9365]' : match);

fs.writeFileSync('src/components/ProgramsPreview.tsx', progContent, 'utf8');
console.log('Processed ProgramsPreview');

let timeContent = fs.readFileSync('src/components/Timeline.tsx', 'utf8');
// In Timeline.tsx, we can add color to milestones.
const msColorPattern = /(\{ title: "[^"]+", date: "[^"]+" \})/g;
let j = 0;
timeContent = timeContent.replace(msColorPattern, (match) => {
    let c = colors[j % 5]; // 5 milestones
    j++;
    return match.slice(0, -2) + , color: "" };
});

timeContent = timeContent.replace(/text-\[#EB9365\]/g, "text-[]");
timeContent = timeContent.replace(/border-\[#EB9365\]/g, "border-[]");

// Revert header to orange
timeContent = timeContent.replace(/text-\[\$\{m\.color\}\]/g, (match, offset) => offset < 800 ? 'text-[#EB9365]' : match);
timeContent = timeContent.replace(/bg-\[#EB9365\]/g, (match, offset) => offset < 800 ? 'bg-[#EB9365]' : match); // Header dot

fs.writeFileSync('src/components/Timeline.tsx', timeContent, 'utf8');
console.log('Processed Timeline');

// For ThemeVision, just swap the Misi background and some dots manually in string replacement.
let themeContent = fs.readFileSync('src/components/ThemeVision.tsx', 'utf8');
// Change Misi background to Blue Dark (#7A9FA7) and hover to Darker (#577278)
themeContent = themeContent.replace(/bg-\[#EB9365\] text-white/g, 'bg-[#7A9FA7] text-white');
themeContent = themeContent.replace(/hover:bg-\[#e66000\]/g, 'hover:bg-[#577278]');
// Change Visi text color asterisk to Green Primary (#CCF7C9) -- wait, #CCF7C9 is too light for text. Let's use Olive Dark (#383201)
// Let's just change the first occurrence of text-[#EB9365] to text-[#383201] (it's the asterisk)
themeContent = themeContent.replace(/text-\[#EB9365\]/, 'text-[#B07070]'); // Visi asterisk to Red Dark
// Change corner dots of Visi to Red Primary
themeContent = themeContent.replace(/bg-\[#EB9365\]/, 'bg-[#FBA0A0]');
themeContent = themeContent.replace(/bg-\[#EB9365\]/, 'bg-[#FBA0A0]');

fs.writeFileSync('src/components/ThemeVision.tsx', themeContent, 'utf8');
console.log('Processed ThemeVision');

