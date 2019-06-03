import React, { Component } from 'react';
import Header from './Components/Header';
// import Footer from './Components/Footer';
import Suppliers from './Components/Suppliers';
import Sections from './Components/Sections';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions'
import { bindActionCreators } from 'redux'




import baza from './Baza.json';//база данных

class AppMain extends Component {
    render() {

        return (
            <div>

                <Header section={baza.section} />
                <Sections section={baza.section} />
                <Suppliers />
                {/* <Footer /> */}
            </div>
        );
    }
}


export default AppMain;