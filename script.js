document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MENU MOBILE RESPONSIVO
       ========================================================================== */
    const btnMobile = document.querySelector('.btn-mobile');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuIcon = btnMobile.querySelector('i');

    function toggleMenu() {
        navMenu.classList.toggle('active');
        const isActive = navMenu.classList.contains('active');
        
        // Altera dinamicamente o ícone entre menu e fechar (X)
        if (isActive) {
            menuIcon.setAttribute('data-lucide', 'x');
        } else {
            menuIcon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons(); // Recarrega os ícones alterados
    }

    btnMobile.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em qualquer item de link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) toggleMenu();
        });
    });


    /* ==========================================================================
       2. ANIMAÇÃO DE APARECER ELEMENTOS AO ROLAR (Scroll Reveal)
       ========================================================================== */
    const observerOptions = {
        root: null,
        threshold: 0.15 // Dispara quando 15% do elemento está visível
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                
                // Se for o contêiner de estatísticas, inicia o contador
                if (entry.target.classList.contains('stat-item')) {
                    animateCounter(entry.target.querySelector('.stat-number'));
                }
                observer.unobserve(entry.target); // Deixa de observar após animar
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos que devem possuir animação de entrada
    const elementsToAnimate = document.querySelectorAll('.hidden-element');
    elementsToAnimate.forEach(el => scrollObserver.observe(el));


    /* ==========================================================================
       3. CONTADOR NUMÉRICO ANIMADO
       ========================================================================== */
    function animateCounter(counterElement) {
        const target = +counterElement.getAttribute('data-target');
        const duration = 2000; // Tempo total da animação em milissegundos
        const stepTime = Math.max(Math.floor(duration / target), 15);
        let current = 0;

        // Ajusta o passo para números maiores (ex: 1200) para manter os 2 segundos
        const increment = target > 100 ? Math.ceil(target / (duration / stepTime)) : 1;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counterElement.textContent = target;
                clearInterval(timer);
            } else {
                counterElement.textContent = current;
            }
        }, stepTime);
    }


    /* ==========================================================================
       4. BOTÃO VOLTAR AO TOPO & LINK ATIVO NO MENU
       ========================================================================== */
    const backToTopBtn = document.getElementById('backToTop');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Gerenciar o botão voltar ao topo
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }

        // Gerenciar link ativo no menu correspondente à seção visível
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Ajuste por causa do menu fixo
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    /* ==========================================================================
       5. VALIDAÇÃO SIMPLES DO FORMULÁRIO DE CONTATO
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o recarregamento padrão da página
        let isFormValid = true;

        // Campos do formulário
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            const formGroup = input.parentElement;
            
            // Validação simples de preenchimento
            if (!input.value.trim()) {
                formGroup.classList.add('error');
                isFormValid = false;
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                formGroup.classList.add('error');
                isFormValid = false;
            } else {
                formGroup.classList.remove('error');
            }
        });

        // Caso tudo esteja preenchido corretamente
        if (isFormValid) {
            successMsg.style.display = 'block';
            contactForm.reset(); // Limpa os campos

            // Remove a mensagem de sucesso após 5 segundos
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        }
    });

    // Remove a classe de erro enquanto o usuário digita
    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.parentElement.classList.remove('error');
            }
        });
    });

    // Função auxiliar para validar padrão de e-mail
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});