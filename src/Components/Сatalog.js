import React, { Component } from 'react';
import './Catalog.css';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import $ from 'jquery';
window.jQuery = window.$ = $;

class Catalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataVar1: [],
            dataVar2: [],
            OverName: '',
            Overid: '',
            Overimage: ''
        }
    }
    componentDidMount() {
        $.getJSON('http://instrument.kosatka.org/api/categories/get-categories', function (result) {
            this.setState({
                dataVar1: result
            });
        }.bind(this));
    }
    render() {
        return (
            <div id='catalog'>
                <div className='row'>
                    <div className='col-xl-4 col-lg-5 menu'>
                        {this.state.dataVar1.map((x, i) =>
                            i<10?this.state.dataVar1[i].children != 0 ?
                                <div key={'rfn_sec_' + String(i)} onClick={() => this.change_type(String(this.state.dataVar1[i].id))}>
                                    <div  onMouseEnter={() => this.changeOver(this.state.dataVar1[i].id, this.state.dataVar1[i].name, this.state.dataVar1[i].image)}><nobr >{this.state.dataVar1[i].name}</nobr></div>
                                </div> :
                                <Link key={'rfn_sec_' + String(i)} to={() => '/catalog?' + String(this.state.dataVar1[i].id)}>
                                    <div onMouseEnter={() => this.changeOver(this.state.dataVar1[i].id, this.state.dataVar1[i].name, this.state.dataVar1[i].image)}><nobr >{this.state.dataVar1[i].name}</nobr></div>
                                </Link>:''
                        )}
                    </div>
                    <div className='col-xl-8 col-lg-7 sec_caption'>
                        <h4>{this.state.OverName}</h4>
                        <hr />
                        <div className='row'>
                            {this.state.dataVar2.map((x, i) =>
                                <div onClick={() => this.changeID(this.state.dataVar2[i].id)} title={String(this.state.dataVar2[i].name)} className='col-6 catalog_under_cat' ><span key={i} ><span><nobr>{this.state.dataVar2[i].name}</nobr></span></span></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    changeID = (id) => {
        const { add_filtr } = this.props.pageActions;
        const { fltrBtn } = this.props.fltr_btn;
        const { sort } = this.props.sort;
        const { get_categories_info } = this.props.pageActions;
        const { change_id } = this.props.pageActions;

        change_id(id);

        get_categories_info(id, 1, sort, '')
        add_filtr('')
        browserHistory.push('/catalog?' + String(id));
    }
    change_type = (id) =>{
        const { change_type_id } = this.props.pageActions;
        change_type_id(id)
        browserHistory.push('/types?' + String(id));
    }
    changeOver = (id, name, image) => {
        this.setState(
            {
                OverName: name,
                Overid: id,
                Overimage: image
            }
        );
        $.getJSON('http://instrument.kosatka.org/api/categories/get-categories?parent_id=' + String(id), function (result) {
            this.setState({
                dataVar2: result
            });
        }.bind(this));
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
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);

