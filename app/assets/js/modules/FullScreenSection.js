import $ from 'jquery';

export default class FullScreenSection {
    constructor(selector) {
        this.section = $(selector);
        this.fixHeight();
        this.events();
    }
    
    events() {
        $(window).resize(this.fixHeight.bind(this))
    }
    
    fixHeight () {
        this.section.css('height', window.innerHeight);
    }
}