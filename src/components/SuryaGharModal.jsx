import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import './SuryaGharModal.css';

export default function SuryaGharModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-img-wrap">
          <img src="/img/carousel-1.jpg" alt="PM Surya Ghar Scheme" />
          <div className="modal-img-overlay">
            <span className="modal-badge">PM Scheme 2024</span>
          </div>
        </div>

        <div className="modal-content">
          <h2 className="modal-title" id="modal-title">PM - Surya Ghar Muft Bijli Yojana</h2>

          <div className="modal-divider" />

          <p className="modal-para">
            Pavii Sunn உங்களுக்கு <strong>PM - Surya Ghar Muft Bijli Yojana</strong> திட்டத்திற்கு மத்திய அரசின்
            மானியம் பெற மற்றும் வங்கி கடன் பெறவும் உதவுகிறது. ரூப்டாப் சோலார் நிறுவி அதை பயன்படுத்த அமைத்து தருகிறது.
          </p>

          <p className="modal-para">
            இனி வீட்டு EB பில் நினச்சு கவலை இல்லை ஏனென்றால் <strong>PM - Surya Ghar Muft Bijli Yojana Scheme</strong> இருக்கே
            + Subsidy இருக்கே. இன்றே அழையுங்கள்!
          </p>

          <div className="modal-benefits">
            {[
              'Government subsidy up to ₹78,000',
              'Bank loan assistance available',
              'Free roof-top installation consultation',
              'Post-installation AMC support',
            ].map((b, i) => (
              <div key={i} className="modal-benefit">
                <span className="modal-benefit-dot" />
                {b}
              </div>
            ))}
          </div>

          <div className="modal-actions">
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => { e.preventDefault(); onClose(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 200); }}
            >
              Get Free Consultation <ArrowRight size={16} />
            </a>
            <button className="btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
