import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Materials from './components/Materials';
import WhyChoose from './components/WhyChoose';
import Partners from './components/Partners';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SuryaGharModal from './components/SuryaGharModal';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Gallery />
        <Materials />
        <WhyChoose />
        <Partners />
        <Pricing />
        <Contact />
      </main>

      <Footer />

      <WhatsAppButton />
      <SuryaGharModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export default App;
