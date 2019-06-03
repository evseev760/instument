import React, { Component } from 'react';
import CatalogProduct from './CatalogProduct';
import CatalogProductHead from './CatalogProductHead';
import './CatalogProduct.css';
import './Search.css';
import { Link } from 'react-router';
import viewGrid from './img/view_01.svg';
import viewCol from './img/view_02.svg';
import narrow_down from './img/narrow_down.svg';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
window.jQuery = window.$ = $;

class Search extends Component {
    state = {
        not_fonde: '',
        grid: false,
        dataVar1: [],
        page_list: 1,
        this_id: '',
        this_id2: '',
        more_product: false,
        url_item: '&order[desc]=name',
        filtr_url: ''
    }
    onFiltrScrol() {
        this.props.FiltrScrol(false);
    }
    

    // componentWillUpdate() {
    //     //     var showData = [];
    //     // if(action.payload != ''){
           
    //     //         showData.push(result);
            
    //     // }else{
    //     //     showData = [];
    //     // }
    //     const {search} = this.props.search; 
    //     // console.log(search[0])
    //     // if(search){
    //     // if (search!=null && search != this.state.this_id) {
                
    //     //         var url = 'http://instrument.kosatka.org/api/search/?query=' + String(search)
    //     //         $.getJSON(url , function (result) {
    //     //             if (result.products!=null){
    //     //                 this.setState({
    //     //                     dataVar2: result.products.map((x, i) =>
    //     //                         <CatalogProductCol key={i + 2000} product={result.products[i]} />),
    //     //                     this_id: search
    //     //                 });
    //     //                 if (document.getElementById('search_non_founde') != null){
    //     //                     document.getElementById('search_non_founde').classList.add('hide');
    //     //                 }
    //     //             }else {
    //     //                 setTimeout(() => {
    //     //                     this.setState({
    //     //                         not_fonde: 'Совпадений не найдено', 
    //     //                     });
    //     //                 }, 1000);
    //     //                 if (document.getElementById('search_non_founde') != null){
    //     //                     document.getElementById('search_non_founde').classList.remove('hide');
    //     //                 }
    //     //             }

    //     //         }.bind(this));
    //     // } else if(!this.state.not_fonde && search==null){
    //     //     this.setState({
    //     //         not_fonde: 'Совпадений  '
    //     //     });
    //     // }}  
    // }
    componentWillUnmount() {
        window.onscroll = function () { }
    }
    componentDidMount() {
        var count = 0;
    }

    render() {
        const { search } = this.props.search;
        //const { search } = this.props.search; 
        return (
            <div id='search_list'>
                <div id='search_non_founde'>{this.props.massage_search} <strong>{/*this.props.not_result*/}</strong></div>
                <div id='product_list' className='row product_lis'>
                    {this.props.search_result}
                    {this.state.more_product ? <div className='more_product'><button className='btn' onClick={this.update}>Больше</button></div> : ''}
                </div>
            </div>
        );
    }
    
}

function mapStateToProps(state) {
    return {
        fltr_btn: state.fltrBtn,
        log_in: state.login,
        //search: state.search,
        search: state.search
    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);