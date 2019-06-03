import React, { Component } from 'react';
import './Sections.css';
import dots from './img/bg_dot.png';
import { Link } from 'react-router';
import Section from './Section';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import $ from 'jquery';
window.jQuery = window.$ = $;




class Sections extends Component {

    state = {
        dataVar1: [],
    }

    componentDidMount() {

        $.getJSON('http://instrument.kosatka.org/api/categories/get-categories', function (result) {

            this.setState({
                dataVar1: result
            });
        }.bind(this));
    }

    render() {
        const { SecName } = this.props.pageActions
        return (
            <div id='sections'>
                <div id='caption' >
                    <div id='filter' >
                        <div className='row' id='dots'>
                            {this.state.dataVar1.map((x, i) =>
                                
                                i<10?<Section num={i + 1} key={[i]} SecName={SecName} id={this.state.dataVar1[i].id} img={this.state.dataVar1[i].image} text={this.state.dataVar1[i].name} children={this.state.dataVar1[i].children_amount} />:''
                                
                            )}
                        </div>
                    </div>
                </div>
                <a href={'#postavchiki'}><button id='hide_blok' type="button" className="btn "></button></a>

            </div>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(Sections);