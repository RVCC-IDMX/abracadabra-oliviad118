// Tutorial Progress Tracking System
class ProgressTracker {
    constructor() {
        this.storageKey = 'abracadabra-tutorial-progress';
        this.tutorials = [
            'assignment-overview',
            'npm-basics',
            'package-json-guide',
            'vscode-setup',
            'npm-scripts-tutorial',
            'development-servers',
            'troubleshooting',
            'evidence-guide'
        ];
        this.init();
    }

    init() {
        this.loadProgress();
        this.updateUI();
        this.setupEventListeners();
    }

    // Load progress from localStorage
    loadProgress() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.progress = stored ? JSON.parse(stored) : {};
        } catch (error) {
            console.warn('Failed to load progress from localStorage:', error);
            this.progress = {};
        }
    }

    // Save progress to localStorage
    saveProgress() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
        } catch (error) {
            console.warn('Failed to save progress to localStorage:', error);
        }
    }

    // Mark tutorial as completed
    markCompleted(tutorialId) {
        this.progress[tutorialId] = {
            completed: true,
            completedAt: new Date().toISOString(),
            visits: (this.progress[tutorialId]?.visits || 0) + 1
        };
        this.saveProgress();
        this.updateUI();
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('tutorialCompleted', {
            detail: { tutorialId, progress: this.progress }
        }));
    }

    // Track tutorial visit
    trackVisit(tutorialId) {
        if (!this.progress[tutorialId]) {
            this.progress[tutorialId] = {};
        }
        
        this.progress[tutorialId].visits = (this.progress[tutorialId].visits || 0) + 1;
        this.progress[tutorialId].lastVisited = new Date().toISOString();
        
        if (!this.progress[tutorialId].firstVisited) {
            this.progress[tutorialId].firstVisited = new Date().toISOString();
        }
        
        this.saveProgress();
    }

    // Check if tutorial is completed
    isCompleted(tutorialId) {
        return this.progress[tutorialId]?.completed || false;
    }

    // Get completion percentage
    getCompletionPercentage() {
        const completed = this.tutorials.filter(id => this.isCompleted(id)).length;
        return Math.round((completed / this.tutorials.length) * 100);
    }

    // Get completed count
    getCompletedCount() {
        return this.tutorials.filter(id => this.isCompleted(id)).length;
    }

    // Update UI elements
    updateUI() {
        this.updateProgressBar();
        this.updateCompletionBadges();
        this.updateProgressText();
    }

    // Update progress bar on homepage
    updateProgressBar() {
        const progressFill = document.getElementById('overall-progress');
        if (progressFill) {
            const percentage = this.getCompletionPercentage();
            progressFill.style.width = `${percentage}%`;
        }
    }

    // Update completion badges on tutorial cards
    updateCompletionBadges() {
        this.tutorials.forEach(tutorialId => {
            const badge = document.getElementById(`badge-${tutorialId}`);
            if (badge) {
                if (this.isCompleted(tutorialId)) {
                    badge.classList.add('completed');
                } else {
                    badge.classList.remove('completed');
                }
            }
        });
    }

    // Update progress text
    updateProgressText() {
        const completedCount = document.getElementById('completed-count');
        const totalCount = document.getElementById('total-count');
        
        if (completedCount) {
            completedCount.textContent = this.getCompletedCount();
        }
        
        if (totalCount) {
            totalCount.textContent = this.tutorials.length;
        }
    }

    // Setup event listeners
    setupEventListeners() {
        // Listen for tutorial completion triggers
        document.addEventListener('click', (e) => {
            if (e.target.matches('.mark-complete-btn')) {
                const tutorialId = e.target.dataset.tutorial;
                if (tutorialId) {
                    this.markCompleted(tutorialId);
                    this.showCompletionMessage(tutorialId);
                }
            }
        });

        // Track current tutorial visit
        const currentTutorial = this.getCurrentTutorialFromURL();
        if (currentTutorial && currentTutorial !== 'index' && this.tutorials.includes(currentTutorial)) {
            this.trackVisit(currentTutorial);
        }
    }

    // Get current tutorial from URL
    getCurrentTutorialFromURL() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        return filename.replace('.html', '');
    }

    // Show completion message
    showCompletionMessage(tutorialId) {
        const tutorialNames = {
            'assignment-overview': 'Assignment Overview',
            'npm-basics': 'npm Basics',
            'package-json-guide': 'package.json Guide',
            'vscode-setup': 'VS Code Setup',
            'npm-scripts-tutorial': 'npm Scripts',
            'development-servers': 'Development Servers',
            'troubleshooting': 'Troubleshooting',
            'evidence-guide': 'Evidence Guide'
        };

        const message = document.createElement('div');
        message.className = 'completion-toast';
        message.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">🎉</span>
                <span class="toast-text">Completed: ${tutorialNames[tutorialId]}</span>
            </div>
        `;

        document.body.appendChild(message);

        // Animate in
        setTimeout(() => message.classList.add('show'), 100);

        // Remove after 3 seconds
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }

    // Reset all progress (for testing/development)
    resetProgress() {
        this.progress = {};
        this.saveProgress();
        this.updateUI();
        console.log('Progress reset');
    }

    // Get detailed progress report
    getProgressReport() {
        const report = {
            totalTutorials: this.tutorials.length,
            completed: this.getCompletedCount(),
            percentage: this.getCompletionPercentage(),
            details: {}
        };

        this.tutorials.forEach(tutorialId => {
            report.details[tutorialId] = {
                completed: this.isCompleted(tutorialId),
                visits: this.progress[tutorialId]?.visits || 0,
                firstVisited: this.progress[tutorialId]?.firstVisited || null,
                lastVisited: this.progress[tutorialId]?.lastVisited || null,
                completedAt: this.progress[tutorialId]?.completedAt || null
            };
        });

        return report;
    }
}

// Tutorial completion helper for individual tutorial pages
class TutorialCompletion {
    constructor(tutorialId) {
        this.tutorialId = tutorialId;
        this.progressTracker = new ProgressTracker();
        this.init();
    }

    init() {
        this.createCompletionButton();
        this.setupScrollTracking();
    }

    createCompletionButton() {
        const isCompleted = this.progressTracker.isCompleted(this.tutorialId);
        
        const button = document.createElement('button');
        button.className = `mark-complete-btn ${isCompleted ? 'completed' : ''}`;
        button.dataset.tutorial = this.tutorialId;
        button.innerHTML = isCompleted ? 
            '<span class="btn-icon">✅</span> Completed' : 
            '<span class="btn-icon">☐</span> Mark as Complete';

        // Add to the end of main content
        const main = document.querySelector('main');
        if (main) {
            const completionSection = document.createElement('section');
            completionSection.className = 'tutorial-completion';
            completionSection.innerHTML = `
                <div class="completion-content">
                    <h3>Tutorial Complete</h3>
                    <p>Mark this tutorial as completed to track your progress.</p>
                </div>
            `;
            completionSection.appendChild(button);
            main.appendChild(completionSection);
        }
    }

    // Optional: Auto-mark as complete when user scrolls to bottom
    setupScrollTracking() {
        let hasScrolledToBottom = false;
        
        window.addEventListener('scroll', () => {
            if (hasScrolledToBottom) return;
            
            const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
            
            if (scrollPercent >= 0.95) {
                hasScrolledToBottom = true;
                // Could auto-complete here or show a reminder
                this.showScrollCompletionHint();
            }
        });
    }

    showScrollCompletionHint() {
        const button = document.querySelector('.mark-complete-btn');
        if (button && !this.progressTracker.isCompleted(this.tutorialId)) {
            button.classList.add('pulse');
            setTimeout(() => button.classList.remove('pulse'), 2000);
        }
    }
}

// Global progress tracker instance
window.progressTracker = new ProgressTracker();

// Initialize completion tracking on individual tutorial pages
document.addEventListener('DOMContentLoaded', () => {
    const currentTutorial = window.progressTracker.getCurrentTutorialFromURL();
    if (currentTutorial && currentTutorial !== 'index' && window.progressTracker.tutorials.includes(currentTutorial)) {
        new TutorialCompletion(currentTutorial);
    }
});

// Development helper - expose to global scope
window.resetTutorialProgress = () => window.progressTracker.resetProgress();