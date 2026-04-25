import { lazy, Suspense } from "react";
import Seo from "@/components/Seo";
import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import SocialDock from "@/components/portfolio/SocialDock";
import CurtainReveal from "@/components/portfolio/CurtainReveal";
import ScrollRail from "@/components/portfolio/ScrollRail";

const About = lazy(() => import("@/components/portfolio/About"));
const Skills = lazy(() => import("@/components/portfolio/Skills"));
const Education = lazy(() => import("@/components/portfolio/Education"));
const Projects = lazy(() => import("@/components/portfolio/Projects"));
const ProjectVideo = lazy(() => import("@/components/portfolio/ProjectVideo"));
const Experience = lazy(() => import("@/components/portfolio/Experience"));
const Contact = lazy(() => import("@/components/portfolio/Contact"));
const Footer = lazy(() => import("@/components/portfolio/Footer"));
const CursorBlob = lazy(() => import("@/components/portfolio/CursorBlob"));
const Marquee = lazy(() => import("@/components/portfolio/Marquee"));
const AmbientAudio = lazy(() => import("@/components/portfolio/AmbientAudio"));
const TouchRipple = lazy(() => import("@/components/portfolio/TouchRipple"));

const Index = () => {
  return (
    <main className="snap-root relative min-h-screen overflow-x-hidden bg-background grain">
      <Seo
        title="Mahfuz Ahmed Rony | Portfolio | Web Developer, Designer & Lawyer"
        description="Mahfuz Ahmed Rony (Rony) is a portfolio of a web developer, graphics designer and law student from Bangladesh. Explore projects, design work, skills and experience."
        path="/"
      />
      <Suspense fallback={null}>
        <CursorBlob />
        <TouchRipple />
        <AmbientAudio />
      </Suspense>
      <SocialDock />
      <Nav />
      <ScrollRail />

      <div className="snap-section"><Hero /></div>

      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <div className="snap-section"><CurtainReveal><About /></CurtainReveal></div>
        <div className="snap-section"><CurtainReveal><Skills /></CurtainReveal></div>
        <div className="snap-section"><CurtainReveal><Education /></CurtainReveal></div>
        <div className="snap-section"><CurtainReveal><Projects /></CurtainReveal></div>
        <div className="snap-section"><CurtainReveal><ProjectVideo /></CurtainReveal></div>
        <div className="snap-section"><CurtainReveal><Experience /></CurtainReveal></div>
        <div className="snap-section"><CurtainReveal><Contact /></CurtainReveal></div>
        <Footer />
      </Suspense>

      {/* Floating bottom marquee — appears once Hero is passed, persists across rest of page */}
      <Suspense fallback={null}>
        <Marquee />
      </Suspense>
    </main>
  );
};

export default Index;
