import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as pageActions from '/Users/admin/Documents/GitHub/pages/src/actions/PageActions';
import { bindActionCreators } from 'redux';
//import './CatalogTypes.css'

class InBasketBtn extends Component {
    state = {
        isHover: false,
        isMouseDown: false,
        in_quantity: 0
    }
    componentWillMount() {
        const { basket } = this.props.item;
        var summary = basket.reduce(function (a, b) {
            var tmp = parseInt(b)
            if (!isNaN(tmp)) {
                if (!a[tmp]) {
                    a[tmp] = 0;
                }
                a[tmp]++;
            }
            return a;
        }, {});
        if (summary[this.props.id] > 0) {
            this.setState({
                in_quantity: summary[this.props.id]
            })
        }
    }
    render() {
        return (
            <button disabled={this.props.quantity>0?'':"disabled"} onMouseDown={this.isMouseDown} title={this.props.quantity>0?'':'Товара нет в наличии'} onMouseUp={this.isMouseUp} className={this.state.isMouseDown ? 'rightBtn btns' : 'rightBtn btnse'} type="button" onClick={this.onBaskClick.bind(this)} onMouseOver={this.hover} onMouseOut={this.hover}>
                {this.props.quantity>0?
                    'В корзину' 
                    :'Товара нет в наличии'
                }{this.state.in_quantity > 0 ? '(' + this.state.in_quantity + ')' : ''}
            </button>
        );
    }
    hover = () => {
        this.setState(
            { isHover: !this.state.isHover }
        )
    }
    onBaskClick = () => {
        let quantity = document.getElementById('quantity' + String(this.props.id)).value;
        var quanti = document.getElementById('quantity' + String(this.props.id)).value;
        while (quantity > 0) {
            this.props.basket_item(this.props.id);
            quantity--;
        }
        document.getElementById('quantity' + String(this.props.id)).value = '';
        this.setState({
            in_quantity: this.state.in_quantity + Number(quanti)
        })
    }
    isMouseDown = () => {
        if (document.getElementById('quantity' + String(this.props.id)).value > 0) {
            this.setState({
                isMouseDown: true
            })
        } else {
            document.getElementById('quantity' + String(this.props.id)).classList.add('btns')
        }
    }
    isMouseUp = () => {
        if (document.getElementById('quantity' + String(this.props.id)).value > 0) {
            this.setState({
                isMouseDown: false
            })
        } else {
            document.getElementById('quantity' + String(this.props.id)).classList.remove('btns')
        }
    }
}
function mapStateToProps(state) {
    return {
        item: state.basket,
        log_in: state.login
    }
}
function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InBasketBtn);
