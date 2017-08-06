import $ from 'jquery';

export default function FullScreenSection (selector) {
    const section = $(selector.trim());

    function fixHeight () {
        section.css('min-height', window.innerHeight);
    }
    return (function () {
        fixHeight();
        $(window).resize(fixHeight);
    })()
}
