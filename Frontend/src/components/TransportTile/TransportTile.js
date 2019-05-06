import React, { Component } from 'react';
import './TransportTile.scss';
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";

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
        const handledOrders = this.props.handledOrders;
        console.log("handledOrders length = " + handledOrders.length);
        console.log(handledOrders);
        return handledOrders.map(({orderNumber: orderNumber, pointFrom, pointTo}) => (
            <div>{orderNumber}: {pointFrom} - {pointTo} </div>
        ));
    };
    renderTransportRoute = () => {
        const transportRoute = this.props.transportRoute;
        return transportRoute.map((routePoint) => (
            <div>-{routePoint.pointName}     <span>Załadowanie: {routePoint.load}</span></div>
        ))
    };

    render() {
        return (
            <div className={'transportTile'}>
                <div >
                    Transport <span>{this.props.transportNumber}</span>
                </div>
                <div>
                    <div>Obsługiwane zamówienia:</div>
                    {this.renderHandledOrders()}
                    <div>Najlepsza trasa:</div>
                    {this.renderTransportRoute()}
                    {/*<div className={'transportRoute'}>*/}
                        {/*Trasa:*/}
                        {/*{this.renderRoute()}*/}
                    {/*</div>*/}
                    {/*<div className={'handledOrders'}>*/}
                        {/*Zamówienia:*/}
                        {/*{this.renderHandledOrders()}*/}
                    {/*</div>*/}
                </div>
                <Button variant={'dark'} onClick={() => this.props.onDelete(this.props.transportNumber)}>Delete</Button>
            </div>
        )
    }
}
export default TransportTile;