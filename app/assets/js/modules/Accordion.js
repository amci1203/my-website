import $ from 'jquery';

export default class AccordionPanel {
    constructor (accordionName, initialPanel) {
        this.element = $(accordionName);
        this.triggers = $(accordionName + ' .accordion-panel__heading')
        this.setDefaultState(accordionName, initialPanel);
        this.events()
    }

    events () {
        this.triggers.click(this.toggleAccordion.bind(event))
    }

    setDefaultState (panel, bool) {
        if (bool) {
            $(panel + ' .accordion-panel__content').addClass('accordion-panel__content--open');
            $(panel + ' .accordion-panel__caret').addClass('accordion-panel__caret--open');
        }
    }

    toggleAccordion (event) {
        event.currentTarget.previousElementSibling.classList.toggle('accordion-panel__caret--open');
        event.currentTarget.nextElementSibling.classList.toggle('accordion-panel__content--open');
    }
}
