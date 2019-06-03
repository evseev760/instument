import React, { Component } from 'react';
import Header from './Components/Header';
// import Footer from './Components/Footer';
import Basket from './Components/Basket';






import baza from './Baza.json';//база данных

class AppBasket extends Component {
    render() {
        return (
            <div>
                <Header section={baza.section} />
                <Basket type={baza.section[1].type[0]} />
                {/* <Footer /> */}
            </div>
        );
    }
}
export default AppBasket;