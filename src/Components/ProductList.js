import React, { Component } from 'react';
import CatalogProduct from './CatalogProduct';
import CatalogProductCol from './CatalogProductCol';
import CatalogProductHead from './CatalogProductHead';
import './CatalogProduct.css';
import viewGrid from './img/view_01.svg';
import viewCol from './img/view_02.svg';
import narrow_down from './img/narrow_down.svg';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import catalog_ID from '../reducers/catalogID';
import $ from 'jquery';
window.jQuery = window.$ = $;

class ProductList extends Component {
    state = {
        grid: true,
        dataVar1: [],
        page_list: 1,
        this_id: '',
        this_id2: '',
        more_product: false,
        url_item: '&order[asc]=price',
        filtr_url: ''
    }
    onFiltrScrol() {
        this.props.FiltrScrol(false);
    }
    componentWillMount() {
        const { page } = this.props.page;
        const { fltrBtn } = this.props.fltr_btn;
        const { sort } = this.props.sort
        const { get_categories_info } = this.props.pageActions;
        const { change_id } = this.props.pageActions;
        const { catalogID } = this.props.catalogID;
        if (catalogID == '') {
            var this_id = String(document.location.href.split('?')[1]).split('#')[0];
            change_id(String(document.location.href.split('?')[1]).split('#')[0])
        } else { var this_id = catalogID }
        get_categories_info(this_id, 1, sort, '')
        this.build_list()
    }
    componentDidMount() {
        const { getCategoriesInfo } = this.props.categoriesInfo;
        console.log(getCategoriesInfo)
    }
    componentDidUpdate() {
        const { catalogID } = this.props.catalogID;
        if (this.state.this_id != catalogID) {
            this.build_list()

            this.setState({
                this_id: catalogID
            })
        }
    }
    componentWillUnmount() {
        window.onscroll = function () { }
    }
    componentDidMount() {
        var count = 0;
        if (count < 5) {
            window.onscroll = function () {
                var selectString = document.getElementById('select_string');
                var avatarSourceBottom = document.getElementById('product_list').getBoundingClientRect().top + window.pageYOffset - 50;
                var listBottom = document.getElementById('product_list').getBoundingClientRect().bottom + window.pageYOffset - 50;
                var filtrBtn = document.getElementById('filtr_btn');
                var katBtn = document.getElementById('kat_btn');
                if (selectString.classList.contains('fixed_string') && window.pageYOffset < avatarSourceBottom + 50) {
                    selectString.classList.remove('fixed_string');
                    filtrBtn.classList.remove('fixed');
                    katBtn.classList.remove('fixed_kat');
                    document.getElementById('product_list').classList.remove('product_list');
                    document.getElementById('kat_link').removeAttribute("href");
                    count = 0;
                    if (document.getElementById('filtr_container').classList.contains('filtr_open')) {
                        document.getElementById('filtr_btn').firstChild.data = 'Свернуть';
                    }
                } else if (window.pageYOffset > avatarSourceBottom) {
                    selectString.classList.add('fixed_string');
                    filtrBtn.classList.add('fixed');
                    katBtn.classList.add('fixed_kat');
                    document.getElementById('product_list').classList.add('product_list');
                    count++;
                    document.getElementById('filtr_btn').firstChild.data = 'Фильтры';
                    document.getElementById('kat_link').href = '#catalog'
                }

                // if (window.pageYOffset > listBottom - (window.innerHeight- 30)) {
                //     document.location.href=(String(document.location.href.split('?')[0]) +'?'+ String(document.location.href.split('?')[1]) +'?'+ String(parseInt(document.location.href.split('?')[2])+1))
                // }
            };
            window.state = function () {
                if (document.location.href.split('/#/')[1] === 'product_head' || '') {
                    window.history.back()
                }
            }
        }
    }

    render() {

        return (
            <div>
                <CatalogProductHead build_list={this.build_list} />
                <div>
                    <div id='select_string' className='row select_string'>
                        <div className='sort'><span>Сортировать</span>
                            
                                <select id='sorting_list' onChange={this.sorting} className='btn' type="button">
                                    <option >Увеличение цены</option>
                                    <option >Уменьшение цены</option>
                                    <option >Название: А-Я</option>
                                    <option >Кол. в наличии</option>
                                </select>
                            
                                {/* <img className='narrow' src={narrow_down} /> */}
                            
                        </div>
                        <div className='view'>
                            <span>Вид каталога</span>
                            <button id="is_greed" onClick={this.isGrid} className={this.state.grid ? 'this_view btn' : 'not_this btn'} type="button" > <img src={viewGrid}></img></button>
                            <button onClick={this.isCol} className={this.state.grid ? 'not_this btn' : 'this_view btn'} type="button" ><img src={viewCol} /></button>
                        </div>
                    </div>
                    <div id='product_list' className='row product_lis'>
                        {this.state.grid ? this.state.dataVar1 : this.state.dataVar2}
                        {this.state.more_product ? <div className='more_product'><button className='btn' onClick={this.update}>Больше</button></div> : ''}
                    </div>
                </div>
            </div>
        );
    }
    build_list = (x) => {
        const { getCategoriesInfo } = this.props.categoriesInfo;
        if (!getCategoriesInfo[0]) {
            setTimeout(() => {
                this.build_list()
            }, 100);
        }

        if (getCategoriesInfo[0]) {
            this.setState({
                dataVar1: getCategoriesInfo[0].products.map((x, i) =>
                    <CatalogProduct key={i + 3000} product={getCategoriesInfo[0].products[i]} />),
                dataVar2: getCategoriesInfo[0].products.map((x, i) =>
                    <CatalogProductCol key={i + 4} product={getCategoriesInfo[0].products[i]} />),

            });
            this.more_product(getCategoriesInfo[0])
        } else {
            this.setState({
                dataVar1: 'Категория пуста',
                dataVar2: 'Категория пуста',

            });
        }
    }
    sorting = () => {
        const { page } = this.props.page;
        const { fltrBtn } = this.props.fltr_btn;
        const { add_sort } = this.props.pageActions;
        const { catalogID } = this.props.catalogID;
        const { get_categories_info } = this.props.pageActions;

        var val = document.getElementById('sorting_list').value;
        switch (val) {
            case "Название: А-Я":
                var url_item = '&order[asc]=name';
                break;

            case "Увеличение цены":
                var url_item = '&order[asc]=price';
                break;

            case "Уменьшение цены":
                var url_item = '&order[desc]=price';
                break;

            case "Кол. в наличии":
                var url_item = '&order[asc]=rest';
                break;

            default:
                break;
        }
        this.setState({
            url_item: url_item
        })
        add_sort(url_item);
        get_categories_info(catalogID, page, url_item, fltrBtn)
        setTimeout(() => {
            this.build_list()
        }, 500);
        
    }
    more_product = (result) => {
        if (result.pagination.currentPage < result.pagination.totalPages) {
            this.setState({
                more_product: true
            })
        } else {
            this.setState({
                more_product: false
            })
        }
    }
    update = () => {
        var { page } = this.props.page;
        const { fltrBtn } = this.props.fltr_btn;
        const { sort } = this.props.sort;
        const { catalogID } = this.props.catalogID;
        const { get_categories_info } = this.props.pageActions;
        const { add_page } = this.props.pageActions;
        add_page(page++)
        get_categories_info(catalogID, page++, sort, fltrBtn);

        setTimeout(() => {
            this.add_more_product()
        }, 500);
    }
    add_more_product = () => {
        const { getCategoriesInfo } = this.props.categoriesInfo;
        if (getCategoriesInfo[0].products) {
            this.setState({
                dataVar1: this.state.dataVar1.concat(getCategoriesInfo[0].products.map((x, i) =>
                    <CatalogProduct product={getCategoriesInfo[0].products[i]} />)),
                dataVar2: this.state.dataVar2.concat(getCategoriesInfo[0].products.map((x, i) =>
                    <CatalogProductCol product={getCategoriesInfo[0].products[i]} />))
            });
        }
        this.more_product(getCategoriesInfo[0]);
    }
    isGrid = () => {
        this.setState(
            { grid: true }
        )
    }
    isCol = () => {
        const { getCategoriesInfo } = this.props.categoriesInfo;

        this.setState(
            { grid: false }
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);