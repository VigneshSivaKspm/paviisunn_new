import './Materials.css';

const MATERIAL_ROWS = [
  [
    { src: '/img/m1.jpeg', alt: 'Solar Panel Material 1', label: 'Mono PERC Panels' },
    { src: '/img/m2.jpeg', alt: 'Solar Panel Material 2', label: 'Solar Inverters' },
    { src: '/img/m3.jpeg', alt: 'Solar Panel Material 3', label: 'Mounting Structures' },
  ],
  [
    { src: '/img/m4.jpeg', alt: 'Solar Panel Material 4', label: 'DC Cables & Wiring' },
    { src: '/img/m5.jpeg', alt: 'Solar Panel Material 5', label: 'AC Distribution Box' },
    { src: '/img/m6.jpeg', alt: 'Solar Panel Material 6', label: 'Net Meter Equipment' },
  ],
];

export default function Materials() {
  return (
    <section className="section materials-section" id="materials">
      <div className="glow-orb glow-orb-orange" style={{ width: 300, height: 300, top: '20%', right: '-5%', opacity: 0.4 }} />

      <div className="container">
        <div className="text-center mb-4">
          <div className="section-label" style={{ justifyContent: 'center' }}>Quality Assured</div>
          <h2 className="section-title">Our <span className="highlight">Materials</span></h2>
          <p className="section-subtitle mt-2">
            We use only top-grade, certified solar components from globally trusted manufacturers
          </p>
        </div>

        <div className="materials-grid">
          {MATERIAL_ROWS.flat().map((item, index) => (
            <div key={index} className="material-card">
              <div className="material-img-wrap">
                <img src={item.src} alt={item.alt} loading="lazy" />
                <div className="material-overlay" />
              </div>
              <div className="material-info">
                <span className="material-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Badges */}
        <div className="quality-badges">
          {['BIS Certified', 'MNRE Approved', 'ISO 9001:2015', 'Tier-1 Panels'].map((badge) => (
            <div key={badge} className="quality-badge">
              <span className="quality-dot" />
              {badge}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
