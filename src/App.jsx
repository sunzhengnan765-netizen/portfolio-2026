import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Reveal from "./components/Reveal";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main className="min-h-screen bg-ink text-white">
      <Navbar />
      <Hero />
      <section
        id="resume"
        className="h-screen w-full overflow-hidden bg-black"
      >
        <Reveal className="h-full w-full" delay={0.1} zoom>
          <img
            src="/resume.png"
            alt="Ethan Sun 简历"
            className="h-full w-full object-contain"
          />
        </Reveal>
      </section>
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
