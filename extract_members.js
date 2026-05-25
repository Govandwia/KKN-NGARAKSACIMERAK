const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const workbook = xlsx.readFile('c:/Code love life/comprokkn/Persekrean kakaen (1).xlsx');
const sheet = workbook.Sheets['Anggota'];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

const villagesMap = {};

// Skip header row (row 0)
for (let i = 1; i < data.length; i++) {
  const row = data[i];
  if (!row || row.length < 3) continue;

  const subUnit = row[1];
  const namaLengkap = row[2];
  
  if (!subUnit || !namaLengkap) continue;
  
  const villageName = String(subUnit).trim();
  const villageId = villageName.toLowerCase();

  if (!villagesMap[villageId]) {
    villagesMap[villageId] = {
      id: villageId,
      name: villageName,
      members: []
    };
  }

  villagesMap[villageId].members.push({
    fullName: String(namaLengkap).trim(),
    name: row[4] ? String(row[4]).trim() : String(namaLengkap).trim(), // Nama Panggilan
    gender: row[3] ? String(row[3]).trim() : '',
    prodi: row[7] ? String(row[7]).trim() : '',
    fakultas: row[8] ? String(row[8]).trim() : '',
    divisi: row[10] ? String(row[10]).trim() : '',
    klaster: row[11] ? String(row[11]).trim() : ''
  });
}

const membersData = Object.values(villagesMap);

const outPath = path.join(__dirname, 'src', 'data', 'members.json');
fs.writeFileSync(outPath, JSON.stringify(membersData, null, 2));

console.log('Successfully extracted members from the new file to', outPath);
membersData.forEach(v => console.log(`- ${v.name}: ${v.members.length} members`));
