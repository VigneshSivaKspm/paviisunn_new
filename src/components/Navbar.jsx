import { useState, useEffect, useCallback } from 'react';
import { Phone, Mail, Menu, X, Sun } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Materials', href: '#materials' },
  { label: 'Partners', href: '#partners' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 60);

    const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= 120) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="topbar">
        <div className="topbar-inner">
          <a href="tel:+919894693682" className="topbar-link">
            <Phone size={14} />
            <span>+91 98946 93682</span>
          </a>
          <a href="mailto:info@paviisunn.in" className="topbar-link">
            <Mail size={14} />
            <span>info@paviisunn.in</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <a
            href="#home"
            className="navbar-logo"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
          >
            <div className="navbar-logo-icon">
              <Sun size={22} />
            </div>
            <div className="navbar-logo-text">
              <span className="logo-pavii">Pavii</span>
              <span className="logo-sunn">Sunn</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.href.replace('#', '') ? 'nav-link--active' : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="navbar-actions">
            <a
              href="#contact"
              className="btn-primary btn-sm"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
            >
              Get A Quote
            </a>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`mobile-nav-link ${activeSection === link.href.replace('#', '') ? 'mobile-nav-link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
            >
              {link.label}
            </a>
          ))}
          <div className="mobile-contact">
            <a href="tel:+919894693682" className="topbar-link">
              <Phone size={14} />+91 98946 93682
            </a>
            <a href="mailto:info@paviisunn.in" className="topbar-link">
              <Mail size={14} />info@paviisunn.in
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
