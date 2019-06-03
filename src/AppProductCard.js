import React, { Component } from 'react';
import Header from './Components/Header';
// import Footer from './Components/Footer';
import ProductCard from './Components/ProductCard';

import baza from './Baza.json';//база данных

class AppProductCard extends Component{
    render(){
        return(
            <div>
                <Header section= {baza.section}/>
                <ProductCard  section= {baza.section[1]}  type= {baza.section[1].type[0]} product={baza.section[1].type[0].product[1]}/>
                {/* <Footer /> */}
            </div>
        );
    }
}
export default AppProductCard;