import React, { Component } from 'react';
import Header from './Header';
import './Authorization.css';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
window.jQuery = window.$ = $;

class Registration extends Component {
    state = {
        crietor: true,
        password: true,
        sms: false,
        captcha: []
    }
    componentDidMount() {
        this.captcha_change();
        document.getElementById('footer').classList.add('hide');
    }
    componentWillUnmount(){
        document.getElementById('footer').classList.remove('hide');
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
                            <h2>Регистрация</h2>
                            <br/><br/>
                            <div className='reg_container'>
                                <div className='help_text'>Выберите тип вашей организации:</div>
                                <div className='group_id btn-group'>
                                    <input type='button' onClick={this.changeINN} className={this.state.crietor ? 'is_choose' : 'is_no_choose'} value='Производитель' />
                                    <input type='button' onClick={this.changeTEL} className={this.state.crietor ? 'is_no_choose' : 'is_choose'} value='Торгующая компания' />
                                    <input readOnly className='hide' id='organization_type' value={this.state.crietor ? '1' : '2'} />
                                </div>
                                <br/><br/>
                                <div className='help_text'>Заполните для Регистрации:</div>
                                <span className='placeholder'>ИНН</span>
                                <input onChange={() => this.input_inn(1)} type="text" name="INN" id="INN"></input>
                                <span className='placeholder'></span>
                                <span className='placeholder'>Имя контактного лица</span>
                                <input type="text" id="full_name"></input>
                            </div><div className='reg_container'>
                                <span className='placeholder'>Телефон</span>
                                <input onFocus={this.plus} id='input5' onChange={() => this.input_tel(5)} type='tel'></input>
                                <span className='placeholder'>email</span>
                                <input id='email'></input>
                                <span className='placeholder'>Шесть цифр с картинки</span>
                                <input autoComplete="off" type="text" id='captcha' />
                                <span className='placeholder'></span>
                                <input className='captcha_cont' type="hidden" id='captcha_token' ></input>
                                <br /><br /><br />
                                <img className='captcha_img' onClick={this.captcha_change} src={this.state.captcha.image} />
                                <input className='hide' type='hidden' id="phone" type='tel'></input>
                            </div>

                            <button onClick={this.submit} className='send_btn'>Отправить заявку</button>
                            <br /><br />
                            <div className='conditions'>Нажимая кнопку "Отправить заявку", вы соглашаетесь с <Link to='/registration' color='#00cc00'>Условиями пользования</Link> и <Link to='/registration' color='#00cc00'>Политикой конфиденциальности</Link></div>
                            <br />
                            Уже зарегистрированы? <Link to='/authorization' color='#00cc00'>Войти</Link></div>
                        <br />

                    </div>
                </div>
            </div>
        );
    }
    submit = () => {

        var tel = document.getElementById('input5').value
        let INN = document.getElementById('INN').value
        let organization_type = document.getElementById('organization_type').value
        let full_name = document.getElementById('full_name').value
        let phone = document.getElementById('phone').value
        let email = document.getElementById('email').value
        let captcha = document.getElementById('captcha').value
        let captcha_token = this.state.captcha.token
        $.post("http://instrument.kosatka.org/api/users/customers/register/", {
            INN: INN,
            organization_type: organization_type,
            full_name: full_name,
            phone: phone,
            email: email,
            captcha: captcha,
            captcha_token: captcha_token
        }).done(function (data) {
            console.log(data);
            if (data.status == "success") {
                document.cookie = "reg_number=" + String(tel);
                document.location.href = "/authorization";


            } else { alert(data.error.message) }
        });
    }
    captcha_change = () => {
        $.getJSON('http://instrument.kosatka.org/api/users/customers/register/prepare', function (result) {
            this.setState({
                captcha: result
            });
        }.bind(this));
    }
    plus = () => {
        if (!document.getElementById('input5').value) document.getElementById('input5').value = '+';
    }
    back = () => {
        window.history.back()
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
        document.getElementById("phone").value = num2;
    }
    input_inn = (x) => {
        var val = String(document.getElementById("INN").value);
        var num = val.replace(/\D/g, '').split(/(?=.)/), i = num.length - 1;
        // if (5 <= i) num.splice(5, 0, ' ');
        // if (7 <= i) num.splice(9, 0, ' ');
        // if (11 <= i) num.splice(14, 0, ' ');
        if (num.length > 10) num.pop()
        document.getElementById("INN").value = num.join('');
    }
    changeINN = () => {
        this.setState(
            { crietor: true }
        )

    }
    changeTEL = () => {
        this.setState(
            { crietor: false }
        )

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
export default connect(mapStateToProps, mapDispatchToProps)(Registration);