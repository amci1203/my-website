import waypoints from '../../../node_modules/waypoints/lib/noframework.waypoints';

import MobileMenu from './modules/MobileMenu';
import ScrollReveal from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';
import ScrollSpy from './modules/ScrollSpy';
import FullScreenSection from './modules/FullScreenSection';
import AccordionPanel from './modules/Accordion';

const landing = new FullScreenSection('#landing');
const menu = new MobileMenu();
const header = new StickyHeader('.header');
const links = new ScrollSpy();

const aboutMe = new AccordionPanel('#about-me-accordion-panel', false, '#about-me-accordion__trigger')
