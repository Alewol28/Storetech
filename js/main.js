const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const navbar = document.getElementById('navbar');
const sections = Array.from(document.querySelectorAll('section[id]'));
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

let emailJsLoaderPromise;
let emailJsInitialized = false;

function closeMobileMenu() {
    navMenu?.classList.remove('active');
    mobileMenuToggle?.classList.remove('active');
}

function setActiveNav(sectionId) {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${sectionId}`;
        link.classList.toggle('active', isActive);
    });
}

function initMobileMenu() {
    if (!mobileMenuToggle || !navMenu) {
        return;
    }

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function initNavbarState() {
    if (!navbar) {
        return;
    }

    let ticking = false;

    const updateNavbarState = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 24);
        ticking = false;
    };

    const queueUpdate = () => {
        if (ticking) {
            return;
        }

        ticking = true;
        window.requestAnimationFrame(updateNavbarState);
    };

    updateNavbarState();
    window.addEventListener('scroll', queueUpdate, { passive: true });
}

function initSectionTracking() {
    if (!sections.length) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        setActiveNav(sections[0].id);
        return;
    }

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveNav(entry.target.id);
                }
            });
        },
        {
            rootMargin: '-45% 0px -45% 0px',
            threshold: 0
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach((error) => {
        error.textContent = '';
    });
}

function validateForm() {
    let isValid = true;

    clearErrors();

    const name = document.getElementById('name').value.trim();
    if (name === '') {
        document.getElementById('nameError').textContent = 'Imię i nazwisko jest wymagane';
        isValid = false;
    } else if (name.length < 3) {
        document.getElementById('nameError').textContent = 'Imię i nazwisko musi mieć minimum 3 znaki';
        isValid = false;
    }

    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email jest wymagany';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Podaj prawidłowy adres email';
        isValid = false;
    }

    const phone = document.getElementById('phone').value.trim();
    if (phone !== '') {
        const phoneRegex = /^[\d\s+\-()]+$/;
        if (!phoneRegex.test(phone) || phone.length < 9) {
            document.getElementById('phoneError').textContent = 'Podaj prawidłowy numer telefonu';
            isValid = false;
        }
    }

    const message = document.getElementById('message').value.trim();
    if (message === '') {
        document.getElementById('messageError').textContent = 'Wiadomość jest wymagana';
        isValid = false;
    } else if (message.length < 10) {
        document.getElementById('messageError').textContent = 'Wiadomość musi mieć minimum 10 znaków';
        isValid = false;
    }

    const privacy = document.getElementById('privacy').checked;
    if (!privacy) {
        document.getElementById('privacyError').textContent = 'Musisz zaakceptować politykę prywatności';
        isValid = false;
    }

    return isValid;
}

function isEmailJsConfigured() {
    return ![
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        EMAILJS_PUBLIC_KEY
    ].some((value) => value.startsWith('YOUR_'));
}

function loadEmailJs() {
    if (window.emailjs) {
        return Promise.resolve(window.emailjs);
    }

    if (emailJsLoaderPromise) {
        return emailJsLoaderPromise;
    }

    emailJsLoaderPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.async = true;
        script.onload = () => {
            if (window.emailjs) {
                resolve(window.emailjs);
                return;
            }

            reject(new Error('EmailJS library not available'));
        };
        script.onerror = () => reject(new Error('EmailJS library failed to load'));
        document.head.appendChild(script);
    });

    return emailJsLoaderPromise;
}

function showFormMessage(type, text) {
    if (!formMessage) {
        return;
    }

    formMessage.className = `form-message ${type}`;
    formMessage.textContent = text;
    formMessage.style.display = 'block';
}

function setSubmitLoading(isLoading) {
    if (!contactForm) {
        return;
    }

    const submitButton = contactForm.querySelector('.btn-submit');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');

    btnText.style.display = isLoading ? 'none' : 'inline-block';
    btnLoading.style.display = isLoading ? 'inline-block' : 'none';
    submitButton.disabled = isLoading;
}

function initContactForm() {
    if (!contactForm) {
        return;
    }

    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach((input) => {
        input.addEventListener('blur', validateForm);
    });

    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        formMessage.className = 'form-message';
        formMessage.style.display = 'none';
        setSubmitLoading(true);

        try {
            if (!isEmailJsConfigured()) {
                await new Promise((resolve) => window.setTimeout(resolve, 400));
                showFormMessage('success', '✓ Wiadomość została wysłana pomyślnie! (Demo mode - skonfiguruj EmailJS aby wysyłać prawdziwe wiadomości)');
                contactForm.reset();
                clearErrors();
                return;
            }

            const emailjs = await loadEmailJs();
            if (!emailJsInitialized) {
                emailjs.init(EMAILJS_PUBLIC_KEY);
                emailJsInitialized = true;
            }

            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                message: formData.message,
                to_email: 'biuro@stortechinvest.com'
            });

            showFormMessage('success', '✓ Wiadomość została wysłana pomyślnie! Odpowiemy najszybciej jak to możliwe.');
            contactForm.reset();
            clearErrors();
        } catch (error) {
            console.error('Error sending email:', error);
            showFormMessage('error', '✗ Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się z nami telefonicznie.');
        } finally {
            setSubmitLoading(false);
        }
    });
}

function initRevealAnimations() {
    const animatedElements = document.querySelectorAll(
        '.service-card, .client-card, .feature-item, .testimonial-card, .contact-info, .contact-form-wrapper'
    );

    if (!animatedElements.length) {
        return;
    }

    animatedElements.forEach((element) => {
        element.classList.add('reveal-on-scroll');
    });

    if (prefersReducedMotion.matches || !('IntersectionObserver' in window)) {
        animatedElements.forEach((element) => {
            element.classList.add('is-visible');
        });
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    animatedElements.forEach((element) => {
        revealObserver.observe(element);
    });
}

function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
        return;
    }

    window.setTimeout(() => {
        document.getElementById('cookieConsent')?.classList.add('show');
    }, 1000);
}

function saveCookieConsent(necessary, analytics, functional, marketing) {
    const consent = {
        necessary,
        analytics,
        functional,
        marketing,
        timestamp: new Date().toISOString()
    };

    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    document.getElementById('cookieConsent')?.classList.remove('show');
}

function initCookieConsent() {
    const customizeButton = document.getElementById('customizeConsent');
    const options = document.getElementById('cookieOptions');
    const saveButtonRow = document.getElementById('saveCustom');
    const mainButtons = document.querySelector('#cookieConsent .cookie-buttons');

    document.getElementById('acceptAll')?.addEventListener('click', () => {
        saveCookieConsent(true, true, true, true);
    });

    document.getElementById('rejectOptional')?.addEventListener('click', () => {
        saveCookieConsent(true, false, false, false);
    });

    customizeButton?.addEventListener('click', () => {
        const isHidden = options?.style.display === 'none' || options?.style.display === '';

        if (options) {
            options.style.display = isHidden ? 'flex' : 'none';
        }

        if (saveButtonRow) {
            saveButtonRow.style.display = isHidden ? 'flex' : 'none';
        }

        if (mainButtons) {
            mainButtons.style.display = isHidden ? 'none' : 'flex';
        }
    });

    document.getElementById('saveCustomConsent')?.addEventListener('click', () => {
        const analytics = document.getElementById('cookieAnalytics').checked;
        const functional = document.getElementById('cookieFunctional').checked;
        const marketing = document.getElementById('cookieMarketing').checked;

        saveCookieConsent(true, analytics, functional, marketing);
    });

    checkCookieConsent();
}

function init() {
    initMobileMenu();
    initNavbarState();
    initSectionTracking();
    initContactForm();
    initRevealAnimations();
    initCookieConsent();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
    init();
}
