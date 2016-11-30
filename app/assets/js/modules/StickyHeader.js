import $ from 'jquery';
export default class StickyHeader {
    constructor (triggerSelector) {
        this.header = $('.header');
        this.triggerElement = $(triggerSelector);
        this.setHeaderWaypoint();
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
