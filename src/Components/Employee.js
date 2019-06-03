import React, { Component } from 'react';
import './Employees.css';
import pansel from './img/pansel.svg';

import $ from 'jquery';
window.jQuery = window.$ = $;


class Employee extends Component {

    render() {

        const user = this.props.user;
        return (
            <div className='row employee'>
                <div className='col-md-5 col-6 name_employee'>{user.full_name}<span><br />{user.group_name}</span></div>
                <div className='col-md-3 col-4 tel_employee'>+{user.phone}</div>
                <div className='col-md-3 col-3 d-none d-md-block'><a href='#'>{user.email}</a></div>
                <div className='col-md-1 col-2'>
                    <button onClick={this.udate_on}><img src={pansel} /></button>
                </div>
            </div>
        );
    }
    udate_on = () => {
        const user = this.props.user
        const profil_update_func = this.props.profil_update_func
        profil_update_func(true,user)
    }
}

export default Employee;