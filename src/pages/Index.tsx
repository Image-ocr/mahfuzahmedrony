import { lazy, Suspense } from "react";
import Nav from "@/components/portfolio/Nav";
import Hero from "@/components/portfolio/Hero";
import SocialDock from "@/components/portfolio/SocialDock";
import CurtainReveal from "@/components/portfolio/CurtainReveal";
import ScrollRail from "@/components/portfolio/ScrollRail";

const About = lazy(() => import("@/components/portfolio/About"));
const Skills = lazy(() => import("@/components/portfolio/Skills"));
const Education = lazy(() => import("@/components/portfolio/Education"));
const Projects = lazy(() => import("@/components/portfolio/Projects"));
const Experience = lazy(() => import("@/components/portfolio/Experience"));
const Contact = lazy(() => import("@/components/portfolio/Contact"));
const Footer = lazy(() => import("@/components/portfolio/Footer"));
const CursorBlob = lazy(() => import("@/components/portfolio/CursorBlob"));
const Marquee = lazy(() => import("@/components/portfolio/Marquee"));

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background grain">
      <Suspense fallback={null}>
        <CursorBlob />
      </Suspense>
      <SocialDock />
      <Nav />
      <ScrollRail />
      <Hero />
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <CurtainReveal><About /></CurtainReveal>
        <CurtainReveal><Skills /></CurtainReveal>
        <CurtainReveal><Education /></CurtainReveal>
        <CurtainReveal>
          <div className="container">
            <Marquee />
          </div>
        </CurtainReveal>
        <CurtainReveal><Projects /></CurtainReveal>
        <CurtainReveal><Experience /></CurtainReveal>
        <CurtainReveal><Contact /></CurtainReveal>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Index;
