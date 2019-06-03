import React, { Component } from 'react';
import CatalogTypes from './CatalogTypes';
import './CatalogTypes.css'
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
window.jQuery = window.$ = $;


class CatalogList extends Component {
    state = {
        dataVar1: [],
        typeID: ''
    }
    componentWillMount() {
        this.get_types()
    }
    componentWillUpdate(){
        var {typeID} = this.props.typeID;
        const { change_type_id } = this.props.pageActions;
        
        if (typeID =! this.state.typeID) {
            if (typeID){
                typeID = document.location.href.split('?')[1];
            }
            change_type_id(typeID)
            this.setState({
                typeID:typeID
            })
            this.get_types(typeID)
        }
        // const {typeID} = this.props.typeID;
        // if (this.state.typeID!= typeID){
        // setTimeout(() => {
        //     this.get_types()
        // }, 1000);
        // }
    }
    componentDidUpdate() {
        // $.getJSON('http://instrument.kosatka.org/api/categories/get-categories?parent_id=' + String(type_id), function (result) {
        //     this.setState({
        //         dataVar1: result,
        //     });
        // }.bind(this));
    }
    componentWillUnmount() {

    }
    render() {
        const { change_id } = this.props.pageActions
        return (
            <div className='row contaner_type'>
                {this.state.dataVar1.map((x, i) =>
                    <CatalogTypes change_id={change_id} key={[i]} types={this.state.dataVar1[i]} />
                )}
            </div>
        );
    }
    get_types = (x) => {
        if(!x){
        const { change_type_id } = this.props.pageActions;
        const { typeID } = this.props.typeID;
        if (typeID != '') {
            var type_id = typeID
        } else {
            var type_id = document.location.href.split('?')[1];
            change_type_id(type_id)
        }
        this.setState({
            type_id: type_id
        })
        }else{
            var type_id =x;
        }
        $.getJSON('http://instrument.kosatka.org/api/categories/get-categories?parent_id=' + String(type_id), function (result) {
            this.setState({
                dataVar1: result,
            });
        }.bind(this));
    }
}
function mapStateToProps(state) {
    return {
        typeID: state.typeID
    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogList);