import React, { Component } from 'react';
import eye1 from './img/eye1.png';
import eye2 from './img/eye2.png';
import Header from './Header';
import './Authorization.css';
import Timer from './timer.js'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
window.jQuery = window.$ = $;

class Authorization extends Component {
    state = {
        inn: false,
        password: true,
        sms: false,
        sms_mes: [],
        phone_number: '',
        sec: 60,
        isMouseDown: false,
        isConfirmDown: false,
        isPrevDown: false
    }
    componentDidMount() {
        if (this.get_cookie('reg_number')) {
            document.getElementById('input1').value = this.get_cookie('reg_number');
            this.input_tel(1);
        }
        document.getElementById('footer').classList.add('hide');
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
        this.deleteCookie('reg_number');
        document.getElementById('footer').classList.remove('hide');
    }
    get_sec = (val) => {
        this.setState({
            sec: val
        })
    }
    render() {
        return (
            <div>
                <Header />
                <div className='authorization_bg'>
                    <div className='black_bg'>
                        <div onClick={this.back} className='back_left'></div>
                        <div onClick={this.back} className='back_right'></div>
                        <div className='authorization_block'>
                            <h2>Авторизация</h2>
                            <div>Мы ведем работу исключительно с юридическими лицами. Чтобы оформить заказ, пожалуйста введите необходимые данные:</div>
                            <br />
                            {
                                this.state.sms ? <div>

                                    <br />
                                    <span className='placeholder'>Код подтверждения из СМС</span>
                                    <input id='code_sms' type='text'></input>

                                    <br />
                                    <button onMouseDown={() => this.isMouseDown(1)} onMouseUp={() => this.isMouseUp(1)} className={this.state.isPrevDown ? 'authorization_button_down prev_btn' : 'authorization_button_up prev_btn'} onClick={this.changeSMS} >Назад</button>
                                    <button onMouseDown={() => this.isMouseDown(2)} onMouseUp={() => this.isMouseUp(2)} className={this.state.isConfirmDown ? 'authorization_button_down confirm_btn' : 'authorization_button_up confirm_btn'} onClick={this.authorization} >Подтвердить</button>
                                    <br /><br /><br />
                                    <div><Timer get_pasword={this.get_pasword} get_sec={this.get_sec} /></div>
                                </div> :
                                    <div>
                                        <br /><br />
                                        <span className='placeholder'>{'Телефон'}</span>
                                        <input id='input1' onFocus={this.plus} onChange={() => this.input_tel(1)} type='tel'></input>
                                        <input className='hide' id='phone_authorization' />
                                        <br />
                                        <br />
                                        <button onMouseDown={this.isMouseDown} onMouseUp={this.isMouseUp} className={this.state.isMouseDown ? 'authorization_button_down next_btn' : 'authorization_button_up next_btn'} onClick={() => this.get_pasword(1)} >Далее</button>
                                        <br /><br /><br />
                                        <div>Еще нет корпаративного аккаунта? <Link to='/registration' color='#00cc00'>Зарегистрируйтесь</Link><br /><br />
                                            Нажимая кнопку "Отправить заявку", вы соглашаетесь с <Link to='/registration' color='#00cc00'>Условиями пользования</Link> и <Link to='/registration' color='#00cc00'>Политикой конфиденциальности</Link>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    authorization = () => {
        const { log_in } = this.props.pageActions;
        let pass = document.getElementById('code_sms').value;
        $.get("http://instrument.kosatka.org/api/users/customers/auth/login/", {
            phone: this.state.phone_number,
            password: pass
        }).done(function (data) {
            console.log(data);
            if (data.status == "success") {
                document.cookie = "is_authorized=" + String(true);
                document.location.href = "/cabinet";
                log_in(true);
            }//else{alert('SMS код неверный')}
        })
    }
    isMouseDown = (x) => {
        if (x == 2) {
            this.setState({
                isConfirmDown: true
            })
        } else if (x == 1) {
            this.setState({
                isPrevDown: true
            })
        } else {
            this.setState({
                isMouseDown: true
            })
        }
    }
    isMouseUp = (x) => {
        if (x == 2) {
            this.setState({
                isConfirmDown: false
            })
        } else if (x == 1) {
            this.setState({
                isPrevDown: false
            })
        } else {
            this.setState({
                isMouseDown: false
            })
        }
    }
    plus = () => {
        let val = document.getElementById('input1').value
        if (!val) {
            document.getElementById('input1').value = '+'
        }
    }
    back = () => {
        window.history.back()
    }
    // changeINN = () => {
    //     this.setState(
    //         { inn: true }
    //     )
    //     document.getElementById("input1").value = ""
    // }
    // changeTEL = () => {
    //     this.setState(
    //         { inn: false }
    //     )
    //     document.getElementById("input1").value = ""
    // }
    changePass = () => {
        this.setState(
            { password: !this.state.password }
        )
    }
    deleteCookie = (name) => {
        this.setCookie(name, "", {
            expires: -1
        })
    }
    setCookie = (name, value, options) => {
        options = options || {};

        var expires = options.expires;

        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        var updatedCookie = name + "=" + value;

        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    }
    get_cookie = (cookie_name) => {
        var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

        if (results)
            return (unescape(results[2]));
        else
            return null;
    }
    get_pasword = (x) => {
        if (x == 1) {
            var val = document.getElementById('phone_authorization').value;
        } else {
            var val = this.state.phone_number
        }
        $.getJSON('http://instrument.kosatka.org/api/users/customers/auth/prepare?phone=' + String(val), function (result) {
            this.setState({
                sms_mes: result,
                phone_number: val
            })
            console.log(result);
            if (result.message) {
                let pass = result.message.split(': ')[1];
                console.log(pass)
                if (x == 1) { this.changeSMS(); }

                //$.get('https://sms.ru/sms/send?api_id=F25F96B2-8946-1D77-B332-D9CFAFB7C4EE&to=79308053637&msg='+String(pass)+'&json=1', {});
            } else {
                alert('Данный телефон не зарегистрирован на сайте, необходимо пройти Регистрацию')
            }
        }.bind(this));
    }
    changeSMS = () => {
        this.setState(
            { sms: !this.state.sms });
    }
    input_inn = (x) => {
        var val = String(document.getElementById("input" + String(x)).value);
        var num = val.replace(/\D/g, '').split(/(?=.)/), i = num.length - 1;
        if (5 <= i) num.splice(5, 0, ' ');
        // if (7 <= i) num.splice(9, 0, ' ');
        // if (11 <= i) num.splice(14, 0, ' ');
        if (num.length > 11) num.pop()
        document.getElementById("input" + String(x)).value = num.join('');
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

}
function mapStateToProps(state) {
    return {
        login: state.login
    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authorization);