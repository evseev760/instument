import React, { Component } from 'react';
import Header from './Components/Header';
// import Footer from './Components/Footer';
import CatalogProductHead from './Components/CatalogProductHead';
import Search from './Components/Search';


class AppSearch extends Component {
    componentDidMount(){
        document.getElementById("search").focus();
    }
    render() {
        //const {FiltrScrol} = this.props.pageActions
        return (
            <div>
                <Header />
                <Search />
                {/* <Footer /> */}
            </div>
        );
    }
}
export default AppSearch;