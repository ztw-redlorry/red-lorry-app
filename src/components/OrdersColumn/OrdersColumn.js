import React, { Component } from 'react';
import {Image} from 'react-bootstrap';
import './OrdersColumn.scss';
import OrderTile from "../OrderTile/OrderTile";
import tick from './icons8-ok-64.png';

class OrdersColumn extends Component{
    render() {
        return (
            <div className={'ordersColumn'}>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <img className={'addOrder'} src={tick}/>
            </div>
        )
    }
}
export default OrdersColumn;