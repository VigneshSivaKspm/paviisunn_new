import { useState, useEffect } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import './Hero.css';

const SLIDES = [
  {
    id: 1,
    image: '/img/carousel-1.jpg',
    badge: 'PM Surya Ghar Scheme Available',
    title: 'Are You Paying Higher',
    titleHighlight: 'EB Bill?',
    subtitle: "It's time to switch to Solar Power and save thousands every month with government subsidies up to ₹78,000.",
    ctaPrimary: { label: 'Get A Free Quote', href: '#contact' },
    ctaSecondary: { label: 'Explore Services', href: '#services' },
  },
  {
    id: 2,
    image: '/img/carousel-2.jpg',
    badge: 'அதிக மின் கட்டணமா?',
    title: 'சூரிய மின்சக்திக்கு',
    titleHighlight: 'மாறுங்கள்!',
    subtitle: 'PM Surya Ghar Muft Bijli Yojana திட்டத்தின் மூலம் மத்திய அரசு மானியம் பெறுங்கள். இன்றே அழையுங்கள்!',
    ctaPrimary: { label: 'Contact Us', href: '#contact' },
    ctaSecondary: { label: 'View Pricing', href: '#pricing' },
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % SLIDES.length);
        setAnimating(false);
      }, 600);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const slide = SLIDES[current];

  return (
    <section className="hero" id="home">
      {/* Background Images */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`hero-bg ${i === current ? 'hero-bg--active' : ''}`}
          style={{ backgroundImage: `url(${s.image})` }}
        />
      ))}

      {/* Overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className={`hero-content ${animating ? 'hero-content--exit' : 'hero-content--enter'}`}>
        <div className="container">
          <div className="badge-solar mb-3">
            {slide.badge}
          </div>

          <h1 className="hero-title">
            {slide.title}
            <br />
            <span className="hero-title-highlight">{slide.titleHighlight}</span>
          </h1>

          <p className="hero-subtitle">{slide.subtitle}</p>

          <div className="hero-ctas">
            <a href={slide.ctaPrimary.href} className="btn-primary hero-cta-primary">
              {slide.ctaPrimary.label}
              <ArrowRight size={18} />
            </a>
            <a href={slide.ctaSecondary.href} className="btn-secondary hero-cta-secondary">
              {slide.ctaSecondary.label}
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '10K+', label: 'Projects Done' },
              { value: '₹78K', label: 'Max Subsidy' },
              { value: '100%', label: 'Satisfaction' },
            ].map((stat) => (
              <div className="hero-stat" key={stat.label}>
                <span className="hero-stat-value">{stat.value}</span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="hero-indicators">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`hero-indicator ${i === current ? 'hero-indicator--active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down */}
      <button className="hero-scroll-btn" onClick={handleScroll} aria-label="Scroll down">
        <ChevronDown size={24} />
      </button>
    </section>
  );
}
