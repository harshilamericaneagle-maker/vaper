import { useState } from 'react';
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product, index = 0 }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
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

    // Generate a gradient based on product id for placeholder
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    ];

    return (
        <article
            className="product-card animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="product-image-container">
                {/* Placeholder gradient with emoji */}
                <div
                    className="product-image-placeholder"
                    style={{ background: gradients[product.id % gradients.length] }}
                >
                    <span className="product-emoji">
                        {product.category === 'devices' ? '🌬️' : '⚙️'}
                    </span>
                </div>

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
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-pricing">
                    {product.salePrice ? (
                        <>
                            <span className="product-price-sale">${product.salePrice.toFixed(2)}</span>
                            <span className="product-price-original">${product.price.toFixed(2)}</span>
                        </>
                    ) : (
                        <span className="product-price">${product.price.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </article>
    );
}
