import React, { Component } from 'react';
import './LeftBar.css'
import img from './img/logo-01.svg';
import CabinetField from './CabinetField';
import setting from './img/settings.svg';
import key_24 from './img/key-24px.svg';
import shopping_24px from './img/shopping_24px.svg';
import user_24px from './img/user_24px.svg';
import open_left_bar from './img/open_left_bar.svg';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
window.jQuery = window.$ = $;


class LeftBar extends Component {
    state = {
        isOpen: window.innerWidth < 1000 ? false : true,
        is_btn_bar: 'Заказы'
    }
    render() {
        const user = this.props.user_data
        return (
            <div className='cabinet_container' >
                <div id='left_bar_container'>
                    <div className={this.state.isOpen ? 'bar_open' : 'bar_close'} id='left_bar'>
                        <div className='client_logo'>
                            <img src={img} /><br />
                            <span>{user.user.organization.name}</span>
                        </div>

                        <div onClick={window.innerWidth < 500 ? this.close_ : this.nothing} className='bar_elements'>
                            <div className='selected_item' onClick={() => this.isItem(2)} id='bar_item_2'><img src={shopping_24px} />ЗАКАЗЫ</div>
                            {user.user.group.id=='1'?<div className='' onClick={() => this.isItem(1)} id='bar_item_1'><img src={user_24px} />СОТРУДНИКИ</div>:''}
                            <div className='' onClick={() => this.isItem(3)} id='bar_item_3'><img src={key_24} />КЛЮЧИ</div>
                            <div className='' onClick={() => this.isItem(4)} id='bar_item_4'><img src={setting} />НАСТРОЙКИ</div>
                            <div id='log_out' onClick={this.log_out.bind(this)}>ВЫЙТИ</div>
                        </div>
                        
                    </div>
                    <div id='bar_hide' className={this.state.isOpen ? 'bar_hide_open' : 'bar_hide_close bar_hide_open'}>
                        <button className={this.state.isOpen ? 'bar_open_btn' : 'bar_close_btn'} onClick={this.closeBar}><img src={open_left_bar} /></button>
                    </div>
                </div>
                <CabinetField user={user.user} text={this.state.is_btn_bar.toLowerCase()} />
            </div>
        );
    }
    log_out = () => {
        const { log_in } = this.props.pageActions
        log_in(false);
        document.cookie = "is_authorized=" + String(false);
        $.get('http://instrument.kosatka.org/api/users/customers/auth/logout/ ', {});
        document.location.href = '/';
    }
    closeBar = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
        var table = document.getElementById('cabinet_container');
        if (!table) { '' } else { $('#cabinet_container').toggleClass('more_width'); }
    }
    close_ = () => {
        this.setState({
            isOpen: false
        });
        var table = document.getElementById('cabinet_container');
        if (table && this.state.isOpen) { $('#cabinet_container').toggleClass('more_width'); }
    }
    nothing = () => {
        return false
    }
    isItem = (x) => {
        $(".bar_elements div").removeClass("selected_item");
        var item = document.getElementById('bar_item_' + String(x));
        item.classList.add('selected_item');
        var text = item.textContent || item.innerText
        this.setState({
            is_btn_bar: text
        })
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


export default connect(mapStateToProps, mapDispatchToProps)(LeftBar);