import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './HomePage.css';

export default function HomePage() {
    const featuredProducts = products.filter(p => p.featured).slice(0, 4);
    const newArrivals = products.filter(p => p.badge === 'new' || p.badge === 'hot').slice(0, 4);
    const saleProducts = products.filter(p => p.salePrice).slice(0, 4);

    return (
        <main className="home-page">
            <Hero />

            {/* Featured Products */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Featured Products</h2>
                        <Link to="/products" className="section-link">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="product-grid">
                        {featuredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Banner */}
            <section className="categories-section">
                <div className="container">
                    <div className="categories-grid">
                        <Link to="/products?category=devices" className="category-card category-devices">
                            <div className="category-content">
                                <span className="category-icon">🌬️</span>
                                <h3>Premium Devices</h3>
                                <p>Cutting-edge vaporizers</p>
                                <span className="category-link">
                                    Shop Now <ArrowRight size={14} />
                                </span>
                            </div>
                            <div className="category-glow"></div>
                        </Link>
                        <Link to="/products?category=accessories" className="category-card category-accessories">
                            <div className="category-content">
                                <span className="category-icon">⚙️</span>
                                <h3>Accessories</h3>
                                <p>Enhance your experience</p>
                                <span className="category-link">
                                    Shop Now <ArrowRight size={14} />
                                </span>
                            </div>
                            <div className="category-glow"></div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">New Arrivals</h2>
                        <Link to="/products" className="section-link">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="product-grid">
                        {newArrivals.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Sale Banner */}
            <section className="sale-banner">
                <div className="container">
                    <div className="sale-content">
                        <div className="sale-text">
                            <span className="sale-badge">Limited Time</span>
                            <h2>New Year Sale</h2>
                            <p>Up to 40% off on selected items. Don't miss out!</p>
                            <Link to="/products?category=sale" className="btn btn-primary">
                                Shop Sale <ArrowRight size={18} />
                            </Link>
                        </div>
                        <div className="sale-visual">
                            <span className="sale-discount">40% OFF</span>
                        </div>
                    </div>
                </div>
                <div className="sale-bg"></div>
            </section>

            {/* On Sale Products */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">On Sale</h2>
                        <Link to="/products?category=sale" className="section-link">
                            View All <ArrowRight size={16} />
                        </Link>
                    </div>
                    <div className="product-grid">
                        {saleProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="trust-section">
                <div className="container">
                    <div className="trust-grid">
                        <div className="trust-card">
                            <span className="trust-icon">🚚</span>
                            <h4>Free Shipping</h4>
                            <p>On orders over $75</p>
                        </div>
                        <div className="trust-card">
                            <span className="trust-icon">🔒</span>
                            <h4>Secure Checkout</h4>
                            <p>SSL encrypted payments</p>
                        </div>
                        <div className="trust-card">
                            <span className="trust-icon">✅</span>
                            <h4>Authentic Products</h4>
                            <p>100% genuine items</p>
                        </div>
                        <div className="trust-card">
                            <span className="trust-icon">💬</span>
                            <h4>Expert Support</h4>
                            <p>We're here to help</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
