import React, { Component } from 'react';
import './Employees.css';
import Employee from './Employee';
import plus from './img/plus.png';
import AddUser from './AddUser'

import $ from 'jquery';
window.jQuery = window.$ = $;


class Employees extends Component {
    state={
        user_update: false,
        users:[]
    }
    componentDidMount(){
        this.get_users()
    }
    render() {
        
        const text = this.props.text;
        const user = this.props.user;
        return (
            <div id='cabinet_table'>
            {this.state.user_update?<AddUser get_users={this.get_users} add_user={this.add_user} />
                :<div className='in_table'>
                    <div className='row cabinet_table_caption'>
                        <div className='col-11 '><h2>{text}</h2></div>
                        <div onClick={this.add_user} className='add_employee col-md-1 col-1'><button>{window.innerWidth > 767 ? 'Добавить сотрудника' : ''} <img src={plus} /></button></div>
                    </div>
                    <hr />
                    <div>
                        <div className='row employee employee_caption'>
                            <div className='col-md-5 col-6 name_employee'><span>Ф.И.О./Роль</span></div>
                            <div className='col-md-3 col-4'><span>Телефон</span></div>
                            <div className='col-md-3 col-3 d-none d-md-block'><span>Электронная почта</span></div>
                            <div className='col-md-1 col-2 '><span>Ред.</span></div>
                        </div>
                        {this.state.users}
                    </div>
                </div>
            }
            </div>
        );
    }
    get_users = () =>{
        $.getJSON('http://instrument.kosatka.org/api/users/customers/organizations/employees/get-employees/', function (result) {
            this.setState({
                users: result.employees.map((x, i) =>
                    <Employee key={i} profil_update_func={this.props.profil_update_func} user={result.employees[i]} />
                )
            })
        }.bind(this));
    }
    add_user = () =>{
        this.setState({
            user_update: !this.state.user_update
        })
    }

}

export default Employees;