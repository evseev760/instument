import React, { Component } from 'react';
import { Link } from 'react-router';
import './СonfirmationData.css';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import Header from './Header';
window.jQuery = window.$ = $;


class СonfirmationData extends Component {
    state = {
        step: 1,
        sms_mes: '',
        phone_number: '',
        inn: '',
        name: '',
        captcha: [],
        pdf: '',
        loading: 'Оформить заказ'
    }
    nothing = () => {
        if (String(document.getElementById('phone_authorization').value).length == 11) {
            this.next_step(2)
        }
    }
    render() {
        const { login } = this.props.login;
        return (
            <div className='confirmation_container'>
                <Header />
                <div className='navigation'><Link to='/'>Главная</Link> - <Link to='/basket'>Корзина</Link> - Оформление заказа</div>
                {this.state.step == 1 ? <div className='confirmation_data'>
                    <h4>Подтверждение персональных данных</h4>
                    <span className='placeholder'>{'Телефон'}</span>
                    <input id='input1' onFocus={this.plus} onChange={() => this.input_tel(1)} type='tel'></input>
                    <input className='hide' id='phone_authorization' />
                    <br />
                    <button onClick={this.nothing} className='next_btn'>Далее</button>
                </div> : ''
                }{this.state.step == 2 ? <div className='confirmation_data'>
                    <h4>Подтверждение персональных данных</h4>
                    <span className='placeholder'>{'ИНН'}</span>
                    <input onChange={() => this.input_inn(1)} type="text" name="INN" id="INN"></input>
                    <span className='placeholder'>email</span>
                    <input id='email'></input>
                    <span className='placeholder'>Имя контактного лица</span>
                    <input type="text" id="full_name"></input>
                    <span className='placeholder'>Текст с картинки</span>
                    <input autoComplete="off" type="text" id='captcha' />
                    <span className='placeholder'></span>
                    <input className='captcha_cont' type="hidden" id='captcha_token' ></input>
                    <br /><br /><br />
                    <img className='captcha_img' src={this.state.captcha.image} />
                    <br />
                    <button onClick={() => this.next_step(3)} className='next_btn'>Далее</button>
                    <br /><br />
                    <span id='eror_mesage'></span>
                </div> : ''
                }{this.state.step == 3 || this.state.step == 5 ? <div className='confirmation_data'>
                    <h4>Подтверждение персональных данных</h4>
                    <span className='placeholder'>Код подтверждения из СМС</span>
                    <input id='cod_sms' type='text'></input>
                    <br />
                    <button onClick={() => this.next_step(4)} className='next_btn'>Далее</button>
                </div> : ''
                }{this.state.step == 4 ? <div className='confirmation_data'>
                    <h4>Подтверждение адреса</h4>
                    <span className='placeholder'>Адрес доставки</span>
                    <input type='text'></input>
                    <br />
                    {login ? <Link to='/basket?invoicing'><button className='next_btn' type='button'>Оформить заказ</button></Link> : <Link to='/'><button className='next_btn' type='button'>Оформить заказ</button></Link>}
                    {/* <button onClick={()=>this.next_step(1)} className='next_btn'>Оформить заказ</button> */}
                </div> : ''
                }

            </div>
        );
    }

    next_step = (x) => {
        if (x == 2) {
            if (document.getElementById('phone_authorization')) {
                var tel = document.getElementById('phone_authorization').value;

                $.getJSON('http://instrument.kosatka.org/api/users/customers/auth/prepare?phone=' + String(tel), function (result) {
                    this.setState({
                        sms_mes: result,
                        phone_number: tel
                    })
                    console.log(result);
                    if (result.message) {
                        this.next_step(5)
                    }
                }.bind(this));
            }
            $.getJSON('http://instrument.kosatka.org/api/users/customers/register/prepare', function (result) {
                this.setState({
                    captcha: result
                });
            }.bind(this));

        } else if (x == 3 || x == 5) {
            let INN = document.getElementById('INN').value;
            let full_name = document.getElementById('full_name').value;
            let organization_type = 2;
            let email = document.getElementById('email').value;
            let captcha = document.getElementById('captcha').value
            let captcha_token = this.state.captcha.token
            if (x == 3) {
                $.post("http://instrument.kosatka.org/api/users/customers/register/", {
                    INN: INN,
                    organization_type: organization_type,
                    full_name: full_name,
                    phone: this.state.phone_number,
                    email: email,
                    captcha: captcha,
                    captcha_token: captcha_token
                }).done((data) => {
                    console.log(data);
                    if (data.status == "success") {
                        document.cookie = "reg_number=" + String(this.state.phone_number);

                        var val = this.state.phone_number

                        $.getJSON('http://instrument.kosatka.org/api/users/customers/auth/prepare?phone=' + String(val), function (result) {
                            this.setState({
                                sms_mes: result,
                                phone_number: val
                            })
                            console.log(result);
                            if (!result.message) {
                                alert('Данный телефон не зарегистрирован на сайте, необходимо пройти Регистрацию')
                            }
                        }.bind(this));
                    } else {
                        this.next_step(2);
                        document.getElementById('eror_mesage').innerHTML = data.error.message;
                    }
                });
            }


        } else if (x == 4) {
            const { log_in } = this.props.pageActions;
            let pass = document.getElementById('cod_sms').value;
            $.get("http://instrument.kosatka.org/api/users/customers/auth/login/", {
                phone: this.state.phone_number,
                password: pass
            }).done(function (data) {
                console.log(data);
                if (data.status == "success") {

                    log_in(true);
                } else { alert('SMS код неверный'); }
            })
        }
        this.setState({
            step: x
        })
    }
    create_order = () => {

    }
    input_inn = () => {
        var val = String(document.getElementById("INN").value);
        var num = val.replace(/\D/g, '').split(/(?=.)/), i = num.length - 1;
        if (num.length > 10) num.pop()
        document.getElementById("INN").value = num.join('');
    }
    input_tel = (x) => {
        var val = String(document.getElementById("input" + String(x)).value);
        var num = val.replace(/\D/g, '').split(/(?=.)/), i = num.length - 1;
        if (0 <= i) num.unshift('+ ');
        if (1 <= i) num.splice(2, 0, ' ');
        if (4 <= i) num.splice(6, 0, ' ');
        if (7 <= i) num.splice(10, 0, '-');
        if (9 <= i) num.splice(13, 0, '-');
        if (num.length > 16) num.pop()
        document.getElementById("input" + String(x)).value = num.join('');
        let num2 = String(num.splice(1, 15)).replace(/\D+/g, "");
        document.getElementById("phone_authorization").value = num2;
    }
    plus = () => {
        let val = document.getElementById('input1').value
        if (!val) {
            document.getElementById('input1').value = '+'
        }
    }
}

function mapStateToProps(state) {
    return {
        item: state.basket,
        login: state.login
    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(СonfirmationData);
