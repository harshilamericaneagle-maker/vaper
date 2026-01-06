import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Header.css';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const { getCartCount } = useCart();
    const location = useLocation();
    const cartCount = getCartCount();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/products', label: 'All Products' },
        { path: '/products?category=devices', label: 'Devices' },
        { path: '/products?category=accessories', label: 'Accessories' },
        { path: '/products?category=sale', label: 'Sale', highlight: true }
    ];

    return (
        <>
            {/* Announcement Bar */}
            <div className="announcement-bar">
                <div className="announcement-content">
                    <span className="announcement-highlight">🔥 NEW YEAR SALE</span>
                    <span>UP TO 40% OFF + FREE SHIPPING ON ORDERS $75+</span>
                </div>
            </div>

            <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
                <div className="header-container">
                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Logo */}
                    <Link to="/" className="logo">
                        <span className="logo-icon">⚡</span>
                        <span className="logo-text">VAPOR<span className="logo-accent">LUXE</span></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="nav-desktop">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`nav-link ${link.highlight ? 'nav-link-highlight' : ''} ${location.pathname === link.path ? 'nav-link-active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Header Actions */}
                    <div className="header-actions">
                        <button
                            className="header-action-btn"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            aria-label="Search"
                        >
                            <Search size={20} />
                        </button>
                        <Link to="/account" className="header-action-btn" aria-label="Account">
                            <User size={20} />
                        </Link>
                        <Link to="/cart" className="header-action-btn cart-btn" aria-label="Cart">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </Link>
                    </div>
                </div>

                {/* Search Bar */}
                <div className={`search-bar ${isSearchOpen ? 'search-bar-open' : ''}`}>
                    <div className="search-container">
                        <Search size={20} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search for products..."
                            className="search-input"
                        />
                        <button
                            className="search-close"
                            onClick={() => setIsSearchOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <nav className={`nav-mobile ${isMobileMenuOpen ? 'nav-mobile-open' : ''}`}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-mobile-link ${link.highlight ? 'nav-mobile-link-highlight' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </header>
        </>
    );
}
