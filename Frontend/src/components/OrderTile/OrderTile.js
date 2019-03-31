import React, { Component } from 'react';
import './OrderTile.scss';
import Button from "react-bootstrap/Button";

class OrderTile extends Component {
    render() {
        return (
            <div className={'orderTile'}>
                <div className={'orderName'}>
                    Zamówienie <span>{this.props.zamId}</span>
                </div>
                <div className={'orderRoute'}>
                    {this.props.miastoStart} - {this.props.miastoKoniec}
                </div>
                <div className={'orderAmount'}>
                    Sztuk: {this.props.zamIloscTowaru}
                </div>
            </div>
        )
    }
}

export default OrderTile;