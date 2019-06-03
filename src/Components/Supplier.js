import React, { Component } from 'react';
import './Suppliers.css';


class Supplier extends Component {
    state = {
        isOn: false
    }
    render() {
        return (
            <div className='col-6 col-sm-4 col-lg-3 supplier'>
                <a href={this.props.link} target='_blank'>
                    <img src={this.state.isOn ? this.props.img : this.props.img1} onMouseOver={this.changeImg} onMouseOut={this.changeImg} />
                </a>
            </div>
        );
    }
    changeImg = () => {
        this.setState(
            { isOn: !this.state.isOn }
        )
    }
}
export default Supplier;
