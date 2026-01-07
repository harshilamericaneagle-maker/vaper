import './LegalPage.css';

export default function PrivacyPage() {
    return (
        <main className="legal-page">
            <div className="container">
                <div className="legal-header">
                    <h1>Privacy Policy</h1>
                    <p className="legal-updated">Last Updated: January 7, 2026</p>
                </div>

                <div className="legal-content">
                    <section className="legal-section">
                        <h2>1. Information We Collect</h2>
                        <p>We collect information you provide directly to us, including:</p>
                        <ul>
                            <li><strong>Personal Information:</strong> Name, email address, phone number, billing and shipping addresses</li>
                            <li><strong>Payment Information:</strong> Credit card details (processed securely through our payment providers)</li>
                            <li><strong>Age Verification:</strong> Date of birth or age confirmation to verify you are 21+</li>
                            <li><strong>Account Information:</strong> Username, password, and purchase history</li>
                            <li><strong>Communications:</strong> Emails, chat messages, and customer service interactions</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>2. Information Collected Automatically</h2>
                        <p>When you visit our website, we automatically collect:</p>
                        <ul>
                            <li>IP address and device information</li>
                            <li>Browser type and operating system</li>
                            <li>Pages viewed and time spent on our website</li>
                            <li>Referring website addresses</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>3. How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul>
                            <li>Process and fulfill your orders</li>
                            <li>Verify your age for legal compliance</li>
                            <li>Communicate with you about orders, products, and promotions</li>
                            <li>Improve our website and customer experience</li>
                            <li>Prevent fraud and protect our legal rights</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>4. Information Sharing</h2>
                        <p>We may share your information with:</p>
                        <ul>
                            <li><strong>Service Providers:</strong> Companies that help us process payments, ship orders, and provide customer support</li>
                            <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
                            <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                            <li><strong>Age Verification Services:</strong> Third-party services to verify customer age</li>
                        </ul>
                        <p>We do not sell your personal information to third parties for marketing purposes.</p>
                    </section>

                    <section className="legal-section">
                        <h2>5. Cookies and Tracking</h2>
                        <p>
                            We use cookies and similar technologies to enhance your browsing experience,
                            analyze website traffic, and personalize content. You can control cookies
                            through your browser settings, but disabling cookies may affect website functionality.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>6. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your personal
                            information, including SSL encryption for all data transmissions. However,
                            no method of transmission over the internet is 100% secure, and we cannot
                            guarantee absolute security.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>7. Your Rights</h2>
                        <p>Depending on your location, you may have the right to:</p>
                        <ul>
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your personal information</li>
                            <li>Opt out of marketing communications</li>
                            <li>Request a copy of your data in a portable format</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>8. Data Retention</h2>
                        <p>
                            We retain your personal information for as long as necessary to fulfill the
                            purposes outlined in this policy, comply with legal obligations, resolve
                            disputes, and enforce our agreements. Order history may be retained for
                            warranty and compliance purposes.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>9. Children's Privacy</h2>
                        <p>
                            Our website is not intended for individuals under 21 years of age. We do not
                            knowingly collect personal information from minors. If we learn that we have
                            collected information from someone under 21, we will delete it immediately.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>10. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of
                            significant changes by posting a notice on our website or sending you an email.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>11. Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy or your personal information,
                            please contact us at:
                        </p>
                        <p>
                            <strong>Email:</strong> privacy@vaporluxe.com<br />
                            <strong>Phone:</strong> (555) 123-4567
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
