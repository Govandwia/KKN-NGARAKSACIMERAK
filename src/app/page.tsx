import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ThemeVision from "@/components/ThemeVision";
import ProgramsPreview from "@/components/ProgramsPreview";
import Timeline from "@/components/Timeline";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Preloader />
      <Navbar />
      <Hero />
      <About />
      <ThemeVision />
      <ProgramsPreview />
      <Timeline />
      <Location />
      <Footer />
    </main>
  );
}
