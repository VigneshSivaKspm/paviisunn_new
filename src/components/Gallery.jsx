import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import './Gallery.css';

const GALLERY_IMAGES = [
  { src: '/img/g1.jpeg', alt: 'Solar Installation Project 1' },
  { src: '/img/g2.jpeg', alt: 'Solar Installation Project 2' },
  { src: '/img/g3.jpeg', alt: 'Solar Installation Project 3' },
  { src: '/img/g4.jpeg', alt: 'Solar Installation Project 4' },
  { src: '/img/g5.jpeg', alt: 'Solar Installation Project 5' },
  { src: '/img/g6.jpeg', alt: 'Solar Installation Project 6' },
  { src: '/img/g7.jpeg', alt: 'Solar Installation Project 7' },
  { src: '/img/g8.jpeg', alt: 'Solar Installation Project 8' },
  { src: '/img/g9.jpeg', alt: 'Solar Installation Project 9' },
  { src: '/img/g10.jpeg', alt: 'Solar Installation Project 10' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (index) => {
    setLightbox(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightbox(null);
    document.body.style.overflow = '';
  };

  const prev = () => setLightbox((l) => (l - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  const next = () => setLightbox((l) => (l + 1) % GALLERY_IMAGES.length);

  return (
    <section className="section gallery-section" id="projects">
      <div className="gallery-bg-overlay" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="text-center mb-4">
          <div className="section-label" style={{ justifyContent: 'center' }}>Our Work</div>
          <h2 className="section-title" style={{ color: 'white' }}>
            Projects <span className="highlight">Photo Gallery</span>
          </h2>
          <p className="section-subtitle mt-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
            A showcase of our completed solar installations across Tamil Nadu
          </p>
        </div>

        <div className="gallery-grid">
          {GALLERY_IMAGES.map((img, index) => (
            <div
              key={index}
              className="gallery-item"
              onClick={() => openLightbox(index)}
              role="button"
              aria-label={`View ${img.alt}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="gallery-item-overlay">
                <ZoomIn size={28} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            <X size={24} />
          </button>
          <button className="lightbox-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
            &#8249;
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY_IMAGES[lightbox].src}
              alt={GALLERY_IMAGES[lightbox].alt}
            />
            <p className="lightbox-caption">{GALLERY_IMAGES[lightbox].alt}</p>
          </div>
          <button className="lightbox-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
}
