import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ngaraksa-cimerak.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base routes
  const routes = [
    '',
    '/program',
    '/artikel',
    '/anggota',
    '/galeri',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch dynamic articles
  const dynamicRoutes: any[] = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'articles'));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      dynamicRoutes.push({
        url: `${SITE_URL}/artikel/${data.slug}`,
        lastModified: new Date(data.createdAt || Date.now()).toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      });
    });
  } catch (error) {
    console.error('Error generating sitemap for articles:', error);
  }

  return [...routes, ...dynamicRoutes];
}
