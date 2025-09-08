// Magic.js - The heart of the transformation
class AbracadabraTransformer {
    constructor() {
        this.isTransformed = false;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.checkEnvironment());
        } else {
            this.checkEnvironment();
        }
    }

    checkEnvironment() {
        const { protocol, port, href } = window.location;

        console.log('🔍 Checking how you\'re viewing this page...');
        console.log(`📍 Protocol: ${protocol} | Port: ${port || 'default'} | URL: ${href}`);

        // Check if viewing as file
        if (protocol === 'file:') {
            console.log('❌ You\'re opening this as a file:// - web servers are needed for modern web development!');
            console.log('💡 Learning tip: Use "npm run serve" to start a proper development server');
            this.showMessage('missing',
                '😴 Something\'s missing...',
                'This webpage needs to be served by a development server to show its true potential. Try using npm to serve it properly!'
            );
            return;
        }

        // Check for magic port 3000
        const isMagicPort = href.includes(':3000') || port === '3000';

        if (!isMagicPort) {
            console.log(`🤔 You're using a development server on port ${port || 'default'}, but this project's magic only works on port 3000`);
            console.log('💡 Learning tip: Different servers run on different ports. npm scripts let you control which port to use!');
            console.log('🚀 Try running: npm run serve');
            this.showPortMessage(port);
            return;
        }

        console.log('🎉 Perfect! You\'re using the correct development server on port 3000');
        this.loadMagicContent();
    }

    showPortMessage(currentPort) {
        const messages = {
            '5500': 'You\'re using Live Server! But this website\'s magic only works on port 3000 using npm. Try "npm run serve" instead.',
            '5501': 'You\'re using Live Server! But this website\'s magic only works on port 3000 using npm. Try "npm run serve" instead.',
            '8080': 'You\'re using a development server, but the magic is tuned for port 3000. Try "npm run serve"!'
        };

        const message = messages[currentPort] || `You're on port ${currentPort || 'unknown'}, but magic happens on port 3000. Use "npm run serve".`;

        this.showMessage('close', '🤔 Close, but not quite right...', message);
    }

    async loadMagicContent() {
        console.log('🔍 Looking for generated content...');

        try {
            const response = await fetch('/generated/cowsay-content.html');

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const content = await response.text();
            console.log('✅ Found generated content! Activating transformation...');
            this.activateMagic(content);

        } catch (error) {
            console.log('❌ No generated content found - you need to run the npm script first');
            console.log('💡 Learning tip: npm scripts can generate files and chain commands together');
            console.log('🚀 Run: npm run generate (or npm run dev to do everything at once)');
            this.showMessage('generate',
                '⚡ Almost there!',
                'The server is running on port 3000, but you need to generate content first. Run "npm run generate" then refresh!'
            );
        }
    }

    activateMagic(cowsayContent) {
        if (this.isTransformed) return;

        console.log('🪄 ABRACADABRA! Magic will begin in 3 seconds...');

        // Wait 3 seconds, then show countdown before transformation
        setTimeout(() => {
            console.log('🎭 Starting magic countdown now!');
            this.showMagicCountdown(cowsayContent, () => {
                this.performTransformation(cowsayContent);
            });
        }, 3000);
    }

    showMagicCountdown(cowsayContent, callback) {
        const spells = [
            "🪄 Abracadabra!",
            "✨ Alakazam!",
            "🎩 Hocus Pocus!",
            "⭐ Presto!",
            "🔮 Magic Time!"
        ];

        // Hide ACME content and prepare magic content immediately when countdown starts
        const boringDiv = document.querySelector('.boring');
        const magicSection = document.getElementById('magic-content');
        const contentPlaceholder = document.getElementById('content-placeholder');

        if (boringDiv) {
            boringDiv.style.setProperty('display', 'none', 'important');
            boringDiv.style.visibility = 'hidden';
            boringDiv.style.opacity = '0';
        }
        if (magicSection && contentPlaceholder) {
            // Keep magic section hidden during countdown, but pre-load content
            magicSection.style.display = 'none';
            contentPlaceholder.innerHTML = cowsayContent;
        }

        // Add awesome-mode class immediately to apply farm styling
        document.body.classList.add('awesome-mode');

        // Create countdown overlay
        const overlay = this.createCountdownOverlay();
        document.body.appendChild(overlay);

        let count = 5;
        const countdownInterval = setInterval(() => {
            // Update overlay content
            overlay.innerHTML = `
                <div class="countdown-content">
                    <div class="magic-spell">${spells[5 - count]}</div>
                    <div class="countdown-number">${count}</div>
                    <div class="countdown-text">Transforming in ${count} second${count !== 1 ? 's' : ''}...</div>
                    <div class="magic-particles">
                        <span class="particle">✨</span>
                        <span class="particle">⭐</span>
                        <span class="particle">🌟</span>
                        <span class="particle">💫</span>
                    </div>
                </div>
            `;

            count--;

            if (count < 0) {
                clearInterval(countdownInterval);
                overlay.classList.add('countdown-exit');

                setTimeout(() => {
                    overlay.remove();
                    callback(); // Perform the actual transformation
                }, 500); // Wait for exit animation
            }
        }, 1000);
    }

    createCountdownOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'magic-countdown-overlay';

        // Add CSS styles dynamically if not exists
        if (!document.getElementById('countdown-styles')) {
            this.addCountdownStyles();
        }

        return overlay;
    }

    performTransformation(cowsayContent) {
        // Get elements once
        const magicSection = document.getElementById('magic-content');
        const contentPlaceholder = document.getElementById('content-placeholder');

        if (!magicSection || !contentPlaceholder) {
            console.error('❌ Required elements not found for transformation');
            return;
        }

        // Simply reveal the pre-loaded magic content (no DOM manipulation needed)
        magicSection.style.display = 'block';
        document.title = 'Abracadabra Magic! 🪄';

        this.isTransformed = true;

        // Add sparkles after a brief delay
        setTimeout(() => this.addSparkles(), 300);

        console.log('🌟 SUCCESS! You\'ve experienced the power of npm automation!');
        console.log('🎓 What you just learned:');
        console.log('   • npm scripts can chain multiple commands together');
        console.log('   • Development servers enable dynamic content loading');
        console.log('   • JavaScript can transform pages based on environment');
        console.log('   • Build tools can generate content automatically');
    }

    showMessage(type, title, message) {
        const placeholder = document.getElementById('boring-placeholder');

        if (placeholder) {
            placeholder.innerHTML = `
                <div class="status-message status-${type}">
                    <h4>${title}</h4>
                    <p>${message}</p>
                </div>
            `;
        }
    }

    addCountdownStyles() {
        const style = document.createElement('style');
        style.id = 'countdown-styles';
        style.textContent = `
            .magic-countdown-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #2d5016;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: countdown-enter 0.5s ease-out;
            }

            .countdown-exit {
                animation: countdown-exit 0.5s ease-in forwards !important;
            }

            .countdown-content {
                text-align: center;
                color: var(--farm-cream, #fff7e6);
                font-family: var(--heading, "Fraunces", serif);
            }

            .magic-spell {
                font-size: clamp(1.5rem, 4vw, 2.5rem);
                font-weight: 700;
                margin-bottom: 1rem;
                color: var(--farm-gold, #d6a400);
                animation: spell-pulse 1s ease-in-out infinite alternate;
            }

            .countdown-number {
                font-size: clamp(4rem, 15vw, 8rem);
                font-weight: 800;
                line-height: 1;
                margin: 1rem 0;
                color: var(--farm-cream, #fff7e6);
                text-shadow: 0 0 20px rgba(214, 164, 0, 0.5);
                animation: number-bounce 1s ease-in-out;
            }

            .countdown-text {
                font-size: clamp(1rem, 3vw, 1.5rem);
                margin-bottom: 2rem;
                opacity: 0.9;
            }

            .magic-particles {
                display: flex;
                justify-content: center;
                gap: 2rem;
                margin-top: 2rem;
            }

            .particle {
                font-size: 2rem;
                animation: particle-float 2s ease-in-out infinite;
            }

            .particle:nth-child(1) { animation-delay: 0s; }
            .particle:nth-child(2) { animation-delay: 0.5s; }
            .particle:nth-child(3) { animation-delay: 1s; }
            .particle:nth-child(4) { animation-delay: 1.5s; }

            @keyframes countdown-enter {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            @keyframes countdown-exit {
                to {
                    opacity: 0;
                    transform: scale(1.2);
                }
            }

            @keyframes spell-pulse {
                from {
                    opacity: 0.8;
                    transform: scale(1);
                }
                to {
                    opacity: 1;
                    transform: scale(1.05);
                }
            }

            @keyframes number-bounce {
                0% {
                    transform: scale(0.5) rotate(-5deg);
                    opacity: 0;
                }
                50% {
                    transform: scale(1.1) rotate(2deg);
                }
                100% {
                    transform: scale(1) rotate(0deg);
                    opacity: 1;
                }
            }

            @keyframes particle-float {
                0%, 100% {
                    transform: translateY(0) rotate(0deg);
                }
                50% {
                    transform: translateY(-20px) rotate(180deg);
                }
            }

            /* Responsive adjustments */
            @media (max-width: 480px) {
                .magic-particles {
                    gap: 1rem;
                }
                .particle {
                    font-size: 1.5rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addSparkles() {
        const magicSection = document.getElementById('magic-content');
        if (!magicSection) return;

        magicSection.style.position = 'relative';
        magicSection.style.overflow = 'hidden';

        // Create sparkles with staggered timing
        Array.from({ length: 6 }, (_, i) => {
            setTimeout(() => this.createSparkle(magicSection), i * 200);
        });
    }

    createSparkle(container) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';

        Object.assign(sparkle.style, {
            position: 'absolute',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            fontSize: '22px',
            pointerEvents: 'none',
            animation: 'sparkle 2s ease-out forwards',
            zIndex: '1000'
        });

        // Add CSS animation if not exists
        if (!document.getElementById('sparkle-styles')) {
            const style = document.createElement('style');
            style.id = 'sparkle-styles';
            style.textContent = `
                @keyframes sparkle {
                    0% { opacity: 0; transform: scale(0) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
                    100% { opacity: 0; transform: scale(0) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        container.appendChild(sparkle);

        // Clean up after animation
        setTimeout(() => sparkle.remove(), 2000);
    }
}

// Initialize the magic
new AbracadabraTransformer();