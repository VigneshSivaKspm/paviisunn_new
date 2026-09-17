import { useState, useEffect, useRef } from 'react';
import './Partners.css';

const PARTNERS = [
  { src: '/img/l1.png', alt: 'Partner 1' },
  { src: '/img/l2.png', alt: 'Partner 2' },
  { src: '/img/l3.png', alt: 'Partner 3' },
  { src: '/img/l4.png', alt: 'Partner 4' },
  { src: '/img/l5.png', alt: 'Partner 5' },
  { src: '/img/l6.png', alt: 'Partner 6' },
  { src: '/img/l7.png', alt: 'Partner 7' },
  { src: '/img/l8.png', alt: 'Partner 8' },
  { src: '/img/l9.png', alt: 'Partner 9' },
  { src: '/img/l10.png', alt: 'Partner 10' },
  { src: '/img/l11.png', alt: 'Partner 11' },
  { src: '/img/l12.png', alt: 'Partner 12' },
  { src: '/img/l13.png', alt: 'Partner 13' },
  { src: '/img/l14.png', alt: 'Partner 14' },
  { src: '/img/l15.png', alt: 'Partner 15' },
  { src: '/img/l16.png', alt: 'Partner 16' },
  { src: '/img/l17.png', alt: 'Partner 17' },
  { src: '/img/l18.png', alt: 'Partner 18' },
];

export default function Partners() {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Infinite scroll animation via CSS — duplicating the list
  const allPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="section partners-section" id="partners">
      <div className="container">
        <div className="text-center mb-4">
          <div className="section-label" style={{ justifyContent: 'center' }}>Our Partners</div>
          <h2 className="section-title">Trusted <span className="highlight">By Industry Leaders</span></h2>
          <p className="section-subtitle mt-2">
            Working with top solar brands and distributors to deliver the best quality solutions
          </p>
        </div>

        {/* Infinite Scroll Ticker */}
        <div className="partners-ticker-wrapper">
          <div className="partners-fade-left" />
          <div className="partners-fade-right" />
          <div
            className={`partners-ticker ${isPaused ? 'partners-ticker--paused' : ''}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {allPartners.map((partner, index) => (
              <div key={index} className="partner-logo">
                <img src={partner.src} alt={partner.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
