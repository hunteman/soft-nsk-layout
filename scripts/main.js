'use strict';

function setActiveLink() {
    const navItems = document.querySelectorAll('.header__nav-item');
    if(navItems) {
        navItems.forEach(navItem => {
            const path = navItem.getAttribute('href');
            path && path === window.location.pathname && navItem.classList.toggle('active');
        });
    }
}

function openMenu() {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.header__nav');

    burger && burger.addEventListener('click', function() {
        this.classList.toggle('_open_menu');
        menu.classList.toggle('_open_menu');
    })
}

window.addEventListener('DOMContentLoaded', () => {
    setActiveLink();
    openMenu();
})


