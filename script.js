// Track page scroll depth
let hasTrackedScroll50 = false;
let hasTrackedScroll90 = false;

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
    
    // Track when user scrolls 50% of the page
    if (!hasTrackedScroll50 && scrollPercent >= 50) {
        hasTrackedScroll50 = true;
        ttq.track('ViewContent', {
            content_id: 'scroll_50',
            content_type: 'scroll_depth',
            content_name: 'Page Scroll 50%'
        });
    }
    
    // Track when user scrolls 90% of the page
    if (!hasTrackedScroll90 && scrollPercent >= 90) {
        hasTrackedScroll90 = true;
        ttq.track('ViewContent', {
            content_id: 'scroll_90',
            content_type: 'scroll_depth',
            content_name: 'Page Scroll 90%'
        });
    }
});

// Track time spent on page
setTimeout(() => {
    ttq.track('ViewContent', {
        content_id: 'time_30s',
        content_type: 'engagement',
        content_name: 'Time Spent 30s'
    });
}, 30000);

// IBAN copy functionality with tracking
function copyIBAN() {
    const iban = document.querySelector('.iban-number').textContent;
    navigator.clipboard.writeText(iban).then(() => {
        const copyButton = document.querySelector('.copy-iban');
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Αντιγράφηκε!';
        
        // Track IBAN copy event
        ttq.track('Contact', {
            content_id: 'iban_copy',
            content_type: 'bank_details',
            content_name: 'IBAN Copy'
        });
        
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Αποτυχία αντιγραφής IBAN:', err);
        alert('Αποτυχία αντιγραφής IBAN. Παρακαλώ δοκιμάστε να το επιλέξετε και να το αντιγράψετε χειροκίνητα.');
    });
}

// Track when cost breakdown is viewed
const costSection = document.querySelector('.cost-section');
let hasTrackedCostView = false;

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const costSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasTrackedCostView) {
            hasTrackedCostView = true;
            ttq.track('ViewContent', {
                content_id: 'cost_section',
                content_type: 'product_details',
                content_name: 'Treatment Cost Details',
                value: 75000,
                currency: 'EUR'
            });
            costSectionObserver.disconnect(); // Stop observing after first view
        }
    });
}, observerOptions);

if (costSection) {
    costSectionObserver.observe(costSection);
}

// Initialize page view tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Track initial page view with campaign information
    ttq.track('ViewContent', {
        content_id: 'dimitris_campaign',
        content_type: 'donation_page',
        content_name: 'Dimitris Cancer Treatment Campaign',
        value: 75000,
        currency: 'EUR'
    });
}); 