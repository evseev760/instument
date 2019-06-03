import React, { Component } from 'react';
import Header from './Components/Header';
// import Footer from './Components/Footer';
import Сabinet from './Components/Сabinet';






import baza from './Baza.json';//база данных

class AppCabinet extends Component {
    componentDidMount(){
        if(document.getElementById('footer')){
        document.getElementById('footer').classList.add('dell_foot')}
    }
    componentWillUnmount(){
        if(document.getElementById('footer')){
        document.getElementById('footer').classList.remove('dell_foot')}
    }
    render() {
        return (
            <div>
                <Header section={baza.section} />
                <Сabinet type={baza.section[1].type[0]} />
                {/* <Footer /> */}
            </div>
        );
    }
}
export default AppCabinet;