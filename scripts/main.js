'use strict';

function setActiveLink() {
    const navItems = document.querySelectorAll('.header__nav-item');
    if(navItems) {
        navItems.forEach(navItem => {
            const path = navItem.href;
            path && path === window.location.href && navItem.classList.toggle('active');
        });
    }
}

function openMenu() {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.header__nav');

    burger && burger.addEventListener('click', function() {
        this.classList.toggle('header__nav_open');
        menu.classList.toggle('header__nav_open');
    })
}

function dropdownListToggle() {
    const dropdown = document.querySelector('.dropdown-list');
    const dropdownSwitch = document.querySelector('.input-select__btn');
    const dropdownItems = dropdown.querySelectorAll('.dropdown-list__item');
    const dropdownInput = document.querySelector('.dropdown__input_hidden');

    dropdownSwitch.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('dropdown-list_visible');
        dropdownSwitch.classList.toggle('dropdown-list_visible');
    });

    document.addEventListener('click', (e) => {
        if(!e.target.closest('.input-select')) {
            dropdown.classList.remove('dropdown-list_visible');
            dropdownSwitch.classList.remove('dropdown-list_visible');
        }
    });

    dropdownItems.forEach(function(listItem) {
        listItem.addEventListener('click', function (e) {
          dropdownItems.forEach(function(el) {
            el.classList.remove('dropdown__list-item_active');
          })
          e.target.classList.add('dropdown-list__item_active');
          dropdownSwitch.children[0].innerText = this.innerText;
          dropdownInput.value = this.dataset.value;
          dropdown.classList.remove('dropdown-list_visible');
          dropdownSwitch.classList.remove('dropdown-list_visible');
        })
    })
}

function fileInputOnChange() {
    const fileInput = document.querySelector('.input-file input[type=file]');
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        this.parentElement.querySelector('.input-file__text').textContent = file.name;
    })
}

function rangeInputOnChange() {
    const rangeInput = document.querySelector('input[type=range]');
    const rangeInputValue = document.querySelector('.input-range__value');
    rangeInputValue.innerText = rangeInput.value + '%';

    rangeInput.addEventListener('input', function() {
        rangeInputValue.innerText = rangeInput.value + '%';
    })
}

function preventMenuTransition() {
    const menu = document.querySelector('.header__nav');
    menu.style.transition =  'none 0s ease 0s';
    setTimeout(() => menu.removeAttribute('style'), 500);
}

function formValidate() {
    const form = document.querySelector('.booking__form');
    const completeMessageWrapper = document.querySelector('.booking__form__complete-message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const requiredControls = [form["system-type"], form["e-mail"], form["name"]];


        requiredControls.forEach(formControl => {
            const controlPattern = formControl.getAttribute('pattern');
            const reg = new RegExp(controlPattern);
            !reg.test(formControl.value) ? formControl.classList.add('invalid') : formControl.classList.remove('invalid');
        });

        let formValid = !requiredControls.some(c => c.classList.contains('invalid'));

        if(formValid) {
            let formData = new FormData();
            
            form.classList.add('booking__form_complete');
            completeMessageWrapper.innerHTML = `<p>${form["name"].value} ваш заказ №${Date.now()} успешно оформлен. <br>Наш специалист свяжется с вами в ближайшее время.</p>`;
            completeMessageWrapper.classList.add('booking__form__complete-message_visible');
            document.querySelectorAll('.booking__form input').forEach((c) => {
                c.classList.remove('invalid');
                formData.append(c.name, c.value);
            });

            fetch("example.com", { body: formData, method: "post" }).then().catch(err => console.log(err));
        }
    })
}

window.addEventListener('DOMContentLoaded', () => {
    setActiveLink();
    openMenu();
    dropdownListToggle();
    fileInputOnChange();
    rangeInputOnChange();
    formValidate();
})

window.addEventListener("resize", () => {
    preventMenuTransition();
});


