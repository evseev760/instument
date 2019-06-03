import React, { Component } from 'react';
import LeftBar from './LeftBar';
import $ from 'jquery';
window.jQuery = window.$ = $;

class Сabinet extends Component {
    state = {
        user_data: []
    }
    componentWillMount() {
        $.getJSON('http://instrument.kosatka.org/api/users/customers/profile', function (result) {
            this.setState({
                user_data: <LeftBar user_data={result} />
            })
            console.log(result)
        }.bind(this));
    }
    render() {
        return (
            <div className='in_line'>
                {this.state.user_data}
            </div>
        );
    }
}

export default Сabinet;