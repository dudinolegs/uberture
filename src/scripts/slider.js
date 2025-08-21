import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.js-swiper', {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,
    navigation: {
        nextEl: '.js-swiper-button-next',
        prevEl: '.js-swiper-button-prev'
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },
    pagination: {
        el: '.js-swiper-pagination',
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