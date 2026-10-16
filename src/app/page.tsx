import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Preloader } from "@/components/layout/preloader";
import { SceneOverlay } from "@/components/three/scene-overlay";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Research } from "@/components/sections/research";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <SceneOverlay />
      <main>
        <Hero />
        <About />
        <Research />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
