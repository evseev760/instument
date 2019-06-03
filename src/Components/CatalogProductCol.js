import React, { Component } from 'react';
import btnV from './img/btnV.svg';
import cart from './img/cart.svg';
import logo from './img/logo-02.svg';
import './CatalogProduct.css';
import InBasketBtn from './InBasketBtn.js'
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';


import { Link } from 'react-router';

class CatalogProductCol extends Component {
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
            <div className='productCol col-12' >
                <div className='formCol row'>
                    <img className='productImgCol col-lg-2 col-xl-2 col-md-2 col-sm-3 col-4' src={logo} />
                    <div className='col-xl-10 col-lg-10 col-md-10 col-sm-9 col-8 row'>

                        <div className='col-xl-2  d-none d-lg-block col-lg-2 '>{this.props.product.cat_name}</div>
                        <div className='col-xl-4 col-lg-3 col-md-4 col-sm-6 col-12 nameCol'> <Link to={() => '/product_card?' + String(this.props.product.id)}><span className='nm'>{this.props.product.name}</span><br /><span className='made_in_col'></span></Link></div>
                        <div className='col-xl-3 col-lg-3 col-md-3  d-none d-md-block'><Link to={() => '/product_card?' + String(this.props.product.id)}>{this.props.product.aricle}<br />{this.props.product.code}</Link></div>
                        <div className='col_input col-xl-3 col-lg-4 row col-md-5 col-sm-6 col-11'>
                            <div className='col-5 col-sm-5 col-md-6 col-lg-6 d-none d-sm-block'></div>
                            <div className=' col-12 col-sm-6 col-md-6 col-lg-6 priseCol'><nobr><img alt="" src={btnV} />{this.props.product.price} &#8381;</nobr></div>
                            <div className='btnOpen col-12'>
                                <div onMouseOver={this.hover} onMouseOut={this.hover} className={this.state.isHover ? "btn-group btnCol" : "btn-group btnColl btnCol"} data-toggle="buttons">
                                    <input id={'quantity' + String(this.props.product.id)} className='leftBtn' placeholder="шт." type="number" onMouseOver={this.hover} onMouseOut={this.hover} />
                                    
                                    <button id='plus' onClick={this.minus} className="quantity-arrow-minus">&#8249;</button>
                                    <button id='minus' onClick={this.plus} className="quantity-arrow-plus">&#8250;</button>
                                    
                                    <InBasketBtn quantity={this.props.product.rest} id={this.props.product.id} basket_item={basket_item} />
                                    {/* <button className='rightBtn' type="button" onMouseOver={this.hover} onMouseOut={this.hover}><img height={window.innerWidth < 800 ? '25px' : 0} src={cart} alt='В корзину' />{window.innerWidth < 800 ? '' : 'В корзину'}</button> */}
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
export default connect(mapStateToProps, mapDispatchToProps)(CatalogProductCol);