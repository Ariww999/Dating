// Screen Management
let currentScreen = 'selection-screen';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    showScreen('selection-screen');
    addAnimations();
});

// Show specific screen
function showScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    // Show the target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        setTimeout(() => {
            targetScreen.classList.add('active');
            currentScreen = screenId;
        }, 100);
    }
}

// Choose a guy and go to date
function chooseGuy(guyNumber) {
    // Add exit animation to current screen
    const currentScreenElement = document.getElementById(currentScreen);
    currentScreenElement.style.opacity = '0';
    currentScreenElement.style.transform = 'scale(0.95)';

    // Transition to date screen
    setTimeout(() => {
        showScreen(`date-screen-${guyNumber}`);
    }, 300);
}

// Answer the date question
function answerDate(guyNumber, answer) {
    // Add exit animation
    const currentScreenElement = document.getElementById(currentScreen);
    currentScreenElement.style.opacity = '0';
    currentScreenElement.style.transform = 'scale(0.95)';

    // Determine which result screen to show
    setTimeout(() => {
        if (answer) {
            showScreen(`result-screen-${guyNumber}-yes`);
        } else {
            showScreen('result-screen-no');
        }
    }, 300);
}

// Restart the experience
function restart() {
    // Add exit animation
    const currentScreenElement = document.getElementById(currentScreen);
    currentScreenElement.style.opacity = '0';
    currentScreenElement.style.transform = 'scale(0.95)';

    // Reset to selection screen
    setTimeout(() => {
        // Reset all screens
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.style.opacity = '';
            screen.style.transform = '';
        });

        showScreen('selection-screen');
    }, 300);
}

// Add interactive animations
function addAnimations() {
    // Card hover effects
    const guyCards = document.querySelectorAll('.guy-card');
    guyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Button hover effects with ripple
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            // Add ripple styles
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key to restart
    if (e.key === 'Escape') {
        if (currentScreen !== 'selection-screen') {
            restart();
        }
    }

    // Number keys (1-3) to select guys on selection screen
    if (currentScreen === 'selection-screen') {
        if (e.key === '1') {
            chooseGuy(1);
        } else if (e.key === '2') {
            chooseGuy(2);
        } else if (e.key === '3') {
            chooseGuy(3);
        }
    }

    // Y/N keys on date screens
    if (currentScreen.startsWith('date-screen-')) {
        const guyNumber = parseInt(currentScreen.split('-')[2]);
        if (e.key === 'y' || e.key === 'Y') {
            answerDate(guyNumber, true);
        } else if (e.key === 'n' || e.key === 'N') {
            answerDate(guyNumber, false);
        }
    }

    // R key to restart on result screens
    if (currentScreen.startsWith('result-screen-')) {
        if (e.key === 'r' || e.key === 'R') {
            restart();
        }
    }
});

// Add floating hearts effect on result screens
function createFloatingHearts() {
    const resultScreens = document.querySelectorAll('.result-screen');

    resultScreens.forEach(screen => {
        screen.addEventListener('transitionend', function(e) {
            if (this.classList.contains('active') && !this.id.includes('no')) {
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        createHeart(this);
                    }, i * 200);
                }
            }
        });
    });
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.textContent = '💕';
    heart.style.position = 'fixed';
    heart.style.fontSize = Math.random() * 30 + 20 + 'px';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.bottom = '-50px';
    heart.style.opacity = '0.8';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = `float-up ${Math.random() * 3 + 3}s ease-in-out`;

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Add floating animation for hearts
if (!document.getElementById('float-style')) {
    const style = document.createElement('style');
    style.id = 'float-style';
    style.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize floating hearts
createFloatingHearts();

// Add smooth scrolling
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

// Console easter egg
console.log('%c💕 Welcome to Your Perfect Date! 💕', 'font-size: 24px; color: #f5576c; font-weight: bold;');
console.log('%cKeyboard shortcuts:', 'font-size: 16px; color: #667eea; font-weight: bold;');
console.log('%c  • Press 1, 2, or 3 to choose a guy', 'font-size: 14px; color: #666;');
console.log('%c  • Press Y or N to answer on dates', 'font-size: 14px; color: #666;');
console.log('%c  • Press R to restart', 'font-size: 14px; color: #666;');
console.log('%c  • Press ESC to go back to start', 'font-size: 14px; color: #666;');
console.log('%c\nEnjoy your romantic adventure! ✨', 'font-size: 14px; color: #764ba2; font-style: italic;');
