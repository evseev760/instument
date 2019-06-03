import React, { Component } from 'react';
import './Section.css';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

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

import ico1b from './img/ico1b.svg';
import ico2b from './img/ico2b.svg';
import ico3b from './img/ico3b.svg';
import ico4b from './img/ico4b.svg';
import ico5b from './img/ico5b.svg';
import ico6b from './img/ico6b.svg';
import ico7b from './img/ico7b.svg';
import ico8b from './img/ico8b.svg';
import ico9b from './img/ico9b.svg';
import ico10b from './img/ico10b.svg';

class Section extends Component {
    state={
        hover: true
    }
    onSecClick() {
        this.props.SecName(this.props.id, this.props.text, this.props.img)
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                hover: false
            })
        }, 50);
    }
    render() {
        const ico = ["", ico1, ico2, ico3, ico4, ico5, ico6, ico7, ico8, ico9, ico10]
        const icob = ["", ico1b, ico2b, ico3b, ico4b, ico5b, ico6b, ico7b, ico8b, ico9b, ico10b]
        return (
            <div onMouseOver={this.hoverON} onMouseLeave={this.hoverOFF} className='section'>
                {this.props.children > 1 ?
                    <Link to={() => '/types?' + String(this.props.id)} >
                        <div className='cont'>
                            <img src={this.state.hover?icob[this.props.num]:ico[this.props.num]} /><br />{/*this.props.img */}
                            <div>{this.props.text}</div>
                        </div>
                    </Link> :
                    <Link onClick={() => this.changeID(this.props.id)} >
                        <div className='cont'>
                            <img src={this.state.hover?icob[this.props.num]:ico[this.props.num]} /><br />{/*this.props.img */}
                            <div>{this.props.text}</div>
                        </div>
                    </Link>
                }
            </div>
        );
    }
    hoverON = () =>{
        this.setState({
            hover: true
        })
    }
    hoverOFF = () =>{
        this.setState({
            hover: false
        })
    }
    changeID = (id) => {
        const { page } = this.props.page;
        const { fltrBtn } = this.props.fltr_btn;
        const { sort } = this.props.sort
        const { get_categories_info } = this.props.pageActions;
        const { change_id } = this.props.pageActions;
        browserHistory.push('/catalog?' + String(id));
        change_id(id);
        get_categories_info(id, page, sort, fltrBtn)
    }
}
function mapStateToProps(state) {
    return {
        fltr_btn: state.fltrBtn,
        log_in: state.login,
        catalogID: state.catalogID,
        categoriesInfo: state.getCategoriesInfo,
        page: state.page,
        sort: state.sort,
        item: state.basket,

    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Section);