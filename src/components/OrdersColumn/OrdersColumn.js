import React, { Component } from 'react';
import {Image} from 'react-bootstrap';
import './OrdersColumn.scss';
import OrderTile from "../OrderTile/OrderTile";
import plus from '../../plus.png';

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
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <OrderTile orderNumber={3} pointFrom={'Katowice'} pointTo={'Bytom'} amount={100}/>
                <img className={'addOrder' } src={plus}/>
            </div>
        )
    }
}
export default OrdersColumn;