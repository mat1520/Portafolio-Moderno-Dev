/**
 * ===== PORTAFOLIO MODERNO - SCRIPT PRINCIPAL =====
 * Autor: Ariel Matias Melo
 * Funcionalidades: Animaciones, interactividad y UX avanzada
 */

// ===== VARIABLES GLOBALES =====
let isScrolling = false;
let cursor = null;
let cursorFollower = null;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portafolio iniciado correctamente');
    
    // Inicializar todas las funcionalidades
    initializeCustomCursor();
    initializeTypewriterEffect();
    initializeScrollAnimations();
    initializeProjectInteractions();
    initializeEmailCopyFunctionality();
    initializeNavigationSmooth();
    initializeMobileMenu();
    
    // Mostrar elementos del hero inmediatamente
    showHeroElements();
});

// ===== CURSOR PERSONALIZADO =====
function initializeCustomCursor() {
    // Solo inicializar en dispositivos no táctiles
    if (window.matchMedia("(pointer: fine)").matches) {
        cursor = document.getElementById('cursor');
        cursorFollower = document.getElementById('cursor-follower');
        
        if (cursor && cursorFollower) {
            // Seguimiento del mouse
            document.addEventListener('mousemove', updateCursorPosition);
            
            // Efectos hover en elementos interactivos
            const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
            
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

function updateCursorPosition(e) {
    if (cursor && cursorFollower) {
        // Actualizar posición del cursor principal
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Actualizar posición del seguidor con retraso
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    }
}

// ===== EFECTO MÁQUINA DE ESCRIBIR =====
function initializeTypewriterEffect() {
    const subtitle = document.querySelector('.subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
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
    setTimeout(typeWriter, 1000);
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

// ===== FUNCIONALIDAD COPIAR EMAIL =====
function initializeEmailCopyFunctionality() {
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const notification = document.getElementById('notification');
    
    if (copyEmailBtn && notification) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = copyEmailBtn.getAttribute('data-email');
            
            try {
                // Usar la API moderna del portapapeles
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(email);
                    showNotification('¡Email copiado al portapapeles! 📧');
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
                        showNotification('¡Email copiado al portapapeles! 📧');
                    } else {
                        showNotification('Error al copiar email ❌');
                    }
                    
                    document.body.removeChild(textArea);
                }
                
                // Efecto visual en el botón
                copyEmailBtn.style.background = '#00C851';
                copyEmailBtn.innerHTML = `
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20,6 9,17 4,12"/>
                    </svg>
                    ¡Copiado!
                `;
                
                setTimeout(() => {
                    copyEmailBtn.style.background = '';
                    copyEmailBtn.innerHTML = `
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        Copiar Email
                    `;
                }, 2000);
                
            } catch (err) {
                console.error('Error al copiar email:', err);
                showNotification('Error al copiar email ❌');
            }
        });
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    const textElement = notification.querySelector('.notification-text');
    if (textElement) {
        textElement.textContent = message;
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
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

// ===== EFECTOS ADICIONALES =====

// Parallax sutil para elementos flotantes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingElements = document.querySelectorAll('.floating-card');
    
    floatingElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Efecto de partículas en hover sobre skills
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            createParticleEffect(item);
        });
    });
});

function createParticleEffect(element) {
    const particles = [];
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#007BFF';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.left = rect.left + rect.width / 2 + 'px';
        particle.style.top = rect.top + rect.height / 2 + 'px';
        
        document.body.appendChild(particle);
        particles.push(particle);
        
        // Animar partícula
        const angle = (i / 5) * Math.PI * 2;
        const distance = 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${x}px, ${y}px)`, opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

// ===== PERFORMANCE Y OPTIMIZACIÓN =====

// Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce a eventos de scroll costosos
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLinkOnScroll();
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Precargar imágenes importantes
function preloadImages() {
    const imageUrls = [
        'https://avatars.githubusercontent.com/u/151447878?v=4'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Inicializar precarga después de que la página se cargue
window.addEventListener('load', preloadImages);

// ===== ANALYTICS Y SEGUIMIENTO (Opcional) =====
function trackUserInteraction(action, element) {
    console.log(`🎯 Interacción: ${action} en ${element}`);
    // Aquí se puede integrar con Google Analytics o similar
}

// Trackear clics en proyectos
document.addEventListener('click', (e) => {
    if (e.target.closest('.project-card')) {
        trackUserInteraction('project_click', e.target.closest('.project-card').querySelector('h3').textContent);
    }
    
    if (e.target.closest('.contact-link')) {
        trackUserInteraction('contact_click', e.target.closest('.contact-link').textContent.trim());
    }
});

console.log('✨ Script cargado completamente. ¡Portafolio listo para impresionar!');
