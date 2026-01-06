import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './ProductsPage.css';

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortBy, setSortBy] = useState('featured');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

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

    const handleCategoryChange = (categoryId) => {
        if (categoryId === 'all') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', categoryId);
        }
        setSearchParams(searchParams);
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
                        <p className="products-count">{filteredProducts.length} products</p>
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
                        {filteredProducts.length > 0 ? (
                            <div className="product-grid">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard key={product.id} product={product} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="no-products">
                                <p>No products found in this category.</p>
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
