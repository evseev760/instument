import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

//import './CatalogTypes.css'

class FiltrBtn extends Component {
    state = {
        isActive: false
    }
    componentWillMount() {
        this.setState({
            val: this.props.value
        })
    }
    componentDidUpdate() {
        if (this.props.value != this.state.val) {
            this.no_active()
            this.setState({
                val: this.props.value
            })
        }
    }
    componentWillUnmount() {
        const { remove_filtr } = this.props.pageActions;
        remove_filtr(this.props.id);
        this.no_active()
    }
    render() {
        return (
            <button onClick={this.active} className={this.state.isActive ? 'active_flt value ' : 'no_active value '}>{this.props.value}</button>
        );
    }
    no_active = () => {
        this.setState(
            { isActive: false }
        )
    }
    active = () => {
        const { page } = this.props.page;
        const { sort } = this.props.sort;
        const { fltrBtn } = this.props.fltr_btn;
        const { catalogID } = this.props.catalogID;
        const { get_categories_info } = this.props.pageActions;
        const { remove_filtr } = this.props.pageActions;

        const { add_filtr } = this.props.pageActions;
        //const {add_filtr}= this.props.pageActions

        this.setState(
            { isActive: !this.state.isActive }
        )
        if (!this.state.isActive) {
            add_filtr(this.props.id)
            var filtr_now = fltrBtn + '&filter[child_id][]=' + this.props.id;
            get_categories_info(catalogID, page, sort, filtr_now);
        } else {
            remove_filtr(this.props.id);
            let arr = fltrBtn;
            let rem = '&filter[child_id][]=' + String(this.props.id)
            arr = String(arr).split(String(rem))
            filtr_now = String(arr).replace(/\,/g, '');
            get_categories_info(catalogID, page, sort, filtr_now);
        }
        this.add_url()
    }
    add_url = () => {
        setTimeout(() => {
            this.props.build_list()
        }, 500);
        setTimeout(() => {
            this.props.build_list()
        }, 500);
    }
}
function mapStateToProps(state) {
    return {
        fltr_btn: state.fltrBtn,
        log_in: state.login,
        catalogID: state.catalogID,
        categoriesInfo: state.getCategoriesInfo,
        page: state.page,
        sort: state.sort
    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FiltrBtn);
// http://instrument.kosatka.org/api/categories/get-parents-of-category?cat_id=205
// http://instrument.kosatka.org/api/products/get-products-in-category?parent_id=205&page=1&filter[child_id][]=3&filter[child_id][]=174&filter[child_id][]=205