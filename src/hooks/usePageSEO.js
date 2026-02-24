import { useEffect } from 'react';

/**
 * Custom hook to set per-page SEO metadata.
 * Updates document.title and the meta description tag dynamically.
 *
 * @param {string} title - The page title (shown in browser tab + Google snippet)
 * @param {string} description - The meta description (shown in Google search results)
 * @param {object} options - Optional extras: { noindex: bool, canonical: string }
 */
export default function usePageSEO(title, description, options = {}) {
    useEffect(() => {
        const siteName = 'Vaper Store';
        const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

        // Update page title
        document.title = fullTitle;

        // Update or create meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = 'description';
            document.head.appendChild(metaDesc);
        }
        metaDesc.content = description;

        // Update OG title
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = fullTitle;

        // Update OG description
        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.content = description;

        // Update Twitter title
        let twTitle = document.querySelector('meta[name="twitter:title"]');
        if (twTitle) twTitle.content = fullTitle;

        // Update Twitter description
        let twDesc = document.querySelector('meta[name="twitter:description"]');
        if (twDesc) twDesc.content = description;

        // Handle noindex (for private pages like cart/checkout)
        let robotsMeta = document.querySelector('meta[name="robots"]');
        if (options.noindex) {
            if (!robotsMeta) {
                robotsMeta = document.createElement('meta');
                robotsMeta.name = 'robots';
                document.head.appendChild(robotsMeta);
            }
            robotsMeta.content = 'noindex, nofollow';
        } else if (robotsMeta) {
            robotsMeta.content = 'index, follow';
        }

        // Update canonical if provided
        if (options.canonical) {
            let canonical = document.querySelector('link[rel="canonical"]');
            if (!canonical) {
                canonical = document.createElement('link');
                canonical.rel = 'canonical';
                document.head.appendChild(canonical);
            }
            canonical.href = options.canonical;
        }

        // Cleanup — restore defaults when component unmounts
        return () => {
            document.title = 'Vaper Store | Premium Vape, Glass & Smoking Accessories';
        };
    }, [title, description, options.noindex, options.canonical]);
}
