import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import './Hero.css';

export default function Hero() {
    return (
        <section className="hero">
            <div className="hero-bg">
                <div className="hero-gradient-1"></div>
                <div className="hero-gradient-2"></div>
                <div className="hero-grid"></div>
            </div>

            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-badge">
                        <Zap size={14} />
                        <span>Premium Vaporizers</span>
                    </div>

                    <h1 className="hero-title">
                        Elevate Your
                        <span className="hero-title-gradient"> Experience</span>
                    </h1>

                    <p className="hero-description">
                        Discover the finest collection of premium vaporizers and accessories.
                        From cutting-edge devices to artisan glass, find everything you need
                        for the ultimate session.
                    </p>

                    <div className="hero-actions">
                        <Link to="/products" className="btn btn-primary hero-btn">
                            Shop Collection
                            <ArrowRight size={18} />
                        </Link>
                        <Link to="/products?category=sale" className="btn btn-secondary hero-btn">
                            View Sale
                        </Link>
                    </div>

                    <div className="hero-features">
                        <div className="hero-feature">
                            <Truck size={20} />
                            <span>Free Shipping $75+</span>
                        </div>
                        <div className="hero-feature">
                            <Shield size={20} />
                            <span>Authentic Products</span>
                        </div>
                        <div className="hero-feature">
                            <Zap size={20} />
                            <span>Same Day Dispatch</span>
                        </div>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-product-showcase">
                        <div className="hero-product-glow"></div>
                        <div className="hero-product-card">
                            <div className="hero-product-image">
                                <span className="hero-product-emoji">🌬️</span>
                            </div>
                            <div className="hero-product-info">
                                <span className="hero-product-badge">Featured</span>
                                <h3>PUFFCO PEAK PRO</h3>
                                <p>The smartest e-rig ever made</p>
                                <span className="hero-product-price">$419.99</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-floating-cards">
                        <div className="floating-card floating-card-1">
                            <span>⚡</span>
                            <div>
                                <strong>40% OFF</strong>
                                <small>Select Items</small>
                            </div>
                        </div>
                        <div className="floating-card floating-card-2">
                            <span>🔥</span>
                            <div>
                                <strong>New Arrivals</strong>
                                <small>Just Dropped</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
