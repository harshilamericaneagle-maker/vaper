import { Link } from 'react-router-dom';
import { Mail, Instagram, Twitter, Facebook, Youtube, CreditCard, Shield, Truck } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            {/* Newsletter Section */}
            <div className="footer-newsletter">
                <div className="container">
                    <div className="newsletter-content">
                        <div className="newsletter-text">
                            <h3>Join the Community</h3>
                            <p>Subscribe for exclusive deals, new arrivals, and 10% off your first order.</p>
                        </div>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <div className="newsletter-input-group">
                                <Mail size={20} className="newsletter-icon" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="newsletter-input"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary newsletter-btn">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* Brand Column */}
                        <div className="footer-brand">
                            <Link to="/" className="footer-logo">
                                <img src="/logo.jpg" alt="VaporLuxe" className="footer-logo-image" />
                            </Link>
                            <p className="footer-tagline">
                                Premium vaporizers and accessories for the discerning enthusiast.
                                Quality you can trust, delivered to your door.
                            </p>
                            <div className="footer-social">
                                <a href="#" className="social-link" aria-label="Instagram">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="social-link" aria-label="Twitter">
                                    <Twitter size={20} />
                                </a>
                                <a href="#" className="social-link" aria-label="Facebook">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="social-link" aria-label="Youtube">
                                    <Youtube size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Shop Links */}
                        <div className="footer-links">
                            <h4>Shop</h4>
                            <ul>
                                <li><Link to="/products">All Products</Link></li>
                                <li><Link to="/products?category=devices">Devices</Link></li>
                                <li><Link to="/products?category=accessories">Accessories</Link></li>
                                <li><Link to="/products?category=sale">On Sale</Link></li>
                                <li><Link to="/products">New Arrivals</Link></li>
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div className="footer-links">
                            <h4>Support</h4>
                            <ul>
                                <li><Link to="/contact">Contact Us</Link></li>
                                <li><Link to="/faq">FAQ</Link></li>
                                <li><Link to="/shipping">Shipping Info</Link></li>
                                <li><Link to="/returns">Returns & Refunds</Link></li>
                                <li><Link to="/compliance">PACT Act Compliance</Link></li>
                            </ul>
                        </div>

                        {/* Company */}
                        <div className="footer-links">
                            <h4>Company</h4>
                            <ul>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/privacy">Privacy Policy</Link></li>
                                <li><Link to="/terms">Terms of Service</Link></li>
                                <li><Link to="/age-policy">Age Policy</Link></li>
                            </ul>
                        </div>


                    </div>

                    {/* Trust Badges */}
                    <div className="footer-trust">
                        <div className="trust-item">
                            <Truck size={24} />
                            <div>
                                <strong>ASR Delivery</strong>
                                <span>21+ Signature Required</span>
                            </div>
                        </div>
                        <div className="trust-item">
                            <Shield size={24} />
                            <div>
                                <strong>Secure Checkout</strong>
                                <span>High-Risk PCI Level 1</span>
                            </div>
                        </div>
                        <div className="trust-item">
                            <CreditCard size={24} />
                            <div>
                                <strong>Privacy Focused</strong>
                                <span>Discreet Billing</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FDA Mandatory Warning Block */}
            <div className="footer-disclaimer" style={{ backgroundColor: '#fff', color: '#000', padding: '1.5rem 0' }}>
                <div className="container" style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem', letterSpacing: '0.05em' }}>
                    <p style={{ margin: 0, textTransform: 'uppercase' }}>
                        WARNING: This product contains nicotine. Nicotine is an addictive chemical.
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p className="copyright">
                            © {currentYear} VaporLuxe. All rights reserved. 21+ Only.
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', maxWidth: '500px', textAlign: 'right' }}>
                            VaporLuxe strictly complies with the PACT Act and federal/state regulations. We do not sell to minors. 
                            Age verification is performed on all orders. Use of this site is subject to our Terms & Conditions.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
