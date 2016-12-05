import $ from 'jquery';
import smoothScroll from 'jquery-smooth-scroll';

export default class ScrollSpy {
    constructor () {
        this.pageSections = $('.page-section');
        this.navLinks = $('.primary-nav a');
        this.links = $('.anchor-link');
        this.createSectionWaypoints();
        this.addSmoothScrolling();
        this.lazyImages = $('.lazyload');
        this.refreshWaypoints();
        this.events();
    }
    events () {
        $(document).on('accordion', this.refreshWaypoints.bind(this));
        this.lazyImages.load(() => Waypoint.refreshAll());
    }
    addSmoothScrolling () {
        this.links.smoothScroll();
        this.navLinks.smoothScroll();
    }
    refreshWaypoints () {
        Waypoint.refreshAll();
    }
    createSectionWaypoints () {
        let instance = this,
            navLinks = this.navLinks;
        // Hacky (if you ask me) fix to remove active class from first header link when page scrolls back to top
        new Waypoint ({
            element: this.pageSections[0],
            offset: '-150px',
            handler: function (direction) {
                if (direction === 'up') navLinks.removeClass('current-link');
            }
        })
        this.pageSections.each(function () {
            let currentPageSection = this,
                currentLink = this.getAttribute('data-link');
            
            new Waypoint({
                element: currentPageSection,
                offset: '18%',
                handler: function (direction) {
                    if (direction === 'down') {
                        navLinks.removeClass('current-link');
                        $(currentLink).addClass('current-link');
                    }
                }
            })
            new Waypoint({
                element: currentPageSection,
                offset: '-40%',
                handler: function (direction) {
                    if (direction === 'up') {
                        navLinks.removeClass('current-link');
                        $(currentLink).addClass('current-link');
                    }
                }
            })
        })
    }
}
