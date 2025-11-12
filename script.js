// Game State
let currentScene = 'scene-lemonade-stand';
let cupsPurchased = 0;

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    showScene('scene-lemonade-stand');
    createConfettiParticles();
    createSparkles();
});

// Show specific scene with 3D transition
function showScene(sceneId) {
    // Hide all scenes
    const scenes = document.querySelectorAll('.scene');
    scenes.forEach(scene => {
        scene.classList.remove('active');
    });

    // Show the target scene with animation
    const targetScene = document.getElementById(sceneId);
    if (targetScene) {
        setTimeout(() => {
            targetScene.classList.add('active');
            currentScene = sceneId;
        }, 100);
    }
}

// Handle cup selection
function selectCups(amount) {
    cupsPurchased = amount;

    // Add visual feedback
    const currentSceneElement = document.getElementById(currentScene);
    currentSceneElement.style.opacity = '0';
    currentSceneElement.style.transform = 'translateZ(-300px) rotateX(20deg)';

    // Transition based on amount
    setTimeout(() => {
        if (amount < 5) {
            showScene('scene-next-day-sad');
        } else {
            showScene('scene-next-day-happy');
        }
    }, 800);
}

// Ask why she's crying
function askWhyCrying() {
    const currentSceneElement = document.getElementById(currentScene);
    currentSceneElement.style.opacity = '0';
    currentSceneElement.style.transform = 'translateZ(-300px) scale(0.8)';

    setTimeout(() => {
        showScene('scene-explanation');

        // Calculate how much more she needs
        const moneyEarned = cupsPurchased * 2;
        const bicyclePrice = 60; // Assuming the bicycle costs $60
        const moneyNeeded = bicyclePrice - moneyEarned;

        const moneyNeededElement = document.getElementById('money-needed');
        if (moneyNeededElement) {
            moneyNeededElement.textContent = Math.max(0, moneyNeeded);
        }
    }, 600);
}

// Walk away
function walkAway() {
    const currentSceneElement = document.getElementById(currentScene);
    currentSceneElement.style.opacity = '0';
    currentSceneElement.style.transform = 'translateZ(-300px) translateX(-100px)';

    setTimeout(() => {
        showScene('scene-walkaway');
    }, 600);
}

// Restart the experience
function restart() {
    const currentSceneElement = document.getElementById(currentScene);
    currentSceneElement.style.opacity = '0';
    currentSceneElement.style.transform = 'translateZ(-300px) scale(0.9)';

    setTimeout(() => {
        // Reset all scenes
        const scenes = document.querySelectorAll('.scene');
        scenes.forEach(scene => {
            scene.style.opacity = '';
            scene.style.transform = '';
        });

        cupsPurchased = 0;
        showScene('scene-lemonade-stand');
    }, 600);
}

// Create confetti particles for celebration
function createConfettiParticles() {
    const happyScene = document.getElementById('scene-next-day-happy');
    if (!happyScene) return;

    const confettiContainer = happyScene.querySelector('.confetti');
    if (!confettiContainer) return;

    // Create confetti when happy scene becomes active
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('active')) {
                // Generate confetti
                for (let i = 0; i < 50; i++) {
                    setTimeout(() => {
                        createConfetti(confettiContainer);
                    }, i * 100);
                }
            }
        });
    });

    observer.observe(happyScene, { attributes: true, attributeFilter: ['class'] });
}

function createConfetti(container) {
    const confetti = document.createElement('div');
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#FFD93D', '#6BCF7F'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const shapes = ['▪', '▴', '●', '★', '♥'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];

    confetti.textContent = randomShape;
    confetti.style.position = 'fixed';
    confetti.style.fontSize = Math.random() * 20 + 15 + 'px';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-50px';
    confetti.style.color = randomColor;
    confetti.style.opacity = '1';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1001';
    confetti.style.animation = `confettiFall ${Math.random() * 3 + 3}s ease-out forwards`;

    container.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 6000);
}

// Add confetti animation styles
if (!document.getElementById('confetti-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-style';
    style.textContent = `
        @keyframes confettiFall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Create sparkles for happy scene
function createSparkles() {
    const happyScene = document.getElementById('scene-next-day-happy');
    if (!happyScene) return;

    const sparklesContainer = happyScene.querySelector('.sparkles');
    if (!sparklesContainer) return;

    // Create sparkles when happy scene becomes active
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('active')) {
                // Generate sparkles
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        createSparkle(sparklesContainer);
                    }, i * 150);
                }

                // Keep creating sparkles periodically
                const sparkleInterval = setInterval(() => {
                    if (currentScene === 'scene-next-day-happy') {
                        createSparkle(sparklesContainer);
                    } else {
                        clearInterval(sparkleInterval);
                    }
                }, 500);
            }
        });
    });

    observer.observe(happyScene, { attributes: true, attributeFilter: ['class'] });
}

function createSparkle(container) {
    const sparkle = document.createElement('div');
    const sparkles = ['✨', '⭐', '💫', '🌟'];
    const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];

    sparkle.textContent = randomSparkle;
    sparkle.style.position = 'fixed';
    sparkle.style.fontSize = Math.random() * 30 + 20 + 'px';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.opacity = '0';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '999';
    sparkle.style.animation = `sparkleFloat ${Math.random() * 2 + 2}s ease-in-out, sparkleFade ${Math.random() * 2 + 1}s ease-in-out`;

    container.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 4000);
}

// Add sparkle animation styles
if (!document.getElementById('sparkle-style')) {
    const style = document.createElement('style');
    style.id = 'sparkle-style';
    style.textContent = `
        @keyframes sparkleFloat {
            0% {
                transform: translate(0, 0) rotate(0deg) scale(1);
            }
            25% {
                transform: translate(20px, -20px) rotate(90deg) scale(1.2);
            }
            50% {
                transform: translate(-10px, -40px) rotate(180deg) scale(0.8);
            }
            75% {
                transform: translate(30px, -30px) rotate(270deg) scale(1.1);
            }
            100% {
                transform: translate(0, -50px) rotate(360deg) scale(1);
            }
        }

        @keyframes sparkleFade {
            0%, 100% {
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Create floating hearts for happy ending
function createFloatingHearts() {
    const happyScene = document.getElementById('scene-next-day-happy');
    if (!happyScene) return;

    const heartsContainer = happyScene.querySelector('.hearts-floating');
    if (!heartsContainer) return;

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('active')) {
                for (let i = 0; i < 20; i++) {
                    setTimeout(() => {
                        createHeart(heartsContainer);
                    }, i * 300);
                }

                const heartInterval = setInterval(() => {
                    if (currentScene === 'scene-next-day-happy') {
                        createHeart(heartsContainer);
                    } else {
                        clearInterval(heartInterval);
                    }
                }, 1000);
            }
        });
    });

    observer.observe(happyScene, { attributes: true, attributeFilter: ['class'] });
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
    heart.style.zIndex = '998';
    heart.style.animation = `heartFloat ${Math.random() * 4 + 4}s ease-in-out`;

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Add heart animation styles
if (!document.getElementById('heart-style')) {
    const style = document.createElement('style');
    style.id = 'heart-style';
    style.textContent = `
        @keyframes heartFloat {
            0% {
                transform: translateY(0) rotate(0deg) scale(1);
                opacity: 0.8;
            }
            50% {
                transform: translateY(-50vh) rotate(180deg) scale(1.2);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg) scale(0.8);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize floating hearts
createFloatingHearts();

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key to restart
    if (e.key === 'Escape') {
        if (currentScene !== 'scene-lemonade-stand') {
            restart();
        }
    }

    // R key to restart on ending screens
    if (currentScene.includes('scene-explanation') ||
        currentScene.includes('scene-walkaway') ||
        currentScene.includes('scene-next-day-happy')) {
        if (e.key === 'r' || e.key === 'R') {
            restart();
        }
    }

    // Number keys (0-9) to select cups on lemonade stand screen
    if (currentScene === 'scene-lemonade-stand') {
        const key = parseInt(e.key);
        if (!isNaN(key) && key >= 0 && key <= 9) {
            selectCups(key);
        }
    }

    // Y/N keys on sad scene for asking
    if (currentScene === 'scene-next-day-sad') {
        if (e.key === 'y' || e.key === 'Y') {
            askWhyCrying();
        } else if (e.key === 'n' || e.key === 'N') {
            walkAway();
        }
    }
});

// Add mouse parallax effect for 3D depth
document.addEventListener('mousemove', (e) => {
    const scenes = document.querySelectorAll('.scene.active .scene-3d-container');

    scenes.forEach(scene => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 50;

        scene.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
});

// Console easter egg
console.log('%c🍋 Welcome to The Lemonade Stand! 🍋', 'font-size: 24px; color: #FFD700; font-weight: bold;');
console.log('%cKeyboard shortcuts:', 'font-size: 16px; color: #667eea; font-weight: bold;');
console.log('%c  • Press 0-9 to choose how many cups', 'font-size: 14px; color: #666;');
console.log('%c  • Press Y to ask why (when applicable)', 'font-size: 14px; color: #666;');
console.log('%c  • Press N to walk away (when applicable)', 'font-size: 14px; color: #666;');
console.log('%c  • Press R to restart', 'font-size: 14px; color: #666;');
console.log('%c  • Press ESC to restart anytime', 'font-size: 14px; color: #666;');
console.log('%c\nRemember: Small acts of kindness can make big dreams come true! 💕', 'font-size: 14px; color: #00b894; font-style: italic;');
