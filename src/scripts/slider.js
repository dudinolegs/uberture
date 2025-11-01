import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function setEqualHeight(container) {
    const slides = container.querySelectorAll('.swiper-slide');
    let maxHeight = 0;
  
    requestAnimationFrame(() => {
        slides.forEach(slide => {
            slide.style.height = 'auto';
            if (slide.offsetHeight > maxHeight) {
                maxHeight = slide.offsetHeight;
            }
        });
      
        slides.forEach(slide => {
            slide.style.height = maxHeight + 'px';
        });
    }, 500);
}

window.addEventListener('load', function() {
    const swiperHero = new Swiper('.js-swiper-hero', {
        modules: [Navigation, Pagination],
        loop: false,
        navigation: {
            nextEl: '.js-swiper-hero-button-next',
            prevEl: '.js-swiper-hero-button-prev'
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
        const buttonNext = gallery.querySelector('.js-swiper-gallery-button-next');
        const buttonPrev = gallery.querySelector('.js-swiper-gallery-button-prev');

        new Swiper(gallery, {
            modules: [Navigation, Pagination],
            loop: true,
            navigation: {
                nextEl: buttonNext,
                prevEl: buttonPrev
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
            autoHeight: true,
        });
    });

    const productThumbsEl = document.querySelector('.js-swiper-product-thumb');
    let swiperProductThumbs = null;

    if (productThumbsEl) {
        swiperProductThumbs = new Swiper(productThumbsEl, {
            direction: 'vertical',
            slidesPerView: 4,
            spaceBetween: 10,
            watchSlidesProgress: true,
        });
    }

    new Swiper('.js-swiper-product-detail', {
        modules: [Navigation, Thumbs],
        loop: true,
        slidesPerView: 1,
        spaceBetween: 10,
        ...(swiperProductThumbs ? { thumbs: { swiper: swiperProductThumbs } } : {}),
    });

    const productTab = document.querySelector('.js-swiper-product-tab');
    if (productTab) {
        const productTabParentWidth = productTab.closest('div').offsetWidth;
        productTab.style.width = productTabParentWidth + 'px';
        new Swiper(productTab, {
            modules: [Navigation],
            loop: false,
            slidesPerView: 'auto',
            spaceBetween: 0,
            freeMode: true,
            grabCursor: true,
            navigation: {
                nextEl: '.js-swiper-product-tab-button-next',
                prevEl: '.js-swiper-product-tab-button-prev',
            },
        });
    }

    const skuTab = document.querySelector('.js-swiper-sku-tab');
    if (skuTab) {
        const skuTabParentWidth = skuTab.closest('div').offsetWidth;
        skuTab.style.width = skuTabParentWidth + 'px';
        new Swiper(skuTab, {
            modules: [Navigation],
            loop: false,
            slidesPerView: 'auto',
            spaceBetween: 0,
            freeMode: true,
            grabCursor: true,
            navigation: {
                nextEl: '.js-swiper-sku-tab-button-next',
                prevEl: '.js-swiper-sku-tab-button-prev',
            },
        });
    }

    document.querySelectorAll('.js-swiper-review').forEach(reviews => {
        new Swiper(reviews, {
            modules: [Navigation, Pagination],
            loop: true,
            on: {
                init: setEqualHeight(reviews),
                resize: setEqualHeight(reviews),
            },
            navigation: {
                nextEl: '.js-swiper-review-button-next',
                prevEl: '.js-swiper-review-button-prev'
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                },
                1260: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                1480: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },
        });
    });

    document.querySelectorAll('.js-swiper-product-card').forEach(gallery => {
        const buttonNext = gallery.querySelector('.js-swiper-product-card-button-next');
        const buttonPrev = gallery.querySelector('.js-swiper-product-card-button-prev');

        new Swiper(gallery, {
            modules: [Navigation, Pagination],
            loop: true,
            navigation: {
                nextEl: buttonNext,
                prevEl: buttonPrev
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

    document.querySelectorAll('.js-swiper-cards').forEach(cards => {
        new Swiper(cards, {
            loop: false,
            on: {
                init() {
                    setEqualHeight(cards);
                },
                resize() {
                    setEqualHeight(cards);
                },
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 1.4,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                },
                1260: {
                    slidesPerView: 2.9,
                    spaceBetween: 20,
                },
                1480: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
            },
        });
    });

    document.querySelectorAll('.js-swiper-article').forEach(articles => {
        new Swiper(articles, {
            loop: false,
            on: {
                init: setEqualHeight(articles),
                resize: setEqualHeight(articles),
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.1,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 1.5,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1260: {
                    slidesPerView: 2.5,
                    spaceBetween: 20,
                },
                1480: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        });
    });
});