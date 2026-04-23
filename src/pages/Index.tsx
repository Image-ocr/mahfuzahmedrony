import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Education from "@/components/portfolio/Education";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background grain">
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Education />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
