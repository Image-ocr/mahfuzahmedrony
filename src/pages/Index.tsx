import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

type RouteSeo = {
  title: string;
  description: string;
  path: string;
  sectionId?: string;
};

const ROUTE_SEO: Record<string, RouteSeo> = {
  "/": {
    title: "Mahfuz Ahmed Rony | Portfolio | Web Developer, Designer & Lawyer",
    description:
      "Mahfuz Ahmed Rony (Rony) is a portfolio of a web developer, graphics designer and law student from Bangladesh. Explore projects, design work, skills and experience.",
    path: "/",
  },
  "/about": {
    title: "Mahfuz Ahmed Rony | About | Web Developer, Designer & Law Student",
    description:
      "Learn about Mahfuz Ahmed Rony, a web developer, graphics designer, and law student from Bangladesh passionate about building elegant digital experiences.",
    path: "/about",
    sectionId: "about",
  },
  "/capabilities": {
    title: "Mahfuz Ahmed Rony | Skills & Capabilities",
    description:
      "Discover the skills and capabilities of Mahfuz Ahmed Rony — web development, graphics design, and modern UI engineering from Bangladesh.",
    path: "/capabilities",
    sectionId: "skills",
  },
  "/education": {
    title: "Mahfuz Ahmed Rony | Education | Islamic University & SCPSC",
    description:
      "Educational background of Mahfuz Ahmed Rony, law student at Islamic University Bangladesh and alumnus of Sirajganj Cantonment Public School & College.",
    path: "/education",
    sectionId: "education",
  },
  "/projects": {
    title: "Mahfuz Ahmed Rony | Projects Portfolio",
    description:
      "Explore projects by Mahfuz Ahmed Rony including web development, UI design and graphics work crafted with a futuristic, premium aesthetic.",
    path: "/projects",
    sectionId: "projects",
  },
  "/experience": {
    title: "Mahfuz Ahmed Rony | Experience",
    description:
      "Professional experience of Mahfuz Ahmed Rony — web developer, designer and law student from Bangladesh delivering polished digital products.",
    path: "/experience",
    sectionId: "experience",
  },
  "/contact": {
    title: "Mahfuz Ahmed Rony | Contact",
    description:
      "Get in touch with Mahfuz Ahmed Rony for web development, graphics design, and collaboration opportunities from Bangladesh and worldwide.",
    path: "/contact",
    sectionId: "contact",
  },
};

const Index = () => {
  const { pathname } = useLocation();
  const seo = ROUTE_SEO[pathname] ?? ROUTE_SEO["/"];

  useEffect(() => {
    if (!seo.sectionId) return;
    let cancelled = false;
    const tryScroll = (attempt: number) => {
      if (cancelled) return;
      const el = document.getElementById(seo.sectionId!);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempt < 20) {
        setTimeout(() => tryScroll(attempt + 1), 150);
      }
    };
    // Wait a tick so lazy sections can mount
    const t = setTimeout(() => tryScroll(0), 200);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [seo.sectionId]);

  return (
    <main className="snap-root relative min-h-screen overflow-x-hidden bg-background grain">
      <Seo title={seo.title} description={seo.description} path={seo.path} />
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
