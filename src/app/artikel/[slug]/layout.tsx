import { Metadata } from "next";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Article } from "@/data/articles";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ngaraksa-cimerak.com';

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const unwrappedParams = await params;
  const slug = unwrappedParams.slug;
  const normalizedSlug = decodeURIComponent(slug).replace(/\s+/g, '-').toLowerCase();

  try {
    const q = query(collection(db, "articles"));
    const querySnapshot = await getDocs(q);
    
    let article: Article | null = null;
    querySnapshot.forEach((doc) => {
        const data = doc.data() as Article;
        if (data.slug === normalizedSlug || data.slug === slug) {
            article = data;
        }
    });

    if (!article) {
      return {
        title: "Artikel Tidak Ditemukan",
      }
    }

    return {
      title: article.title,
      description: article.excerpt || article.title,
      openGraph: {
        title: article.title,
        description: article.excerpt || article.title,
        images: article.image ? [article.image] : [],
        type: "article",
        url: `${SITE_URL}/artikel/${normalizedSlug}`
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.excerpt || article.title,
        images: article.image ? [article.image] : [],
      }
    }
  } catch (e) {
    return {
        title: "Artikel KKN Ngaraksa Cimerak",
    }
  }
}

export default function ArticleDetailLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
