document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initAccordion();
    initModal();
    initParallax();
    initTokenSimulation();
    initCountdown();
});

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

function initModal() {
    const modal = document.getElementById('infoModal');
    const btn = document.getElementById('infoBtn');
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = () => modal.style.display = 'block';
    span.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.parallax');
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

function initTokenSimulation() {
    const priceElement = document.getElementById('tokenPrice');
    let price = 1.0000; // Preço inicial

    setInterval(() => {
        const change = (Math.random() - 0.5) * 0.002; // Variação de -0.1% a +0.1%
        price += change;
        price = Math.max(0.9, Math.min(1.1, price)); // Mantém o preço entre 0.9 e 1.1
        priceElement.textContent = price.toFixed(4);
        priceElement.classList.toggle('up', change > 0);
        priceElement.classList.toggle('down', change < 0);
    }, 5000);
}

function initCountdown() {
    const countdownElement = document.getElementById('launchCountdown');
    const launchDate = new Date('2023-12-31T23:59:59').getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = launchDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = "Lançamento realizado!";
        }
    }, 1000);
}
