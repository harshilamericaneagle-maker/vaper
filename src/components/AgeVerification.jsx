import { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import './AgeVerification.css';

export default function AgeVerification() {
    const [isVisible, setIsVisible] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const verified = localStorage.getItem('vapestore_age_verified');
        if (!verified) {
            setTimeout(() => {
                setIsVisible(true);
                setIsAnimating(true);
            }, 500);
        }
    }, []);

    const handleVerify = () => {
        localStorage.setItem('vapestore_age_verified', 'true');
        setIsAnimating(false);
        setTimeout(() => setIsVisible(false), 300);
    };

    const handleDeny = () => {
        window.location.href = 'https://www.google.com';
    };

    if (!isVisible) return null;

    return (
        <div className={`age-overlay ${isAnimating ? 'age-overlay-visible' : ''}`}>
            <div className={`age-modal ${isAnimating ? 'age-modal-visible' : ''}`}>
                <div className="age-modal-content">
                    <div className="age-icon">
                        <AlertTriangle size={48} />
                    </div>

                    <h2 className="age-title">Age Verification Required</h2>

                    <p className="age-description">
                        You must be <strong>21 years of age or older</strong> to enter this website.
                        By clicking "I Am 21+" you confirm that you are of legal age to purchase
                        tobacco and vaping products in your jurisdiction.
                    </p>

                    <div className="age-actions">
                        <button
                            className="btn btn-primary age-btn"
                            onClick={handleVerify}
                        >
                            I Am 21+
                        </button>
                        <button
                            className="btn btn-secondary age-btn"
                            onClick={handleDeny}
                        >
                            I Am Under 21
                        </button>
                    </div>

                    <p className="age-disclaimer">
                        This website contains products intended for adults only.
                        We do not sell to minors.
                    </p>
                </div>

                <div className="age-bg-glow"></div>
            </div>
        </div>
    );
}
