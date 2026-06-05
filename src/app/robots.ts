import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ngaraksa-cimerak.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Prevent indexing of admin dashboard and APIs
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
