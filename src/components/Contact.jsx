import { useState } from 'react';
import { Send, User, Mail, MessageSquare, Phone, CheckCircle } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    await new Promise((res) => setTimeout(res, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="glow-orb glow-orb-orange" style={{ width: 500, height: 500, top: '10%', left: '-10%', opacity: 0.3 }} />

      <div className="container">
        <div className="text-center mb-4">
          <div className="section-label" style={{ justifyContent: 'center' }}>Get In Touch</div>
          <h2 className="section-title">We'd Love To <span className="highlight">Hear From You!</span></h2>
          <p className="section-subtitle mt-2">
            If you want to install solar panels — drop us your requirements and we'll get back to you shortly
          </p>
        </div>

        <div className="contact-grid">
          {/* Info Cards */}
          <div className="contact-info">
            <h3 className="contact-info-heading">Our Offices</h3>

            <div className="contact-card">
              <div className="contact-card-icon">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="contact-card-title">Sathyamangalam Office</h4>
                <a href="tel:+919894693682" className="contact-card-value">+91 98946 93682</a>
                <a href="tel:+919600676277" className="contact-card-value">+91 96006 76277</a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <Phone size={20} />
              </div>
              <div>
                <h4 className="contact-card-title">Coimbatore Office</h4>
                <a href="tel:+919944173412" className="contact-card-value">+91 99441 73412</a>
                <p className="contact-card-sub">No.108/1, Athipalayam Road,<br />Chinnavedampatti, Coimbatore</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <Mail size={20} />
              </div>
              <div>
                <h4 className="contact-card-title">Email Us</h4>
                <a href="mailto:info@paviisunn.in" className="contact-card-value">info@paviisunn.in</a>
              </div>
            </div>

            {/* Map */}
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d501211.0483621926!2d76.982624!3d11.060257!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8f7df471d0921%3A0xc543c0b03965ab9!2s108%2C%20Athipalayam%20Rd%2C%20Chinnavedampatti%2C%20Coimbatore%2C%20Tamil%20Nadu%20641049%2C%20India!5e0!3m2!1sen!2sus!4v1741011693432!5m2!1sen!2sus"
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: 12 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Pavii Sunn Coimbatore Office Map"
              />
            </div>
          </div>

          {/* Form */}
          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <CheckCircle size={52} className="contact-success-icon" />
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will contact you within 24 hours.</p>
                <button className="btn-primary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} id="contactForm" noValidate>
                <h3 className="contact-form-title">Send Us A Message</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name" className="form-label">Your Name *</label>
                    <div className="form-input-wrap">
                      <User size={16} className="form-icon" />
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email" className="form-label">Email Address *</label>
                    <div className="form-input-wrap">
                      <Mail size={16} className="form-icon" />
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-phone" className="form-label">Phone Number</label>
                    <div className="form-input-wrap">
                      <Phone size={16} className="form-icon" />
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="form-input"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-subject" className="form-label">Subject *</label>
                    <div className="form-input-wrap">
                      <MessageSquare size={16} className="form-icon" />
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Solar Installation Enquiry"
                        required
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Your Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your solar requirements, location, electricity bill amount, etc."
                    required
                    className="form-input form-textarea"
                  />
                </div>

                <button type="submit" className="btn-primary form-submit" disabled={loading} id="sendMessageButton">
                  {loading ? (
                    <>
                      <span className="form-spinner" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
