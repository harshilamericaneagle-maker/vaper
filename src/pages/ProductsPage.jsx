import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import usePageSEO from '../hooks/usePageSEO';
import './ProductsPage.css';

const PRODUCTS_PER_PAGE = 24;

export default function ProductsPage() {
    usePageSEO(
        'All Products | Vaper Store',
        'Browse our full collection of 165+ vaping accessories — glass pipes, lighters, torches, grinders, rolling papers, hemp wraps, bubblers, and more. Premium quality, fast shipping.',
        { canonical: 'https://www.vaporluxe.ai/products' }
    );
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState('featured');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const activeCategory = searchParams.get('category') || 'all';

    const filteredProducts = useMemo(() => {
        let filtered = [...products];

        // Filter by category
        if (activeCategory === 'sale') {
            filtered = filtered.filter(p => p.salePrice);
        } else if (activeCategory !== 'all') {
            filtered = filtered.filter(p => p.category === activeCategory);
        }

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
                break;
            case 'price-high':
                filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
                break;
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'featured':
            default:
                filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        }

        return filtered;
    }, [activeCategory, sortBy]);

    // Reset to page 1 when filter or sort changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, sortBy]);

    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const goToPage = (page) => {
        setCurrentPage(page);
        scrollToTop();
    };

    // Build page number array: show first, last, current±2, with '...' gaps
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
        if (categoryId === 'all') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', categoryId);
        }
        setSearchParams(searchParams);
        setCurrentPage(1);
    };

    return (
        <main className="products-page">
            <div className="container">
                {/* Page Header */}
                <div className="products-header">
                    <div className="products-header-text">
                        <h1 className="products-title">
                            {categories.find(c => c.id === activeCategory)?.name || 'All Products'}
                        </h1>
                        <p className="products-count">
                            {filteredProducts.length} products
                            {totalPages > 1 && ` · Page ${currentPage} of ${totalPages}`}
                        </p>
                    </div>
                </div>

                <div className="products-layout">
                    {/* Sidebar Filters */}
                    <aside className={`products-sidebar ${isFilterOpen ? 'sidebar-open' : ''}`}>
                        <div className="sidebar-header">
                            <h3>Categories</h3>
                            <button
                                className="sidebar-close"
                                onClick={() => setIsFilterOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <nav className="category-nav">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    className={`category-btn ${activeCategory === category.id ? 'category-btn-active' : ''}`}
                                    onClick={() => handleCategoryChange(category.id)}
                                >
                                    <span className="category-btn-name">{category.name}</span>
                                    <span className="category-btn-count">
                                        {category.id === 'all'
                                            ? products.length
                                            : category.id === 'sale'
                                                ? products.filter(p => p.salePrice).length
                                                : products.filter(p => p.category === category.id).length
                                        }
                                    </span>
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <div className="products-main">
                        {/* Toolbar */}
                        <div className="products-toolbar">
                            <button
                                className="filter-toggle"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <Filter size={18} />
                                Filters
                            </button>

                            <div className="sort-dropdown">
                                <label>Sort by:</label>
                                <div className="select-wrapper">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="name">Name</option>
                                    </select>
                                    <ChevronDown size={16} className="select-icon" />
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        {paginatedProducts.length > 0 ? (
                            <div className="product-grid">
                                {paginatedProducts.map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="no-products">
                                <p>No products found in this category.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="pagination-btn pagination-arrow"
                                    onClick={() => goToPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                {getPageNumbers().map((page, i) =>
                                    page === '...' ? (
                                        <span key={`ellipsis-${i}`} className="pagination-ellipsis">…</span>
                                    ) : (
                                        <button
                                            key={page}
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
                                    className="pagination-btn pagination-arrow"
                                    onClick={() => goToPage(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    aria-label="Next page"
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Filter Overlay */}
            {isFilterOpen && (
                <div
                    className="filter-overlay"
                    onClick={() => setIsFilterOpen(false)}
                />
            )}
        </main>
    );
}
