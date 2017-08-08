(function WikiViewer () {
   
    const
        get   = id => document.getElementById(id),
        click = (elm, fn) => elm.addEventListener('click', fn),
          
        form             = get('search-form'),
        search           = get('search'),
        submit           = get('submit'),
        resultsContainer = get('results'),
    
        callback = '&callback=JSON_CALLBACK',
        pageURL  = 'https://en.wikipedia.org/?curid=',
          
        api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    

    form.addEventListener('submit', event => {
        event.preventDefault()
        getSearchResults();
    })
    
    
    function getSearchResults () {
        const searchTitle = search.value;
        jsonp(`${api}${searchTitle}${callback}`)
        return false;
    }
    
    function jsonp (target) {
        const script = document.createElement('script');
        script.src = target;

        document.body.appendChild(script);
    }

    window.JSON_CALLBACK = function (data) {
        const query   = data.query,
              results = query ? query.pages : null,
              list    = document.createElement('ul');
        
        list.classList.add('search-results');
        resultsContainer.innerHTML = '';
        
        if (results) {
            for (let result in results) {
                makeResultCard(results[result]);
            }
            resultsContainer.innerHTML = `<p>Now Showing Top Results For Search Query '${search.value}'.</p>`;
            resultsContainer.appendChild(list);
        }
        else {
            resultsContainer.innerHTML = `<p>Sorry, No Articles Were Found For The Query '${search.value}'. Please Try Another Query.</p>`;
        }
        
        function makeResultCard (page) {
            const item = document.createElement('li');
            item.innerHTML = (`
                <a class='result' target='_blank' href='${pageURL}${page.pageid}'>
                    <h1>${page.title}</h1>
                    <p>${page.extract}</p>    
                </a>
            `);
            list.appendChild(item);
        }
    }
    
})()