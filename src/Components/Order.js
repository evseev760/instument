import React, { Component } from 'react';
import './Employees.css';
import pansel from './img/pansel.svg';

import $ from 'jquery';
window.jQuery = window.$ = $;


class Order extends Component {

    render() {
        const data = this.props.order
        return (
            <div className='row employee order'>
                <div className='col-4  name_employee'>Заказ № {data.id}<span><br />{data.date}</span></div>
                <div className='col-4 '>{data.full_name}</div>
                <div className='col-2 order_invoice'><a target='_blank' href={data.invoice_url}>Счет</a></div>
                {/* <div className='col-1 d-none d-md-block'>----</div> */}
                <div className='col-2 col-md-2 order_price'>{data.sum} &#8381;</div>

            </div>
        );
    }

}

export default Order;