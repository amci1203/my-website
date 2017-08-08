import $ from 'jquery';
import _ from '../vendor/lodash.min';

export default function StickyHeader () {
    const
        nav                  = document.getElementById('primary-nav'),
        trigger              = nav,
        interval             = 200,
        requiredConsecutives = 3,
        smButtons            = $('#social-media-buttons');
    let
        prevScroll           = 0,
        consecutives         = 2,
        prevDirection        = 'down';
    
    function handleScroll (event) {
        const scroll    = $(window).scrollTop(),
              direction =  scroll > prevScroll ? 'down' : 'up';
        if (direction == prevDirection) {
            consecutives++;
        } else consecutives = 0;
        if (consecutives == requiredConsecutives || (direction == 'up' && scroll < 50)) {
            if (direction === 'up') {
                nav.classList.add('visible');
            } else {
                nav.classList.remove('visible');
                smButtons.removeClass('visible');
            }
        } else prevDirection = direction;

        prevScroll = scroll;
    }
    
    function init () {
        document.body.classList.add('sticky-top');
        nav.classList.add('primary-nav--fixed', 'visible');
    }

    return (function () {
        init();
        $(window).scroll(_.throttle(handleScroll, interval))
    })()
}
