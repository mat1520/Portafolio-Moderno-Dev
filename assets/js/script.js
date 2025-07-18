/**
 * ===== PORTAFOLIO MODERNO MEJORADO - SCRIPT PRINCIPAL =====
 * Autor: Ariel Matias Melo
 * Funcionalidades: Animaciones avanzadas, interactividad y UX de élite
 */

// ===== VARIABLES GLOBALES =====
let isScrolling = false;
let cursor = null;
let cursorFollower = null;
let scrollProgress = null;
let heroStatsAnimated = false;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portafolio Moderno v2.0 iniciado correctamente');
    
    // Asegurar que la notificación esté oculta al inicio
    const notification = document.getElementById('notification');
    if (notification) {
        notification.classList.remove('show');
        notification.classList.add('hidden');
    }
    
    // Inicializar todas las funcionalidades
    initializeScrollProgress();
    initializeCustomCursor();
    initializeTypewriterEffect();
    initializeScrollAnimations();
    initializeProjectInteractions();
    initializeEmailCopyFunctionality();
    initializeNavigationSmooth();
    initializeMobileMenu();
    initializeParallaxEffects();
    initializeHeroStats();
    initializeResponsiveTitle();
    
    // Inicializar sistema de traducción
    if (typeof i18next !== 'undefined') {
        initializeI18n();
        initializeLanguageSelector();
    }
    
    // Mostrar elementos del hero inmediatamente
    showHeroElements();
    
    // Precarga de imágenes
    preloadCriticalImages();
});

// ===== SCROLL PROGRESS BAR =====
function initializeScrollProgress() {
    scrollProgress = document.getElementById('scroll-progress');
    
    if (scrollProgress) {
        window.addEventListener('scroll', updateScrollProgress);
    }
}

function updateScrollProgress() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + '%';
    }
}

// ===== CURSOR PERSONALIZADO CORREGIDO =====
function initializeCustomCursor() {
    // Solo inicializar en dispositivos no táctiles
    if (window.matchMedia("(pointer: fine)").matches) {
        cursor = document.getElementById('cursor');
        cursorFollower = document.getElementById('cursor-follower');
        
        if (cursor && cursorFollower) {
            // Seguimiento del mouse optimizado
            document.addEventListener('mousemove', (e) => {
                // Actualizar cursor principal inmediatamente
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                // Actualizar follower con un pequeño retraso
                setTimeout(() => {
                    cursorFollower.style.left = e.clientX + 'px';
                    cursorFollower.style.top = e.clientY + 'px';
                }, 50);
            });
            
            // Efectos hover en elementos interactivos
            const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item, .nav-link');
            
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    document.body.classList.add('cursor-hover');
                });
                
                element.addEventListener('mouseleave', () => {
                    document.body.classList.remove('cursor-hover');
                });
            });
        }
    } else {
        // Ocultar cursor personalizado en dispositivos táctiles
        const cursors = document.querySelectorAll('.cursor, .cursor-follower');
        cursors.forEach(cursor => cursor.style.display = 'none');
        document.body.style.cursor = 'auto';
    }
}

// ===== EFECTO MÁQUINA DE ESCRIBIR =====
function initializeTypewriterEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    // Esperar a que el sistema de traducción se haya inicializado
    setTimeout(() => {
        const text = subtitle.textContent || subtitle.getAttribute('data-original-text');
        
        // Guardar el texto original para futuras traducciones
        if (!subtitle.getAttribute('data-original-text')) {
            subtitle.setAttribute('data-original-text', text);
        }
        
        subtitle.textContent = '';
        subtitle.style.opacity = '1';
        
        let index = 0;
        const speed = 50; // Velocidad de escritura en ms
        
        function typeWriter() {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, speed);
            } else {
                // Añadir efecto de cursor parpadeante al final
                subtitle.style.borderRight = '2px solid #00D4FF';
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 2000);
            }
        }
        
        // Iniciar el efecto después de un breve retraso
        setTimeout(typeWriter, 500);
    }, 1500); // Esperar a que se complete la inicialización
}

// ===== ANIMACIONES DE SCROLL =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('hidden');
                entry.target.classList.add('visible');
                
                // Animar elementos hijos con retraso escalonado
                animateChildrenWithDelay(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todas las secciones con clase 'hidden'
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(element => {
        observer.observe(element);
    });
}

function animateChildrenWithDelay(parent) {
    const children = parent.querySelectorAll('.project-card, .skill-item, .highlight-item');
    
    children.forEach((child, index) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            child.style.transition = 'all 0.6s ease';
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
        }, index * 150); // Retraso escalonado de 150ms
    });
}

function showHeroElements() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.classList.remove('hidden');
        heroSection.classList.add('visible');
    }
}

// ===== INTERACCIONES DE PROYECTOS =====
function initializeProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Efecto de paralaje sutil en hover
        card.addEventListener('mouseenter', () => {
            const overlay = card.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.95) 0%, rgba(0, 123, 255, 0.1) 100%)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const overlay = card.querySelector('.project-overlay');
            if (overlay) {
                overlay.style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, transparent 100%)';
            }
        });
        
        // Click para redirigir a GitHub
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const githubUrl = card.getAttribute('data-github');
            
            if (githubUrl) {
                // Efecto visual de clic
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = '';
                    window.open(githubUrl, '_blank', 'noopener,noreferrer');
                }, 150);
            }
        });
        
        // Efecto de inclinación 3D
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===== RESPONSIVE TITLE ADJUSTMENT =====
function initializeResponsiveTitle() {
    const heroTitle = document.querySelector('.hero-title');
    const nameHighlight = document.querySelector('.name-highlight');
    
    if (!heroTitle || !nameHighlight) return;
    
    function adjustTitleSize() {
        // Resetear estilos para medir correctamente
        nameHighlight.style.fontSize = '';
        nameHighlight.style.whiteSpace = '';
        nameHighlight.style.wordBreak = '';
        nameHighlight.style.lineHeight = '';
        
        const containerWidth = heroTitle.offsetWidth;
        const nameWidth = nameHighlight.scrollWidth;
        
        // Verificar si el nombre se desborda
        if (nameWidth > containerWidth * 0.9) {
            // Primero intentar reducir el tamaño de fuente
            let fontSize = parseFloat(window.getComputedStyle(nameHighlight).fontSize);
            const minFontSize = window.innerWidth < 320 ? 16 : 18;
            
            while (nameHighlight.scrollWidth > containerWidth * 0.9 && fontSize > minFontSize) {
                fontSize -= 2;
                nameHighlight.style.fontSize = fontSize + 'px';
            }
            
            // Si aún no cabe después de reducir la fuente, permitir wrap
            if (nameHighlight.scrollWidth > containerWidth * 0.9) {
                nameHighlight.style.whiteSpace = 'normal';
                nameHighlight.style.wordBreak = 'break-word';
                nameHighlight.style.overflowWrap = 'break-word';
                nameHighlight.style.lineHeight = '1.1';
                nameHighlight.style.hyphens = 'auto';
            }
        }
        
        // Asegurar que el nombre esté visible
        nameHighlight.style.visibility = 'visible';
        nameHighlight.style.opacity = '1';
    }
    
    // Ajustar inmediatamente
    setTimeout(adjustTitleSize, 100);
    
    // Ajustar al redimensionar
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustTitleSize, 200);
    });
    
    // Ajustar después de cambio de idioma
    document.addEventListener('languageChanged', adjustTitleSize);
}

// ===== FUNCIONALIDAD COPIAR EMAIL =====
function initializeEmailCopyFunctionality() {
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const notification = document.getElementById('notification');
    
    if (copyEmailBtn && notification) {
        // Variable para evitar múltiples clics
        let isProcessing = false;
        
        copyEmailBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            
            // Evitar múltiples clics mientras se procesa
            if (isProcessing) return;
            isProcessing = true;
            
            const email = copyEmailBtn.getAttribute('data-email');
            
            try {
                // Usar la API moderna del portapapeles
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(email);
                    showNotification(i18next.t('notifications.emailCopied'));
                } else {
                    // Fallback para navegadores más antiguos
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    textArea.style.position = 'fixed';
                    textArea.style.left = '-999999px';
                    textArea.style.top = '-999999px';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    
                    if (document.execCommand('copy')) {
                        showNotification(i18next.t('notifications.emailCopied'));
                    } else {
                        showNotification(i18next.t('notifications.emailError'));
                    }
                    
                    document.body.removeChild(textArea);
                }
                
                // Efecto visual en el botón
                copyEmailBtn.style.background = '#00C851';
                copyEmailBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    <span data-i18n="notifications.copied">${i18next.t('notifications.copied')}</span>
                `;
                
                setTimeout(() => {
                    copyEmailBtn.style.background = '';
                    copyEmailBtn.innerHTML = `
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <span data-i18n="contact.copyEmail">${i18next.t('contact.copyEmail')}</span>
                    `;
                    isProcessing = false;
                }, 2000);
                
            } catch (err) {
                console.error('Error al copiar email:', err);
                showNotification(i18next.t('notifications.emailError'));
                isProcessing = false;
            }
        });
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    // Evitar notificaciones duplicadas
    if (notification.classList.contains('show')) {
        return;
    }
    
    // Asegurar que esté oculta primero
    notification.classList.remove('show');
    notification.classList.add('hidden');
    
    const textElement = notification.querySelector('.notification-text');
    if (textElement) {
        textElement.textContent = message;
    }
    
    // Pequeño delay para asegurar que la transición funcione
    setTimeout(() => {
        notification.classList.remove('hidden');
        notification.classList.add('show');
    }, 10);
    
    // Limpiar cualquier timeout previo
    if (notification.hideTimeout) {
        clearTimeout(notification.hideTimeout);
    }
    
    notification.hideTimeout = setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hidden');
        delete notification.hideTimeout;
    }, 3000);
}

// ===== NAVEGACIÓN SUAVE =====
function initializeNavigationSmooth() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar enlace activo
                updateActiveNavLink(link);
            }
        });
    });
    
    // Actualizar enlace activo al hacer scroll
    window.addEventListener('scroll', updateActiveNavLinkOnScroll);
}

function updateActiveNavLink(activeLink) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateActiveNavLinkOnScroll() {
    if (isScrolling) return;
    
    isScrolling = true;
    
    setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.querySelector('.header').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 100;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Actualizar enlace activo
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
        
        isScrolling = false;
    }, 100);
}

// ===== MENÚ MÓVIL =====
function initializeMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animar líneas del hamburger
            const spans = navToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navToggle.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '1';
                }
            });
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                
                const spans = navToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '1';
                });
            });
        });
    }
}

// ===== HERO STATS ANIMATION =====
function initializeHeroStats() {
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !heroStatsAnimated) {
                animateHeroStats();
                heroStatsAnimated = true;
            }
        });
    });
    
    observer.observe(heroStats);
}

function animateHeroStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach((stat, index) => {
        const finalValue = parseInt(stat.textContent);
        let currentValue = 0;
        const increment = finalValue / 50; // 50 steps for smooth animation
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = stat.textContent.includes('+') ? finalValue + '+' : finalValue;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue);
            }
        }, 40); // Update every 40ms
        
        // Add stagger delay
        setTimeout(() => {
            stat.style.transform = 'scale(1.1)';
            setTimeout(() => {
                stat.style.transform = 'scale(1)';
            }, 200);
        }, index * 200);
    });
}

// ===== PARALLAX EFFECTS =====
function initializeParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===== ENHANCED PROJECT INTERACTIONS =====
function enhanceProjectCard(card) {
    // Add magnetic effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const moveX = x * 0.1;
        const moveY = y * 0.1;
        
        card.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${y * 0.05}deg) rotateY(${x * 0.05}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
}

// ===== ADVANCED SCROLL ANIMATIONS =====
function createAdvancedScrollObserver() {
    const observerOptions = {
        threshold: [0, 0.1, 0.5, 1],
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const element = entry.target;
            const ratio = entry.intersectionRatio;
            
            if (entry.isIntersecting) {
                element.classList.add('visible');
                
                // Trigger different animations based on element type
                if (element.classList.contains('skill-item')) {
                    setTimeout(() => {
                        element.style.transform = 'translateY(0) scale(1)';
                        element.style.opacity = '1';
                    }, Math.random() * 300);
                }
                
                if (element.classList.contains('project-card')) {
                    enhanceProjectCard(element);
                }
            }
            
            // Update elements based on scroll ratio
            if (ratio > 0) {
                element.style.opacity = Math.min(ratio * 2, 1);
                element.style.transform = `translateY(${(1 - ratio) * 50}px)`;
            }
        });
    }, observerOptions);
    
    return observer;
}

// ===== ENHANCED TYPEWRITER EFFECT =====
function createAdvancedTypewriter(element, text, options = {}) {
    const {
        speed = 50,
        deleteSpeed = 30,
        pauseDuration = 2000,
        showCursor = true
    } = options;
    
    let index = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = text.substring(0, index);
        element.textContent = currentText;
        
        if (showCursor) {
            element.style.borderRight = '2px solid #06B6D4';
            element.style.animation = 'blink 1s infinite';
        }
        
        if (!isDeleting && index === text.length) {
            setTimeout(() => {
                isDeleting = true;
                setTimeout(type, deleteSpeed);
            }, pauseDuration);
            return;
        }
        
        if (isDeleting && index === 0) {
            isDeleting = false;
        }
        
        if (isDeleting) {
            index--;
        } else {
            index++;
        }
        
        const currentSpeed = isDeleting ? deleteSpeed : speed;
        setTimeout(type, currentSpeed + Math.random() * 50);
    }
    
    type();
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function preloadCriticalImages() {
    const criticalImages = [
        'https://avatars.githubusercontent.com/u/151447878?v=4'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// ===== INTERSECTION OBSERVER IMPROVEMENTS =====
function createSmartObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add special effects for different elements
                if (entry.target.classList.contains('hero-stats')) {
                    animateHeroStats();
                }
                
                if (entry.target.classList.contains('skill-item')) {
                    setTimeout(() => {
                        createParticleExplosion(entry.target);
                    }, Math.random() * 500);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    return observer;
}

// ===== PARTICLE EXPLOSION EFFECT =====
function createParticleExplosion(element) {
    const rect = element.getBoundingClientRect();
    const particles = [];
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #6366F1, #8B5CF6);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
        `;
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 100 + Math.random() * 50;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 1 
            },
            { 
                transform: `translate(${x}px, ${y}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: 800,
            easing: 'ease-out'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// ===== ENHANCED MOBILE MENU =====
function enhanceMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('active');
            
            if (!isOpen) {
                navMenu.classList.add('active');
                navToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Animate menu items
                const menuItems = navMenu.querySelectorAll('.nav-link');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            } else {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// ===== CSS ANIMATIONS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: #06B6D4; }
    }
    
    .hero-stats {
        display: flex;
        gap: 2rem;
        margin-top: 2rem;
        justify-content: center;
    }
    
    .stat-item {
        text-align: center;
        padding: 1rem;
        background: rgba(26, 26, 46, 0.5);
        border: 1px solid rgba(240, 240, 247, 0.1);
        border-radius: 12px;
        backdrop-filter: blur(10px);
        transition: all 0.3s ease;
        min-width: 100px;
    }
    
    .stat-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
    }
    
    .stat-number {
        display: block;
        font-size: 1.8rem;
        font-weight: 800;
        background: linear-gradient(135deg, #6366F1, #8B5CF6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        transition: transform 0.3s ease;
    }
    
    .stat-label {
        font-size: 0.9rem;
        color: rgba(184, 184, 200, 0.8);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    
    @media (max-width: 768px) {
        .hero-stats {
            gap: 1rem;
        }
        
        .stat-item {
            min-width: 80px;
            padding: 0.8rem;
        }
        
        .stat-number {
            font-size: 1.4rem;
        }
        
        .stat-label {
            font-size: 0.8rem;
        }
    }
`;
document.head.appendChild(style);

// ===== SISTEMA DE TRADUCCIÓN I18N =====
const translations = {
    es: {
        nav: {
            home: "Inicio",
            projects: "Proyectos",
            skills: "Habilidades",
            about: "Sobre Mí",
            contact: "Contacto"
        },
        hero: {
            greeting: "Hola, soy",
            subtitle: "Estudiante de Ingeniería en Sistemas | Apasionado por la Ciberseguridad | Desarrollo Web",
            description: "Estudiante de 3er semestre de Ingeniería en Sistemas con gran interés en ciberseguridad y desarrollo web. Buscando oportunidades para aprender y crecer profesionalmente.",
            viewPortfolio: "Ver Portfolio"
        },
        projects: {
            title: "Proyectos Destacados",
            subtitle: "Algunos de mis trabajos más recientes"
        },
        skills: {
            title: "Habilidades Técnicas", 
            subtitle: "Tecnologías que estoy aprendiendo"
        },
        about: {
            title: "Sobre Mí",
            subtitle: "Conoce mi historia y experiencia",
            intro: "¡Hola! Soy Ariel Matias Melo, estudiante de <strong>3er semestre de Ingeniería en Sistemas</strong> en la Universidad Internacional del Ecuador (UIDE) con una profunda pasión por la <strong>ciberseguridad</strong> y el <strong>desarrollo web full-stack</strong>.",
            description: "Mi objetivo profesional es ingresar al mundo laboral tecnológico aplicando mis habilidades en proyectos reales. Me especializo en <strong>pentesting</strong>, <strong>desarrollo web seguro</strong> y <strong>análisis de vulnerabilidades</strong>. Busco constantemente oportunidades para crecer profesionalmente y contribuir a hacer el mundo digital más seguro.",
            quote: "\"Siempre investigando nuevas tecnologías para mejorar mis habilidades y estar al día con las últimas tendencias del sector.\" Mi enfoque está en combinar la seguridad informática con el desarrollo web para crear soluciones robustas y confiables.",
            projects: "Proyectos Completados",
            languages: "Lenguajes de Programación",
            passion: "Ganas de Aprender"
        },
        contact: {
            title: "¿Tienes una idea?",
            subtitle: "Creémosla juntos",
            description: "Estoy disponible para colaboraciones, proyectos freelance, o simplemente para charlar sobre tecnología y ciberseguridad.",
            github: "GitHub",
            telegram: "Telegram", 
            whatsapp: "WhatsApp",
            copyEmail: "Copiar Email"
        },
        hero: {
            greeting: "Hola, soy",
            subtitle: "Estudiante de Ingeniería en Sistemas | Apasionado por la Ciberseguridad | Desarrollo Web",
            description: "Estudiante de 3er semestre de Ingeniería en Sistemas con gran interés en ciberseguridad y desarrollo web. Buscando oportunidades para aprender y crecer profesionalmente.",
            viewPortfolio: "Ver Portfolio",
            github: "GitHub",
            projectsLabel: "Proyectos",
            technologiesLabel: "Tecnologías", 
            semesterLabel: "Semestre"
        },
        projects: {
            title: "Proyectos Destacados",
            subtitle: "Algunos de mis trabajos más recientes",
            viewProject: "Ver Proyecto →"
        },
        notifications: {
            emailCopied: "¡Email copiado al portapapeles! 📧",
            emailError: "Error al copiar email ❌",
            copied: "¡Copiado!"
        },
        footer: {
            copyright: "© 2025 Ariel Matias Melo. Hecho con 💚 y mucho café ☕"
        }
    },
    en: {
        nav: {
            home: "Home",
            projects: "Projects",
            skills: "Skills",
            about: "About Me",
            contact: "Contact"
        },
        hero: {
            greeting: "Hello, I'm",
            subtitle: "Systems Engineering Student | Passionate about Cybersecurity | Web Development",
            description: "3rd semester Systems Engineering student with great interest in cybersecurity and web development. Looking for opportunities to learn and grow professionally.",
            viewPortfolio: "View Portfolio"
        },
        projects: {
            title: "Featured Projects",
            subtitle: "Some of my recent work"
        },
        skills: {
            title: "Technical Skills",
            subtitle: "Technologies I'm learning"
        },
        about: {
            title: "About Me",
            subtitle: "Get to know my story and experience",
            intro: "Hello! I'm Ariel Matias Melo, a <strong>3rd semester Systems Engineering</strong> student at the International University of Ecuador (UIDE) with a deep passion for <strong>cybersecurity</strong> and <strong>full-stack web development</strong>.",
            description: "My professional goal is to enter the technological job market by applying my skills in real projects. I specialize in <strong>pentesting</strong>, <strong>secure web development</strong> and <strong>vulnerability analysis</strong>. I constantly seek opportunities to grow professionally and contribute to making the digital world more secure.",
            quote: "\"Always researching new technologies to improve my skills and stay current with the latest industry trends.\" My focus is on combining computer security with web development to create robust and reliable solutions.",
            projects: "Projects Completed",
            languages: "Programming Languages",
            passion: "Passion to Learn"
        },
        contact: {
            title: "Do you have an idea?",
            subtitle: "Let's create it together",
            description: "I'm available for collaborations, freelance projects, or simply to chat about technology and cybersecurity.",
            github: "GitHub",
            telegram: "Telegram",
            whatsapp: "WhatsApp", 
            copyEmail: "Copy Email"
        },
        hero: {
            greeting: "Hello, I'm",
            subtitle: "Systems Engineering Student | Passionate about Cybersecurity | Web Development",
            description: "3rd semester Systems Engineering student with great interest in cybersecurity and web development. Looking for opportunities to learn and grow professionally.",
            viewPortfolio: "View Portfolio",
            github: "GitHub",
            projectsLabel: "Projects",
            technologiesLabel: "Technologies",
            semesterLabel: "Semester"
        },
        projects: {
            title: "Featured Projects",
            subtitle: "Some of my recent work",
            viewProject: "View Project →"
        },
        notifications: {
            emailCopied: "Email copied to clipboard! 📧",
            emailError: "Error copying email ❌",
            copied: "Copied!"
        },
        footer: {
            copyright: "© 2025 Ariel Matias Melo. Made with 💚 and lots of coffee ☕"
        }
    }
};

// Configuración de i18next
function initializeI18n() {
    if (typeof i18next !== 'undefined' && !window.i18nInitialized) {
        window.i18nInitialized = true;
        
        i18next
            .use(i18nextBrowserLanguageDetector)
            .init({
                lng: 'es', // idioma por defecto
                fallbackLng: 'es',
                debug: false,
                resources: {
                    es: { translation: translations.es },
                    en: { translation: translations.en }
                }
            }, function(err, t) {
                if (err) {
                    console.error('Error inicializando i18next:', err);
                } else {
                    console.log('✅ i18next inicializado correctamente');
                    updateContent();
                }
            });
    }
}

// Actualizar contenido con traducciones
function updateContent() {
    if (typeof i18next === 'undefined') return;
    
    console.log('🔄 Actualizando contenido con traducciones...');
    
    document.querySelectorAll('[data-i18n]:not([data-translated])').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = i18next.t(key);
        
        if (translation && translation !== key) {
            // Marcar elemento como ya traducido
            element.setAttribute('data-translated', 'true');
            
            // Usar innerHTML para mantener el formato HTML (negritas, cursivas, etc.)
            element.innerHTML = translation;
            
            console.log(`✅ Traducido: ${key} -> "${translation.substring(0, 50)}..."`);
        } else {
            console.warn(`⚠️ No se encontró traducción para: ${key}`);
        }
    });
    
    console.log('🎯 Actualización de contenido completada');
}

// Cambiar idioma
function changeLanguage(lang) {
    if (typeof i18next === 'undefined') return;
    
    console.log(`🌍 Cambiando idioma a: ${lang}`);
    
    // Limpiar marcas de traducción previas
    document.querySelectorAll('[data-translated]').forEach(element => {
        element.removeAttribute('data-translated');
    });
    
    i18next.changeLanguage(lang, (err, t) => {
        if (err) {
            console.error('Error cambiando idioma:', err);
        } else {
            console.log(`✅ Idioma cambiado a: ${lang}`);
            updateContent();
            
            // Actualizar botones activos
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
            if (activeBtn) {
                activeBtn.classList.add('active');
            }
            
            // Actualizar atributo lang del HTML
            document.documentElement.setAttribute('lang', lang);
        }
    });
}

// Inicializar eventos de idioma
function initializeLanguageSelector() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
}
