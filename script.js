// ========================
// SLIDESHOW FUNCTIONALITY
// ========================
let slideIndex = 1;
let slideTimer;

function showSlide(n) {
    const slides = document.getElementsByClassName('slide');
    const dots = document.getElementsByClassName('dot');

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('show');
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('show');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

function changeSlide(n) {
    clearTimeout(slideTimer);
    slideIndex += n;
    showSlide(slideIndex);
    autoSlide();
}

function currentSlide(n) {
    clearTimeout(slideTimer);
    slideIndex = n;
    showSlide(slideIndex);
    autoSlide();
}

function autoSlide() {
    slideTimer = setTimeout(function() {
        slideIndex++;
        showSlide(slideIndex);
        autoSlide();
    }, 3500); // 3.5 secondes
}

// Initialize slideshow on page load
document.addEventListener('DOMContentLoaded', function() {
    showSlide(slideIndex);
    autoSlide();
});

// ========================
// SCROLL ANIMATIONS
// ========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards on page load
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card, .feature-box, .col-lg-6');
    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });

    // Setup forms
    setupForms();
});

// ========================
// FORM HANDLING
// ========================
function setupForms() {
    const adhesionForm = document.getElementById('adhesion-form');
    
    if (adhesionForm) {
        adhesionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                nom: document.getElementById('nom').value,
                email: document.getElementById('email').value,
                profession: document.getElementById('profession').value,
                telephone: document.getElementById('telephone').value,
                date: new Date().toLocaleDateString('fr-FR')
            };

            // Save to localStorage (simulating backend)
            let members = JSON.parse(localStorage.getItem('ecoder_members')) || [];
            members.push(formData);
            localStorage.setItem('ecoder_members', JSON.stringify(members));

            // Show success message
            showAlert('Merci ! Votre adhésion a été enregistrée avec succès.', 'success');
            
            // Reset form
            adhesionForm.reset();
            
            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('adherent-modal'));
            if (modal) modal.hide();
        });
    }
}

// ========================
// ALERT FUNCTION
// ========================
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show fixed-top m-3`;
    alertDiv.setAttribute('role', 'alert');
    alertDiv.setAttribute('style', 'z-index: 9999; width: auto; max-width: 500px;');
    
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ========================
// SMOOTH SCROLLING
// ========================
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

// ========================
// NAVBAR ACTIVE STATE
// ========================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
});

// ========================
// COUNTER ANIMATION
// ========================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ========================
// LAZY LOADING IMAGES
// ========================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// ========================
// MOBILE MENU CLOSE ON LINK CLICK
// ========================
document.querySelectorAll('.navbar-nav a').forEach(link => {
    link.addEventListener('click', function() {
        const navbarToggle = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarCollapse.classList.contains('show')) {
            navbarToggle.click();
        }
    });
});

// ========================
// ACCESSIBILITY
// ========================
// Add skip to main content link
window.addEventListener('load', function() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Passer au contenu principal';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: #0d6efd;
        color: white;
        padding: 8px;
        z-index: 100;
    `;
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
});

console.log('ECODER Website - Plateforme du secteur Ruwenzori');
console.log('Version 1.0 - Construisons ensemble notre secteur');
