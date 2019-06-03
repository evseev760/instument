import React, { Component } from 'react';
import './ProductCard.css';
import SliderComponent from './Slider';
import btnV from './img/btnV.svg';
import narrow_down_black from './img/narrow_down_black.svg'
import logo from './img/logo-01.svg';
import arrow from './img/narrow_down_black.svg';
import { Link } from 'react-router';
import InBasketBtn from './InBasketBtn.js';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
window.jQuery = window.$ = $;


class ProductCard extends Component {
    state = {
        mainImgSrs: true,
        dataVar1: [],
        dataVar2: [],
        have_quantity: ''
    }
    componentWillMount() {
        var prod_id = document.location.href.split('?')[1];
        $.getJSON('http://instrument.kosatka.org/api/products/get-product?id=' + String(prod_id), function (result) {
            this.setState({
                dataVar1: result.products,
            });
            this.have_quantity(result);
            var sec_id = result.products.category_id
            if (sec_id) {
                $.getJSON('http://instrument.kosatka.org/api/categories/get-parents-of-category?cat_id=' + String(sec_id), function (result) {
                    if (result[1]) {
                        var name = result[1].name
                        this.setState({

                            dataVar2: <div><Link to='/'>Главная</Link> - <Link to={() => '/types?' + String(result[0].id)}>{result[0].name}</Link> - <Link to={() => '/catalog?' + String(result[1].id)}>{name}</Link></div>,
                        });
                    } else {
                        this.setState({

                            dataVar2: <div><Link to='/'>Главная</Link> - <Link to={() => '/catalog?' + String(result[0].id)}>{result[0].name}</Link></div>,
                        });
                    }
                }.bind(this));
            }
        }.bind(this));

    }
    componentDidMount() {

    }
    render() {
        const { basket_item } = this.props.pageActions
        return (
            <div>
                <div className='information_card'>
                    {this.state.dataVar2}
                    {/* <div><Link to='/'>Главная</Link> - <Link to='/types'>{String(this.state.dataVar1.measure_name)}</Link> - <Link to='/catalog'>{String(this.state.dataVar1.cat_name).split('.')[1]}</Link></div> */}
                    <div>Артикул: {this.state.dataVar1.article}</div>
                    <h1>{this.state.dataVar1.name}</h1>
                    <div className='row '>
                        <div className='col-xl-5 col-lg-8 col-sm-12'>
                            <img className='main_img' src={logo} /> {/*this.state.dataVar1.img */}
                            {/* <div className='mini_img'>
                            <img src={this.props.products.img}/>
                            <img src={this.props.products.img}/>
                            <img src={this.props.products.img}/>

                             {this.props.type.product.map((x, i) =>
                                <img src={this.props.product.img[i]}/>
                            )} для массива картинок 

                        </div> */}
                        </div>
                        <div className='col-lg-8 col-xl-4 col-sm-12  row information_card'>
                            <ul className='col-6 params'>
                                <li>Бренд</li>
                                <li>Тип</li>
                                <li>Вес брутто.г</li>
                                <li>Длинна.см</li>
                                <li>Ширина.см</li>
                                <li>Высота.см</li>
                                <li>Цена деления.мм</li>
                                <li>Верхняя граница.мм</li>
                            </ul>
                            <ul className='col-6  values'>
                                <li>-</li>
                                <li>-</li>
                                <li>-</li>
                                <li>-</li>
                                <li>-</li>
                                <li>-</li>
                                <li>-</li>
                                <li>-</li>
                            </ul>
                        </div>
                        <div className='col-xl-3 col-lg-4 col-sm-11  plate'>

                            <span>{this.state.dataVar1.price} &#8381;</span>
                            <div><img alt="" src={btnV} />В наличии {this.state.have_quantity} {this.state.dataVar1.measure_name}.</div>
                            <div className="btn-group quantity_product_card quantity-block" data-toggle="buttons">
                                {window.innerWidth > 300 ?<button id='plus' onClick={this.minus} onClick={this.minus} className="quantity-arrow-minus-card">&#8249;</button>:''}
                                <input id={"quantity" + String(this.state.dataVar1.id)} type='number' min={1} name="quanti" list="quantity" placeholder='шт.' />
                                {window.innerWidth > 300 ?<button onClick={this.plus} id='minus' onClick={this.plus} className="quantity-arrow-plus-card">&#8250;</button>:''}
                            </div>
                            {/* <img className='arrow_input' src={arrow}/> */}
                            <br />

                            <InBasketBtn quantity={this.state.dataVar1.rest} id={this.state.dataVar1.id} basket_item={basket_item} />
                        </div>
                        <div className='col-lg-9'>
                            <h4>Назначение</h4>
                             <p>{/*описание*/}</p> 
                        </div>
                    </div>
                    <h4>Подобный товар</h4>
                    <SliderComponent keys={2} type={this.props.type} />
                    <h4>Cопутствующий товар</h4>
                    <SliderComponent keys={5} type={this.props.type} />
                </div>
            </div>

        );
    }
    plus = () =>{
        var val =document.getElementById('quantity' + String(this.state.dataVar1.id)).value;
        if(val>0){
            document.getElementById('quantity' + String(this.state.dataVar1.id)).value = Number(val)+1;
        }else{
            document.getElementById('quantity' + String(this.state.dataVar1.id)).value = 1;
        }
    }
    minus = () =>{
        var val =document.getElementById('quantity' + String(this.state.dataVar1.id)).value;
        if(val>2){
            document.getElementById('quantity' + String(this.state.dataVar1.id)).value = Number(val)-1;
        }else{
            document.getElementById('quantity' + String(this.state.dataVar1.id)).value = 1;
        }
    }
    have_quantity = (result) => {
        var quantity = result.products.rest;
        console.log(quantity)
        if (quantity < 6) {
            this.setState({
                have_quantity: quantity
            })
        } else if (quantity < 11) {
            this.setState({
                have_quantity: 'больше 5'
            })
        } else {
            quantity = Math.floor(quantity / 10) * 10;
            this.setState({
                have_quantity: 'более ' + quantity
            })
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);