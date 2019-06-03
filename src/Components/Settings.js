import React, { Component } from 'react';
import './Employees.css';
import './Settings.css';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
window.jQuery = window.$ = $;


class Settings extends Component {

    render() {
        return (
            <div id='cabinet_table'>

                <div>
                    <div className=' employee employee_caption'></div>
                    {/* <button onClick={this.log_out.bind(this)} className='btnse log_out_btn'>Выйти</button> */}
                </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(Settings);