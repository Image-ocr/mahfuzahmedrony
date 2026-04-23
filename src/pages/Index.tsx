import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Education from "@/components/portfolio/Education";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Contact from "@/components/portfolio/Contact";
import Footer from "@/components/portfolio/Footer";
import CursorBlob from "@/components/portfolio/CursorBlob";
import CurtainReveal from "@/components/portfolio/CurtainReveal";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background grain">
      <CursorBlob />
      <Nav />
      <Hero />
      <CurtainReveal><About /></CurtainReveal>
      <CurtainReveal><Skills /></CurtainReveal>
      <CurtainReveal><Education /></CurtainReveal>
      <CurtainReveal><Projects /></CurtainReveal>
      <CurtainReveal><Experience /></CurtainReveal>
      <CurtainReveal><Contact /></CurtainReveal>
      <Footer />
    </main>
  );
};

export default Index;
