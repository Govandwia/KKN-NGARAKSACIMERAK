export interface GDriveImage {
  id: string;
  name: string;
  url: string;
}

/**
 * Ekstrak Folder ID dari berbagai format link Google Drive
 */
export function extractFolderId(url: string): string | null {
  try {
    // Format 1: https://drive.google.com/drive/folders/1oBmxKVIvvR05qboFPzq9Q1JNZieLUl75
    const folderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    if (folderMatch && folderMatch[1]) return folderMatch[1];

    // Format 2: https://drive.google.com/open?id=1oBmxKVIvvR05qboFPzq9Q1JNZieLUl75
    const urlObj = new URL(url);
    const idParam = urlObj.searchParams.get("id");
    if (idParam) return idParam;

    return null;
  } catch (e) {
    return null;
  }
}

/**
 * Mengambil daftar gambar dari folder Google Drive publik menggunakan API Key
 */
export async function fetchImagesFromDriveFolder(folderUrl: string): Promise<GDriveImage[]> {
  const folderId = extractFolderId(folderUrl);
  if (!folderId) throw new Error("Link folder Google Drive tidak valid");

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY;
  if (!apiKey) throw new Error("Google Drive API Key belum dikonfigurasi");

  // Query API Drive v3
  // Hanya ambil file gambar di dalam folder tersebut
  const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
  const apiUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&key=${apiKey}&fields=files(id,name,thumbnailLink)&pageSize=100`;

  const response = await fetch(apiUrl);
  
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Drive API Error:", errorData);
    throw new Error(errorData.error?.message || "Gagal mengambil data dari Google Drive");
  }

  const data = await response.json();
  
  if (!data.files) return [];

  return data.files.map((file: any) => {
    // Thumbnail link biasanya berakhiran =s220, kita hapus agar ukurannya lebih besar (default max resolusi)
    // atau ubah menjadi =s1080 untuk lebar 1080px
    let highResUrl = file.thumbnailLink || "";
    if (highResUrl) {
      highResUrl = highResUrl.replace(/=s\d+/, "=s1080");
    } else {
      // Fallback jika tidak ada thumbnail (sangat jarang untuk gambar)
      highResUrl = `https://drive.google.com/uc?id=${file.id}`;
    }

    return {
      id: file.id,
      name: file.name,
      url: highResUrl
    };
  });
}
