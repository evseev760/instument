import React, { Component } from 'react';
import Catalog from './Сatalog';
import Search from './Search';
import { Link } from 'react-router';
import "./Header.css";
import kat from './img/kat.svg';
import CatalogProductCol from './CatalogProductCol';
// import img from './img/logo.svg';
import cart from './img/cart.svg';
import icoX from './img/icoX.svg';
import key from './img/key.svg';
import magnifier from './img/ic_search.svg'
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import $ from 'jquery';
window.jQuery = window.$ = $;



class Header extends Component {
    state = {
        isOpen: false,
        searh: false,
        del_search_ico:false,
        serch_data:[],
        search_result: [],
        not_result:'',
        success_result: '',
        massage_search: ''
    }
    resize = () => this.forceUpdate()
    componentWillMount() {
        const { log_in } = this.props.pageActions;
        $.getJSON('http://instrument.kosatka.org/api/users/user/is-authorized', function (result) {
            log_in(result.status);
        }.bind(this));
    }
    componentDidMount() {
        window.addEventListener('resize', this.resize);
        if (document.getElementById('footer') != null){
            setTimeout(() => {
                document.getElementById('footer').classList.remove('hide');
            }, 400);
        }
        if(document.getElementById('root').classList.contains('hide')){
            setTimeout(() => {
                document.getElementById('root').classList.remove('hide');
            }, 400);
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0
    }
    componentWillUnmount() {
        const { basket } = this.props.item
        window.removeEventListener('resize', this.resize);
        document.cookie = "basket=" + String(basket);
    }
    render() {
        const { basket } = this.props.item;
        const { login } = this.props.log_in;
        return (
            <div>
                <div id='header' className='row'>
                    <Link className='col-xl-2 col-lg-1 col-md-2 col-sm-2 col-2 ' to='/'><div className=' col-12' id='container1'></div></Link>
                    <div id='container2' className='col-xl-1 col-lg-2 col-md-3 col-sm-8 col-6 d-none d-lg-block' >
                        <a id='kat_link'><div id='kat_btn'  onClick={this.openKat}> <img id={this.state.isOpen && document.location.href.split('/')[3] != 'authorization' && document.location.href.split('/')[3] != 'registration' ? 'katBtnOpen' : 'katBtnClose'} alt="" src={this.state.isOpen && document.location.href.split('/')[3] != 'authorization' && document.location.href.split('/')[3] != 'registration' ? icoX : kat} />КАТАЛОГ</div></a>
                    </div>
                    <div className='col-xl-5 col-lg-4 col-md-7 col-sm-7 col-7 head_input'>
                        
                        <input onFocus={this.focus} onBlur={this.blur} onChange={this.searching} id='search' type="text" placeholder={window.innerWidth < 1070 ? 'Поиск' : "Поиск среди 100 тысяч товаров"} />
                        
                        {this.state.del_search_ico?<img id='del_search_ico' onClick={this.clear_searh} src={icoX}/>:<img className='magnifier' src={magnifier}/>}
                    </div>
                    <div className='col-xl-2  col-lg-2 col-md-6 col-sm-4 col-12 d-none d-lg-block'>
                        <button id='teleNum' disabled="disabled" type="button" className="btn btn-dark"> +7 (831) 423 53 04 </button>
                    </div>
                    {window.innerWidth < 992 ?
                        <div className='col-xl-2 col-lg-3 col-md-3 col-sm-3 col-3 head_cont'>
                            <Link to={login ? "/cabinet" : "/authorization"}><button id='comeIn' type="button" className="btn btn-dark"><img className='key_btn' src={key} alt='cart' align='middle' /></button></Link>
                            <Link to='/basket'><button id='cart_btn' type="button" className="btn btn-dark"><img id='cartBtn' src={cart} alt='cart' align='middle' /></button></Link>
                            <div className='in_basket'><span>{basket.length}</span></div>
                        </div>
                        : <div className='col-xl-2 col-lg-3 head_btns'>
                            <Link to={login ? "/cabinet" : "/authorization"}><button id='comeIn' type="button" className="btn btn-dark">{login ? 'Кабинет' : 'Войти'}</button></Link>
                            <Link to='/basket'><button id='cart_btn' type="button" className="btn btn-dark"><img id='cartBtn' src={cart} alt='cart' align='middle' /></button></Link>
                            <div className='in_basket'><span>{basket.length}</span></div>
                        </div>
                    }
                </div>
                <div onClick={this.closeKat} onMouseLeave={this.closeKat} className={this.state.isOpen ? 'kat_open' : 'kat_close'}>
                    <Catalog section={this.props.section} />
                </div>
                
                {this.state.searh?<Search massage_search={this.state.massage_search} success_result={this.state.success_result} not_result={this.state.not_result}  search_result={this.state.search_result} data={this.state.serch_data}/>:''}    
                
            </div>
        );

    }
    clear_searh = () =>{
        document.getElementById('search').value ='';
        this.setState({
            searh: false,
            del_search_ico: false,
            search_result: [],
            not_result:'',
            massage_search:''
        })

    }
    focus = () => {
        const {data_search} = this.props.pageActions;
        this.setState({
            searh: true
        });
        if (document.getElementById('search').value.length==0){
            this.setState({
                massage_search:''
            })
        }
        //data_search(document.getElementById('search').value)
        // var val = document.getElementById('search').value;
        // browserHistory.push('/search?' + val);
    }
    blur = () => {
        if(document.getElementById('search').value ==''){
            this.setState({
                searh: false
            })
        }
        
        // var val = document.getElementById('search').value;
        // if (val == '') {
        //     browserHistory.push('/');
        // }
    }
    searching = (x = true) => {
        const {data_search} = this.props.pageActions;
        var val = document.getElementById('search').value;
        if (val != '') {
            this.setState({
                searh: true,
                del_search_ico: true,
                
            })

            if(val != ''){
                data_search(val);
                // this.setState({
                    
                // })
                    
            }
            if(val.length>3){
                var url = 'http://instrument.kosatka.org/api/search/?query=' + String(val)
                $.getJSON(url , function (result) {
                    if (result.products!=null){
                        this.setState({
                            not_result:'',
                            massage_search:'',
                            success_result: val,
                            search_result: result.products.map((x, i) =>
                                <CatalogProductCol key={i + 2000} product={result.products[i]} />),
                            // this_id: val
                        });
                        if (document.getElementById('search_non_founde') != null){
                            document.getElementById('search_non_founde').classList.add('hide');
                        }
                    }else {
                        this.setState({
                            not_result: val,
                            massage_search: "Совпадений не найдено"
                        });
                        // if (document.getElementById('search_non_founde') != null){
                        //     document.getElementById('search_non_founde').classList.remove('hide');
                        // }
                    }
                }.bind(this));
            }
        }else{
            this.setState({
                searh: false,
                del_search_ico: false,
                search_result: [],
                not_result:''
            })
        }

    }
    
    openKat = () => {
        this.setState(
            { isOpen: !this.state.isOpen }
        )
    }
    closeKat = () => {
        this.setState(
            { isOpen: false }
        )
    }
}
function mapStateToProps(state) {
    return {
        item: state.basket,
        log_in: state.login,
        fltr_btn: state.fltrBtn

    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);