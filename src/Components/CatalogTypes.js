
import React, { Component } from 'react';
import './CatalogTypes.css'
import { Link } from 'react-router';
import logo from './img/logo-02.svg';
import { browserHistory } from 'react-router';


class CatalogTypes extends Component {
    

    render() {
        return (
            <div className='col-xl-2 col-lg-3 col-md-3 col-sm-6 col-6 type_container'>
            <div className='element'>
                <div onClick={()=>this.changeID(this.props.types.id)} ><div>
                    <img src={logo} />
                    <div className='quantity'>
                        {this.props.types.products_amount} наим.
                    </div>
                    <div><div className='type_name'>
                        {this.props.types.name}
                    </div></div>
                </div></div>
            </div>
            </div>
        );
    }
    changeID = (id) =>{
        browserHistory.push('/catalog?' + String(id));
        this.props.change_id(id)
    }
}
export default CatalogTypes;