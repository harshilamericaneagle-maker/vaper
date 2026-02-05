import React from 'react';
import { RotateCcw, Package, RefreshCw, Truck, AlertCircle, HelpCircle, Info, CheckCircle } from 'lucide-react';
import './PolicyPage.css';

export default function ReturnsPage() {
    return (
        <div className="policy-page">
            <div className="container">
                <header className="policy-header">
                    <h1>Returns & Refunds</h1>
                    <p className="last-updated">Last Updated: February 2026</p>
                </header>

                <div className="policy-intro">
                    <Info size={32} />
                    <p>
                        Your satisfaction is our priority. If you're not completely happy with your purchase,
                        we're here to help with hassle-free returns and refunds.
                    </p>
                </div>

                <div className="policy-stats">
                    <div className="policy-stat">
                        <span className="policy-stat-value">30</span>
                        <span className="policy-stat-label">Day Returns</span>
                    </div>
                    <div className="policy-stat">
                        <span className="policy-stat-value">100%</span>
                        <span className="policy-stat-label">Money Back</span>
                    </div>
                    <div className="policy-stat">
                        <span className="policy-stat-value">Fast</span>
                        <span className="policy-stat-label">Processing</span>
                    </div>
                </div>

                <div className="policy-sections">
                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <RotateCcw size={24} />
                            </div>
                            <h2>Return Policy</h2>
                        </div>
                        <p>
                            You have <strong>30 calendar days</strong> from the date of delivery to return an item.
                            To be eligible for a return, your item must meet the following conditions:
                        </p>
                        <ul className="policy-list">
                            <li>Item must be unused and in original condition</li>
                            <li>Item must be in the original packaging</li>
                            <li>Proof of purchase (receipt or order confirmation) is required</li>
                        </ul>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <AlertCircle size={24} />
                            </div>
                            <h2>Non-Returnable Items</h2>
                        </div>
                        <p>
                            Due to the nature of our products and for health and safety reasons, certain items cannot be returned:
                        </p>
                        <ul className="policy-list" style={{ listStyle: 'none' }}>
                            <li style={{ color: 'rgba(255,100,100,0.9)' }}>✕ Used or opened vape devices</li>
                            <li style={{ color: 'rgba(255,100,100,0.9)' }}>✕ Opened e-liquids or concentrates</li>
                            <li style={{ color: 'rgba(255,100,100,0.9)' }}>✕ Items that have been filled with liquid</li>
                            <li style={{ color: 'rgba(255,100,100,0.9)' }}>✕ Clearance or final sale items</li>
                        </ul>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <RefreshCw size={24} />
                            </div>
                            <h2>Refund Process</h2>
                        </div>
                        <p>
                            Once we receive and inspect your return, we will notify you of the approval status via email.
                        </p>
                        <div className="policy-highlight">
                            <p>
                                <strong>Processing Time:</strong> Approved refunds are processed within 3-5 business days.
                                Depending on your bank or card issuer, it may take an additional 5-10 days to appear on your statement.
                            </p>
                        </div>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <Truck size={24} />
                            </div>
                            <h2>Return Shipping</h2>
                        </div>
                        <p>
                            Customers are responsible for return shipping costs unless the return is due to our error
                            (wrong item, defective product, etc.). We recommend using a trackable shipping service
                            to ensure your return arrives safely.
                        </p>
                        <p>
                            <strong>Note:</strong> Original shipping costs are non-refundable. The cost of return
                            shipping will be deducted from your refund.
                        </p>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <Package size={24} />
                            </div>
                            <h2>How to Initiate a Return</h2>
                        </div>
                        <p>To start a return, follow these simple steps:</p>
                        <ol className="policy-list" style={{ listStyle: 'decimal', paddingLeft: '1.5rem' }}>
                            <li style={{ paddingLeft: '0.5rem' }}>Contact us at <strong>info.vaporluxe@gmail.com</strong> with your order number</li>
                            <li style={{ paddingLeft: '0.5rem' }}>Wait for return authorization and shipping instructions</li>
                            <li style={{ paddingLeft: '0.5rem' }}>Pack the item securely in original packaging</li>
                            <li style={{ paddingLeft: '0.5rem' }}>Ship the item to the address provided</li>
                        </ol>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <HelpCircle size={24} />
                            </div>
                            <h2>Questions?</h2>
                        </div>
                        <p>
                            If you have any questions about our return policy or need assistance with a return,
                            please contact our customer service team. We're here to help!
                        </p>
                    </div>
                </div>

                <div className="policy-cta">
                    <CheckCircle size={40} style={{ color: '#22c55e', marginBottom: '1rem' }} />
                    <h3>Need to Start a Return?</h3>
                    <p>Contact our support team for a quick and easy return process</p>
                    <a href="/contact">Contact Us →</a>
                </div>
            </div>
        </div>
    );
}
