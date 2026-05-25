/* =========================================================
   AGROVIVA • SCRIPT PRINCIPAL
   Interações modernas + animações suaves
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       1. MENU MOBILE
    ===================================================== */

    const mobileBtn = document.querySelector('.btn-mobile');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    if (mobileBtn) {

        mobileBtn.addEventListener('click', () => {

            navMenu.classList.toggle('active');

            document.body.classList.toggle('menu-open');

            const icon = mobileBtn.querySelector('i');

            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }

            lucide.createIcons();
        });
    }

    /* FECHAR MENU AO CLICAR */

    navLinks.forEach(link => {

        link.addEventListener('click', () => {

            navMenu.classList.remove('active');

            document.body.classList.remove('menu-open');

            const icon = mobileBtn.querySelector('i');

            icon.setAttribute('data-lucide', 'menu');

            lucide.createIcons();
        });
    });

    /* =====================================================
       2. NAVBAR SCROLL
    ===================================================== */

    window.addEventListener('scroll', () => {

        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =====================================================
       3. ANIMAÇÃO AO ROLAR
    ===================================================== */

    const revealElements =
        document.querySelectorAll('.fade-up');

    const revealObserver =
        new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('show');

                    revealObserver.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.15
        });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* =====================================================
       4. CONTADORES ANIMADOS
    ===================================================== */

    const counters =
        document.querySelectorAll('.stat-number');

    let counterStarted = false;

    function animateCounters() {

        counters.forEach(counter => {

            const target =
                +counter.dataset.target;

            let current = 0;

            const increment =
                Math.ceil(target / 100);

            const timer = setInterval(() => {

                current += increment;

                if (current >= target) {

                    counter.innerText = target;

                    clearInterval(timer);

                } else {

                    counter.innerText = current;
                }

            }, 20);
        });
    }

    const statsSection =
        document.querySelector('.stats');

    if (statsSection) {

        const statsObserver =
            new IntersectionObserver((entries) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting &&
                        !counterStarted
                    ) {

                        animateCounters();

                        counterStarted = true;
                    }
                });

            }, {
                threshold: 0.4
            });

        statsObserver.observe(statsSection);
    }

    /* =====================================================
       5. BOTÃO VOLTAR AO TOPO
    ===================================================== */

    const backTop =
        document.querySelector('.back-top');

    window.addEventListener('scroll', () => {

        if (window.scrollY > 500) {

            backTop.style.opacity = '1';
            backTop.style.visibility = 'visible';
            backTop.style.transform = 'translateY(0)';

        } else {

            backTop.style.opacity = '0';
            backTop.style.visibility = 'hidden';
            backTop.style.transform =
                'translateY(20px)';
        }
    });

    if (backTop) {

        backTop.addEventListener('click', () => {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* =====================================================
       6. LINK ATIVO NO MENU
    ===================================================== */

    const sections =
        document.querySelectorAll('section');

    window.addEventListener('scroll', () => {

        let current = '';

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {

                current =
                    section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {

            link.classList.remove('active');

            if (
                link.getAttribute('href')
                === `#${current}`
            ) {

                link.classList.add('active');
            }
        });
    });

    /* =====================================================
       7. FORMULÁRIO
    ===================================================== */

    const form =
        document.getElementById('contactForm');

    const successMessage =
        document.getElementById('formSuccess');

    if (form) {

        form.addEventListener('submit', (e) => {

            e.preventDefault();

            let valid = true;

            const fields =
                form.querySelectorAll(
                    'input[required], textarea[required]'
                );

            fields.forEach(field => {

                const parent =
                    field.parentElement;

                parent.classList.remove('error');

                if (!field.value.trim()) {

                    parent.classList.add('error');

                    valid = false;
                }

                if (
                    field.type === 'email' &&
                    !validateEmail(field.value)
                ) {

                    parent.classList.add('error');

                    valid = false;
                }
            });

            if (valid) {

                successMessage.style.display =
                    'block';

                form.reset();

                setTimeout(() => {

                    successMessage.style.display =
                        'none';

                }, 5000);
            }
        });

        /* REMOVER ERRO AO DIGITAR */

        form.querySelectorAll(
            'input, textarea'
        ).forEach(field => {

            field.addEventListener('input', () => {

                if (field.value.trim()) {

                    field.parentElement
                        .classList.remove('error');
                }
            });
        });
    }

    /* =====================================================
       8. VALIDAÇÃO EMAIL
    ===================================================== */

    function validateEmail(email) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);
    }

    /* =====================================================
       9. PARALLAX SUAVE HERO
    ===================================================== */

    const hero =
        document.querySelector('.hero');

    window.addEventListener('scroll', () => {

        const scrollY = window.scrollY;

        if (hero) {

            hero.style.backgroundPositionY =
                `${scrollY * 0.4}px`;
        }
    });

    /* =====================================================
       10. INICIAR ÍCONES LUCIDE
    ===================================================== */

    lucide.createIcons();

});
