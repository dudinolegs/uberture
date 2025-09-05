import { checkHeaderFixed, smoothScrollToAnchor, initDropdown, Tabs, ToggleElements, setHeaderHeightVariable, initFilter, initLightbox, initQuantity, initTooltip, initCookieNotification, initMenu } from './utils';

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

new Tabs('job', 'button_main-stroke', 'button_pale-stroke');
new Tabs('photo', 'button_main-stroke', 'button_pale-stroke');
new Tabs('decors', 'button_main-stroke', 'button_pale-stroke');
new Tabs('product-detail', 'product-tab__button_active');
new Tabs('sku', 'sku-tab__button_active');

new ToggleElements('photo', 'photo-card_hidden');
new ToggleElements('advantages', 'card_hidden');
new ToggleElements('model', 'model_hidden');
new ToggleElements('employee', 'employee-card_hidden');
new ToggleElements('history', 'history-item_hidden');