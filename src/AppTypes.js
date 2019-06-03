import React, { Component } from 'react';
import Header from './Components/Header';
// import Footer from './Components/Footer';
import CatalogList from './Components/CatalogList';
import SectionType from './Components/SectionType';






import baza from './Baza.json';//база данных

class AppTypes extends Component{
    render(){
        return(
            <div>
                <Header section= {baza.section}/>
                <SectionType />
                <CatalogList section={baza.section[1]} />
                {/* <Footer /> */}
            </div>
        );
    }
}
export default AppTypes;