import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import AppMain from './AppMain';
//import App from './App';
//import AppCatalog from './AppCatalog';
//import AppProductCard from './AppProductCard';
//import AppBasket from './AppBasket';
import AppMain from './AppMain';
import Konfidencialnost from './Components/Konfidencialnost';
import AppTypes from './AppTypes';
import AppCatalog from './AppCatalog';
import AppProductCard from './AppProductCard';
import AppBasket from './AppBasket';
import AppCabinet from './AppCabinet';
import Authorization from './Components/Authorization';
import Registration from './Components/Registration';
import СonfirmationData from './Components/СonfirmationData';
// import Footer from './Components/Footer';
import { Router, Route, browserHistory } from 'react-router';
//import baza from './Baza.json';//база данных
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
window.jQuery = window.$ = $;
const store = configureStore()

const Main = () => (
    <main>
        <Router history={browserHistory}>
            <Route exact path='/' component={AppMain} />
            <Route path='/types' component={AppTypes} />
            <Route path='/catalog' component={AppCatalog} />
            <Route path='/product_card' component={AppProductCard} />
            <Route path='/basket' component={AppBasket} />
            <Route path='/postavchiki' component={AppMain}/>
            <Route path='/product_head' component={AppCatalog}/>
            <Route path='/authorization' component={Authorization}/>
            <Route path='/registration' component={Registration}/>
            <Route path='/cabinet' component={AppCabinet}/>
            <Route path='/confirmation' component={СonfirmationData}/>
            <Route path='/confidentiality' component={Konfidencialnost}/>
        </Router>
    </main>
)
$.ajaxSetup({
    xhrFields: {
       withCredentials: true
    }
 });
ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

