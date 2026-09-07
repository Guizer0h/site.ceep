window.addEventListener("scroll", function () {
    const header = document.getElementById("main-header");
    if (window.scrollY > 400) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

const logo = document.querySelector('.logo-animada');

window.addEventListener('scroll', () => {
    const posicaoLogo = logo.getBoundingClientRect().top;
    const alturaTela = window.innerHeight;

    if (posicaoLogo < alturaTela - 100) {
        logo.classList.add('visivel');
    }

});

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.addEventListener("click", (e) => {

    const clicouNoMenu = navMenu.contains(e.target);
    const clicouNoHamburger = hamburger.contains(e.target);

    if (!clicouNoMenu && !clicouNoHamburger) {
        navMenu.classList.remove("active");
    }

});

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

const gruposDeCards = document.querySelectorAll(".cards");
const botoesMostrarMais = document.querySelectorAll(".toggle-cards-btn");
const QUANTIDADE_INICIAL = 4;

gruposDeCards.forEach((grupo, i) => {
    const botao = botoesMostrarMais[i];
    if (!botao) return;

    const cards = grupo.querySelectorAll(".card");

    cards.forEach((card, index) => {
        if (index >= QUANTIDADE_INICIAL) {
            card.classList.add("hidden-card");
        }
    });

    botao.addEventListener("click", () => {
        const jaExpandido = botao.getAttribute("aria-expanded") === "true";

        cards.forEach((card, index) => {
            if (index >= QUANTIDADE_INICIAL) {
                card.classList.toggle("hidden-card");
            }
        });

        botao.textContent = jaExpandido ? "Mostrar mais" : "Mostrar menos";
        botao.setAttribute("aria-expanded", String(!jaExpandido));
    });
});