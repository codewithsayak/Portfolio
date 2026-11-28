import Header from "@/sections/Header";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Work from "@/sections/Work";
import Skills from "@/sections/Skills";
import Services from "@/sections/Services";
import Journey from "@/sections/Journey";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 grid-noise opacity-30" />
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Services />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
