import Navbar from "@/components/Navbar";
import Hero from "@/features/hero/Hero";
import About from "@/features/about/About";
import Experience from "@/features/experience/Experience";
import Projects from "@/features/projects/Projects";
import Skills from "@/features/skills/Skills";
import Contact from "@/features/contact/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}