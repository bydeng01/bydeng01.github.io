/**
 * Visitor Tracker for Personal Website
 * Tracks total site visitors using localStorage
 */

class VisitorTracker {
    constructor() {
        this.storageKey = 'siteVisitorCount';
        this.sessionKey = 'currentSessionVisited';
        this.init();
    }

    init() {
        // Check if this is a new session
        if (!sessionStorage.getItem(this.sessionKey)) {
            this.incrementVisitorCount();
            sessionStorage.setItem(this.sessionKey, 'true');
        }
        
        this.displayVisitorCount();
    }

    incrementVisitorCount() {
        let currentCount = parseInt(localStorage.getItem(this.storageKey) || '0');
        currentCount++;
        localStorage.setItem(this.storageKey, currentCount.toString());
    }

    getVisitorCount() {
        return parseInt(localStorage.getItem(this.storageKey) || '0');
    }

    displayVisitorCount() {
        const count = this.getVisitorCount();
        const trackerElement = document.getElementById('visitor-tracker');
        
        if (trackerElement) {
            const countElement = trackerElement.querySelector('.visitor-count');
            if (countElement) {
                countElement.textContent = count.toLocaleString();
            }
        }

        // Add animation effect for count update
        this.animateCount(count);
    }

    animateCount(targetCount) {
        const countElement = document.querySelector('.visitor-count');
        if (!countElement) return;

        // Simple animation effect
        countElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            countElement.style.transform = 'scale(1)';
        }, 200);
    }

    // Method to reset count (for testing purposes)
    resetCount() {
        localStorage.removeItem(this.storageKey);
        sessionStorage.removeItem(this.sessionKey);
        this.displayVisitorCount();
    }
}

// Initialize visitor tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.visitorTracker = new VisitorTracker();
});