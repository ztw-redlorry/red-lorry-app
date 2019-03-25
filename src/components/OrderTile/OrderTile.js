import React, { Component } from 'react';
import './OrderTile.scss';
import Button from "react-bootstrap/Button";

class OrderTile extends Component {
    render() {
        return (
            <div className={'orderTile'}>
                <div className={'orderName'}>
                    Zamówienie <span>{this.props.orderNumber}</span>
                </div>
                <div className={'orderRoute'}>
                    {this.props.pointFrom} - {this.props.pointTo}
                </div>
                <div className={'orderAmount'}>
                    Sztuk: {this.props.amount}
                </div>
            </div>
        )
    }
}

export default OrderTile;