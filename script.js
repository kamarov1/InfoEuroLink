// Espera o DOM carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', function() {
    // Função para copiar o endereço do contrato
    function copyToClipboard() {
        const contractCode = document.getElementById('contract-code');
        const textArea = document.createElement('textarea');
        textArea.value = contractCode.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Endereço do contrato copiado para a área de transferência!');
    }

    // Adiciona o evento de clique ao botão de cópia
    const copyButton = document.querySelector('.copy-button');
    if (copyButton) {
        copyButton.addEventListener('click', copyToClipboard);
    }

    // Função para criar o gráfico de preço
    function createPriceChart() {
        const ctx = document.getElementById('priceChart').getContext('2d');
        const priceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Preço EURL/EUR',
                    data: [1, 1, 1, 1, 1, 1],
                    borderColor: 'rgb(0, 51, 153)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        suggestedMin: 0.98,
                        suggestedMax: 1.02
                    }
                }
            }
        });
    }

    // Cria o gráfico de preço
    createPriceChart();

    // Função para navegação suave
    function smoothScroll(target, duration) {
        const targetElement = document.querySelector(target);
        const targetPosition = targetElement.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Adiciona evento de clique para links de navegação suave
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target, 1000);
        });
    });

    // Validação do formulário de contato
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aqui você pode adicionar a lógica para enviar o formulário
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        });
    }

    // Função para atualizar o contador de tokens em circulação
    function updateTokenCounter() {
        const counter = document.getElementById('token-counter');
        if (counter) {
            // Aqui você pode adicionar a lógica para buscar o número real de tokens em circulação
            let count = 1000000000;
            counter.textContent = count.toLocaleString();
        }
    }

    // Atualiza o contador de tokens
    updateTokenCounter();

    // Animação de fade-in para elementos ao rolar a página
    function fadeInOnScroll() {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }

    // Adiciona o evento de scroll para a animação de fade-in
    window.addEventListener('scroll', fadeInOnScroll);
});
