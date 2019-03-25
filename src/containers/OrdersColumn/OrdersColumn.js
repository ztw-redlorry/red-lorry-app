import React, {Component} from 'react';
import './OrdersColumn.scss';
import OrderTile from "../../components/OrderTile/OrderTile";
import plus from '../../plus.png';
import OrderInputTile from "../../components/OrderInputTile/OrderInputTile";
import Button from "react-bootstrap/Button";
import LogisticScreen from "../../components/LogisticScreen/LogisticScreen";


class OrdersColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
        }
    }
    handleCreateOrderInput = () => {
        console.log("asdasdasd");
        const newElement = {
            orderNumber: '144231',
            pointFrom: 'Katowice',
            pointTo: 'Poznań',
            amount: '200'
        };
        this.setState(state => {
            const orders = [...state.orders, newElement];
            return {
                orders
            };
        });
    };
    handleConfirmOrder = (order) => {
        this.setState(state => {
            const orders = [...state.orders, order];
            return {
                orders
            };
        });
    };
    renderOrders = () => {
        const orders = this.state.orders;
        return orders.map(({ orderNumber, pointFrom, pointTo, amount }) => (
            <OrderTile
                key={orderNumber}
                id={orderNumber}
                orderNumber={orderNumber}
                pointFrom={pointFrom}
                pointTo={pointTo}
                amount={amount}
            >
            </OrderTile>
        ));
    };

    render() {
        return (
            <div className={'ordersColumn'}>
                {this.renderOrders()}
                <OrderInputTile onClick={this.handleConfirmOrder}/>
                <img className={'addOrder'} src={plus} onClick={this.handleCreateOrderInput}/>
            </div>
        )
    }
}

export default OrdersColumn;