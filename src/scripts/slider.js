import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

new Swiper('.js-swiper-hero', {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    navigation: {
        nextEl: '.js-swiper-hero-button-next',
        prevEl: '.js-swiper-hero-button-prev'
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: '.js-swiper-hero-pagination',
        clickable: true,
        bulletClass: 'slider-pagination__item',
        bulletActiveClass: 'slider-pagination__item_active',
        renderBullet: (index, className) => {
            const number = String(index + 1).padStart(2, '0');

            return `<span class="${className}" data-index="${index}" data-number="${number}"></span>`;
        }
    },
    slidesPerView: 1,
});

new Swiper('.js-swiper-gallery', {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    navigation: {
        nextEl: '.js-swiper-gallery-button-next',
        prevEl: '.js-swiper-gallery-button-prev'
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: '.js-swiper-gallery-pagination',
        clickable: true,
        bulletClass: 'slider-pagination__item',
        bulletActiveClass: 'slider-pagination__item_active',
        renderBullet: (index, className) => {
            const number = String(index + 1).padStart(2, '0');

            return `<span class="${className}" data-index="${index}" data-number="${number}"></span>`;
        }
    },
    slidesPerView: 1,
});