const

    makeProjectThumbnails = projects => {
        const
            section = document.createDocumentFragment(),
    	    thumbs  = projects.map(makeThumbnail);

        appendTo(section, ...thumbs);
        appendTo(document.getElementById('projects'), section)

    },

    makeThumbnail = ({
        name = 'Looking for a name...',
        thumbnail = false,
        description
    }) => {

        const format = str => str
            .split('-')
            .map(w => w.slice(0,1).toUpperCase() + w.slice(1))
            .join(' ')
        ;

        return appendTo(createElement('article', 'thumbnail'),
            appendTo(createElement('a', 'thumbnail__image', null, { href: `/fcc/${name}` }),
                createElement(
                    'img',
                    'lazyload',
                    null,
                    { 'data-src': thumbnail }
                )
            ),
            createElement(
                'h1',
                'thumbnail__title',
                format(name)
            ),
            createElement(
                'p', 
                description ? 'thumbnail__description' : 'thumbnail__description none',
                description || '(No Description)'
            )
        );
    },

    createElement = (tag, classes = null, innerHTML = null, attrs = {}) => {

        const el = document.createElement(tag);

        Object.keys(attrs)
            .forEach(key => {
                if (tag == 'img' && key == 'data-src') {
                    !attrs[key] && el.setAttribute(key, '/img/fcc-logo-gray.png');
                }
                attrs[key] && el.setAttribute(key, attrs[key]);
            })
        ;

        if (classes) {
            if (Array.isArray(classes)) {
                el.classList.add(...classes);
            }
            if (classes.indexOf(' ') > -1) {
                el.classList.add(...classes.split(' '));
            }
            else el.classList.add(classes);
        }
        
        innerHTML && Object.assign(el, { innerHTML });

        return el;
    },

    appendTo = (container, ...elements) => {
        elements.forEach(el => container.appendChild(el));
        return container;
    };

export default makeProjectThumbnails;