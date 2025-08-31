import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiperHero = new Swiper('.js-swiper-hero', {
    modules: [Navigation, Pagination, Autoplay],
    loop: false,
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

document.querySelectorAll('.js-swiper-hero-change-slide').forEach(button => {
    button.addEventListener('click', function() {
        const index = +button.dataset.slide;
        swiperHero.slideTo(index);
    });
});

document.querySelectorAll('.js-swiper-gallery').forEach(gallery => {
    new Swiper(gallery, {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        navigation: {
            nextEl: gallery.querySelector('.js-swiper-gallery-button-next'),
            prevEl: gallery.querySelector('.js-swiper-gallery-button-prev'),
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: gallery.querySelector('.js-swiper-gallery-pagination'),
            clickable: true,
            bulletClass: 'slider-pagination__item',
            bulletActiveClass: 'slider-pagination__item_active',
            renderBullet: (index, className) => {
                const number = String(index + 1).padStart(2, '0');

                return `<span class="${className}" data-index="${index}" data-number="${number}"></span>`;
            }
        },
        slidesPerView: 1,
        spaceBetween: 20,
    });
});

const swiperProductThumbs = new Swiper('.js-swiper-product-thumb', {
    direction: 'vertical',
    slidesPerView: 4,
    spaceBetween: 10,
    watchSlidesProgress: true,
});

new Swiper('.js-swiper-product-detail', {
    modules: [Navigation, Thumbs],
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    thumbs: {
        swiper: swiperProductThumbs,
    },
});

new Swiper('.js-swiper-review', {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    navigation: {
        nextEl: '.js-swiper-review-button-next',
        prevEl: '.js-swiper-review-button-prev'
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    slidesPerView: 4,
    spaceBetween: 20,
});

document.querySelectorAll('.js-swiper-product-card').forEach(gallery => {
    new Swiper(gallery, {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        navigation: {
            nextEl: '.js-swiper-product-card-button-next',
            prevEl: '.js-swiper-product-card-button-prev'
        },
        pagination: {
            el: gallery.querySelector('.js-swiper-product-card-pagination'),
            clickable: true,
            bulletClass: 'slider-pagination__item',
            bulletActiveClass: 'slider-pagination__item_active',
            renderBullet: (index, className) => {
                const number = String(index + 1).padStart(2, '0');

                return `<span class="${className}" data-index="${index}" data-number="${number}"></span>`;
            }
        },
        slidesPerView: 1,
        spaceBetween: 10,
    });
});