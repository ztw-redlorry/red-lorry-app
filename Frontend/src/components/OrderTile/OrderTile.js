import React, { Component } from 'react';
import './OrderTile.scss';
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";

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
                <div className={'deadline'}>
                    {console.log(this.props.deadline)}
                    Data: {this.props.deadline}
                </div>
                <Button variant={'dark'} onClick={() => this.props.onDelete(this.props.orderNumber)}>Delete</Button>
            </div>
        )
    }
}

export default OrderTile;