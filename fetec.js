window.addEventListener("scroll", function () {
    const header = document.getElementById("main-header");
    if (window.scrollY > 50) {
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
    hamburger.classList.add("escondido");
}

function fecharMenu() {
    navMenu.classList.remove("active");
    if (navOverlay) navOverlay.classList.remove("active");
    hamburger.classList.remove("escondido");
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