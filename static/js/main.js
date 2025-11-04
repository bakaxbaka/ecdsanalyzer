// Main JavaScript for Bitcoin ECDSA Analyzer

// Utility function to format hex strings
function formatHex(hex) {
    if (!hex) return 'N/A';
    if (hex.startsWith('0x')) {
        hex = hex.substring(2);
    }
    return hex;
}

// Utility function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('Failed to copy to clipboard', 'error');
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Validate Bitcoin transaction ID
function isValidTxId(txId) {
    return /^[a-fA-F0-9]{64}$/.test(txId);
}

// Validate Bitcoin address
function isValidAddress(address) {
    // Basic validation for Bitcoin addresses
    return /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address) || 
           /^bc1[a-z0-9]{39,59}$/.test(address);
}

// Format Bitcoin amount
function formatBTC(satoshis) {
    if (typeof satoshis === 'number') {
        return (satoshis / 100000000).toFixed(8) + ' BTC';
    }
    return satoshis;
}

// Format timestamp
function formatTimestamp(timestamp) {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
}

// Add copy buttons to code elements
document.addEventListener('DOMContentLoaded', () => {
    // Highlight active nav link
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.style.color = 'var(--primary-color)';
        }
    });
    
    // Add copy functionality to code blocks
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'CODE' && e.target.textContent.length > 10) {
            copyToClipboard(e.target.textContent);
        }
    });
});

// Export functions for use in other scripts
window.BTCAnalyzer = {
    formatHex,
    copyToClipboard,
    showNotification,
    isValidTxId,
    isValidAddress,
    formatBTC,
    formatTimestamp
};
