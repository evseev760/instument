import React, { Component } from 'react';
import BasketElement from './BasketElement';
import './Basket.css'
import { browserHistory } from 'react-router';
import shoppingcart from './img/shopping-cart.svg';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
window.jQuery = window.$ = $;

class Basket extends Component {
    state = {
        dataVar1: '',
        dataVar3: [],
        total_oul: 0,
        ol_sum: '',
        status: '',
        pdf: '',
        loading: 'Оформить заказ',
        empty_basket: false
    }
    componentWillMount() {
        this.create_reqest();
    }
    componentDidMount() {
        if (this.state.dataVar1) {
            this.create_elements();
            $.getJSON('http://instrument.kosatka.org/api/products/update-products-with-1c?' + this.state.dataVar1, function (result) {
                console.log(result)
                if (result.status == 'success') {
                    
                    this.setState({
                        status: 'success'
                    })
                }
            }.bind(this));
        } else {
            this.setState({
                dataVar3: <div className='shoppingcart'><img src={shoppingcart} /><span>Ваша корзина пока пуста</span></div>
            })
        }
        if (window.location.href.split('?')[1] == 'invoicing') {
            this.create_order()
        }
    }
    componentWillUpdate() {
        setTimeout(() => {
            this.sum()
        }, 300);
    }
    render() {
        const { login } = this.props.log_in;
        const { basket } = this.props.item;
        return (
            <div className='basket'>
                <div className='navigation'><Link to='/'>Главная</Link> - Корзина</div>
                <h3>Корзина</h3>
                <div className='row'>
                    <div className='row d-none d-lg-block col-lg-12 col-xl-9'>
                        {basket.length > 0 ?
                            <div className='row col-12 basket_head'>
                                <div className='col-xl-2 col-lg-2'>Фото</div>
                                <div className='col-xl-3 col-lg-3'>Наименование/Производитель</div>
                                <div className='col-xl-2 col-lg-3'>Цена</div>
                                <div className='col-xl-2 col-lg-1'>Количество</div>
                                <div className='col-xl-2 col-lg-2'>Итого</div>
                            </div>
                            : ''
                        }
                    </div>
                    <div className='row col-lg-12 col-xl-9'>
                        {this.state.dataVar3}
                        {/* {this.props.type.product.map((x, i) =>
                            <BasketElement key={[i]} product={this.props.type.product[i]} />
                        )} */}
                    </div>
                    <div className='col-xl-3  col-lg-12 totals row'>
                        <div className='col-lg-6 col-xl-12'>
                            <div>Итого к оплате</div>
                            <span> {this.state.total_oul} &#8381;</span>
                            <div>Количество товаров: {basket.length}</div>
                        </div>
                        
                        {this.state.status == 'success' && !this.state.empty_basket ? <div className='col-lg-6 col-xl-12 total_button'>
                            <form onSubmit={this.handleSubmit}>
                                {login ? <button disabled={this.state.loading == 'Формируем счет' ? "disabled" : ''} onClick={this.create_order} type='button'>{this.state.loading}
                                    {this.state.loading == 'Формируем счет' ?
                                        <div className="cssload-container">
                                            <div className="cssload-zenith"></div>
                                        </div> :'' }
                                </button> :
                                    <Link to='/confirmation'><button type='button'>Оформить заказ</button></Link>}
                            </form>
                        </div> : <button className="in_catalog_btn" onClick={this.in_catalog}>В каталог</button>}

                    </div>
                </div>
                {this.state.pdf != '' ? <div className='pdf_score'>
                    <iframe src={'http://instrument.kosatka.org' + String(this.state.pdf)} frameborder="no" scrolling="no" />
                    <div className='btn-group'>
                        <button onClick={this.close_pdf} >Закрыть</button>
                        <a href={'http://instrument.kosatka.org' + String(this.state.pdf)} target='_blank'><button onClick={this.close_pdf} >Открыть в новой вкладке</button></a>
                    </div>
                </div>
                    : ''}
            </div>
        );
    }
    in_catalog = () =>{
        browserHistory.push('/');
    }
    delite_ewerithing = (x) =>{
        const {basket} = this.props.item;
        function getUnique(arr) {
            var i = 0,
                current,
                length = arr.length,
                unique = [];
            for (; i < length; i++) {
                current = arr[i];
                if (!~unique.indexOf(current)) {
                    unique.push(current);
                }
            }
            return unique;
        };
        if (getUnique(basket).length ==1){
            this.setState({
                dataVar3: <div className='shoppingcart'><img src={shoppingcart} /><span>Ваша корзина пока пуста</span></div>,
                empty_basket: true
            })
        }
    }
    close_pdf = () => {
        this.setState({
            pdf: ''
        });
        document.getElementById('footer').classList.remove('hide');
        this.setState({
            dataVar3: ''
        })
    }
    create_reqest = () => {
        const { basket } = this.props.item
        function getUnique(arr) {
            var i = 0,
                current,
                length = arr.length,
                unique = [];
            for (; i < length; i++) {
                current = arr[i];
                if (!~unique.indexOf(current)) {
                    unique.push(current);
                }
            }
            return unique;
        };
        let count = getUnique(basket).length
        let link = []
        while (count > 0) {
            count--;
            link.push("ids[]=" + String(getUnique(basket)[count]))
        }
        this.setState({
            dataVar1: String(link).replace(/\,/g, '&'),
            dataVar2: getUnique(basket)
        })
    }
    create_elements = () => {
        const { basket_arr } = this.props.pageActions
        const { basket } = this.props.item
        var summary = basket.reduce(function (a, b) {
            var tmp = parseInt(b)
            if (!isNaN(tmp)) {
                if (!a[tmp]) {
                    a[tmp] = 0;
                }
                a[tmp]++;
            }
            return a;
        }, {});
        $.getJSON('http://instrument.kosatka.org/api/products/get-products-by-id-list?' + this.state.dataVar1, function (result) {
            this.setState({
                dataVar3: this.state.dataVar2.map((x, i) =>
                    <BasketElement delite_ewerithing={this.delite_ewerithing} basket={basket} basket_arr={basket_arr} key={[i]} quantity={summary[result.products[this.state.dataVar2[i]].id]} product={result.products[this.state.dataVar2[i]]} />)
            });

        }.bind(this));

        setTimeout(() => {
            this.sum()
        }, 300);
    }
    // create_form = () =>{
    //     const { basket } = this.props.item
    //     var summary = basket.reduce(function(a, b) {
    //         var tmp = parseInt(b)
    //         if (!isNaN(tmp)) {
    //             if (!a[tmp]) {
    //                 a[tmp] = 0;
    //             }
    //             a[tmp]++;
    //         }
    //         return a;
    //     }, {});
    //     this.setState({
    //         form :this.state.dataVar2.map((x, i) =>
    //         <input id="username" name={"products["+String(this.state.dataVar2[i])+"][count]"} type="text" value={summary[this.state.dataVar2[i]]}/>)
    //     })


    // }
    // create_order = () =>{
    //     const { basket } = this.props.item
    //     var summary = basket.reduce(function(a, b) {
    //         var tmp = parseInt(b)
    //         if (!isNaN(tmp)) {
    //             if (!a[tmp]) {
    //                 a[tmp] = 0;
    //             }
    //             a[tmp]++;
    //         }
    //         return a;
    //     }, {});
    //     function getUnique (arr) {
    //         var i = 0,
    //         current,
    //         length = arr.length,
    //         unique = [];
    //         for (; i < length; i++) {
    //           current = arr[i];
    //           if (!~unique.indexOf(current)) {
    //             unique.push(current);
    //           }
    //         }
    //         return unique;
    //     };
    //     let count = getUnique(basket).length
    //     let link = []
    //     while(count>0){
    //         count--;
    //         link.push("data["+String(getUnique(basket)[count])+'][count]='+String(summary[getUnique(basket)[count]]))
    //     }
    //     $.getJSON(''+String(link).replace(/\,/g,'&'), function (result) {
    //         console.log(result);
    //         this.setState({
    //             pdf:result.invoice_url
    //         })
    //         window.open('http://instrument.kosatka.org'+String(this.state.pdf));
    //     }.bind(this))
    // }
    // handleSubmit(event) {
    //     event.preventDefault();
    //     const data = new FormData(event.target);

    //     fetch('http://instrument.kosatka.org/api/orders/create-order/', {
    //       method: 'POST',
    //       body: data,
    //     });
    //   }
    create_order = () => {
        const { basket_arr } = this.props.pageActions
        const { basket } = this.props.item
        var summary = basket.reduce(function (a, b) {
            var tmp = parseInt(b)
            if (!isNaN(tmp)) {
                if (!a[tmp]) {
                    a[tmp] = 0;
                }
                a[tmp]++;
            }
            return a;
        }, {});
        var string = '';
        this.state.dataVar2.map((x, i) =>
            string = string + "\"products[" + String(this.state.dataVar2[i]) + "][count]\":" + String(summary[this.state.dataVar2[i]]) + ',')

        var obj = eval('({' + string + '})');
        console.log(obj);
        this.setState({
            loading: 'Формируем счет'
        })
        $.post("http://instrument.kosatka.org/api/orders/create-order/", obj
        ).done((data) => {
            console.log(data);
            if (data.status == "success") {
                //document.cookie = "reg_number=" + String(tel);
                this.setState({
                    pdf: data.invoice_url,
                    loading: 'Оформить заказ'
                })
                basket_arr('')
                document.getElementById('footer').classList.add('hide');
            } else {
                alert(data.error.message);
                this.setState({
                    loading: 'Оформить заказ'
                })
            }
        })
    }
    sum = () => {
        var array = []
        $('.total').each(function () {
            array.push(this.textContent);
        });
        let sum = 0;
        let count = array.length
        while (count > 0) {
            count--
            sum = sum + parseFloat(array[count])
        }
        if (!array[0]) { sum = 0 }
        this.setState({
            total_oul: sum.toFixed(2)
        })
    }
}
function mapStateToProps(state) {
    return {
        item: state.basket,
        log_in: state.login
    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Basket);
