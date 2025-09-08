// Tutorial Navigation System
class TutorialNav {
    constructor() {
        this.currentTutorial = this.getCurrentTutorialFromURL();
        this.init();
    }

    init() {
        this.createNavigationHeader();
        this.setupKeyboardNavigation();
    }

    getCurrentTutorialFromURL() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        return filename.replace('.html', '');
    }

    createNavigationHeader() {
        // Only add nav if we're not on the home page
        if (this.currentTutorial === 'index' || this.currentTutorial === '') return;

        const nav = document.createElement('nav');
        nav.className = 'tutorial-nav';
        nav.innerHTML = `
            <div class="container">
                <a href="index.html" class="nav-home">🪄 Tutorial Hub</a>
                <div class="nav-progress">
                    <span id="nav-tutorial-name">${this.getTutorialTitle()}</span>
                </div>
            </div>
        `;

        // Insert at the beginning of body
        document.body.insertBefore(nav, document.body.firstChild);
    }

    getTutorialTitle() {
        const titles = {
            'npm-basics': 'npm Basics',
            'package-json-guide': 'package.json Guide',
            'vscode-setup': 'VS Code Setup',
            'npm-scripts-tutorial': 'npm Scripts',
            'development-servers': 'Development Servers',
            'troubleshooting': 'Troubleshooting',
            'evidence-guide': 'Evidence Guide'
        };
        return titles[this.currentTutorial] || 'Tutorial';
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key to go back to hub
            if (e.key === 'Escape') {
                window.location.href = 'index.html';
            }
            
            // Alt + H for home
            if (e.altKey && e.key === 'h') {
                e.preventDefault();
                window.location.href = 'index.html';
            }
        });
    }

    // Static method to create breadcrumb navigation
    static createBreadcrumb(steps) {
        const breadcrumb = document.createElement('nav');
        breadcrumb.className = 'breadcrumb';
        breadcrumb.setAttribute('aria-label', 'Breadcrumb');
        
        const ol = document.createElement('ol');
        ol.className = 'breadcrumb-list';
        
        steps.forEach((step, index) => {
            const li = document.createElement('li');
            li.className = 'breadcrumb-item';
            
            if (step.href && index < steps.length - 1) {
                const a = document.createElement('a');
                a.href = step.href;
                a.textContent = step.text;
                li.appendChild(a);
            } else {
                li.textContent = step.text;
                if (index === steps.length - 1) {
                    li.setAttribute('aria-current', 'page');
                }
            }
            
            ol.appendChild(li);
        });
        
        breadcrumb.appendChild(ol);
        return breadcrumb;
    }

    // Method to highlight current section in tutorial
    static setupSectionHighlighting() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.tutorial-toc a');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-20% 0px -70% 0px'
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }
}

// Utility functions for tutorial pages
class TutorialUtils {
    // Smooth scroll to sections
    static setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Copy AI prompts to clipboard functionality
    static setupAIPromptCopyButtons() {
        const promptButtons = document.querySelectorAll('.copy-prompt');
        
        promptButtons.forEach(button => {
            button.addEventListener('click', async () => {
                const prompt = button.getAttribute('data-prompt') || button.nextElementSibling?.textContent?.replace(/^"|"$/g, '') || '';
                
                try {
                    await navigator.clipboard.writeText(prompt);
                    const originalText = button.textContent;
                    button.textContent = 'Copied!';
                    button.classList.add('copied');
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy prompt: ', err);
                    const originalText = button.textContent;
                    button.textContent = 'Failed';
                    setTimeout(() => {
                        button.textContent = originalText;
                    }, 2000);
                }
            });
        });
    }

    // Copy code to clipboard functionality
    static setupCodeCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(block => {
            const button = document.createElement('button');
            button.className = 'copy-code-btn';
            button.textContent = 'Copy';
            button.setAttribute('aria-label', 'Copy code to clipboard');
            
            button.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(block.textContent);
                    button.textContent = 'Copied!';
                    button.classList.add('copied');
                    
                    setTimeout(() => {
                        button.textContent = 'Copy';
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy text: ', err);
                    button.textContent = 'Failed';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                }
            });

            // Wrap code block in relative container
            const wrapper = document.createElement('div');
            wrapper.className = 'code-block-wrapper';
            block.parentNode.insertBefore(wrapper, block.parentNode);
            wrapper.appendChild(block.parentNode);
            wrapper.appendChild(button);
        });
    }

    // Expand/collapse sections
    static setupCollapsibleSections() {
        const collapsibleHeaders = document.querySelectorAll('[data-collapsible]');
        
        collapsibleHeaders.forEach(header => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                const content = header.nextElementSibling;
                const isExpanded = header.getAttribute('aria-expanded') === 'true';
                
                header.setAttribute('aria-expanded', !isExpanded);
                content.style.display = isExpanded ? 'none' : 'block';
                
                // Toggle icon
                const icon = header.querySelector('.toggle-icon');
                if (icon) {
                    icon.textContent = isExpanded ? '▶' : '▼';
                }
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TutorialNav();
    TutorialUtils.setupSmoothScrolling();
    TutorialUtils.setupCodeCopyButtons();
    TutorialUtils.setupAIPromptCopyButtons();
    TutorialUtils.setupCollapsibleSections();
    
    // If there's a table of contents, set up section highlighting
    if (document.querySelector('.tutorial-toc')) {
        TutorialNav.setupSectionHighlighting();
    }
});