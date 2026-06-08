/* =========================================================
   AGROVIVA • SCRIPT PRINCIPAL
   Interações modernas + animações suaves
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ===========================
       1. MENU MOBILE
    ============================ */
    const mobileBtn = document.querySelector('.btn-mobile');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const navbar = document.querySelector('.navbar');

    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        const icon = mobileBtn.querySelector('i');
        icon.setAttribute('data-lucide', navMenu.classList.contains('active') ? 'x' : 'menu');
        lucide.createIcons();
    };

    if (mobileBtn) mobileBtn.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        mobileBtn.querySelector('i').setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }));


    /* ===========================
       2. NAVBAR SCROLL
    ============================ */
    const handleNavbarScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', handleNavbarScroll);


    /* ===========================
       3. ANIMAÇÃO AO ROLAR
    ============================ */
    const fadeUpElements = document.querySelectorAll('.fade-up');
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeUpElements.forEach(el => fadeObserver.observe(el));


    /* ===========================
       4. CONTADORES ANIMADOS
    ============================ */
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.dataset.target;
            let current = 0;
            const increment = Math.ceil(target / 100);
            const timer = setInterval(() => {
                current += increment;
                counter.innerText = current >= target ? target : current;
                if (current >= target) clearInterval(timer);
            }, 20);
        });
    };

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    animateCounters();
                    countersStarted = true;
                    observer.unobserve(statsSection);
                }
            });
        }, { threshold: 0.4 });
        statsObserver.observe(statsSection);
    }


    /* ===========================
       5. BOTÃO VOLTAR AO TOPO
    ============================ */
    const backTop = document.querySelector('.back-top');

    const handleBackTop = () => {
        if (!backTop) return;
        const show = window.scrollY > 500;
        backTop.style.opacity = show ? '1' : '0';
        backTop.style.visibility = show ? 'visible' : 'hidden';
        backTop.style.transform = show ? 'translateY(0)' : 'translateY(20px)';
    };
    window.addEventListener('scroll', handleBackTop);
    if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


    /* ===========================
       6. LINK ATIVO NO MENU
    ============================ */
    const sections = document.querySelectorAll('section');
    const handleActiveLink = () => {
        let current = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
        });
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
    };
    window.addEventListener('scroll', handleActiveLink);


    /* ===========================
       7. FORMULÁRIO & VALIDAÇÃO
    ============================ */
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');

    const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            let valid = true;
            const fields = form.querySelectorAll('input[required], textarea[required]');
            fields.forEach(field => {
                field.parentElement.classList.remove('error');
                if (!field.value.trim() || (field.type === 'email' && !validateEmail(field.value))) {
                    field.parentElement.classList.add('error');
                    valid = false;
                }
            });
            if (valid) {
                successMsg.style.display = 'block';
                form.reset();
                setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
            }
        });

        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', () => field.parentElement.classList.remove('error'));
        });
    }


    /* ===========================
       8. PARALLAX HERO
    ============================ */
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        if (hero) hero.style.backgroundPositionY = `${window.scrollY * 0.4}px`;
    });


    /* ===========================
       9. LUCIDE ICONS
    ============================ */
    lucide.createIcons();

});
