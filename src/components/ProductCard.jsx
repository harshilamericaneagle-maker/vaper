import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product, index = 0 }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [imgError, setImgError] = useState(false);
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product);
    };

    const getBadgeClass = () => {
        switch (product.badge) {
            case 'sale': return 'badge-sale';
            case 'new': return 'badge-new';
            case 'hot': return 'badge-hot';
            default: return '';
        }
    };

    const getBadgeText = () => {
        switch (product.badge) {
            case 'sale': return 'Sale';
            case 'new': return 'New';
            case 'hot': return 'Hot';
            default: return '';
        }
    };

    // Use the real product image from data, fallback to placeholder on error
    const fallbackImages = [
        '/images/product-1.jpg',
        '/images/product-2.jpg',
        '/images/product-3.jpg',
        '/images/product-4.jpg',
        '/images/product-5.jpg'
    ];
    const productImage = (!imgError && product.image)
        ? product.image
        : fallbackImages[(product.id - 1) % fallbackImages.length];

    return (
        <article
            className="product-card animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="product-image-container">
                {/* Real Product Image */}
                <Link to={`/product/${product.id}`}>
                    <img
                        src={productImage}
                        alt={`${product.name} - ${product.categoryLabel || product.category}`}
                        className="product-image"
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
                </Link>

                {/* Badge */}
                {product.badge && (
                    <span className={`product-badge ${getBadgeClass()}`}>
                        {getBadgeText()}
                    </span>
                )}

                {/* Like Button */}
                <button
                    className={`product-like ${isLiked ? 'product-like-active' : ''}`}
                    onClick={() => setIsLiked(!isLiked)}
                    aria-label="Add to wishlist"
                >
                    <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                </button>

                {/* Hover Actions */}
                <div className={`product-actions ${isHovered ? 'product-actions-visible' : ''}`}>
                    <button className="product-action-btn" aria-label="Quick view">
                        <Eye size={18} />
                    </button>
                    <button
                        className="product-action-btn product-action-cart"
                        onClick={handleAddToCart}
                        aria-label="Add to cart"
                    >
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>

            <div className="product-info">
                <span className="product-category">{product.categoryLabel || product.category}</span>
                <Link to={`/product/${product.id}`}>
                    <h3 className="product-name">{product.name}</h3>
                </Link>
                {product.description && (
                    <p className="product-description">{product.description}</p>
                )}
                <div className="product-pricing" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        {product.salePrice ? (
                            <>
                                <span className="product-price-sale">${product.salePrice.toFixed(2)}</span>
                                <span className="product-price-original">${product.price.toFixed(2)}</span>
                            </>
                        ) : (
                            <span className="product-price">${product.price.toFixed(2)}</span>
                        )}
                    </div>
                    <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', color: 'rgba(255,255,255,0.6)', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.1)' }}>
                        🔞 21+ ASR
                    </span>
                </div>
            </div>
        </article>
    );
}
