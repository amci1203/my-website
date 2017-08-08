import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

class Main extends React.Component {

    constructor (props) {
        super(props);

        this.toggleSort = this.toggleSort.bind(this);

        this.state = {
            recent: [],
            all_time: [],
            sort: 'recent'
        }
    }

    toggleSort () {
        const sort = this.state.sort == 'recent' ? 'all_time' : 'recent';
        this.setState({sort});
    }

    componentWillMount () {
        axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
            .then(res => res.data)
            .then(recent => this.setState({recent}));
        axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
            .then(res => res.data)
            .then(all_time => this.setState({all_time}));
    }

    render () {
        return (
            <main className='wrapper'>
                <h1 className='title'>TOP CAMPERS</h1>
                <p className='text-center'>
                    Sorted By:
                    <button
                        className='btn'
                        onClick={this.toggleSort}
                    >
                        {
                            this.state.sort == 'recent' ?
                                'LAST 30 DAYS' : 'ALL TIME'
                        }
                    </button>
                </p>
                <CamperList campers={this.state[this.state.sort]} />
            </main>
        )
    }

}

function CamperList (props) {

    const campers = props.campers.map((camper, i) => {
        return <Camper key={camper.username} pos={i + 1} {...camper} />
    })

    return <section id='campers'>{campers}</section>
}

function Camper (props) {

    const camperNameAndPlace = `#${props.pos}: ${props.username}`;
    return (
        <article className='camper'>
            <img className='profile-pic' src={props.img} />
            <h1 className='username'>{camperNameAndPlace}</h1>
            <p className='brownie-pts'>Past 30 days: {props.recent}</p>
            <p className='brownie-pts'>All time: {props.alltime}</p>
        </article>
    )

}

render(React.createElement(Main), document.getElementById('app'))
