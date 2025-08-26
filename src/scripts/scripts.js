import { checkHeaderFixed, smoothScrollToAnchor, initDropdown, Tabs, setHeaderHeightVariable } from './utils';

checkHeaderFixed();
smoothScrollToAnchor();
initDropdown();
setHeaderHeightVariable();

new Tabs('job', 'button_main-stroke', 'button_pale-stroke');
new Tabs('photo', 'button_main-stroke', 'button_pale-stroke');