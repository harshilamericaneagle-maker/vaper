import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({
    product,
    index = 0,
    variant = 'default',
    categoryLabel,
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [imgError, setImgError] = useState(false);
    const { addToCart } = useCart();

    const isCatalog = variant === 'catalog';

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
    };

    const getBadgeClass = () => {
        switch (product.badge) {
            case 'sale':
                return 'badge-sale';
            case 'new':
                return 'badge-new';
            case 'hot':
                return 'badge-hot';
            default:
                return '';
        }
    };

    const getBadgeText = () => {
        switch (product.badge) {
            case 'sale':
                return 'Sale';
            case 'new':
                return 'New';
            case 'hot':
                return 'Hot';
            default:
                return '';
        }
    };

    const fallbackImages = [
        '/images/product-1.jpg',
        '/images/product-2.jpg',
        '/images/product-3.jpg',
        '/images/product-4.jpg',
        '/images/product-5.jpg',
    ];
    const productImage =
        !imgError && product.image
            ? product.image
            : fallbackImages[(product.id - 1) % fallbackImages.length];

    const displayCategory =
        categoryLabel || product.categoryLabel || product.category;

    return (
        <article
            className={`product-card ${isCatalog ? 'product-card--catalog' : ''} animate-fade-in`}
            style={{ animationDelay: `${index * 0.05}s` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="product-image-container">
                <Link to={`/product/${product.id}`} className="product-image-link" tabIndex={-1}>
                    <img
                        src={productImage}
                        alt={`${product.name} - ${displayCategory}`}
                        className="product-image"
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
                </Link>

                {product.badge && (
                    <span className={`product-badge ${getBadgeClass()}`}>{getBadgeText()}</span>
                )}

                {!isCatalog && (
                    <>
                        <button
                            type="button"
                            className={`product-like ${isLiked ? 'product-like-active' : ''}`}
                            onClick={() => setIsLiked(!isLiked)}
                            aria-label="Add to wishlist"
                        >
                            <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
                        </button>

                        <div className={`product-actions ${isHovered ? 'product-actions-visible' : ''}`}>
                            <button
                                type="button"
                                className="product-action-btn product-action-cart"
                                onClick={handleAddToCart}
                                aria-label="Add to cart"
                            >
                                <ShoppingCart size={18} />
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className="product-info">
                <span className="product-category">{displayCategory}</span>
                <Link to={`/product/${product.id}`}>
                    <h3 className="product-name">{product.name}</h3>
                </Link>

                {!isCatalog && product.description && (
                    <p className="product-description">{product.description}</p>
                )}

                <div className="product-pricing">
                    <div className="product-prices">
                        {product.salePrice ? (
                            <>
                                <span className="product-price-sale">
                                    ${product.salePrice.toFixed(2)}
                                </span>
                                <span className="product-price-original">
                                    ${product.price.toFixed(2)}
                                </span>
                            </>
                        ) : (
                            <span className="product-price">${product.price.toFixed(2)}</span>
                        )}
                    </div>
                    {isCatalog && (
                        <span className="product-age-badge" title="Adult signature required">
                            21+
                        </span>
                    )}
                </div>

                {isCatalog && (
                    <div className="product-card-footer">
                        <Link
                            to={`/product/${product.id}`}
                            className="btn-product btn-product-outline"
                        >
                            View Details
                        </Link>
                        <button
                            type="button"
                            className="btn-product btn-product-primary"
                            onClick={handleAddToCart}
                        >
                            <ShoppingCart size={16} aria-hidden="true" />
                            Add to Cart
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
}
