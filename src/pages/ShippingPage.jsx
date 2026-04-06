import React from 'react';
import { Package, MapPin, Clock, DollarSign, AlertTriangle, HelpCircle, Truck, Info } from 'lucide-react';
import './PolicyPage.css';

export default function ShippingPage() {
    return (
        <div className="policy-page">
            <div className="container">
                <header className="policy-header">
                    <h1>Shipping Policy</h1>
                    <p className="last-updated">Last Updated: February 2026</p>
                </header>

                <div className="policy-intro">
                    <Info size={32} />
                    <p>
                        We're committed to getting your order to you as quickly and safely as possible.
                        Below you'll find all the details about our shipping practices.
                    </p>
                </div>

                <div className="policy-stats">
                    <div className="policy-stat">
                        <span className="policy-stat-value">$75+</span>
                        <span className="policy-stat-label">Free Shipping</span>
                    </div>
                    <div className="policy-stat">
                        <span className="policy-stat-value">3-7</span>
                        <span className="policy-stat-label">Business Days</span>
                    </div>
                    <div className="policy-stat">
                        <span className="policy-stat-value">100%</span>
                        <span className="policy-stat-label">Insured</span>
                    </div>
                </div>

                <div className="policy-sections">
                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <Package size={24} />
                            </div>
                            <h2>Order Processing</h2>
                        </div>
                        <p>
                            All orders are processed within 1-2 business days (Monday - Friday, excluding holidays).
                            You will receive an email confirmation with tracking information once your order has shipped.
                        </p>
                        <div className="policy-highlight">
                            <p>
                                <strong>Note:</strong> Orders placed after 2:00 PM EST will be processed the next business day.
                            </p>
                        </div>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <MapPin size={24} />
                            </div>
                            <h2>Restricted Shipping States</h2>
                        </div>
                        <p>
                            Due to state regulations and flavor bans, we currently **DO NOT** ship nicotine-containing products to the following states:
                        </p>
                        <ul className="policy-list" style={{ columns: 2 }}>
                            <li>Arkansas</li>
                            <li>Maine</li>
                            <li>Massachusetts</li>
                            <li>New Jersey</li>
                            <li>New York</li>
                            <li>Oregon</li>
                            <li>Rhode Island</li>
                            <li>South Dakota</li>
                            <li>Utah</li>
                            <li>Vermont</li>
                        </ul>
                        <div className="policy-highlight" style={{ borderColor: 'var(--clr-red)' }}>
                            <p>
                                <strong>🚫 No P.O. Box Delivery:</strong> We cannot ship to P.O. Boxes. All orders must be shipped to a physical address where an adult signature can be obtained.
                            </p>
                        </div>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <AlertTriangle size={24} />
                            </div>
                            <h2>Adult Signature Required (ASR)</h2>
                        </div>
                        <p>
                            In accordance with federal law and the PACT Act, all deliveries require an **Adult Signature (21+)**. 
                            The person receiving the package must present a valid government-issued photo ID to the carrier.
                        </p>
                        <ul className="policy-list">
                            <li>Carriers will not leave packages unattended.</li>
                            <li>If no adult is present, the carrier will make up to three delivery attempts.</li>
                            <li><strong>Re-delivery Fee:</strong> If a package is returned to us due to a failed age verification or absence of an adult, a 20% restocking fee plus original shipping costs will be deducted from your refund.</li>
                        </ul>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <Clock size={24} />
                            </div>
                            <h2>Delivery Times</h2>
                        </div>
                        <p>
                            Estimated delivery times are provided at checkout and in your confirmation email.
                            These estimates begin from the ship date, not the order date.
                        </p>
                        <ul className="policy-list">
                            <li>Standard Shipping: 5-7 business days</li>
                            <li>Express Shipping: 2-3 business days</li>
                            <li>Priority Shipping: 1-2 business days</li>
                        </ul>
                        <p>
                            Delivery times may vary due to carrier delays, weather conditions, or high order volumes during peak seasons.
                        </p>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <DollarSign size={24} />
                            </div>
                            <h2>Shipping Costs</h2>
                        </div>
                        <p>
                            Shipping costs are calculated based on order weight and destination. You can view the
                            exact shipping cost at checkout before completing your purchase.
                        </p>
                        <div className="policy-highlight">
                            <p>
                                <strong>🎉 Free Shipping:</strong> Enjoy free standard shipping on all orders over $75!
                            </p>
                        </div>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <AlertTriangle size={24} />
                            </div>
                            <h2>Damaged Items</h2>
                        </div>
                        <p>
                            If your package arrives damaged, please contact us immediately at
                            <strong> info.vaporluxe@gmail.com</strong> with photos of the damage. We will work quickly
                            to resolve the issue with a replacement or refund.
                        </p>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <HelpCircle size={24} />
                            </div>
                            <h2>Questions?</h2>
                        </div>
                        <p>
                            If you have any questions about shipping or your order, please don't hesitate to reach out.
                            Our customer service team is here to help!
                        </p>
                    </div>
                </div>

                <div className="policy-cta">
                    <Truck size={40} style={{ color: '#646cff', marginBottom: '1rem' }} />
                    <h3>Need Help With Your Order?</h3>
                    <p>Our support team is available Monday - Friday, 9AM - 6PM EST</p>
                    <a href="/contact">Contact Us →</a>
                </div>
            </div>
        </div>
    );
}
