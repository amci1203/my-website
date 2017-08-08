import React, { Component } from 'react';
import { render } from 'react-dom';
import marked from 'marked';

class MarkdownEditor extends Component {

    constructor (props) {
        super(props);

        this.handleInput = this.handleInput.bind(this);
        this.returnToDefault = this.returnToDefault.bind(this);

        this.state = {
            value: this.props.defaultText
        };
    }

    returnToDefault () {
        this.setTextInputToDefault();
        this.setState({
            value: this.props.defaultText
        })
    }

    setTextInputToDefault () {
        this.textarea.value = this.props.defaultText;
    }

    handleInput (e) {
        this.setState({
            value: e.target.value
        })
    }

    markdown () {
        return { __html: marked( this.state.value ) }
    }

    render () {
        return (

            <div className="MarkdownEditor wrapper">
                <h1 className='title'>Markdown Editor</h1>

                <div className='columns'>
                    <div className='group'>
                        <h3 className='title subtitle'>Input</h3>
                        <textarea
                            ref={input => this.textarea = input}
                            onChange={this.handleInput}
                            defaultValue={this.props.defaultText}
                        />
                    </div>
                    <div className='group'>
                        <h3 className='title subtitle'>Preview</h3>
                        <div
                            className="content"
                            dangerouslySetInnerHTML={this.markdown()}
                        />
                    </div>
                </div>
                <button
                    className='btn center wide'
                    onClick={this.returnToDefault}
                >RESET</button>
            </div>

        )
    }
}

function main () {
    return <MarkdownEditor defaultText='# Hello World!!' />
}

render(React.createElement(main), document.getElementById('app'))
