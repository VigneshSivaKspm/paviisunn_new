import { TrendingDown, ArrowRight } from 'lucide-react';
import './Pricing.css';

const PRICING_DATA = [
  { power: '1KW-1PH', price: '₹ 82,500', subsidy: '₹ 30,000', netCost: '₹ 52,500', popular: false },
  { power: '2KW-1PH', price: '₹ 1,49,500', subsidy: '₹ 60,000', netCost: '₹ 89,500', popular: false },
  { power: '3KW-1PH', price: '₹ 2,05,000', subsidy: '₹ 78,000', netCost: '₹ 1,27,000', popular: true },
  { power: '4KW-1PH', price: '₹ 2,75,000', subsidy: '₹ 78,000', netCost: '₹ 1,97,000', popular: false },
  { power: '5KW-3PH', price: '₹ 3,34,500', subsidy: '₹ 78,000', netCost: '₹ 2,56,500', popular: false },
  { power: '6KW-3PH', price: '₹ 3,95,500', subsidy: '₹ 78,000', netCost: '₹ 3,17,500', popular: false },
  { power: '7KW-3PH', price: '₹ 4,54,000', subsidy: '₹ 78,000', netCost: '₹ 3,76,000', popular: false },
  { power: '8KW-3PH', price: '₹ 5,14,200', subsidy: '₹ 78,000', netCost: '₹ 4,36,200', popular: false },
  { power: '9KW-3PH', price: '₹ 5,62,900', subsidy: '₹ 78,000', netCost: '₹ 4,84,900', popular: false },
  { power: '10KW-3PH', price: '₹ 6,20,000', subsidy: '₹ 78,000', netCost: '₹ 5,42,000', popular: false },
];

export default function Pricing() {
  return (
    <section className="section pricing-section" id="pricing">
      <div className="glow-orb glow-orb-orange" style={{ width: 400, height: 400, bottom: '10%', right: '5%', opacity: 0.3 }} />

      <div className="container">
        <div className="text-center mb-4">
          <div className="section-label" style={{ justifyContent: 'center' }}>Pricing</div>
          <h2 className="section-title">Our <span className="highlight">Pricing Plans</span></h2>
          <p className="section-subtitle mt-2">
            Transparent pricing with Mono Crystalline Panels and maximum government subsidy benefits
          </p>
        </div>

        {/* Subsidy Banner */}
        <div className="pricing-subsidy-banner">
          <TrendingDown size={20} />
          <span>
            <strong>Government Subsidy Alert:</strong> Get up to{' '}
            <span className="subsidy-highlight">₹78,000</span> directly credited to your bank account under PM Surya Ghar Muft Bijli Yojana
          </span>
        </div>

        {/* Table */}
        <div className="pricing-table-wrap">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Solar Power</th>
                <th>Mono Crystalline Panel</th>
                <th>Govt. Subsidy</th>
                <th>Net Cost</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {PRICING_DATA.map((row) => (
                <tr key={row.power} className={row.popular ? 'pricing-row--popular' : ''}>
                  <td className="pricing-power">
                    {row.power}
                    {row.popular && <span className="pricing-popular-badge">Most Popular</span>}
                  </td>
                  <td className="pricing-price">{row.price}</td>
                  <td className="pricing-subsidy">
                    <span className="subsidy-chip">{row.subsidy}</span>
                  </td>
                  <td className="pricing-net">{row.netCost}</td>
                  <td>
                    <a
                      href="#contact"
                      className="pricing-cta-btn"
                      onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                    >
                      Get Quote <ArrowRight size={14} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="pricing-note">
          * Prices include Mono Crystalline Panels, Inverter, Mounting Structure, AC/DC Wiring, and Installation charges.
          Subsidy amounts are approximate and subject to government approval.
        </p>
      </div>
    </section>
  );
}
