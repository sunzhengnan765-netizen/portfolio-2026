import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Reveal from "./components/Reveal";

// 首屏以下组件懒加载，减小初始 JS 体积
const Resume = lazy(() => import("./components/Resume"));
const Projects = lazy(() => import("./components/Projects"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function SectionFallback() {
  return <div style={{ minHeight: "50vh" }} />;
}

export default function App() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <Navbar />
      <Hero />
      <section id="resume" className="w-full bg-[#020202]">
        <Reveal delay={0.1}>
          <Suspense fallback={<SectionFallback />}>
            <Resume />
          </Suspense>
        </Reveal>
      </section>
      <Suspense fallback={<SectionFallback />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </main>
  );
}
