import React, { Component } from 'react';
import './Employees.css'
import Employees from './Employees';
import Orders from './Orders';
import Settings from './Settings';
import ProfilUdate from './ProfilUdate';
import $ from 'jquery';
window.jQuery = window.$ = $;


class CabinetField extends Component {
    state = {
        isList: true,
        profil_update: false,
        id_update:''
    }
    render() {
        const user = this.props.user
        const text = this.props.text
        return (
            <div className={window.innerWidth < 1000 ? 'more_width' : ''} id='cabinet_container'>
                {this.state.profil_update ? <ProfilUdate id={this.state.id_update} user={user} profil_update_func={this.profil_update_func} /> : <div>

                    {this.props.text == 'сотрудники' ? <div><Employees text={text} profil_update_func={this.profil_update_func} user={user} /></div> : ''}
                    {this.props.text == 'заказы' ? <div><Orders text={text} /></div> : ''}
                    {this.props.text == 'ключи' ? <div><div className='btn-group'>
                    </div></div> : ''}
                    {this.props.text == 'настройки' ? <div>{/* <div className='btn-group'>
                        <button onClick={this.changeList} className={this.state.isList ? 'is_choose_employees' : 'no_choose_employees'}>Настройки этого</button>
                        <button onClick={this.changeRoles} className={this.state.isList ? 'no_choose_employees' : 'is_choose_employees'}>Настройки того</button>
                    </div>*/}<Settings /></div> : ''}
                </div>
                }
            </div>
        );
    }
    profil_update_func = (x, y='') => {
        this.setState({
            profil_update: x,
            id_update: y
        })
    }
    changeList = () => {
        this.setState(
            { isList: true }
        )
    }
    changeRoles = () => {
        this.setState(
            { isList: false }
        )
    }
}

export default CabinetField;