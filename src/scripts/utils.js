import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';

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

        button.addEventListener('click', () => {
            dropdownItem.classList.toggle('dropdown__item_active');

            if (body.style.height && body.style.height !== '0px') {
                body.style.height = '0px';
            } else {
                body.style.height = body.scrollHeight + 'px';
            }
        });
    });
}

export function initFilter() {
    const filters = document.querySelectorAll(".js-filter");

    filters.forEach(filter => {
        const button = filter.querySelector(".js-filter-name");

        button.addEventListener('click', (e) => {
            e.stopPropagation();

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
                el.classList.add(this.defaultClass);
                el.classList.remove(this.activeClass);
            });
            button.classList.add(this.activeClass);
            button.classList.remove(this.defaultClass);
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