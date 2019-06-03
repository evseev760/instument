import React, { Component } from 'react';
import './CatalogProduct.css';
import { Link } from 'react-router';
import logo from './img/logo-02.svg';
import InBasketBtn from './InBasketBtn.js'
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';

import btnV from './img/btnV.svg';
// import btnX from './img/_01_02.svg';


class CatalogProduct extends Component {

    state = {
        isHover: false
    }

    resize = () => this.forceUpdate()

    componentDidMount() {
        window.addEventListener('resize', this.resize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }
    render() {
        const { basket_item } = this.props.pageActions
        return (
            <div onMouseOver={this.hover} onMouseOut={this.hover} className='product' >
                <div title={this.props.product.name} className='form'>
                    <Link to={() => '/product_card?' + String(this.props.product.id)}>
                        <img className='productImg' src={logo} />
                    </Link>
                    <div>
                        <Link to={() => '/product_card?' + String(this.props.product.id)}>
                            <div className={this.state.isHover && window.innerWidth > 900 ? 'nameClose' : 'nameOpen'}>
                                <button>
                                    {this.props.product.name}
                                </button>
                            </div>
                        </Link>
                        <div className='product_info' onMouseOver={this.hover} onMouseOut={this.hover}>
                            <Link to={() => '/product_card?' + String(this.props.product.id)} >
                                {/* <div>Произв: {this.props.product.made}</div>
                                <div>код: {this.props.product.code}</div> */}
                                <div>Артикул: {this.props.product.id}</div>
                                <div className='prise'><nobr><img alt="" src={btnV} />{this.props.product.price} &#8381;</nobr></div>
                            </Link>
                            <div className={this.state.isHover || window.innerWidth < 900 ? 'btnOpen' : 'btnClose'}>
                                <div className="btn-group quantity-block" data-toggle="buttons">
                                    <input id={'quantity' + String(this.props.product.id)} className='leftBtn' placeholder="шт." max='999999' type="number" min={1} onMouseOver={this.hover} onMouseOut={this.hover} />
                                    {window.innerWidth > 500 ?<button id='plus' onClick={this.minus} className="quantity-arrow-minus">&#8249;</button>:''}
                                    {window.innerWidth > 500 ?<button id='minus' onClick={this.plus} className="quantity-arrow-plus">&#8250;</button>:''}
                                    
                                    <InBasketBtn quantity={this.props.product.rest} id={this.props.product.id} basket_item={basket_item} />
                                </div>
                                {/* <button className='more'>Подробнее</button> альтернативная кнопка */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    plus = () =>{
        var val =document.getElementById('quantity' + String(this.props.product.id)).value;
        if(val>0){
            document.getElementById('quantity' + String(this.props.product.id)).value = Number(val)+1;
        }else{
            document.getElementById('quantity' + String(this.props.product.id)).value = 1;
        }
    }
    minus = () =>{
        var val =document.getElementById('quantity' + String(this.props.product.id)).value;
        if(val>2){
            document.getElementById('quantity' + String(this.props.product.id)).value = Number(val)-1;
        }else{
            document.getElementById('quantity' + String(this.props.product.id)).value = 1;
        }
    }
    hover = () => {
        this.setState(
            { isHover: !this.state.isHover }
        )
    }
}
function mapStateToProps(state) {
    return {
        item: state.basket
    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CatalogProduct);