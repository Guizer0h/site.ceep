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
const navOverlay = document.getElementById("nav-overlay");
const navClose = document.getElementById("nav-close");

function abrirMenu() {
    navMenu.classList.add("active");
    if (navOverlay) navOverlay.classList.add("active");
}

function fecharMenu() {
    navMenu.classList.remove("active");
    if (navOverlay) navOverlay.classList.remove("active");
}

hamburger.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
        fecharMenu();
    } else {
        abrirMenu();
    }
});

if (navClose) {
    navClose.addEventListener("click", fecharMenu);
}

if (navOverlay) {
    navOverlay.addEventListener("click", fecharMenu);
}

document.addEventListener("click", (e) => {

    const clicouNoMenu = navMenu.contains(e.target);
    const clicouNoHamburger = hamburger.contains(e.target);

    if (!clicouNoMenu && !clicouNoHamburger) {
        fecharMenu();
    }

});

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        fecharMenu();
    });
});

const gruposDeCards = document.querySelectorAll(".cards");
const botoesMostrarMais = document.querySelectorAll(".toggle-cards-btn");

// Telas com até essa largura (ex: notebooks) mostram 3 cards antes de "Mostrar mais".
// Telas maiores (monitores/desktop) mostram 4. Ajuste esse número se quiser mudar o ponto de corte.
const LARGURA_NOTEBOOK = 1440;

function getQuantidadeInicial() {
    return window.innerWidth <= LARGURA_NOTEBOOK ? 3 : 4;
}

function aplicarCardsVisiveis() {
    const quantidadeInicial = getQuantidadeInicial();

    gruposDeCards.forEach((grupo, i) => {
        const botao = botoesMostrarMais[i];
        if (!botao) return;

        // se o usuário já clicou em "Mostrar mais", não mexe nos cards dele
        const jaExpandido = botao.getAttribute("aria-expanded") === "true";
        if (jaExpandido) return;

        const cards = grupo.querySelectorAll(".card");
        cards.forEach((card, index) => {
            card.classList.toggle("hidden-card", index >= quantidadeInicial);
        });
    });
}

aplicarCardsVisiveis();

gruposDeCards.forEach((grupo, i) => {
    const botao = botoesMostrarMais[i];
    if (!botao) return;

    const cards = grupo.querySelectorAll(".card");

    botao.addEventListener("click", () => {
        const jaExpandido = botao.getAttribute("aria-expanded") === "true";
        const quantidadeInicial = getQuantidadeInicial();

        cards.forEach((card, index) => {
            if (index >= quantidadeInicial) {
                card.classList.toggle("hidden-card");
            }
        });

        botao.textContent = jaExpandido ? "Mostrar mais" : "Mostrar menos";
        botao.setAttribute("aria-expanded", String(!jaExpandido));
    });
});

let resizeTimeoutCards;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeoutCards);
    resizeTimeoutCards = setTimeout(aplicarCardsVisiveis, 200);
});

const VELOCIDADE_PX_POR_SEGUNDO = 40; // ajuste aqui pra deixar mais rápido ou mais lento

function inicializarCarrossel(track) {
    const setOriginal = track.querySelector(".carousel-set");
    if (!setOriginal) return;

    track.querySelectorAll(".carousel-set.clone").forEach((clone) => clone.remove());

    const larguraSet = setOriginal.getBoundingClientRect().width;
    if (larguraSet === 0) return;

    const larguraContainer = track.parentElement.getBoundingClientRect().width;
    const copiasNecessarias = Math.ceil((larguraContainer * 2) / larguraSet) + 1;

    for (let i = 0; i < copiasNecessarias; i++) {
        const clone = setOriginal.cloneNode(true);
        clone.classList.add("clone");
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
    }

    const duracao = larguraSet / VELOCIDADE_PX_POR_SEGUNDO;
    track.style.setProperty("--carousel-set-width", `${larguraSet}px`);
    track.style.setProperty("--carousel-duration", `${duracao}s`);
}

function inicializarTodosCarrosseis() {
    document.querySelectorAll(".carousel-track").forEach(inicializarCarrossel);
}

inicializarTodosCarrosseis();

let resizeTimeoutCarrossel;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeoutCarrossel);
    resizeTimeoutCarrossel = setTimeout(inicializarTodosCarrosseis, 200);
});