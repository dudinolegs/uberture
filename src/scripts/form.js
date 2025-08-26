import Inputmask from "inputmask";
import { truncateMiddle, matches, applyPhoneMask } from './utils';

document.addEventListener('focus', (e) => {
    if (matches(e.target, '.field input')) {
        e.target.classList.add('field__input_filled');
    }
}, true); // useCapture чтобы ловить focus

document.addEventListener('blur', (e) => {
    if (matches(e.target, '.field input')) {
        const field = e.target.closest('.field');
        if (!e.target.value.length && !field.matches(':hover')) {
            e.target.classList.remove('field__input_filled');
        }
    }
}, true);

document.addEventListener('input', (e) => {
    if (matches(e.target, '.field input')) {
        if (e.target.value.length) {
            e.target.classList.add('field__input_filled');
        } else if (document.activeElement !== e.target && !e.target.closest('.field').matches(':hover')) {
            e.target.classList.remove('field__input_filled');
        }
    }
});

document.addEventListener('mouseenter', (e) => {
    if (matches(e.target, '.field')) {
        const input = e.target.querySelector('input');
        if (input) input.classList.add('field__input_filled');
    }
}, true);

document.addEventListener('mouseleave', (e) => {
    if (matches(e.target, '.field')) {
        const input = e.target.querySelector('input');
        if (input && !input.value.length && document.activeElement !== input) {
            input.classList.remove('field__input_filled');
        }
    }
}, true);

document.querySelectorAll('input[type="tel"]').forEach(applyPhoneMask);
const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
        for (const node of m.addedNodes) {
            if (node.nodeType !== 1) {
                continue;
            }

            if (node.matches?.('input[type="tel"]')) {
                applyPhoneMask(node);
            }

            node.querySelectorAll?.('input[type="tel"]').forEach(applyPhoneMask);
        }
    }
});
observer.observe(document.body, { childList: true, subtree: true });

document.querySelectorAll('input[type="tel"]').forEach(input => {
    Inputmask({"mask": "+7 (999) 999-99-99"}).mask(input);
});

document.addEventListener('click', function(e) {
    // Клик по кнопке текущего выбора
    const current = e.target.closest('.js-select-current');
    if (current) {
        const select = current.closest('.js-select');
        const dropdown = select.querySelector('.js-select-dropdown');
        dropdown.classList.toggle('select__dropdown_active');
        return;
    }

    // Клик по опции
    const option = e.target.closest('.js-select-option');
    if (option) {
        const select = option.closest('.js-select');
        const current = select.querySelector('.js-select-current');
        const dropdown = select.querySelector('.js-select-dropdown');
        const options = select.querySelectorAll('.js-select-option');
        const input = select.querySelector('.js-select-input');

        current.classList.remove('select__current_required');
        current.textContent = truncateMiddle(option.textContent);
        input.value = option.dataset.value;

        options.forEach(o => o.classList.remove('select__option_active'));
        option.classList.add('select__option_active');

        setTimeout(() => dropdown.classList.remove('select__dropdown_active'), 50);

        input.dispatchEvent(new Event('change', {bubbles: true}));
        return;
    }

    // Клик вне select — закрываем все dropdown
    document.querySelectorAll('.js-select').forEach(select => {
        const dropdown = select.querySelector('.js-select-dropdown');
        if (!select.contains(e.target)) {
            dropdown.classList.remove('select__dropdown_active');
        }
    });
});

document.addEventListener('change', function(e) {
    if (matches(e.target, '.js-file-input')) {
        const file = e.target.files[0];
        const field = e.target.closest('.js-file');
        if (!field) {
            return;
        }

        const label = field.querySelector('.js-file-label');
        if (!label) {
            return;
        }

        if (file) {
            label.classList.add('file__label_selected');
            label.textContent = truncateMiddle(file.name, 35);
        } else {
            label.classList.remove('file__label_selected');
            label.textContent = '';
        }
    }
});

document.addEventListener('submit', function(e) {
    const form = e.target.closest('.js-form');
    if (form) {
        e.preventDefault();
    }
});