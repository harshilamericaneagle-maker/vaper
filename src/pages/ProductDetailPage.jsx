import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ShieldCheck, AlertCircle } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
    const { id } = useParams();
    const { addToCart } = useCart();

    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (
            <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                <h2>Product Not Found</h2>
                <Link to="/products" className="btn btn-primary" style={{ marginTop: '20px' }}>
                    Back to Shop
                </Link>
            </div>
        );
    }

    return (
        <main className="product-detail-page">
            <div className="container">
                <Link to="/products" className="back-link">
                    <ArrowLeft size={18} /> Back to Shop
                </Link>

                <div className="product-detail-grid">
                    <div className="product-detail-image-container">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-detail-image"
                        />
                    </div>

                    <div className="product-detail-content">
                        <span className="product-detail-category">{product.category}</span>
                        <h1 className="product-detail-name">{product.name}</h1>

                        <div className="product-detail-price">
                            {product.salePrice ? (
                                <>
                                    <span>${product.salePrice.toFixed(2)}</span>
                                    <span className="price-original">${product.price.toFixed(2)}</span>
                                </>
                            ) : (
                                <span>${product.price.toFixed(2)}</span>
                            )}
                        </div>

                        <p className="product-detail-description">
                            {product.description || "Premium quality product designed for the best experience. Crafted with attention to detail and high-quality materials."}
                        </p>

                        <div className="product-detail-actions">
                            <button
                                className="btn btn-primary"
                                onClick={() => addToCart(product)}
                            >
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                        </div>

                        <div className="compliance-notice">
                            <AlertCircle className="compliance-notice-icon" size={24} />
                            <div>
                                <p><strong>Adult Signature Required (21+)</strong></p>
                                <p>This product requires adult signature and age verification upon delivery in accordance with federal law and PACT ACT compliance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
