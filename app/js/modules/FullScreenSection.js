import $ from 'jquery';
import { debounce } from 'lodash'

export default function FullScreenSection (selector) {
    const section = $(selector);

    function fixHeight () {
        section.css('min-height', window.innerHeight);
    }
    return (function () {
        fixHeight();
        $(window).resize(fixHeight);
    })()
}
