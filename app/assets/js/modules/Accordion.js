import $ from 'jquery';

export default class AccordionPanel {
    constructor (accordionName, initiallyOpen, trigger) {
        this.element = $(accordionName);
        this.caret = $(accordionName + ' .accordion-panel__caret');
        this.body = $(accordionName + ' .accordion-panel__content');
        this.trigger = trigger ? $(trigger) : $(accordionName + ' .accordion-panel__heading');
        this.setDefaultState(initiallyOpen);
        this.events()
    }

    events () {
        this.trigger.click(this.toggleAccordionPanel.bind(this))
    }

    setDefaultState (isInitiallyOpen) {
        if (isInitiallyOpen) this.toggleAccordionPanel();
    }

    toggleAccordionPanel () {
        if (this.caret.length !== 0) this.caret.toggleClass('accordion-panel__caret--open');
        this.trigger.toggleClass('open');
        this.body.toggleClass('accordion-panel__content--open');
        let scrollTo = this.body.hasClass('accordion-panel__content--open') ? 
            this.body.offset().top - 50 : this.element.offset().top - 250
        setTimeout(() => {
            $(document).trigger('accordion');
        }, 500);
        $('html, body').animate({
            scrollTop: scrollTo
        }, 300);
    }
}
