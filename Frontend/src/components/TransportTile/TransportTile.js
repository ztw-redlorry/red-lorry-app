import React, { Component } from 'react';
import './TransportTile.scss';
import Button from "react-bootstrap/Button";

class TransportTile extends Component {

    renderRoute = () => {
        const route = this.props.transportRoute;
        const routeItems = route.map((city) => (
            <div>- {city} </div>
        ));
        return (
            <div>{routeItems}</div>
        );
    };
    renderHandledOrders = () => {
        const handledOrders = this.props.handledOrders.map((orderName) => (
            <div>{orderName}</div>
        ));
        return (
            <div>{handledOrders}</div>
        );
    };

    render() {
        return (
            <div className={'transportTile'}>
                <div className={'transportName'}>
                    Transport <span>{this.props.transportNumber}</span>
                </div>
                <div className={'transportDetails'}>
                    <div className={'transportRoute'}>
                        Trasa:
                        {this.renderRoute()}
                    </div>
                    <div className={'handledOrders'}>
                        Zamówienia:
                        {this.renderHandledOrders()}
                    </div>
                </div>
                <Button variant={'dark'} onClick={() => this.props.onDelete(this.props.transportNumber)}>Delete</Button>
            </div>
        )
    }
}
export default TransportTile;