import './LegalPage.css';

export default function AgePolicyPage() {
    return (
        <main className="legal-page">
            <div className="container">
                <div className="legal-header">
                    <h1>Age Verification Policy</h1>
                    <p className="legal-updated">Last Updated: January 7, 2026</p>
                </div>

                <div className="legal-content">
                    <div className="age-warning-banner">
                        <span className="warning-icon">⚠️</span>
                        <div>
                            <strong>WARNING:</strong> This website sells tobacco and vaping products.
                            You must be 21 years of age or older to purchase from this site.
                        </div>
                    </div>

                    <section className="legal-section">
                        <h2>Legal Age Requirements</h2>
                        <p>
                            In accordance with federal law (the Tobacco 21 law, effective December 20, 2019),
                            it is illegal to sell tobacco and vaping products to anyone under 21 years of age
                            in the United States. VaporLuxe strictly adheres to this law and takes age
                            verification seriously.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>Our Age Verification Process</h2>
                        <p>We employ multiple methods to ensure our customers are of legal age:</p>
                        <ul>
                            <li>
                                <strong>Initial Verification:</strong> Upon entering our website, you must
                                confirm that you are 21 years of age or older.
                            </li>
                            <li>
                                <strong>Checkout Verification:</strong> During the checkout process, we may
                                require additional age verification through third-party verification services.
                            </li>
                            <li>
                                <strong>Delivery Verification:</strong> Adult signature (21+) may be required
                                upon delivery of all orders.
                            </li>
                            <li>
                                <strong>Photo ID:</strong> We reserve the right to request a copy of a valid
                                government-issued photo ID before processing any order.
                            </li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>Consequences of False Age Claims</h2>
                        <p>
                            Providing false information about your age to purchase tobacco or vaping
                            products is illegal and may result in:
                        </p>
                        <ul>
                            <li>Immediate cancellation of your order</li>
                            <li>Permanent ban from our website</li>
                            <li>Report to appropriate authorities</li>
                            <li>Legal action as permitted by law</li>
                        </ul>
                    </section>

                    <section className="legal-section">
                        <h2>State and Local Laws</h2>
                        <p>
                            Some states, cities, or localities may have additional age restrictions or
                            bans on certain vaping products. It is your responsibility to know and
                            comply with the laws in your jurisdiction. We do not ship to locations
                            where vaping products are prohibited.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>Health Warnings</h2>
                        <div className="health-warning">
                            <h3>⚠️ WARNING</h3>
                            <p>
                                <strong>This product contains nicotine.</strong> Nicotine is an addictive
                                chemical. Vaping products are not intended as smoking cessation devices
                                and are intended for use by adults who currently use tobacco products.
                            </p>
                        </div>
                        <p>
                            Keep all vaping products away from children and pets. If swallowed, seek
                            medical attention immediately.
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>Reporting Underage Sales</h2>
                        <p>
                            We take underage sales extremely seriously. If you believe someone has
                            obtained our products illegally, please report it to:
                        </p>
                        <p>
                            <strong>Email:</strong> compliance@vaporluxe.com<br />
                            <strong>Phone:</strong> (555) 123-4567
                        </p>
                    </section>

                    <section className="legal-section">
                        <h2>Parental Advisory</h2>
                        <p>
                            Parents and guardians are encouraged to monitor their children's internet
                            usage and prevent access to age-restricted websites. We recommend using
                            parental control software to restrict access to this website for minors.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
