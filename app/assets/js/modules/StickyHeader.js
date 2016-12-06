import $ from 'jquery';
export default class StickyHeader {
    constructor (triggerSelector) {
        this.header = $('.header');
        this.triggerElement = $(triggerSelector);
        this.setHeaderWaypoint();
        this.previousSrollPosition = 0;
        this.events();
    }
    
    events()  {
        $(window).scroll(this.handleScroll.bind(this))
    }
    
    handleScroll(event) {
        let prev = this.previousSrollPosition,
            now = $(window).scrollTop(),
            direction =  now > prev && now > 150 ? 'down' : 'up';
        if (direction === 'up') { this.header.addClass('visible') }
        else { this.header.removeClass('visible')  }
        this.previousSrollPosition = $(window).scrollTop()
        console.log(direction);
        console.log(this.previousScrollPosition);
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
