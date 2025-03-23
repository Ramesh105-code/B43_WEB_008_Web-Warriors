const menuButton = document.getElementById("menu");
const closeButton = document.getElementById("close-menu");
const mobileMenu = document.getElementById("mobile-menu");
const body = document.body;

let isMenuOpen = false;

const showMenu = () => {
    mobileMenu.classList.remove("hidden", "bg-red-500");
    mobileMenu.classList.add("flex");
    body.classList.add("overflow-hidden");
    isMenuOpen = true;
};

const hideMenu = () => {
    mobileMenu.classList.add("hidden");
    mobileMenu.classList.remove("flex", "bg-red-500");
    body.classList.remove("overflow-hidden");
    isMenuOpen = false;
};

menuButton.addEventListener("click", () => {
    if (!isMenuOpen) {
        showMenu();
    }
});

closeButton.addEventListener("click", () => {
    hideMenu();
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 1280 && isMenuOpen) {
        hideMenu();
    }
});
