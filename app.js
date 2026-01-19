// ============================================
// TADAWOUL PRO - Modern Trading Platform
// JavaScript - Interactive Features & AOS Integration
// ============================================

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-quart',
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom'
    });

    // Initialize all features
    initNavigation();
    initTradingForm();
    initRegistrationForm();
    initChart();
    initMarketData();
    initScrollEffects();
    initSmoothScroll();
});

// ============ NAVIGATION ============

function initNavigation() {
    const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Close offcanvas when link is clicked
            const offcanvas = document.querySelector('.offcanvas');
            if (offcanvas && bootstrap.Offcanvas.getInstance(offcanvas)) {
                bootstrap.Offcanvas.getInstance(offcanvas).hide();
            }
        });
    });

    // Add active state to navbar links on scroll
    window.addEventListener('scroll', () => {
        updateNavbarOnScroll();
    });
}

function updateNavbarOnScroll() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// ============ TRADING FORM ============

function initTradingForm() {
    const tradingForm = document.getElementById('tradingForm');
    
    if (tradingForm) {
        tradingForm.addEventListener('submit', handleTradingSubmit);
        
        // Add real-time validation
        const inputs = tradingForm.querySelectorAll('.form-modern');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
        });
    }
}

function handleTradingSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const asset = form.querySelector('select[name*="Type"]')?.value || form.querySelector('select:first-of-type')?.value;
    const type = form.querySelector('select:nth-of-type(2)')?.value || 'achat';
    const amount = form.querySelector('input[type="number"]:first-of-type')?.value;
    const priceLimit = form.querySelector('input[type="number"]:nth-of-type(2)')?.value;
    
    // Validation
    if (!asset || !amount || amount < 10) {
        showNotification('Veuillez remplir tous les champs correctement', 'error');
        return;
    }
    
    // Show loading
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Traitement...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification(
            `✓ Ordre de ${type} exécuté avec succès!\n` +
            `Actif: ${asset}\n` +
            `Montant: ${amount} USD` +
            (priceLimit ? `\nLimite: ${priceLimit}` : ''),
            'success'
        );
        
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Add to recent trades (optional)
        addRecentTrade(asset, type, amount);
    }, 1500);
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    const type = input.type;
    
    let isValid = true;
    
    if (type === 'number') {
        isValid = !isNaN(value) && value > 0;
    } else if (type === 'email') {
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (type === 'text') {
        isValid = value.length >= 2;
    }
    
    if (!isValid && value !== '') {
        input.classList.add('is-invalid');
    } else {
        input.classList.remove('is-invalid');
    }
}

// ============ REGISTRATION FORM ============

function initRegistrationForm() {
    const regForm = document.getElementById('registrationForm');
    
    if (regForm) {
        regForm.addEventListener('submit', handleRegistrationSubmit);
    }
}

function handleRegistrationSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const nom = form.querySelector('input[type="text"]')?.value;
    const email = form.querySelector('input[type="email"]')?.value;
    const password = form.querySelector('input[type="password"]')?.value;
    
    // Validation
    if (!nom || !email || !password || password.length < 6) {
        showNotification('Veuillez remplir le formulaire correctement', 'error');
        return;
    }
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = '<span class="loading"></span> Inscription...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification(
            `Bienvenue ${nom}! 🎉\n` +
            `Un email de confirmation a été envoyé à ${email}`,
            'success'
        );
        
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('tradeModal'));
        if (modal) modal.hide();
    }, 1500);
}

// ============ CHART INITIALIZATION ============

function initChart() {
    const ctx = document.getElementById('priceChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
            datasets: [
                {
                    label: 'Bitcoin (BTC)',
                    data: [35000, 38000, 42000, 39000, 45000, 48000, 52000, 58000, 61000, 65000, 92000, 96420],
                    borderColor: '#f7931a',
                    backgroundColor: 'rgba(247, 147, 26, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#f7931a',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Ethereum (ETH)',
                    data: [1500, 1700, 1900, 2000, 2300, 2400, 2600, 2900, 2700, 2800, 2400, 2540],
                    borderColor: '#627eea',
                    backgroundColor: 'rgba(98, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#627eea',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { size: 12, weight: 'bold' },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: { size: 14, weight: 'bold' },
                    bodyFont: { size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: (context) => {
                            return `${context.dataset.label}: $${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        callback: (value) => `$${value.toLocaleString()}`
                    }
                },
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    });
}

// ============ MARKET DATA ============

function initMarketData() {
    const marketRows = document.querySelectorAll('.market-row');
    
    marketRows.forEach(row => {
        row.addEventListener('click', () => {
            const asset = row.querySelector('strong').textContent;
            const price = row.querySelector('td:nth-child(2)').textContent;
            showNotification(
                `Détails de ${asset}\nPrix actuel: ${price}`,
                'info'
            );
        });
    });
    
    // Update market data periodically (simulation)
    setInterval(updateMarketPrices, 5000);
}

function updateMarketPrices() {
    const priceElements = document.querySelectorAll('.market-row td:nth-child(2)');
    
    priceElements.forEach(el => {
        const currentPrice = parseFloat(el.textContent.replace('$', '').replace(',', ''));
        const change = (Math.random() - 0.5) * 100; // Random change
        const newPrice = (currentPrice + change).toFixed(2);
        
        el.textContent = '$' + parseFloat(newPrice).toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        
        // Flash animation
        el.style.backgroundColor = change > 0 ? 'rgba(25, 135, 84, 0.2)' : 'rgba(220, 53, 69, 0.2)';
        setTimeout(() => {
            el.style.backgroundColor = 'transparent';
        }, 500);
    });
}

// ============ SCROLL EFFECTS ============

function initScrollEffects() {
    const navbar = document.querySelector('.navbar-modern');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// ============ SMOOTH SCROLL ============

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============ NOTIFICATION SYSTEM ============

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show`;
    notification.setAttribute('role', 'alert');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 500px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        animation: slideInRight 0.3s ease-out;
    `;
    
    notification.innerHTML = `
        <strong>${type === 'success' ? '✓ Succès' : type === 'error' ? '✗ Erreur' : 'ℹ Info'}:</strong>
        <div style="margin-top: 8px; white-space: pre-line;">${message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Add animation
    const style = document.createElement('style');
    if (!document.querySelector('style[data-animations]')) {
        style.setAttribute('data-animations', 'true');
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            @keyframes slideOutRight {
                from {
                    opacity: 1;
                    transform: translateX(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(100px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============ RECENT TRADES (OPTIONAL) ============

function addRecentTrade(asset, type, amount) {
    const trades = JSON.parse(localStorage.getItem('recentTrades') || '[]');
    trades.unshift({
        asset,
        type,
        amount,
        timestamp: new Date().toLocaleString('fr-FR')
    });
    
    // Keep only last 10 trades
    trades.splice(10);
    localStorage.setItem('recentTrades', JSON.stringify(trades));
}

// ============ PAGE TRANSITIONS ============

window.addEventListener('beforeunload', () => {
    document.querySelector('body').style.opacity = '0.8';
});

// ============ KEYBOARD SHORTCUTS ============

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showNotification('Fonctionnalité de recherche non disponible dans cette version', 'info');
    }
});

// ============ PERFORMANCE OPTIMIZATION ============

// Lazy load images (if added later)
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

console.log('🚀 Tadawoul Pro Platform - Loaded Successfully!');

