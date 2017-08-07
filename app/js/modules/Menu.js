import $ from 'jquery';
import _ from '../vendor/lodash.min';

import waypoints from '../../../node_modules/waypoints/lib/noframework.waypoints';

export default function Menu () {
    const
        icon      = $('.menu-toggle'),
        buttons   = $('.mobile-buttons'),
        content   = $('.primary-nav'),
        interval  = 80,
        required  = 2,
        links     = content.find('a'),
        smButtons = $('#social-media-buttons');
    let
        prevScroll    = 0,
        consecutives  = 0,
        prevDirection = 'down';

    function toggleMenu () {
        $('html').toggleClass('scroll-lock');
        icon.toggleClass('menu-toggle--close');
        content.toggleClass('primary-nav--open');
    }

    function closeMenu () {
        const targetClass = 'primary-nav--open',
              isAnchor    = content.attr('href').charAt('0') == '#';
        if (content.hasClass(targetClass) && isAnchor) toggleMenu();
    }

    function handleScroll (event) {
        const scroll    = $(window).scrollTop(),
              direction =  scroll > prevScroll ? 'down' : 'up';
        if (direction == prevDirection) {
            consecutives++;
        } else consecutives = 0;
        if (consecutives == required) {
            if (direction === 'up') {
                buttons.addClass('visible');
            } else {
                buttons.removeClass('visible');
                smButtons.removeClass('visible');
            }
        } else prevDirection = direction;

        prevScroll = scroll;
    }

    return (function () {
        icon.click(toggleMenu);
        links.click(closeMenu);

        $(window).scroll(_.throttle(handleScroll, interval));
    })()
}
