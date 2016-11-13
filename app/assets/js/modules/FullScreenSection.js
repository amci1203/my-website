import $ from 'jquery';

export default class FullScreenSection {
    constructor(selector) {
        this.section = $(selector);
        this.fixHeight();
    }
    fixHeight () {
        this.section.css('height', window.innerHeight);
    }
}