import { checkHeaderFixed, smoothScrollToAnchor, initDropdown, Tabs } from './utils';

checkHeaderFixed();
smoothScrollToAnchor();
initDropdown();

new Tabs('job', 'button_main-stroke', 'button_pale-stroke');
new Tabs('photo', 'button_main-stroke', 'button_pale-stroke');