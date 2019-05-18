import React, { Component } from 'react';
import './TransportTile.scss';
import Button from "react-bootstrap/Button";
import {Form} from "react-bootstrap";

class TransportTile extends Component {
    constructor(props) {
        super(props);
    }

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
        return handledOrders.map(function (x) {
            return <div>-Zamówienie {x}</div>;
            }
        );
    };
    renderTransportRoute = () => {
        const transportRoute = this.props.transportRoute;
        return transportRoute.map((routePoint) => (
            <div>-{routePoint.pointName}     <span>Załadowanie: {routePoint.load}</span></div>
        ))
    };
    showTransport = () => {
        const transportRoute = this.props.transportRoute;
        let routePointsArray = [];
        for(let i = 0; i < transportRoute.length; i++){
            routePointsArray.push(
                {
                    "title": transportRoute[i].pointName,
                    "lat": transportRoute[i].y,
                    "lng": transportRoute[i].x,
                    "load": transportRoute[i].load,
                    "description": '',
                    "flag": '1'
                })
        }
        this.props.onTransportClick(routePointsArray)
    };
    render() {
        return (
            <div className={'transportTile'}>
                <div >
                    Transport <span>{this.props.transportNumber}:</span>
                </div>
                <div>
                    {/*<div>Obsługiwane zamówienia:</div>*/}
                    {/*{this.renderHandledOrders()}*/}
                    {/*<div>Najlepsza trasa:</div>*/}
                    {/*{this.renderTransportRoute()}*/}
                    {/*<div className={'transportRoute'}>*/}
                        {/*Trasa:*/}
                        {/*{this.renderRoute()}*/}
                    {/*</div>*/}
                    <div className={'handledOrders'}>
                        {this.renderHandledOrders()}
                    </div>
                </div>
                <Button variant={'dark'} onClick={() => this.props.onDelete(this.props.transportNumber)}>Delete</Button>
                <Button id={'showButton'} variant={'dark'} onClick={() => this.showTransport()}>Show</Button>
            </div>
        )
    }
}
export default TransportTile;