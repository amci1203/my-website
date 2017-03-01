import $         from 'jquery';
import waypoints from '../../../node_modules/waypoints/lib/noframework.waypoints';

import Menu               from './modules/Menu';
import Modal              from './modules/Modal';
import Accordion          from './modules/Accordion';
import ScrollSpy          from './modules/ScrollSpy';
import ScrollReveal       from './modules/RevealOnScroll';
import StickyHeader       from './modules/StickyHeader';
import FullScreenSection  from './modules/FullScreenSection';
import SocialMediaButtons from './modules/SocialMediaButtons';

const id = document.body.id;

function init () {
    Menu();

    if (id == '_index')  {
        StickyHeader();
        ScrollSpy();
        SocialMediaButtons();
        Accordion('.accordion', false);
    }
    else if (id == '_resume') {
        FullScreenSection('.resume');
        Accordion('.accordion');
    }
}

$(document).ready(init)
