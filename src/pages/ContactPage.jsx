import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import './HomePage.css'; // Re-use some styles
import './LegalPage.css';

export default function ContactPage() {
    return (
        <div className="legal-page">
            <div className="container">
                <h1>Contact Us</h1>

                <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>

                    <div className="contact-info">
                        <h2>Get in Touch</h2>
                        <p>We're here to help! If you have any questions about our products, shipping, or your order, please don't hesitate to reach out.</p>

                        <div style={{ marginTop: '2rem' }}>
                            <div className="contact-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                                <Mail size={24} color="#646cff" />
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Email</h3>
                                    <p style={{ margin: 0 }}>info.vaporluxe@gmail.com</p>
                                </div>
                            </div>

                            <div className="contact-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                                <Phone size={24} color="#646cff" />
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Phone</h3>
                                    <p style={{ margin: 0 }}>(224) 256-0947</p>
                                </div>
                            </div>

                            <div className="contact-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                                <MapPin size={24} color="#646cff" />
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Address</h3>
                                    <p style={{ margin: 0 }}>
                                        123 Vape Street<br />
                                        Los Angeles, CA 90001
                                    </p>
                                </div>
                            </div>

                            <div className="contact-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                                <Clock size={24} color="#646cff" />
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Business Hours</h3>
                                    <p style={{ margin: 0 }}>
                                        Mon - Fri: 9:00 AM - 6:00 PM EST<br />
                                        Sat - Sun: Closed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-section">
                        <h2>Send us a Message</h2>
                        <form className="contact-form" onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                                <input type="text" className="newsletter-input" style={{ width: '100%', color: 'black' }} placeholder="Your Name" required />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                                <input type="email" className="newsletter-input" style={{ width: '100%', color: 'black' }} placeholder="Your Email" required />
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
                                <textarea className="newsletter-input" style={{ width: '100%', minHeight: '150px', color: 'black' }} placeholder="How can we help?" required></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
