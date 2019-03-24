import React, { Component } from 'react';
import './OrdersColumn.scss';
import OrderTile from "../../components/OrderTile/OrderTile";
import plus from '../../plus.png';
import Button from "react-bootstrap/Button";
import LogisticScreen from "../../components/LogisticScreen/LogisticScreen";


class OrdersColumn extends Component{
    constructor () {
        super()
        // LOOK MORE WHAT 'this' means!! <- the key of javascript = execution context

        this.renderOrder = this.renderOrder.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    renderOrder(){
        // carefull!!! bar is undefined. Look more what 'this' means in javascript
        return (
            <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
        );
    }

    handleClick() {
        this.renderOrder();
    }

    render() {
        const renderOrder = this.renderOrder();
        return (
            <div className={'ordersColumn'}>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <img className={'addOrder' } src={plus}/>
            </div>
        )
    }
}
export default OrdersColumn;