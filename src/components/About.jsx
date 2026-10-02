import { CheckCircle, ArrowRight } from 'lucide-react';
import './About.css';

const HIGHLIGHTS = [
  'Established in 2009 with 15+ years of solar expertise',
  'Successfully completed 10,000+ solar installations',
  'End-to-end EPC & turnkey solar power services',
  'Advanced technology meeting international standards',
];

export default function About() {
  return (
    <section className="section about-section" id="about">
      {/* Glow orb */}
      <div className="glow-orb glow-orb-orange" style={{ width: 400, height: 400, top: '10%', right: '-10%', opacity: 0.6 }} />

      <div className="container">
        <div className="about-grid">
          {/* Image Side */}
          <div className="about-image-col">
            <div className="about-image-wrapper">
              <img
                src="/img/about.jpg"
                alt="Pavii Sunn Solar Installation"
                className="about-image"
              />
              {/* Floating badge */}
              <div className="about-badge">
                <span className="about-badge-value">15+</span>
                <span className="about-badge-label">Years of<br />Excellence</span>
              </div>
              {/* Decorative ring */}
              <div className="about-ring" />
            </div>
          </div>

          {/* Content Side */}
          <div className="about-content-col">
            <div className="section-label">About Us</div>

            <h2 className="section-title">
              <span className="highlight">15+ Years Experience</span>
              <br />In Solar Power Industry
            </h2>

            <p className="about-description">
              Pavii Sunn is established in 2009. We have 15 years of experience in Solar Manufacturing
              and Installation with over <strong>10,000+ successfully completed projects</strong>.
              Pavii Sunn offers end-to-end services in setting up Rooftop based Solar Photovoltaic
              power projects on EPC or turnkey basis.
            </p>

            <p className="about-description">
              We conceive &amp; implement solar power projects from concept to installation and
              maintenance, using the best available technologies and cutting edge technical solutions
              by relying on highly qualified professionals to accomplish deliverables at international standards.
            </p>

            {/* Highlights */}
            <ul className="about-highlights">
              {HIGHLIGHTS.map((item) => (
                <li key={item} className="about-highlight-item">
                  <CheckCircle size={18} className="about-check" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn-primary about-cta" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
              Get Free Consultation
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
