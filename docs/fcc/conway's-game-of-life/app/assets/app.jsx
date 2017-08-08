import React from 'react';
import { render } from 'react-dom';

Object.assign(String.prototype, { padLeft });

function main (props) {
    const
        nCols  = 70,
        nRows  = 50,
        _props = { nCols, nRows };

    return <Board {..._props} />
}

class Board extends React.Component {

    constructor (props) {
        super(props);

        this.clear = this.clear.bind(this);
        this.iterate = this.iterate.bind(this);
        this.togglePlay = this.togglePlay.bind(this);

        this.state = {
            generations: 0,
            playing: true,
            squares: this.formBoardStateObject()
        }
    }

    clear () {
        this.setState({
            generations: 0,
            playing: false,
            squares: this.formBoardStateObject()
        })
    }

    componentDidMount () {
        this.iterate();
        this.tick = () => setInterval(this.iterate, 100);
        setTimeout(this.tick, 100);
    }


    togglePlay () {
        const playing = !this.state.playing;
        this.setState({playing});
    }

    iterate () {
        if (!this.state.playing) return false;

        const { nRows, nCols } = this.props;
        let { squares, generations } = this.state;
        const allDead = allSquaresDead();

        for (let x = 0; x < nCols; x++) {
            for (let y = 0; y < nRows; y++) {
                squares[x][y] = determineStatus(x, y);
            }
        }

        generations++;
        return this.setState({ squares, generations })

        function determineStatus (x, y) {
            if (generations === 0 && allDead) {
                const rand = Math.floor(Math.random() * 15);
                return rand > 12 ? 'alive' : 'dead';
            }

            const neighbours = [];

            if (x > 0) {
                const left = squares[x - 1];
                // left
                neighbours.push(left[y]);
                // lower left
                if (y > 0) neighbours.push(left[y - 1]);
                // upper left
                if (y < nRows - 1) neighbours.push(left[y + 1]);
            }
            if (x < nCols - 1) {
                const right = squares[x + 1];
                // right
                neighbours.push(right[y]);
                // lower-right
                if (y > 0) neighbours.push(right[y - 1]);
                // upper-right
                if (y < nRows - 1) neighbours.push(right[y + 1]);
            }
            // above
            if (y > 0) neighbours.push(squares[x][y - 1]);
            // below
            if (y < nRows - 1) neighbours.push(squares[x][y + 1]);

            const
                thisSquare = squares[x][y],
                isAlive    = ['alive', 'alive-old'].indexOf(thisSquare) > -1,
                isDead     = thisSquare == 'dead',
                dead       = neighbours.filter(s => s == 'dead').length,
                alive      = neighbours.filter(s => s == 'alive' || s == 'alive-old').length;

            // time to apply le rules

            // if dead and has 3 live neighbours, 'alive'
            if (isDead && alive == 3) return 'alive';
            // if alive and has less than 2 or more than 3 neigbours, 'dead'
            if (isAlive && (alive < 2 || alive > 3)) return 'dead';
            // if alive and has two or three neighbours 'alive-old'
            if (isAlive && (alive == 2 || alive == 3)) return 'alive-old';

            return thisSquare;

        }

        function allSquaresDead () {
            for (let x = 0; x < nCols; x++) {
                for (let y = 0; y < nRows; y++) {
                    if (squares[x][y] === 'alive') return false
                }
            }
            return true
        }

    }

    // it's actually a nested array, but what's the difference in this context?
    formBoardStateObject () {
        const
            { nRows, nCols } = this.props,
            squares = [];
        for (let x = 0; x < nCols; x++) {
            squares.push([])
            for (let y = 0; y < nRows; y++) {
                squares[x].push = null;
            }
        }
        return squares
    }

    // Intended only for Square Component
    toggleState (x, y) {
        const
            squares  = this.state.squares,
            square   = squares[x][y],
            newState = square == 'dead' ? 'alive' : 'dead';

        squares[x][y] = newState;
        this.setState({squares});

    }

    render () {
        const
            rows = [],
            squares = this.state.squares,
            { nRows, nCols } = this.props;

        for (let y = nRows - 1; y > -1; y--) {
            const _squares = [];
            for (let x = 0; x < nCols; x++) {
                const
                    toggleState = this.toggleState.bind(this, x, y),
                    status = squares[x][y],
                    key    = String(x).padLeft(2,0) + String(y).padLeft(2,0),
                    props  = { status, key, toggleState };

                _squares.push(<Square {...props} />)
            }
            rows.push(<Row key={y}>{_squares}</Row>)
        }

        return (
            <main className='game'>
                <div className='board'>{rows}</div>
                <p className='title subtitle'>Generations: {this.state.generations}</p>
                <div className='board__controls center-block'>
                    <button
                        className='btn'
                        onClick={this.togglePlay}
                    >{this.state.playing ? 'STOP' : 'PLAY'}</button>
                <button
                    className='btn'
                    onClick={this.clear}
                >CLEAR</button>
                </div>
            </main>
        )
    }

}

function Row (props) {
    return <div className='board__row'>{props.children}</div>
}

function Square (props) {
    return <span
        className={'board__square ' + props.status}
        onClick={props.toggleState}
    ></span>
}

render(React.createElement(main), document.getElementById('app'))


function padLeft (targetLength, padString) {
    if (this.length >= targetLength) return this;
    else {
        if (['number', 'string'].indexOf(typeof(padString)) !== -1) {
            const pad  = String(padString);
            let target = this.split('*');
            while (target.length < targetLength) {
                target.unshift(pad);
            }
            return target.join('');
        } else {
            throw new Error('Err: padString is not a number or string');
        }
    }
}
