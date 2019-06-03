import React, { Component } from 'react';
import './CatalogProductHead.css'
import { Link } from 'react-router';


import filtr from './img/filtr.svg';
import Filtr from './Filtr';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import $ from 'jquery';
window.jQuery = window.$ = $;

class CatalogProductHead extends Component {
    state = {
        isOpen: false,
        dataVar1: [],
        dataVar2: [],
        data_filtr: '',
        this_id: ''
    }
    componentDidMount() {
        const { catalogID } = this.props.catalogID;
        this.setState({ this_id: catalogID })
        this.update()

    }
    componentDidUpdate() {
        const { catalogID } = this.props.catalogID;

        if (this.state.this_id != catalogID) {

            this.get_caption();
            this.get_filtr_data();
            this.update();


            this.setState({
                this_id: catalogID
            })
        }
    }
    // componentWillUpdate(){
    //          setTimeout(() => {
    //              this.update()
    //          }, 2500);
    // }
    update = () => {
        var sec_id = String(document.location.href.split('?')[1]).split('#')[0];
        if (String(this.state.this_id) != String(document.location.href.split('?')[1])) {
            $.getJSON('http://instrument.kosatka.org/api/categories/get-parents-of-category?cat_id=' + String(sec_id), function (result) {
                if (result[1] && result[0]) {
                    var name = result[1].name
                    this.setState({
                        dataVar1: <div><h2>{name}</h2></div>,
                        dataVar2: <div><Link to='/'>Главная</Link> - <Link to={() => '/types?' + String(result[0].id)}>{result[0].name}</Link> - {name}</div>
                    });
                } else {
                    if (result[0]) {
                        this.setState({
                            dataVar1: <h2>{result[0].name}</h2>,
                            dataVar2: <div><Link to='/'>Главная</Link> - {result[0].name}</div>
                        })
                    }
                }
            }.bind(this));
            this.setState({ this_id: sec_id })
        }
        this.get_filtr_data();
    }
    render() {
        return (
            <div onTouchStart={this.checkScroll} onMouseDown={this.checkScroll} id='product_head'>
                <div className='product_head'>
                    <h2>{this.state.dataVar1}</h2>
                    {this.state.dataVar2}
                    <a href='#product_head'><button id='filtr_btn' onChange={this.openFiltr} onClick={this.openFiltr} type="button" className="btn btn-dark">{this.state.isOpen ? 'Свернуть' : 'Фильтры'}<img src={filtr} /></button></a>
                </div>
                <div id='filtr_container' className={this.state.isOpen ? 'filtr_open' : 'filtr_close'}>
                    {this.state.data_filtr}
                </div>
            </div>
        );
    }
    get_filtr_data = () => {
        const { getCategoriesInfo } = this.props.categoriesInfo;
        const { catalogID } = this.props.catalogID;

        if (getCategoriesInfo[0]) {
            setTimeout(() => {
                this.setState({
                    data_filtr: <Filtr build_list={this.props.build_list} name='Категории' value={getCategoriesInfo[0].dataToFilter.categories} />
                })
            }, 200);
        } else {
            setTimeout(() => {
                this.get_filtr_data()
            }, 200);
        }


    }
    get_caption = () => {
        const { catalogID } = this.props.catalogID;
        var sec_id = catalogID;
        $.getJSON('http://instrument.kosatka.org/api/categories/get-parents-of-category?cat_id=' + String(sec_id), function (result) {
            if (result[1]) {
                var name = result[1].name
                this.setState({
                    dataVar1: <div><h2>{name}</h2></div>,
                    dataVar2: <div><Link to='/'>Главная</Link> - <Link to={() => '/types?' + String(result[0].id)}>{result[0].name}</Link> - {name}</div>,
                });
            } else {
                this.setState({
                    dataVar1: <h2>{String(result[0].name)}</h2>,
                    dataVar2: <div><Link to='/'>Главная</Link> - {result[0]}</div>,
                });
            }
        }.bind(this));
    }
    checkScroll = () => {
        var count = 0;
        if (document.getElementById('filtr_btn').classList.contains('fixed') && count < 1) {
            this.setState(
                { isOpen: false }
            )
            count++;
        }
    }
    openFiltr = () => {
        this.setState(
            { isOpen: !this.state.isOpen }
        )
    }
    closeFiltr = () => {

        this.setState({ isOpen: false })


    }
}
function mapStateToProps(state) {
    return {
        item: state.basket,
        log_in: state.login,
        catalogID: state.catalogID,
        categoriesInfo: state.getCategoriesInfo,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CatalogProductHead);

