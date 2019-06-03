import React, { Component } from 'react';
import Header from './Components/Header';
// import Footer from './Components/Footer';

import ProductList from './Components/ProductList';









class AppCatalog extends Component {
    render() {
        //const {FiltrScrol} = this.props.pageActions
        return (
            <div>
                <Header  />
                <ProductList   />
                
                {/* <Footer /> */}
            </div>
        );
    }
    
}
export default AppCatalog;