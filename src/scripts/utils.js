import GLightbox from 'glightbox';
import tippy from 'tippy.js';

import 'glightbox/dist/css/glightbox.min.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
export function truncateMiddle(str, maxLength = 50) {
    if (str.length <= maxLength) return str;

    const keep = Math.floor((maxLength - 3) / 2);
    const start = str.slice(0, keep);
    const end = str.slice(str.length - keep);

    return `${start}…${end}`;
}

export function checkHeaderFixed() {
    const header = document.querySelector(".js-header-fixed");
    const height = window.innerHeight;
    header.classList.remove("header_fixed-active");

    window.addEventListener("scroll", () => {
        if (window.scrollY > height) {
            header.classList.add("header_fixed-active");
        } else {
            header.classList.remove("header_fixed-active");
        }
    });
}

export function smoothScrollToAnchor() {
    const header = document.querySelector(".js-header-fixed");
    const offset = header.offsetHeight + 30;

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const href = this.getAttribute('href').slice(1);
            if (!href) {
                return;
            }

            const target = document.getElementById(href);
            if (!target) {
                return;
            }

            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
}

export function initDropdown() {
    const dropdownItems = document.querySelectorAll(".js-dropdown");

    dropdownItems.forEach(dropdownItem => {
        const button = dropdownItem.querySelector(".js-dropdown-button");
        const body = dropdownItem.querySelector(".js-dropdown-body");

        // следим за изменением содержимого body
        const observer = new MutationObserver(() => {
            if (dropdownItem.classList.contains('dropdown__item_active')) {
                body.style.height = body.scrollHeight + 'px';
            }
        });

        observer.observe(body, {
            childList: true,
            subtree: true,
            characterData: true
        });

        button.addEventListener('click', () => {
            dropdownItem.classList.toggle('dropdown__item_active');

            if (dropdownItem.classList.contains('dropdown__item_active')) {
                body.style.height = body.scrollHeight + 'px';
            } else {
                body.style.height = '0px';
            }
        });

        // плавное закрытие/открытие (опционально)
        body.addEventListener('transitionend', () => {
            if (dropdownItem.classList.contains('dropdown__item_active')) {
                body.style.height = 'auto'; // фиксируем auto после анимации
            }
        });
    });
}

export function initFilter() {
    const filters = document.querySelectorAll(".js-filter");

    filters.forEach(filter => {
        const button = filter.querySelector(".js-filter-name");
        const container = filter.closest('.container');
        const containerRect = container.getBoundingClientRect();

        button.addEventListener('click', (e) => {
            e.stopPropagation();

            const dropdown = filter.querySelector(".js-filter-dropdown");
            const dropdownRect = dropdown.getBoundingClientRect();
            const dropdownOffsetLeft = dropdownRect.left - containerRect.left;
            const dropdownTotalWidth = dropdown.offsetWidth + dropdownOffsetLeft;

            if (container.offsetWidth < dropdownTotalWidth) {
                dropdown.style.left = (container.offsetWidth - dropdownTotalWidth) + "px";
            }

            filters.forEach(f => {
                if (f !== filter) {
                    f.classList.remove("filter-item_active");
                }
            });
            
            filter.classList.toggle('filter-item_active');
        });
    });
    
    document.addEventListener("click", (e) => {
        filters.forEach(filter => {
            if (!filter.contains(e.target)) {
                filter.classList.remove("filter-item_active");
            }
        });
    });
}

export function initLightbox() {
    const lightboxProductDetail = GLightbox({
        selector: '.js-gallery-product-detail a',
        touchNavigation: true,
        loop: true,
        zoomable: true,
    });
    lightboxProductDetail.init();
}

export function initTooltip() {
    const tooltips = document.querySelectorAll('[title]');

    tooltips.forEach(tooltip => {
        const title = tooltip.getAttribute('title');
        if (!title) {
            return;
        }

        tippy(tooltip, {
            theme: 'light',
            content: title,
        });
    });
}

export function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/;SameSite=Lax";
}

export function getCookie(name) {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
}

export function initCookieNotification() {
    const COOKIE_NAME = "cookie_consent";
    const COOKIE_DAYS = 365;
    const notification = document.querySelector('.js-cookie-notification');
    const button = notification.querySelector(".js-cookie-notification-button");

    if (!getCookie(COOKIE_NAME)) {
        notification.classList.add('cookie-notification_active');
    }

    button.addEventListener('click', () => {
        setCookie(COOKIE_NAME, "1", COOKIE_DAYS);
        notification.classList.remove('cookie-notification_active');
    });
}

export function initMenu() {
    const menu = document.querySelector('.js-menu');
    const overlay = document.querySelector('.js-menu-overlay');
    const openButtons = document.querySelectorAll('.js-menu-open');
    const closeButtons = document.querySelectorAll('.js-menu-close');

    openButtons.forEach(button => {
        button.addEventListener('click', function() {
            menu.classList.add('menu_open');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            menu.classList.remove('menu_open');
        });
    });

    overlay.addEventListener('click', function() {
        menu.classList.remove('menu_open');
    });
}

export function initQuantity() {
    const quantities = document.querySelectorAll(".js-quantity");

    quantities.forEach(quantity => {
        const input = quantity.querySelector(".js-quantity-input");
        let inputTimeout;
        let currentValue = +(input.value || 1);
        const min = +(input.min || 1);
        const max = input.max ? +input.max : Infinity;
        const ratio = +(input.dataset.ratio || 1);
        const minus = quantity.querySelector(".js-quantity-minus");
        const plus = quantity.querySelector(".js-quantity-plus");
        const setValue = (value) => {
            currentValue = +value;

            if (currentValue % ratio !== 0) {
                currentValue = Math.min(currentValue, max);
                currentValue = Math.floor(currentValue / ratio) * ratio;
            }

            if (currentValue > max) {
                currentValue = max;
            }

            if (currentValue < min) {
                currentValue = min;
            }

            input.value = currentValue;
        }

        if (currentValue < ratio) {
            setValue(ratio);
        }

        if (currentValue < min) {
            setValue(min);
        }

        if (max !== 0 && currentValue > max) {
            setValue(max);
        }

        minus.addEventListener('click', function() {
            setValue(currentValue - ratio);
        });

        plus.addEventListener('click', function() {
            setValue(currentValue + ratio);
        });

        input.addEventListener('input', (e) => {
            clearTimeout(inputTimeout);
            inputTimeout = setTimeout(() => {
                setValue(e.target.value);
            }, 300);
        });
    });
}

export class Tabs {
    constructor(group, activeClass, defaultClass = '') {
        this.group = group;
        this.activeClass = activeClass;
        this.defaultClass = defaultClass;
        this._init();
    }
  
    _init() {
        document.addEventListener('click', (e) => {
            const button = e.target.closest(`.js-tab-button[data-tab-group="${this.group}"]`);
            if (!button) {
                return;
            }
    
            const id = button.dataset.tabId;
    
            // Скрыть все панели этой группы
            document.querySelectorAll(`[data-tab-group="${this.group}"][data-tab-content]`).forEach((el) => {
                el.style.display = 'none';
            });

            // Показать нужную панель
            const content = document.querySelector(`[data-tab-group="${this.group}"][data-tab-content="${id}"]`);
            if (content) {
                content.style.display = 'block';
            }
    
            // Классы активных кнопок
            document.querySelectorAll(`.js-tab-button[data-tab-group="${this.group}"]`).forEach(el => {
                if (this.defaultClass) {
                    el.classList.add(this.defaultClass);
                }
                el.classList.remove(this.activeClass);
            });
            button.classList.add(this.activeClass);
            if (this.defaultClass) {
                button.classList.remove(this.defaultClass);
            }
        });
    }
}

export function matches(el, selector) {
    return el instanceof Element && el.matches(selector);
}

export function applyPhoneMask(input) {
    if (input.dataset.masked) {
        return;
    }
    
    Inputmask({ mask: '+7 (999) 999-99-99' }).mask(input);
    input.dataset.masked = 'true';
}

export function setHeaderHeightVariable() {
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
}

export class ToggleElements {
    constructor(group, hiddenClass) {
        this.group = group;
        this.hiddenClass = hiddenClass;
        this.buttonShow = document.querySelector(`.js-toggle-elements-show[data-toggle-elements="${this.group}"]`);
        this.buttonHide = document.querySelector(`.js-toggle-elements-hide[data-toggle-elements="${this.group}"]`);
        this.elements = document.querySelectorAll(`.js-toggle-elements-element[data-toggle-elements="${this.group}"]`);
        this._init();
    }

    _show() {
        this.elements.forEach(el => el.classList.remove(this.hiddenClass));

        this.buttonShow.style.display = 'none';
        this.buttonHide.style.display = 'flex';
    }

    _hide() {
        this.elements.forEach(el => el.classList.add(this.hiddenClass));

        this.buttonShow.style.display = 'flex';
        this.buttonHide.style.display = 'none';
    }

    _init() {
        if (!this.elements.length) {
            return false;
        }

        if (window.innerWidth < 768) {
            this._hide();
        }

        document.addEventListener('click', (e) => {
            const buttonShow = e.target.closest(`.js-toggle-elements-show[data-toggle-elements="${this.group}"]`);
            if (buttonShow) {
                this._show();
            }

            const buttonHide = e.target.closest(`.js-toggle-elements-hide[data-toggle-elements="${this.group}"]`);
            if (buttonHide) {
                this._hide();
            }
        });
    }
}