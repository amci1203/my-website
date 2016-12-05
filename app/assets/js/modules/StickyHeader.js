import $ from 'jquery';
export default class StickyHeader {
    constructor (triggerSelector) {
        this.header = $('.header');
        this.triggerElement = $(triggerSelector);
        this.setHeaderWaypoint();
        this.previousSrollPosition = 0;
    }
    
    events()  {
        $(window).scroll(this.handleScroll.bind(this))
    }
    
    handleScroll(event) {
        let direction = event.originalEvent.deltaY > 0 ? 'down' : 'up';
        if (direction === 'up') { this.header.addClass('visible') }
        else { this.header.removeClass('visible')  }
        this.previousSrollPosition = $(window).scrollTop
    }  
    
    setHeaderWaypoint() {
        let head = this;
        new Waypoint({
            element: head.triggerElement[0],
            handler: function () {
                head.header.toggleClass('header--dark');
            }
        })
    }
}
