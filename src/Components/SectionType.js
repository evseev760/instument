import React, { Component } from 'react';
import './SectionType.css';
import './Sections.css';

import ico1 from './img/ico1.svg';
import ico2 from './img/ico2.svg';
import ico3 from './img/ico3.svg';
import ico4 from './img/ico4.svg';
import ico5 from './img/ico5.svg';
import ico6 from './img/ico6.svg';
import ico7 from './img/ico7.svg';
import ico8 from './img/ico8.svg';
import ico9 from './img/ico9.svg';
import ico10 from './img/ico10.svg';

import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions'
import { bindActionCreators } from 'redux'
import $ from 'jquery';
window.jQuery = window.$ = $;

class SectionType extends Component {
    state = {
        dataVar1: [],
        type_id:''
    }
    componentWillMount() {
        this.get_type_name()
        this.setState({
            type_id: document.location.href.split('?')[1]
        })
    }
    componentWillUpdate() {
        console.log('1')
        
        if (this.state.type_id!=document.location.href.split('?')[1]){
            this.setState({
                type_id: document.location.href.split('?')[1]
            })
            this.get_type_name()
        }
    //     var sec_id = document.location.href.split('?')[1];      
    //     $.getJSON('http://instrument.kosatka.org/api/categories/get-categories', function (result) {
    //         result.map((x, i) =>
    //             result[i].id==sec_id? this.setState({
    //                     dataVar1: result[i],
    //                     index: i
    //                 }): false
    //         )
    //     }.bind(this));
    }
    render() {
        const ico = ["",ico1, ico2, ico3, ico4, ico5, ico6, ico7, ico8, ico9, ico10]
        return (
            <div id='sectionsSec'>
                <div id='caption' >
                    <div id='filter' >
                        <div className='row' id='dots'>
                            <div className='contSec'>
                                 <img src={ico[this.state.index+1]} /><br />{/*this.state.dataVar1.image */}
                                <div>{this.state.dataVar1.name}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
    get_type_name = () =>{
        var sec_id = document.location.href.split('?')[1];      
        $.getJSON('http://instrument.kosatka.org/api/categories/get-categories', function (result) {
            result.map((x, i) =>
                result[i].id==sec_id? this.setState({
                        dataVar1: result[i],
                        index: i
                    }): false
            )
        }.bind(this));
    }
}
function mapStateToProps(state) {
    return {
        page: state.page
    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionType);