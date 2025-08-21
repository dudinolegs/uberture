import Inputmask from "inputmask";
import { truncateMiddle } from './utils';

document.querySelectorAll('.field').forEach(field => {
    const input = field.querySelector('input'); 

    if (input) {
        input.addEventListener('focus', () => {
            input.classList.add('field__input_filled');
        });

        input.addEventListener('blur', () => {
            if (!input.value.length && !field.matches(':hover')) {
                input.classList.remove('field__input_filled');
            }
        });

        input.addEventListener('input', () => {
            if (input.value.length) {
                input.classList.add('field__input_filled');
            } else if (document.activeElement !== input && !field.matches(':hover')) {
                input.classList.remove('field__input_filled');
            }
        });
    
        if (input.value.length) {
            input.classList.add('field__input_filled');
        }

        field.addEventListener('mouseenter', () => {
            input.classList.add('field__input_filled');
        });
    
        field.addEventListener('mouseleave', () => {
            const isActive = document.activeElement === input;
    
            if (!isActive && !input.value.length) {
                input.classList.remove('field__input_filled');
            }
        });
    }
});

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

document.querySelectorAll('.js-file').forEach(field => {
    const input = field.querySelector('.js-file-input');
    const label = field.querySelector('.js-file-label');

    input.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            label.classList.add('file__label_selected');
            label.textContent = truncateMiddle(file.name);
        }
    });
});

document.addEventListener('submit', function(e) {
    const form = e.target.closest('.js-form');
    if (form) {
        e.preventDefault();
    }
});