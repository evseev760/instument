import React, { Component } from 'react';
//import './CatalogTypes.css'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import FiltrBtn from './FiltrBtn';

class Filtr extends Component {


    render() {
        const { fltrBtn } = this.props.fltr_btn;
        const { add_filtr } = this.props.pageActions;
        return (
            <div className='filtr'>

                <h5 className='name'>{this.props.name}</h5>
                <div className='row'>
                    {this.props.value.map((x, i) =>
                        <FiltrBtn build_list={this.props.build_list} fltrBtn={fltrBtn} fltr_action={add_filtr} key={[i]} id={this.props.value[i].id} value={this.props.value[i].name} />
                    )}
                </div>
            </div>
        );
    }

}
function mapStateToProps(state) {
    return {
        fltr_btn: state.fltrBtn,
        log_in: state.login,

    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Filtr);