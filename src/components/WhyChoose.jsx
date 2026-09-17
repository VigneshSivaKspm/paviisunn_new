import { CheckCircle, XCircle } from 'lucide-react';
import './WhyChoose.css';

const WHY_SOLAR = [
  'Reduce electricity bills significantly with solar energy',
  'Eco-friendly and sustainable energy for a greener planet',
  'Government incentives and subsidies available',
  'Reliable and low-maintenance energy for long-term savings',
  'Net metering — sell excess power back to the grid',
];

const WHY_PAVIISUNN = [
  '15 years of expertise in solar manufacturing & installation',
  'Successfully completed 10,000+ solar projects',
  'End-to-end EPC services, from concept to maintenance',
  'International standards with cutting-edge solar solutions',
  'Dedicated post-installation support & AMC services',
];

export default function WhyChoose() {
  return (
    <section className="section whychoose-section" id="faqs">
      <div className="container">
        <div className="text-center mb-4">
          <div className="section-label" style={{ justifyContent: 'center' }}>FAQs</div>
          <h2 className="section-title">You Should <span className="highlight">Know</span></h2>
        </div>

        <div className="whychoose-grid">
          {/* Why Solar */}
          <div className="whychoose-card">
            <div className="whychoose-card-header">
              <div className="whychoose-icon solar-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              </div>
              <h3 className="whychoose-title">Why Switch to Solar?</h3>
            </div>
            <ul className="whychoose-list">
              {WHY_SOLAR.map((item, i) => (
                <li key={i} className="whychoose-item">
                  <CheckCircle size={18} className="check-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Pavii Sunn */}
          <div className="whychoose-card whychoose-card--featured">
            <div className="whychoose-card-header">
              <div className="whychoose-icon pavii-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3 className="whychoose-title">Why Choose Pavii Sunn?</h3>
            </div>
            <ul className="whychoose-list">
              {WHY_PAVIISUNN.map((item, i) => (
                <li key={i} className="whychoose-item">
                  <CheckCircle size={18} className="check-icon" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Row */}
        <div className="whychoose-cta">
          <p className="whychoose-cta-text">Ready to save on your electricity bill?</p>
          <a href="#contact" className="btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Contact Us Today
          </a>
        </div>
      </div>
    </section>
  );
}
