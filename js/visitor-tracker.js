/**
 * Visitor Tracker for Personal Website
 * Tracks total site visitors using freevisitorcounters.com service
 */

class VisitorTracker {
    constructor() {
        this.counterServiceId = '1371963';
        this.authId = 'd6df8a39ee1352b15d05d97b03d3c9625cbb900b';
        this.init();
    }

    async init() {
        // Load the external counter service scripts
        await this.loadCounterService();
        
        // Display the visitor count with a slight delay to allow scripts to load
        setTimeout(() => {
            this.displayVisitorCount();
        }, 1000);
        
        // Enhanced detection for better integration
        this.detectCounterInDOM();
        
        // Set up periodic updates to sync with external service
        setInterval(() => {
            this.displayVisitorCount();
        }, 10000); // Update every 10 seconds
    }

    async loadCounterService() {
        try {
            // Load authentication script
            await this.loadScript(`https://www.freevisitorcounters.com/auth.php?id=${this.authId}`);
            
            // Load counter script
            await this.loadScript(`https://www.freevisitorcounters.com/en/home/counter/${this.counterServiceId}/t/3`);
        } catch (error) {
            console.warn('Failed to load counter service:', error);
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    extractCountFromService() {
        // The external service typically injects content into the DOM
        // Look for common patterns used by visitor counter services
        
        // Method 1: Look for elements created by the counter service
        const counterElements = document.querySelectorAll('img[src*="freevisitorcounters.com"], span[id*="counter"], div[id*="counter"]');
        
        for (let element of counterElements) {
            if (element.tagName === 'IMG') {
                // Some services use images with the count in the alt text or title
                const altText = element.alt || element.title || '';
                const match = altText.match(/\d+/);
                if (match) {
                    return parseInt(match[0]);
                }
            } else {
                // Look for text content containing numbers
                const text = element.textContent || '';
                const match = text.match(/\d+/);
                if (match) {
                    return parseInt(match[0]);
                }
            }
        }

        // Method 2: Check for global variables that might be set by the service
        if (typeof window.visitorCount !== 'undefined') {
            return parseInt(window.visitorCount);
        }
        
        if (typeof window.counterValue !== 'undefined') {
            return parseInt(window.counterValue);
        }

        // Method 3: Look for any script-generated content with numbers
        const allElements = document.querySelectorAll('*');
        for (let element of allElements) {
            const style = window.getComputedStyle(element);
            if (style.display !== 'none' && element.textContent) {
                const text = element.textContent.trim();
                // Look for standalone numbers that could be visitor counts
                if (/^\d{1,10}$/.test(text)) {
                    const num = parseInt(text);
                    if (num > 0 && num < 1000000000) { // Reasonable range for visitor count
                        return num;
                    }
                }
            }
        }

        return null;
    }

    async getVisitorCount() {
        // Try to extract count from the external service
        const serviceCount = this.extractCountFromService();
        
        if (serviceCount !== null && serviceCount > 0) {
            return serviceCount;
        }
        
        // Fallback: return a placeholder or previous count
        return 0;
    }

    async displayVisitorCount() {
        const count = await this.getVisitorCount();
        const trackerElement = document.getElementById('visitor-tracker');
        
        if (trackerElement) {
            const countElement = trackerElement.querySelector('.visitor-count');
            if (countElement) {
                // Only update if the count has changed or is greater than 0
                const currentDisplayed = parseInt(countElement.textContent.replace(/,/g, '') || '0');
                if (count > 0 && count !== currentDisplayed) {
                    countElement.textContent = count.toLocaleString();
                    this.animateCount(count);
                }
            }
        }
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

    // Method for manual refresh of count (for testing purposes)
    async refreshCount() {
        await this.displayVisitorCount();
    }
    
    // Enhanced detection method for better service integration
    detectCounterInDOM() {
        // Wait a bit more for external scripts to potentially modify DOM
        setTimeout(() => {
            // Look for newly created elements that might contain the counter
            const newElements = document.querySelectorAll('[style*="display"], script + *, noscript + *');
            
            for (let element of newElements) {
                const text = element.textContent || '';
                const match = text.match(/\d+/);
                if (match && element.style.display !== 'none') {
                    const count = parseInt(match[0]);
                    if (count > 0) {
                        // Found a potential counter, update display
                        const trackerElement = document.getElementById('visitor-tracker');
                        if (trackerElement) {
                            const countElement = trackerElement.querySelector('.visitor-count');
                            if (countElement && countElement.textContent === '0') {
                                countElement.textContent = count.toLocaleString();
                                this.animateCount(count);
                            }
                        }
                        break;
                    }
                }
            }
        }, 2000);
    }
}

// Initialize visitor tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.visitorTracker = new VisitorTracker();
});