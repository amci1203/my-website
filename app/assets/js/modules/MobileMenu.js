import $ from 'jquery';
class MobileMenu {
    constructor () {
        this.icon = $('.header__menu-icon');
        this.content = $('.header__menu-content');
        this.background = $('.header');
        this.navLinks = $('.primary-nav a');
        this.events();
    }
    events () {
        this.icon.click(this.toggleMenu.bind(this));
        this.navLinks.click(this.closeMenu.bind(this));
    }
    toggleMenu () {
        this.icon.toggleClass('header__menu-icon--close-x');
        this.content.toggleClass('header__menu-content--open');
        this.background.toggleClass('header--menu-open');
    }
    closeMenu () {
        this.icon.removeClass('header__menu-icon--close-x');
        this.content.removeClass('header__menu-content--open');
        this.background.removeClass('header--menu-open');
    }
}

export default MobileMenu;
