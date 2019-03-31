import React, { Component } from 'react';
import classes from './OrderTile.module.scss';
import Button from "react-bootstrap/Button";

class OrderTile extends Component {
    render() {
        return (
            <div className={classes.orderTile}>
                <div className={classes.orderName}>
                    Zamówienie <span>{this.props.orderNumber}</span>
                </div>
                <div className={classes.orderRoute}>
                    {this.props.pointFrom} - {this.props.pointTo}
                </div>
                <div className={classes.orderAmount}>
                    Sztuk: {this.props.amount}
                </div>
            </div>
        )
    }
}

export default OrderTile;