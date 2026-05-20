import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Search,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    Lock,
    Award,
    MapPin,
    FileCheck,
    AlertCircle,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import usePageSEO from '../hooks/usePageSEO';
import './ProductsPage.css';

const PRODUCTS_PER_PAGE = 24;

const TRUST_BADGES = [
    { icon: ShieldCheck, label: 'Age Verified Checkout' },
    { icon: Lock, label: 'Secure Payments' },
    { icon: Award, label: 'Premium Product Selection' },
    { icon: MapPin, label: 'Local Service' },
    { icon: FileCheck, label: 'Compliance Focused' },
];

const categoryNameById = Object.fromEntries(categories.map((c) => [c.id, c.name]));

export default function ProductsPage() {
    usePageSEO(
        'Premium Vape & Smoking Accessories | VaporLuxe',
        'Shop premium vape, glass, and smoking accessories. Age-verified checkout, secure payments, and compliance-focused catalog.',
        { canonical: 'https://www.vaporluxe.ai/products' }
    );

    const [searchParams, setSearchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState('featured');
    const [searchQuery, setSearchQuery] = useState('');
    const [showBestSellersOnly, setShowBestSellersOnly] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const catalogRef = useRef(null);

    const activeCategory = searchParams.get('category') || 'all';

    const filteredProducts = useMemo(() => {
        let filtered = [...products];
        const query = searchQuery.trim().toLowerCase();

        if (showBestSellersOnly) {
            filtered = filtered.filter((p) => p.featured);
        }

        if (activeCategory === 'sale') {
            filtered = filtered.filter((p) => p.salePrice);
        } else if (activeCategory !== 'all') {
            filtered = filtered.filter((p) => p.category === activeCategory);
        }

        if (query) {
            filtered = filtered.filter((p) => {
                const categoryLabel = categoryNameById[p.category] || p.category;
                return (
                    p.name.toLowerCase().includes(query) ||
                    categoryLabel.toLowerCase().includes(query) ||
                    (p.description && p.description.toLowerCase().includes(query))
                );
            });
        }

        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
                break;
            case 'price-high':
                filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
                break;
            case 'newest':
                filtered.sort((a, b) => b.id - a.id);
                break;
            case 'featured':
            default:
                filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }

        return filtered;
    }, [activeCategory, sortBy, searchQuery, showBestSellersOnly]);

    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, sortBy, searchQuery, showBestSellersOnly]);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const scrollToCatalog = () => {
        catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const goToPage = (page) => {
        setCurrentPage(page);
        scrollToTop();
    };

    const getPageNumbers = () => {
        const pages = [];
        const delta = 2;
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - delta && i <= currentPage + delta)
            ) {
                pages.push(i);
            }
        }
        const withEllipsis = [];
        for (let i = 0; i < pages.length; i++) {
            if (i > 0 && pages[i] - pages[i - 1] > 1) {
                withEllipsis.push('...');
            }
            withEllipsis.push(pages[i]);
        }
        return withEllipsis;
    };

    const handleCategoryChange = (categoryId) => {
        const next = new URLSearchParams(searchParams);
        if (categoryId === 'all') {
            next.delete('category');
        } else {
            next.set('category', categoryId);
        }
        setSearchParams(next);
        setCurrentPage(1);
    };

    const handleShopBestSellers = () => {
        setShowBestSellersOnly(true);
        setSortBy('featured');
        handleCategoryChange('all');
        scrollToCatalog();
    };

    const handleBrowseCategories = () => {
        setShowBestSellersOnly(false);
        scrollToCatalog();
    };

    const activeCategoryName =
        categories.find((c) => c.id === activeCategory)?.name || 'All Products';

    return (
        <main className="products-page">
            {/* Hero */}
            <section className="products-hero" aria-labelledby="products-hero-title">
                <div className="container products-hero-inner">
                    <div className="products-age-notice" role="note">
                        <AlertCircle size={16} aria-hidden="true" />
                        <span>
                            <strong>21+ only.</strong> Age-restricted products. Valid ID required at checkout.
                        </span>
                    </div>

                    <h1 id="products-hero-title" className="products-hero-title">
                        Premium Vape, Glass &amp; Smoking Accessories
                    </h1>
                    <p className="products-hero-subtitle">
                        Curated premium accessories, secure checkout, and age-verified shopping for
                        responsible adult customers.
                    </p>

                    <div className="products-hero-cta">
                        <button type="button" className="btn-hero btn-hero-primary" onClick={handleShopBestSellers}>
                            Shop Best Sellers
                        </button>
                        <button type="button" className="btn-hero btn-hero-secondary" onClick={handleBrowseCategories}>
                            Browse Categories
                        </button>
                    </div>
                </div>
            </section>

            {/* Trust badges */}
            <section className="products-trust" aria-label="Shopping trust indicators">
                <div className="container">
                    <ul className="products-trust-list">
                        {TRUST_BADGES.map(({ icon: Icon, label }) => (
                            <li key={label} className="products-trust-item">
                                <Icon size={18} aria-hidden="true" />
                                <span>{label}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <div className="container products-catalog" ref={catalogRef}>
                {/* Catalog header */}
                <div className="products-catalog-header">
                    <div>
                        <h2 className="products-catalog-title">{activeCategoryName}</h2>
                        <p className="products-catalog-count">
                            {filteredProducts.length} products
                            {showBestSellersOnly && ' · Best sellers'}
                            {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
                        </p>
                    </div>
                </div>

                {/* Filter / sort bar */}
                <div className="products-filter-bar" id="catalog-filters">
                    <div className="filter-search">
                        <Search size={18} className="filter-search-icon" aria-hidden="true" />
                        <input
                            type="search"
                            className="filter-search-input"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            aria-label="Search products"
                        />
                    </div>

                    <div className="filter-controls">
                        <div className="filter-group">
                            <label htmlFor="category-filter" className="filter-label">
                                Category
                            </label>
                            <div className="select-wrapper">
                                <select
                                    id="category-filter"
                                    value={activeCategory}
                                    onChange={(e) => {
                                        setShowBestSellersOnly(false);
                                        handleCategoryChange(e.target.value);
                                    }}
                                >
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={16} className="select-icon" aria-hidden="true" />
                            </div>
                        </div>

                        <div className="filter-group">
                            <label htmlFor="sort-filter" className="filter-label">
                                Sort by
                            </label>
                            <div className="select-wrapper">
                                <select
                                    id="sort-filter"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                >
                                    <option value="featured">Featured</option>
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                                <ChevronDown size={16} className="select-icon" aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product grid */}
                {paginatedProducts.length > 0 ? (
                    <div className="product-grid products-grid">
                        {paginatedProducts.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                index={index}
                                variant="catalog"
                                categoryLabel={categoryNameById[product.category]}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="no-products">
                        <p>No products found. Try adjusting your search or filters.</p>
                        <button
                            type="button"
                            className="btn-reset-filters"
                            onClick={() => {
                                setSearchQuery('');
                                setShowBestSellersOnly(false);
                                handleCategoryChange('all');
                            }}
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <nav className="pagination" aria-label="Product pages">
                        <button
                            type="button"
                            className="pagination-btn pagination-arrow"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            aria-label="Previous page"
                        >
                            <ChevronLeft size={18} />
                        </button>

                        {getPageNumbers().map((page, i) =>
                            page === '...' ? (
                                <span key={`ellipsis-${i}`} className="pagination-ellipsis">
                                    …
                                </span>
                            ) : (
                                <button
                                    key={page}
                                    type="button"
                                    className={`pagination-btn ${currentPage === page ? 'pagination-btn-active' : ''}`}
                                    onClick={() => goToPage(page)}
                                    aria-label={`Page ${page}`}
                                    aria-current={currentPage === page ? 'page' : undefined}
                                >
                                    {page}
                                </button>
                            )
                        )}

                        <button
                            type="button"
                            className="pagination-btn pagination-arrow"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            aria-label="Next page"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </nav>
                )}
            </div>
        </main>
    );
}
