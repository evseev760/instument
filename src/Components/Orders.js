import React, { Component } from 'react';
import './Employees.css';
import './Orders.css';
import Order from './Order';
import plus from './img/plus.png';



import $ from 'jquery';
window.jQuery = window.$ = $;


class Orders extends Component {
    state = {
        orders: []
    }
    componentDidMount() {
        $.getJSON('http://instrument.kosatka.org/api/orders/get-orders/', function (result) {
            this.setState({
                orders: result.orders,
                pagination: result.pagination
            })
        }.bind(this));
    }
    render() {
        return (
            <div id='cabinet_table'>
                <h2>{this.props.text}</h2>

                <div className='in_table'>
                    <hr />
                    <div className='row employee employee_caption orders'>
                        <div className=' col-4  name_employee'><span className='revert_date' onClick={this.revert_list}>Номер заказа/Дата</span></div>
                        <div className=' col-4'><span>Менеджер</span></div>
                        {/* <div className=' col- d-none d-block'><span>Доставка</span></div> */}
                        <div className=' col-2 order_invoice'><span>Счет</span></div>
                        <div className=' col-2 order_price'><span>Сумма</span></div>
                    </div>
                    {this.state.orders.map((x, i) =>
                        <Order key={[i]} order={this.state.orders[i]} />
                    )}
                    <div className='paginator'>

                    </div>
                </div>
            </div>
        );
    }
    revert_list = () => {
        this.setState({
            orders: this.state.orders.reverse()
        })
    }
}

export default Orders;