import React, { Component } from 'react';
import './OrdersColumn.scss';
import OrderTile from "../OrderTile/OrderTile";
import plus from '../../plus.png';
import Button from "react-bootstrap/Button";


class OrdersColumn extends Component{

    render() {
        return (
            <div className={'ordersColumn'}>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <Button onclick={props.onAddChild.bind(this)}></Button>
                <div id="children-pane">
                    {props.children}
                </div>
                <img className={'addOrder' } src={plus}/>
            </div>
        )
    }
}
export default OrdersColumn;