import { 
    checkHeaderFixed, smoothScrollToAnchor, 
    initDropdown, Tabs, ToggleElements, Spoiler, 
    setHeaderHeightVariable, initFilter, initLightbox, 
    initQuantity, initTooltip, initCookieNotification, 
    initMenu, initGoUp, initFixedButtonList
} from './utils';

import PdfViewer from './pdf';

window.addEventListener('load', function() {
    checkHeaderFixed();
    smoothScrollToAnchor();
    initDropdown();
    initFilter();
    setHeaderHeightVariable();
    initLightbox();
    initQuantity();
    initTooltip();
    initCookieNotification();
    initMenu();
    initGoUp();
    initFixedButtonList();

    const viewerRoot = document.querySelector(".js-pdf-viewer");
    if (viewerRoot) {
        new PdfViewer(viewerRoot);
    }

    new Tabs('job', 'button_main-stroke', 'button_pale-stroke');
    new Tabs('photo', 'button_main-stroke', 'button_pale-stroke');
    new Tabs('decors', 'button_main-stroke', 'button_pale-stroke');
    new Tabs('product-detail', 'product-tab__button_active');
    new Tabs('sku', 'sku-tab__button_active');

    new ToggleElements('photo', 'photo-card_hidden');
    new ToggleElements('advantages', 'card_hidden');
    new ToggleElements('model', 'model_hidden');
    new ToggleElements('interior', 'model_hidden');
    new ToggleElements('brandbook', 'model_hidden');
    new ToggleElements('employee', 'employee-card_hidden');
    new ToggleElements('history', 'history-item_hidden');

    if (window.innerWidth <= 768) {
        new Spoiler('.js-team-spoiler', { maxHeight: 160, moreText: 'Весь текст' });
    }
});