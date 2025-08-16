// ==========================================
// PORTFOLIO FUTURISTA - JavaScript Mejorado
// ==========================================

// Variables globales para efectos
let mouseX = 0;
let mouseY = 0;
let isAnimating = false;

// ==========================================
// EFECTOS DE CARGA Y ANIMACIONES INICIALES
// ==========================================

window.addEventListener('load', function() {
    initializePortfolio();
    createFloatingParticles();
    initializeTypewriterEffect();
});

function initializePortfolio() {
    // Animación de carga de la página
    const backgroundImage = document.querySelector('.background');
    const headerTitle = document.querySelector('h1');
    const headerSubtitle = document.querySelector('h2');
    const profileImg = document.querySelector('.profile-img');
    
    // Efecto de desvanecimiento para la imagen de fondo
    if (backgroundImage) {
        backgroundImage.style.transition = 'opacity 2s ease-in-out';
        backgroundImage.style.opacity = 0;
        setTimeout(() => {
            backgroundImage.style.opacity = 1;
        }, 100);
    }

    // Animaciones de entrada para títulos
    animateHeaderElements(headerTitle, headerSubtitle);
    
    // Animación especial para la imagen de perfil
    if (profileImg) {
        profileImg.style.transform = 'scale(0) rotate(180deg)';
        profileImg.style.opacity = 0;
        setTimeout(() => {
            profileImg.style.transition = 'all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            profileImg.style.transform = 'scale(1) rotate(0deg)';
            profileImg.style.opacity = 1;
        }, 1500);
    }
    
    // Inicializar otros efectos
    setTimeout(() => {
        initializeScrollEffects();
        animateSkillCards();
        initializeParallaxEffect();
        addHolographicEffects();
    }, 2000);
}

function animateHeaderElements(headerTitle, headerSubtitle) {
    if (headerTitle) {
        headerTitle.style.transform = 'translateY(-100px)';
        headerTitle.style.opacity = 0;
        setTimeout(() => {
            headerTitle.style.transition = 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.5s ease-in-out';
            headerTitle.style.transform = 'translateY(0)';
            headerTitle.style.opacity = 1;
        }, 500);
    }

    if (headerSubtitle) {
        headerSubtitle.style.transform = 'translateY(-100px)';
        headerSubtitle.style.opacity = 0;
        setTimeout(() => {
            headerSubtitle.style.transition = 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 1.5s ease-in-out';
            headerSubtitle.style.transform = 'translateY(0)';
            headerSubtitle.style.opacity = 1;
        }, 1000);
    }
}

// ==========================================
// EFECTOS DE PARTÍCULAS FLOTANTES
// ==========================================

function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    // Crear múltiples partículas
    for (let i = 0; i < 25; i++) {
        createParticle(particlesContainer, i);
    }
    
    document.body.appendChild(particlesContainer);
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const animationDuration = Math.random() * 20 + 15;
    const opacity = Math.random() * 0.5 + 0.2;
    const colors = ['#00f5ff', '#ff006e', '#8b5cf6', '#06ffa5'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${opacity};
        animation: floatParticle ${animationDuration}s infinite linear;
        box-shadow: 0 0 10px ${color};
    `;
    
    // Añadir animación CSS dinámicamente
    const style = document.createElement('style');
    style.textContent += `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: ${opacity};
            }
            90% {
                opacity: ${opacity};
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('.particle-styles')) {
        style.className = 'particle-styles';
        document.head.appendChild(style);
    }
    
    container.appendChild(particle);
    
    // Reiniciar animación cuando termine
    setTimeout(() => {
        createParticle(container, index);
        particle.remove();
    }, animationDuration * 1000);
}

// ==========================================
// EFECTO TYPEWRITER PARA TEXTOS
// ==========================================

function initializeTypewriterEffect() {
    const presentation = document.getElementById('presentation');
    if (presentation) {
        const originalText = presentation.textContent;
        presentation.textContent = '';
        presentation.style.borderRight = '2px solid #00f5ff';
        
        setTimeout(() => {
            typeWriter(presentation, originalText, 0);
        }, 2500);
    }
}

function typeWriter(element, text, i) {
    if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(element, text, i), 50);
    } else {
        // Remover cursor después de completar
        setTimeout(() => {
            element.style.borderRight = 'none';
        }, 1000);
    }
}

// ==========================================
// EFECTOS DE SCROLL AVANZADOS
// ==========================================

function initializeScrollEffects() {
    // Navbar con efecto glass
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
                nav.style.background = 'rgba(22, 33, 62, 0.95)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.classList.remove('scrolled');
                nav.style.background = 'rgba(10, 10, 15, 0.95)';
            }
        });
    }
    
    // Scroll reveal para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos
    const elementsToAnimate = document.querySelectorAll('.skill-card, .project-card, .recommendation-card');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ==========================================
// ANIMACIONES PARA SKILL CARDS
// ==========================================



// ==========================================
// EFECTO PARALLAX SUTIL
// ==========================================

function initializeParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.container-main, .container-projects, #container-recommendations');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ==========================================
// EFECTOS HOLOGRÁFICOS CON MOUSE
// ==========================================

function addHolographicEffects() {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Efecto de seguimiento suave
        updateHolographicElements();
    });
    
    // Añadir efecto a elementos específicos
    const holoElements = document.querySelectorAll('.project-card, .skill-card');
    holoElements.forEach(element => {
        element.addEventListener('mousemove', handleHolographicHover);
        element.addEventListener('mouseleave', resetHolographicEffect);
    });
}

function updateHolographicElements() {
    const containers = document.querySelectorAll('.container-main, .container-projects, #container-recommendations');
    
    containers.forEach(container => {
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const angleX = (mouseY - centerY) / 50;
        const angleY = (centerX - mouseX) / 50;
        
        container.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
}

function handleHolographicHover(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    
    // Añadir brillo dinámico
    const glowIntensity = Math.min(Math.abs(rotateX) + Math.abs(rotateY), 20) / 20;
    card.style.boxShadow = `
        0 20px 40px rgba(0, 245, 255, ${0.2 + glowIntensity * 0.3}),
        0 0 ${20 + glowIntensity * 30}px rgba(255, 0, 110, ${glowIntensity * 0.5})
    `;
}

function resetHolographicEffect(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    card.style.boxShadow = 'var(--shadow-primary)';
}

// ==========================================
// FORMULARIO CON EFECTOS AVANZADOS
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeRecommendationForm();
    addInputEffects();
    createMatrixRain();
});

function initializeRecommendationForm() {
    const recommendationForm = document.getElementById('recommendationForm');
    
    if (recommendationForm) {
        recommendationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const messageText = document.getElementById('message').value.trim();
            
            if (messageText === '') {
                showGlitchError('Por favor, escribe una recomendación');
                return;
            }
            
            // Animación de envío
            const submitBtn = this.querySelector('button[type="submit"]');
            animateSubmitButton(submitBtn);
            
            setTimeout(() => {
                addNewRecommendation(messageText);
                recommendationForm.reset();
                showEnhancedThankYouPopup();
            }, 1500);
        });
    }
}

function animateSubmitButton(button) {
    button.style.background = 'linear-gradient(45deg, #ff006e, #8b5cf6, #00f5ff, #06ffa5)';
    button.style.backgroundSize = '300% 300%';
    button.style.animation = 'gradient-shift 1.5s ease-in-out';
    button.style.position = 'relative';
    button.style.zIndex = '1';
    button.textContent = 'Enviando...';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        button.textContent = 'Enviar Recomendación';
        button.style.animation = '';
        button.style.background = 'var(--gradient-primary)';
    }, 1500);
}

function addNewRecommendation(messageText) {
    const newRecommendation = document.createElement('div');
    newRecommendation.className = 'recommendation-card';
    newRecommendation.style.opacity = '0';
    newRecommendation.style.transform = 'translateY(50px) rotateX(-90deg)';
    
    const recommendationText = document.createElement('p');
    recommendationText.textContent = `"${messageText}"`;
    newRecommendation.appendChild(recommendationText);
    
    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.appendChild(newRecommendation);
    
    // Animación de aparición
    setTimeout(() => {
        newRecommendation.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        newRecommendation.style.opacity = '1';
        newRecommendation.style.transform = 'translateY(0) rotateX(0deg)';
    }, 100);
}

function showGlitchError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #ff006e, #8b5cf6);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        z-index: 2000;
        font-weight: bold;
        animation: glitch-error 0.5s ease-in-out;
        box-shadow: 0 0 30px rgba(255, 0, 110, 0.8);
    `;
    errorDiv.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch-error {
            0%, 100% { transform: translate(-50%, -50%); }
            20% { transform: translate(-48%, -52%); }
            40% { transform: translate(-52%, -48%); }
            60% { transform: translate(-50%, -50%); }
            80% { transform: translate(-49%, -51%); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function showEnhancedThankYouPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(15px);
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        animation: fadeIn 0.5s ease-in-out forwards;
    `;
    
    const popup = document.createElement('div');
    popup.className = 'enhanced-popup';
    popup.style.cssText = `
        background: linear-gradient(145deg, #16213e, rgba(15, 52, 96, 0.9));
        border: 1px solid rgba(0, 245, 255, 0.3);
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        max-width: 500px;
        width: 90%;
        transform: scale(0.5) rotateY(-90deg);
        animation: popupAppear 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        box-shadow: 
            0 20px 40px rgba(0, 245, 255, 0.3),
            0 0 60px rgba(255, 0, 110, 0.2);
    `;
    
    popup.innerHTML = `
        <div class="success-icon" style="
            font-size: 4rem;
            color: #06ffa5;
            margin-bottom: 20px;
            animation: bounce-in 1s ease-out 0.3s both;
        ">✓</div>
        <h3 style="
            color: #ffffff;
            font-size: 1.8rem;
            margin-bottom: 15px;
            background: linear-gradient(135deg, #00f5ff 0%, #ff006e 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        ">¡Gracias por tu recomendación!</h3>
        <p style="
            color: #e2e8f0;
            margin-bottom: 25px;
            line-height: 1.6;
        ">Tu mensaje ha sido añadido exitosamente. ¡Valoramos mucho tu opinión!</p>
        <button class="close-popup-btn" style="
            background: linear-gradient(135deg, #8b5cf6 0%, #06ffa5 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
        ">¡Genial!</button>
    `;
    
    // Estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            to { opacity: 1; }
        }
        @keyframes popupAppear {
            to { 
                transform: scale(1) rotateY(0deg);
            }
        }
        @keyframes bounce-in {
            0% { transform: scale(0) rotate(180deg); }
            50% { transform: scale(1.2) rotate(0deg); }
            100% { transform: scale(1) rotate(0deg); }
        }
    `;
    document.head.appendChild(style);
    
    overlay.appendChild(popup);
    document.body.appendChild(overlay);
    
    // Evento para cerrar
    const closeBtn = popup.querySelector('.close-popup-btn');
    closeBtn.addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 0.5s ease-in-out forwards';
        setTimeout(() => overlay.remove(), 500);
    });
    
    // Añadir hover effect al botón
    closeBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 15px 30px rgba(139, 92, 246, 0.5)';
    });
    
    closeBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0px)';
        this.style.boxShadow = '0 10px 20px rgba(139, 92, 246, 0.3)';
    });
    
    // Auto-cerrar después de 6 segundos
    setTimeout(() => {
        if (document.body.contains(overlay)) {
            overlay.style.animation = 'fadeOut 0.5s ease-in-out forwards';
            setTimeout(() => overlay.remove(), 500);
        }
    }, 6000);
}

// ==========================================
// EFECTOS PARA INPUTS
// ==========================================

function addInputEffects() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Efecto de focus mejorado
        input.addEventListener('focus', function() {
            this.style.borderColor = '#00f5ff';
            this.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.5)';
            this.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'var(--border-color)';
            this.style.boxShadow = 'none';
            this.style.transform = 'scale(1)';
        });
        
        // Efecto de escritura
        input.addEventListener('input', function() {
            const label = this.previousElementSibling;
            if (label && label.tagName === 'LABEL') {
                label.style.color = '#06ffa5';
                label.style.transform = 'translateY(-20px) scale(0.9)';
            }
        });
    });
}

// ==========================================
// EFECTO MATRIX RAIN (SUTIL)
// ==========================================

function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -2;
        opacity: 0.1;
    `;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "01";
    const matrixArray = matrix.split("");
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00f5ff';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    document.body.appendChild(canvas);
    setInterval(drawMatrix, 50);
    
    // Redimensionar canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ==========================================
// EFECTOS ADICIONALES Y CORRECCIONES
// ==========================================

// Corregir z-index de botones para evitar que el texto desaparezca
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar z-index a todos los botones para que el texto siempre esté visible
    const allButtons = document.querySelectorAll('button, .project-info a');
    allButtons.forEach(button => {
        button.style.position = 'relative';
        button.style.zIndex = '10';
        
        // Asegurar que el texto esté siempre en primer plano
        const textSpan = document.createElement('span');
        textSpan.style.position = 'relative';
        textSpan.style.zIndex = '10';
        textSpan.innerHTML = button.innerHTML;
        button.innerHTML = '';
        button.appendChild(textSpan);
    });
});

// Añadir animación de fadeOut para el popup
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    /* Asegurar que el texto de los botones siempre esté visible */
    button, .project-info a {
        position: relative;
        z-index: 1;
    }
    
    button span, .project-info a span {
        position: relative;
        z-index: 10;
    }
    
    /* Corregir el efecto ::before para que no tape el texto */
    button::before, .project-info a::before {
        z-index: -1 !important;
    }
`;
document.head.appendChild(fadeOutStyle);

// Optimización para dispositivos móviles
if (window.innerWidth <= 768) {
    // Deshabilitar algunos efectos pesados en móviles
    const style = document.createElement('style');
    style.textContent = `
        .floating-particles { display: none; }
        .matrix-rain { display: none; }
    `;
    document.head.appendChild(style);
}

console.log('🚀 Portfolio futurista cargado con éxito!');
