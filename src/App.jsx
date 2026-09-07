import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Reveal from "./components/Reveal";
import Resume from "./components/Resume";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <Navbar />
      <Hero />
      <section id="resume" className="w-full bg-[#020202]">
        <Reveal delay={0.1}>
          <Resume />
        </Reveal>
      </section>
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
