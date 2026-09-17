import { Sun, CreditCard, Zap, ArrowRight } from 'lucide-react';
import './Services.css';

const SERVICES = [
  {
    id: 1,
    icon: <Sun size={32} />,
    image: '/img/p1.webp',
    title: 'PM - Surya Ghar Muft Bijli Yojana',
    description: 'Get Central Government subsidy up to ₹78,000 for rooftop solar installation under the PM Surya Ghar scheme. We handle all documentation and subsidy processing.',
    tag: 'Govt. Scheme',
    tagColor: '#22c55e',
  },
  {
    id: 2,
    icon: <Zap size={32} />,
    image: null,
    title: 'Dealing With Sun — Grid Connected Solar',
    description: 'Solar Meter connected to local utility grid. Save your EB bill significantly with net metering. Export excess power back to the grid and earn credits.',
    tag: 'Net Metering',
    tagColor: 'var(--solar-orange)',
    highlight: 'Save EB Bill With Government Subsidy Upto ₹78,000 — Subsidy Amount Directly Credited To Your Account',
  },
  {
    id: 3,
    icon: <CreditCard size={32} />,
    image: '/img/p2.webp',
    title: 'Bank Loan Available',
    description: 'Easy bank loan options to finance your solar installation. We partner with leading banks to provide affordable EMI plans so you can go solar without upfront burden.',
    tag: 'Easy Finance',
    tagColor: '#3b82f6',
  },
];

export default function Services() {
  return (
    <section className="section services-section" id="services">
      <div className="glow-orb glow-orb-amber" style={{ width: 350, height: 350, top: '50%', left: '-5%', opacity: 0.5 }} />

      <div className="container">
        <div className="text-center mb-4">
          <div className="section-label" style={{ justifyContent: 'center' }}>What We Cover</div>
          <h2 className="section-title">Our <span className="highlight">Solar Services</span></h2>
          <p className="section-subtitle mt-2">
            End-to-end solar solutions from government scheme enrollment to installation and maintenance
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <div key={service.id} className="service-card">
              {/* Tag */}
              <span className="service-tag" style={{ color: service.tagColor, borderColor: `${service.tagColor}40`, background: `${service.tagColor}12` }}>
                {service.tag}
              </span>

              {/* Image or icon */}
              {service.image ? (
                <div className="service-image-wrap">
                  <img src={service.image} alt={service.title} className="service-image" />
                  <div className="service-image-overlay">
                    <div className="service-icon-circle">{service.icon}</div>
                  </div>
                </div>
              ) : (
                <div className="service-icon-wrap">
                  {service.icon}
                </div>
              )}

              <div className="service-body">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                {service.highlight && (
                  <div className="service-highlight">
                    <Zap size={14} />
                    {service.highlight}
                  </div>
                )}
                <a
                  href="#contact"
                  className="service-link"
                  onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  Learn More <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
