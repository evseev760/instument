import React, { Component } from 'react';
import './Employees.css';
import './ProfilUdate.css'
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
window.jQuery = window.$ = $;


class AddUser extends Component {
    state = {
        crietor: true
    }
    componentDidMount(){
        const user = this.props.user;
        
        // setTimeout(() => {
        //     document.getElementById('full_name').value = user.full_name;
        //     document.getElementById('input5').value = user.phone;
        //     document.getElementById('phone').value = user.phone;
        //     document.getElementById('email').value = user.email;
        //     document.getElementById('organization_type').value = user.customer_group_id;
        //     if (user.customer_group_id=='2'){
        //         this.setState({
        //             crietor:false
        //         })
        //     }
        //     //alert(this.props.id) // это id редактируемого профиля
        // }, 500);
        
    }
    render() {
        return (
            <div className='profil_update_table'>
                Ведите данные нового сотрудника:
                <br/><br/>
                <span className='placeholder'>Контактное лицо</span>
                <input id='full_name'></input>
                <span className='placeholder'>Телефон</span>
                <input onFocus={this.plus} id='input5' onChange={() => this.input_tel(5)} type='tel'></input>
                <span className='placeholder'>email</span>
                <input id='email'></input>
                <br />
                <input className='hide' type='hidden' id="phone" type='tel'></input>
                <button onClick={this.udate_off} className='update_no'>Отмена</button>
                <button onClick={this.save_add} className='update_yes'>Сохранить</button>
            </div>
        );
    }
    save_add = () => {
        let full_name = document.getElementById('full_name').value
        let phone = document.getElementById('phone').value
        let email = document.getElementById('email').value
        $.post("http://instrument.kosatka.org/api/users/customers/organizations/employees/add/", {
            full_name: full_name,
            phone: phone,
            email: email
        }).done((data) => {
            console.log(data);
            if (data.status == "success") {
                console.log(data);
                this.props.get_users();
                this.udate_off();
            } else { alert(data.error.message) }
        });
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
    udate_off = () => {
        this.props.add_user()
        // const profil_update_func = this.props.profil_update_func
        // profil_update_func(false)
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
        log_in: state.login
    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddUser);