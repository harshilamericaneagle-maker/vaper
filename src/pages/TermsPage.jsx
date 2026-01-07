import './LegalPage.css';

export default function TermsPage() {
    return (
        <main className="legal-page">
            <div className="container">
                <div className="legal-header">
                    <h1>Terms & Conditions</h1>
                    <p className="legal-updated">Last Updated: January 7, 2026</p>
                </div>

                <div className="legal-content">
                    <section className="legal-section">
                        <h2>1. Introduction</h2>
                        <p>
                            Welcome to VaporLuxe. These Terms and Conditions govern your use of our website
                            and the purchase of products from our online store. By accessing or using our
                            website, you agree to be bound by these Terms and Conditions.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>2. Age Restriction</h2>
                        <p>
                            <strong>You must be at least 21 years of age to use this website and purchase
                                any products.</strong> By using this website, you confirm that you are of legal
                            age to purchase tobacco and vaping products in your jurisdiction. We reserve
                            the right to request proof of age at any time and to refuse service to anyone
                            who cannot verify they meet the minimum age requirement.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>3. Products and Availability</h2>
                        <p>
                            All products displayed on our website are subject to availability. We reserve
                            the right to discontinue any product at any time. Product images are for
                            illustrative purposes only and may differ from the actual product.
                        </p>
                        <p>
                            We do not ship to states, territories, or countries where the sale of vaping
                            products is prohibited by law. It is your responsibility to ensure that the
                            products you purchase are legal in your jurisdiction.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>4. Pricing and Payment</h2>
                        <p>
                            All prices are listed in US Dollars and are subject to change without notice.
                            We accept major credit cards and other payment methods as displayed at checkout.
                            Payment must be received in full before your order is processed.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>5. Shipping and Delivery</h2>
                        <p>
                            We offer free shipping on orders over $75 within the continental United States.
                            Shipping times vary based on your location and selected shipping method. We are
                            not responsible for delays caused by carriers, weather, or other circumstances
                            beyond our control.
                        </p>
                        <p>
                            An adult signature (21+) may be required upon delivery for all orders.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>6. Returns and Refunds</h2>
                        <p>
                            Due to the nature of our products, we only accept returns on unopened, unused
                            items in their original packaging within 30 days of delivery. Defective products
                            may be exchanged or refunded at our discretion. Please contact our customer
                            service team to initiate a return.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>7. Prohibited Uses</h2>
                        <p>You agree not to:</p>
                        <ul>
                            <li>Purchase products if you are under 21 years of age</li>
                            <li>Resell any products purchased from our website without authorization</li>
                            <li>Use our website for any unlawful purpose</li>
                            <li>Attempt to gain unauthorized access to our systems</li>
                            <li>Provide false or misleading information</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>8. Intellectual Property</h2>
                        <p>
                            All content on this website, including text, graphics, logos, images, and
                            software, is the property of VaporLuxe or its content suppliers and is
                            protected by intellectual property laws. You may not reproduce, distribute,
                            or create derivative works without our express written consent.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>9. Disclaimer of Warranties</h2>
                        <p>
                            Products sold on this website are provided "as is" without warranties of any
                            kind. We do not warrant that products will meet your specific requirements
                            or expectations. Vaping products contain nicotine, which is an addictive
                            substance.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>10. Limitation of Liability</h2>
                        <p>
                            VaporLuxe shall not be liable for any indirect, incidental, special, or
                            consequential damages arising from your use of our website or products.
                            Our total liability shall not exceed the amount paid for the product in question.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>11. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these Terms and Conditions at any time.
                            Changes will be effective immediately upon posting to the website. Your
                            continued use of the website constitutes acceptance of any modifications.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>12. Contact Information</h2>
                        <p>
                            If you have any questions about these Terms and Conditions, please contact us at:
                        </p>
                        <p>
                            <strong>Email:</strong> support@vaporluxe.com<br />
                            <strong>Phone:</strong> (555) 123-4567
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
