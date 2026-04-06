import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import usePageSEO from '../hooks/usePageSEO';
import './PolicyPage.css';

export default function CheckoutPage() {
    usePageSEO('Checkout | Vaper Store', 'Secure checkout at Vaper Store.', { noindex: true });
    const { items, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const subtotal = getCartTotal();
    const shipping = subtotal >= 75 ? 0 : 9.99;
    const tax = subtotal * 0.0825; // 8.25% tax
    const total = subtotal + shipping + tax;

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            setOrderComplete(true);
            clearCart();
        }, 2000);
    };

    if (items.length === 0 && !orderComplete) {
        navigate('/cart');
        return null;
    }

    if (orderComplete) {
        return (
            <div className="policy-page">
                <div className="container">
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <CheckCircle size={80} style={{ color: '#22c55e', marginBottom: '1.5rem' }} />
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Order Confirmed!</h1>
                        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            Thank you for your order. You will receive a confirmation email shortly.
                        </p>
                        <Link to="/products" className="btn btn-primary">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="policy-page">
            <div className="container">
                <header className="policy-header">
                    <h1>Checkout</h1>
                    <p className="last-updated">Secure Payment</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
                    {/* Checkout Form */}
                    <form onSubmit={handleSubmit}>
                        <div className="policy-card" style={{ marginBottom: '1.5rem' }}>
                            <div className="policy-card-header">
                                <div className="policy-card-icon">
                                    <CreditCard size={24} />
                                </div>
                                <h2>Payment Information</h2>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>Email</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>Card Number</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>Expiry Date</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>CVV</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="123"
                                            maxLength="4"
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>Name on Card</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="policy-card" style={{ marginBottom: '1.5rem' }}>
                            <div className="policy-card-header">
                                <h2>Shipping Address</h2>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>First Name</label>
                                        <input
                                            type="text"
                                            required
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>Last Name</label>
                                        <input
                                            type="text"
                                            required
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>Address</label>
                                    <input
                                        type="text"
                                        required
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                    />
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>City</label>
                                        <input
                                            type="text"
                                            required
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>State</label>
                                        <input
                                            type="text"
                                            required
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                        />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)' }}>ZIP</label>
                                        <input
                                            type="text"
                                            required
                                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="policy-card" style={{ marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div className="policy-card-header">
                                <h2>Compliance & Agreements</h2>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                                <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                                    <input type="checkbox" required style={{ width: '18px', height: '18px' }} />
                                    <span>I confirm that I am <strong>21 years of age or older</strong> and that providing false information is a violation of federal law.</span>
                                </label>
                                
                                <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                                    <input type="checkbox" required style={{ width: '18px', height: '18px' }} />
                                    <span>I understand that an <strong>Adult Signature (21+)</strong> with a valid government-issued photo ID is required for delivery. No unattended deliveries.</span>
                                </label>

                                <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
                                    <input type="checkbox" required style={{ width: '18px', height: '18px' }} />
                                    <span>I have read and agree to the <Link to="/terms" style={{ color: '#646cff', textDecoration: 'underline' }}>Terms of Service</Link> and <Link to="/returns" style={{ color: '#646cff', textDecoration: 'underline' }}>Refund/Restocking Policy</Link>.</span>
                                </label>
                            </div>
                        </div>

                        {/* Shipping Restriction Warning (Simplified) */}
                        <div style={{ backgroundColor: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                            <p style={{ color: '#ff6b6b', fontWeight: 'bold', marginBottom: '0.5rem' }}>⚠️ SHIPIPNG RESTRICTIONS:</p>
                            <p style={{ color: 'rgba(255,255,255,0.7)' }}>We cannot ship nicotine products to NY, MA, RI, ME, OR, UT, AR, SD, and VT. If you enter an address in these states, your order will be cancelled.</p>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/cart" className="btn btn-secondary">
                                <ArrowLeft size={18} /> Back to Cart
                            </Link>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ flex: 1 }}
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : (
                                    <>
                                        <Lock size={18} /> Pay ${total.toFixed(2)}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Order Summary */}
                    <div className="policy-card" style={{ height: 'fit-content', position: 'sticky', top: '2rem' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Order Summary</h3>

                        <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '1rem' }}>
                            {items.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
                                    <span>{item.name.substring(0, 25)}... x{item.quantity}</span>
                                    <span>${((item.salePrice || item.price) * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'rgba(255,255,255,0.7)' }}>
                                <span>Tax</span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold' }}>
                                <span>Total</span>
                                <span style={{ color: '#646cff' }}>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
