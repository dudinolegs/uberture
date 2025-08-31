import { checkHeaderFixed, smoothScrollToAnchor, initDropdown, Tabs, setHeaderHeightVariable, initFilter, initLightbox, initQuantity } from './utils';

checkHeaderFixed();
smoothScrollToAnchor();
initDropdown();
initFilter();
setHeaderHeightVariable();
initLightbox();
initQuantity();

new Tabs('job', 'button_main-stroke', 'button_pale-stroke');
new Tabs('photo', 'button_main-stroke', 'button_pale-stroke');
new Tabs('decors', 'button_main-stroke', 'button_pale-stroke');