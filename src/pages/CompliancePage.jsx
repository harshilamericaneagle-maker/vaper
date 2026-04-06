import React from 'react';
import { ShieldCheck, FileText, AlertCircle, Info } from 'lucide-react';
import './PolicyPage.css';

export default function CompliancePage() {
    return (
        <div className="policy-page">
            <div className="container">
                <header className="policy-header">
                    <h1>Regulatory Compliance & PACT Act</h1>
                    <p className="last-updated">Last Updated: February 2026</p>
                </header>

                <div className="policy-intro">
                    <ShieldCheck size={32} />
                    <p>
                        VaporLuxe is committed to full transparency and strict adherence to all federal, state, and local regulations 
                        governing the sale and delivery of tobacco and nicotine products.
                    </p>
                </div>

                <div className="policy-sections">
                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <FileText size={24} />
                            </div>
                            <h2>The PACT Act</h2>
                        </div>
                        <p>
                            The Prevent All Cigarette Trafficking (PACT) Act was amended in 2020 to include all electronic nicotine delivery systems (ENDS). 
                            As a result, VaporLuxe complies with the following requirements:
                        </p>
                        <ul className="policy-list">
                            <li><strong>Registration:</strong> We are registered with the U.S. Attorney General and the tobacco tax administrators in every state where we conduct business.</li>
                            <li><strong>Reporting:</strong> We file monthly reports with state tobacco tax administrators detailing all shipments to their respective states.</li>
                            <li><strong>Tax Collection:</strong> We collect and remit all applicable state and local excise taxes on nicotine products.</li>
                            <li><strong>Adult Signature:</strong> All deliveries require the signature of an adult (21+) with a valid government-issued photo ID.</li>
                        </ul>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <AlertCircle size={24} />
                            </div>
                            <h2>Age Verification</h2>
                        </div>
                        <p>
                            We use industry-leading third-party age verification services to ensure that all customers are at least 21 years of age. 
                            This process is non-intrusive and secures your data while maintaining legal compliance.
                        </p>
                        <div className="policy-highlight">
                            <p>
                                <strong>Note:</strong> Orders that fail age verification will be cancelled and refunded, minus any applicable processing fees. 
                                Intentional attempts to bypass age verification may be reported to the authorities.
                            </p>
                        </div>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <div className="policy-card-icon">
                                <Info size={24} />
                            </div>
                            <h2>Shipping Restrictions</h2>
                        </div>
                        <p>
                            Due to varying state and local laws, we cannot ship nicotine-containing products to certain jurisdictions. 
                            These include, but are not limited to:
                        </p>
                        <ul className="policy-list">
                            <li>States with flavor bans (e.g., Massachusetts, New York, New Jersey, Rhode Island).</li>
                            <li>Jurisdictions with shipping bans (e.g., San Francisco, Chicago).</li>
                            <li>Locations where local excise tax requirements cannot be met.</li>
                        </ul>
                        <p>If your shipping address is in a restricted area, we will notify you at checkout and your order will not be processed.</p>
                    </div>

                    <div className="policy-card">
                        <div className="policy-card-header">
                            <h2>Questions regarding Compliance?</h2>
                        </div>
                        <p>
                            Our compliance team is available to answer any questions regarding our adherence to federal and state laws. 
                            Please contact us at <strong>compliance@[YourDomain].com</strong> for more information.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
