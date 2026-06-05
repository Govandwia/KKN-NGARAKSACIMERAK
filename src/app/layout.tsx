import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ngaraksa-cimerak.com"),
  title: {
    default: "KKN PPM UGM Ngaraksa Cimerak",
    template: "%s | KKN Ngaraksa Cimerak"
  },
  description: "Website Company Profile KKN-PPM UGM Tim Ngaraksa Cimerak Tahun 2026 yang berdedikasi untuk pemberdayaan ekonomi, inovasi komoditas lokal, mitigasi bencana, dan pelestarian budaya di Kecamatan Cimerak, Pangandaran.",
  keywords: ["KKN UGM", "Cimerak", "Pangandaran", "Pemberdayaan", "Pengabdian Masyarakat", "Ngaraksa Cimerak"],
  authors: [{ name: "Tim KKN Ngaraksa Cimerak" }],
  creator: "Tim KKN Ngaraksa Cimerak",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "KKN PPM UGM Ngaraksa Cimerak",
    description: "Sinergi untuk pertumbuhan, pemberdayaan, dan pelestarian lingkungan masyarakat Cimerak, Pangandaran.",
    siteName: "Ngaraksa Cimerak",
    images: [{
      url: "/images/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "KKN Ngaraksa Cimerak"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "KKN PPM UGM Ngaraksa Cimerak",
    description: "Sinergi untuk pertumbuhan, pemberdayaan, dan pelestarian lingkungan masyarakat Cimerak, Pangandaran.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn("h-full", "antialiased", playfair.variable, "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
