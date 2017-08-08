import React from 'react';
import ReactDOM from 'react-dom';

window.dump = dump;
!lStor('recipes') && dump();
Object.assign(String.prototype, {capitalizeWords, snake_case});

class RecipeList extends React.Component {

    constructor (props) {
        super(props);

        this.checkForUpdates = this.checkForUpdates.bind(this);
        this.openModal = this.openModal.bind(this);
        this.setActive = this.setActive.bind(this);

        this.state = {
            recipeNames: [],
            recipes: {},
            active: null
        }
    }

    componentWillMount () {
        const
            recipeNames = lStor('recipes'),
            recipes = {};

        recipeNames && recipeNames.forEach(r => recipes[r] = lStor(r));
        this.setState({recipeNames, recipes});
    }

    openModal (recipe, ingredients) {
        const mod = this.modal;
        mod.setState({recipe, ingredients, open: true});
        mod.name.value = recipe ? recipe.capitalizeWords() : '';
        mod.ingredients.value = ingredients ? ingredients.join(', ') : '';

    }

    setActive (active) {
        if (this.state.active == active) this.setState({active: null});
        else this.setState({active})
    }

    refreshList (recipeNames) {
        this.setState({recipeNames});
    }

    checkForUpdates () {
        this.componentWillMount();
    }

    render () {
        const recipes = this.state.recipeNames.map((name, i) =>
            <article
                className='recipe'
                key={name}
            >
                <div
                    className='recipe__trigger'
                    onClick={this.setActive.bind(this, name)}
                ></div>
                <h1 className='recipe__name'>{name.capitalizeWords()}</h1>
                <Recipe
                    recipe={name}
                    ingredients={this.state.recipes[name]}
                    active={this.state.active == name}
                    openModal={() => this.openModal(name, this.state.recipes[name])}
                    refresh={(recipes) => this.refreshList(recipes)}
                />
            </article>
        )

        return (

            <main>
                <h1 className='title'>Recipe List</h1>
                <section className='wrapper recipe-list'>{recipes || '(No Recipes)'}</section>
                <button
                    className='btn center wide'
                    onClick={() => this.openModal(null, null)}
                >New Recipe</button>
                <RecipeModal
                    hasSaved={this.checkForUpdates}
                    ref={mod => this.modal = mod}
                />
            </main>

        )
    }

}

class Recipe extends React.Component {

    constructor (props) {
        super(props);

        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
    }

    edit () {}

    remove () {

        const
            recipes = lStor('recipes'),
            thisRec = this.props.recipe,
            splice  = recipes.splice(recipes.indexOf(thisRec), 1);

        lStor(thisRec, '__delete');
        lStor('recipes', recipes);
        this.props.refresh(recipes)

        // this.forceUpdate();
    }

    render () {
        const
            ingredients = this.props.ingredients.map(i => <li key={i}>{i.capitalizeWords()}</li>),
            isActive = this.props.active ? 'active' : '',
            props = this.props;

        return (
            <article className={`recipe__details ${isActive}`} >
                <p><strong>Ingredients:</strong></p>
                <ul className='recipe__ingredients'>{ingredients}</ul>

                <button
                    className='btn'
                    onClick={e => props.openModal(props.recipe, props.ingredients)}
                >Edit</button>

                <button
                    className='btn danger'
                    onClick={() => this.remove()}
                >Delete</button>
            </article>
        )
    }

}

class RecipeModal extends React.Component {

    constructor (props) {
        super(props);

        this.save = this.save.bind(this);
        this.close = this.close.bind(this);

        this.state = {
            recipe: null,
            ingredients: null,
            error: null,
            open: false
        }

        this.listenForEscape();
    }

    close () {
        this.setState({
            recipe: null,
            ingredients: null,
            error: null,
            open: false
        })
    }

    listenForEscape () {
        window.addEventListener('keydown', e => e.keyCode == 27 && this.state.open && this.close());
    }

    save () {
        const
            recipeName = this.name.value.snake_case(),
            ingredients = this.ingredients.value
                .split(',')
                .filter(w => w.trim() !== '')
                .map(w => w.trim());

        // value validation
        if (!recipeName) {
            const error = 'A name is required';
            this.setState({error});
            return;
        }
        if (!ingredients) {
            const error = 'Your recipe needs at least one (1) ingredient';
            this.setState({error});
            return;
        }

        // new item; no name existed to begin with
        if (!this.state.recipe) {
            lStor('recipes', [...lStor('recipes'), recipeName]);
        }

        // name has been edited; get to splicing
        if (this.state.recipe && this.state.recipe != recipeName) {
            const current = lStor('recipes');
            current[current.indexOf(this.state.recipe)] = recipeName;

            lStor('recipes', current);
            lStor(recipeName, ingredients);
            lStor(this.state.recipe, '__delete');
        }

        lStor(recipeName, ingredients);
        this.close()

        this.props.hasSaved(this.state.recipe, recipeName)
    }

    render () {

        return (
            <div className={'modal ' + (this.state.open ? 'modal--open' : '')}>
                <span className='modal__close' onClick={this.close}>X</span>
                <div className='modal__body modal__body--opaque'>
                    <div className='error'>{this.state.error}</div>
                    <form>
                        <p className='label'>Recipe</p>
                        <input
                            ref={i => this.name = i}
                            placeholder='Recipe Name'
                        />
                        <p className='label'>Ingredients</p>
                        <textarea
                            ref={t => this.ingredients = t}
                            placeholder='Place your ingredients here as comma seperated values'
                        ></textarea>
                    </form>
                    <button
                        className='btn center wide'
                        onClick={this.save}
                    >SAVE</button>
                </div>
            </div>
        )
    }

}

ReactDOM.render(React.createElement(RecipeList), document.getElementById('app'))

// localStorage
function lStor (item, val) {
    const
        ls     = window.localStorage,
        prefix = 'amci1203_recipes',
        target = `${prefix}_${item}`;

    if (val && val != '__delete') {
        return ls.setItem(target, JSON.stringify(val));
    }

    if (val == '__delete') {
        return ls.removeItem(target);
    }

    return JSON.parse( ls.getItem(target) );
}

// dump dummy data
function dump () {

    const
        DummyData = {
            "recipes": ["pumpkin_pie", "spaghetti", "onion_pie"],

            "pumpkin_pie": [
                "pumpkin puree",
                "sweetened condensed milk",
                "eggs",
                "pumpkin pie sauce",
                "pie crust"
            ],
            "spaghetti": ["noodles", "tomato sauce", "(optional) meatballs"],
            "onion_pie": ["onion", "pie crust"]
        },
        keys = Object.keys(DummyData);

    keys.forEach(key => lStor(key, DummyData[key]))
}


// String manipulation
function capitalizeWords () {

    return this
        .split(/ |_/g)
        .map(w => w.charAt(0).toUpperCase() + w.substring(1))
        .join(' ');

}
function snake_case () {

    return this
        .toLowerCase()
        .split(' ')
        .filter(w => w !== '')
        .join('_');

}
