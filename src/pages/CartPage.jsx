import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    const subtotal = getCartTotal();
    const shipping = subtotal >= 75 ? 0 : 9.99;
    const total = subtotal + shipping;

    if (items.length === 0) {
        return (
            <main className="cart-page cart-empty">
                <div className="container">
                    <div className="empty-cart">
                        <div className="empty-cart-icon">
                            <ShoppingBag size={64} />
                        </div>
                        <h2>Your Cart is Empty</h2>
                        <p>Looks like you haven't added anything to your cart yet.</p>
                        <Link to="/products" className="btn btn-primary">
                            Start Shopping <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    // Generate gradient colors for cart items
    const gradients = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ];

    return (
        <main className="cart-page">
            <div className="container">
                <div className="cart-header">
                    <h1 className="cart-title">Shopping Cart</h1>
                    <p className="cart-count">{items.length} item{items.length !== 1 ? 's' : ''}</p>
                </div>

                <div className="cart-layout">
                    {/* Cart Items */}
                    <div className="cart-items">
                        {items.map((item, index) => (
                            <div key={item.id} className="cart-item">
                                <div
                                    className="cart-item-image"
                                    style={{ background: gradients[item.id % gradients.length] }}
                                >
                                    <span>{item.category === 'devices' ? '🌬️' : '⚙️'}</span>
                                </div>

                                <div className="cart-item-details">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-category">{item.category}</p>
                                </div>

                                <div className="cart-item-actions">
                                    <div className="quantity-control">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="quantity-value">{item.quantity}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-item-price">
                                    ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                                </div>

                                <button
                                    className="cart-item-remove"
                                    onClick={() => removeFromCart(item.id)}
                                    aria-label="Remove item"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}

                        <div className="cart-actions">
                            <Link to="/products" className="btn btn-secondary">
                                <ArrowLeft size={18} />
                                Continue Shopping
                            </Link>
                            <button
                                className="btn btn-secondary cart-clear-btn"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <aside className="cart-summary">
                        <h3 className="summary-title">Order Summary</h3>

                        <div className="summary-rows">
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>
                                    {shipping === 0 ? (
                                        <span className="free-shipping">FREE</span>
                                    ) : (
                                        `$${shipping.toFixed(2)}`
                                    )}
                                </span>
                            </div>
                            {subtotal < 75 && (
                                <div className="shipping-notice">
                                    Add ${(75 - subtotal).toFixed(2)} more for free shipping!
                                </div>
                            )}
                            <div className="summary-divider"></div>
                            <div className="summary-row summary-total">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="btn btn-primary checkout-btn">
                            Proceed to Checkout
                            <ArrowRight size={18} />
                        </button>

                        <div className="summary-badges">
                            <span>🔒 Secure Checkout</span>
                            <span>📦 Fast Shipping</span>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}
