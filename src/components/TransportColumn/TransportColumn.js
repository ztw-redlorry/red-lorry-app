import React, { Component } from 'react';
import './TransportColumn.scss';
import plus from '../../plus.png';
import TransportTile from "../TransportTile/TransportTile";

class TransportColumn extends Component{
    render() {
        return (
            <div className={'ordersColumn'}>
                <TransportTile transportNumber={3} transportRoute={['Katowice', 'Bytom', 'Sosnowiec']} handledOrders={['Zamówienie 1']}/>
                <img className={'addTransport' } src={plus}/>
            </div>
        )
    }
}
export default TransportColumn;