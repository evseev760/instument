import React, { Component } from 'react';
import btnX from './img/btnX.svg'
import { connect } from 'react-redux';
import { Link } from 'react-router';

class BasketElement extends Component {
    state = {
        total: ''
    }
    componentDidMount() {
        document.getElementById('quantity' + String(this.props.product.id)).value = this.props.quantity;
        this.setState({
            total: (this.props.quantity * this.props.product.price).toFixed(2)
        })
    }
    componentDidUpdate() {

    }
    render() {
        return (
            
            <div id={'elem' + String(this.props.product.id)} className='row col-12 basket_element'>
                
                <div className='col-3 col-xl-2 basket_img_cont'><img className='col-12 basket_img' src='http://atom96.ru/wp-content/uploads/2017/10/%D0%BD%D0%B5%D1%82-%D1%84%D0%BE%D1%82%D0%BE.png' /></div>
                <div className='col-9 col-xl-10 row element_info'>
                    <div className='name col-12 col-md-4'><Link className='row' to={() => '/product_card?' + String(this.props.product.id)}> <div >{this.props.product.name}</div></Link></div>
                    <div className='d-none d-md-block  col-md-2'>{this.props.product.price}</div>
                    <div className='col-5 string col-md-3'><input min={1} max={999999} onChange={this.onBaskClick.bind(this)} id={'quantity' + String(this.props.product.id)} type="number" placeholder='штук'></input>
                        {/* <datalist id="quantity">
                                <select>
                                <option value="10 штук" >10 штук</option>
                                <option value="20 штук" >20 штук</option>
                                <option value="50 штук" >50 штук</option>
                                <option value="100 штук" >100 штук</option>
                                <option value="200 штук" >200 штук</option>
                                </select>
                            </datalist>
                            {String(this.props.quantity)}*/}</div>
                    <div id={'total' + String(this.props.product.id)} className='col-5 string col-md-2 total'>{this.state.total}</div>
                    <div className='col-2 string col-md-1'><button onClick={this.rmove_this.bind(this)} type="button" ><img src={btnX} /></button></div>
                </div>
                
            </div>
        );
    }
    onBaskClick() {
        const { basket } = this.props.item;
        let arr = basket;
        arr = arr.filter(val => val !== this.props.product.id);

        let quantity = document.getElementById('quantity' + String(this.props.product.id)).value;
        while (quantity > 0) {
            arr.push(this.props.product.id);
            quantity--
        }
        this.props.basket_arr(arr);
        this.total()
    }
    rmove_this = () => {
        const { basket } = this.props.item;
        document.getElementById('quantity' + String(this.props.product.id)).value = 0;
        let arr = basket;
        arr = arr.filter(val => val !== this.props.product.id);
        this.props.basket_arr(arr);
        document.getElementById('total' + String(this.props.product.id)).textContent = '0'
        document.getElementById('elem' + String(this.props.product.id)).classList.add('remove_elem');
        
        this.props.delite_ewerithing('1')
        

    }
    total = () => {
        let quan = document.getElementById('quantity' + String(this.props.product.id)).value
        this.setState({
            total: (quan * this.props.product.price).toFixed(2)
        })
    }
}
function mapStateToProps(state) {
    return {
        item: state.basket
    }
}

export default connect(mapStateToProps)(BasketElement);