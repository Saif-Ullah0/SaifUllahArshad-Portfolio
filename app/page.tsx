import Navbar from "@/components/Navbar";
import Hero from "@/features/hero/Hero";
import About from "@/features/about/About";
import Experience from "@/features/experience/Experience";
import Projects from "@/features/projects/Projects";
import Skills from "@/features/skills/Skills";
import Contact from "@/features/contact/Contact";
import Footer from "@/components/Footer";
import SectionWrapper from "@/components/SectionWrapper";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SectionWrapper delay={0}>
        <About />
      </SectionWrapper>
      <SectionWrapper delay={0}>
        <Experience />
      </SectionWrapper>
      <SectionWrapper delay={0}>
        <Projects />
      </SectionWrapper>
      <SectionWrapper delay={0}>
        <Skills />
      </SectionWrapper>
      <SectionWrapper delay={0}>
        <Contact />
      </SectionWrapper>
      <Footer />
    </main>
  );
}