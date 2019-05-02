import React, {Component} from 'react';
import classes from './OrdersColumn.module.scss';
import OrderTile from "../OrderTile/OrderTile";
import plus from '../../plus.png';
import axios from 'axios';
import OrderInputTile from "../OrderInputTile/OrderInputTile";
import Button from "react-bootstrap/Button";
import LogisticScreen from "../LogisticScreen/LogisticScreen";


class OrdersColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            isInputActive: false
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3000/orders')
            .then(
                (result) => {
                    console.log(result.data);
                    this.setState({
                        isLoaded: true,
                        orders: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    handleCreateOrderInput = () => {
        this.setState({isInputActive: true});
    };

    handleCancelOrder = () => {
        console.log("cancel");
        this.setState({isInputActive: false});
    };

    handleConfirmOrder = (order) => {
        this.setState(state => {
            const orders = [...state.orders, order];
            return {
                orders,
                isInputActive: false
            };
        });
    };

    deleteOrder = (id) => {
        console.log(id);
        const url = 'http://localhost:3000/orders';

        axios.delete(url, {data: {id}});
        this.setState({
            orders: this.state.orders.filter((element) => element.orderNumber !== id )
        });
    };

    renderOrders = () => {
        const orders = this.state.orders;
        console.log("Order = " + orders.length);
        return orders.map(({orderNumber, pointFrom, pointTo, amount, deadline}) => (
            <OrderTile
                key={orderNumber}
                id={orderNumber}
                orderNumber={orderNumber}
                pointFrom={pointFrom}
                pointTo={pointTo}
                amount={amount}
                deadline={deadline}
                onDelete={this.deleteOrder}
            >
            </OrderTile>
        ));
    };

    renderInput = () => {
        const isInputActive = this.state.isInputActive;
        if (isInputActive) {
            return (
                <OrderInputTile orderNumber={this.state.orders.length+1} onConfirm={this.handleConfirmOrder} onCancel={() => this.handleCancelOrder()}/>
            )
        }
    };

    render() {
        return (
            <div className={classes.ordersColumn}>
                {this.renderOrders()}
                {this.renderInput()}
                <img className={classes.addOrder} src={plus} onClick={this.handleCreateOrderInput}/>
            </div>
        )
    }
}

export default OrdersColumn;