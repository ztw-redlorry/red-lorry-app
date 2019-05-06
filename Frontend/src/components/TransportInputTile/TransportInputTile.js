import React, { Component } from 'react';
import classes from './TransportInputTile.module.scss';
import Button from "react-bootstrap/Button";
import {Form, InputGroup} from "react-bootstrap";
import axios from 'axios'
import OrderTile from "../OrdersColumn/OrdersColumn";

class TransportInputTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            distance: 0,
            isSelected: false,
            selectedOrder: {},
            transportRoute: [],
            handledOrders: [],
            availableOrders:[],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/orders')
            .then(
                (result) => {
                    console.log(result.data);
                    this.setState({
                        isLoaded: true,
                        availableOrders: result.data,
                        selectedOrder: result.data[0]
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );

    }
    getBestRoute = () => {
        const handledOrders = this.state.handledOrders;
        console.log(handledOrders);

        axios.get('http://localhost:3000/bestRoute', {
            params: {
                handledOrders: handledOrders
            }})
            .then(res => {
                    console.log(res);
                    this.setState({transportRoute: res.data.points}, () => {
                        console.log("Generated transport route: ", this.state.transportRoute);
                    })
                }
            )
            .catch(err => console.log(err))
    };
    renderTransportRoute = () => {
        const transportRoute = this.state.transportRoute;
        return transportRoute.map((routePoint) => (
            <div>-{routePoint.pointName}     <span>Załadowanie: {routePoint.load}</span></div>
        ))
    };
    renderHandledOrders = () => {
        const handledOrders = this.state.handledOrders;
        console.log("handledOrders length = " + handledOrders.length);

        console.log(handledOrders);
        return handledOrders.map(({orderNumber: orderNumber, pointFrom, pointTo}) => (
            <div>{orderNumber}: {pointFrom} - {pointTo} </div>
        ));
    };
    createSelectItems() {
        let items = [];

        for (let i = 0; i < this.state.availableOrders.length; i++) {
            items.push(<option key={i} value={this.state.availableOrders[i].orderNumber}>{'Zamówienie nr ' + this.state.availableOrders[i].orderNumber}</option>);
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return items;
    }
    onDropdownSelected = (e) => {
        console.log("THE VAL", e.target.value);
        console.log('availableOrders: ' + this.state.availableOrders);
        var selectedOrder = this.state.availableOrders.find(obj => {
            console.log("obj: " + obj.orderNumber);
            console.log("e.target.value: " + e.target.value);
            return obj.orderNumber == e.target.value
        });
        this.setState({isSelected: true});
        console.log("sel or:" + selectedOrder.orderNumber);
        console.log("selectedOrder before set: ", this.state.selectedOrder);
        this.setState({ selectedOrder: selectedOrder}, () => {
            console.log("selectedOrder after set: ", this.state.selectedOrder);
        });
        //here you will see the current selected value of the select input
    };
    handleAddingOrder = () => {
        console.log("Selected Order = ", this.state.selectedOrder.orderNumber);
        if(this.state.isSelected){
            this.setState(state => {
                const selectedOrder = this.state.selectedOrder;
                const handledOrders = [...state.handledOrders, selectedOrder];
                const availableOrders = state.availableOrders.filter(order => order !== selectedOrder);
                return {
                    handledOrders,
                    availableOrders
                };
            }, () => this.getBestRoute());
            this.setState({isSelected: false});
        }
        else{
            this.setState(state => {
                const selectedOrder = this.state.availableOrders[0];
                const handledOrders = [...state.handledOrders, selectedOrder];
                const availableOrders = state.availableOrders.filter(order => order !== selectedOrder);
                return {
                    handledOrders,
                    availableOrders
                };
            }, () => this.getBestRoute());
            this.setState({isSelected: false});
        }
    };
    handleConfirm = () => {
        this.props.onConfirm(this.state);
    };
    render() {
        return (
            <Form className={classes.orderInputTile}>
                <div>Obsługiwane zamówienia:</div>
                {this.renderHandledOrders()}
                <div>Najlepsza trasa:</div>
                {this.renderTransportRoute()}
                <Form.Control as="select" onChange={this.onDropdownSelected}>
                    {this.createSelectItems()}
                </Form.Control>
                <Button variant={'light'} onClick={this.handleAddingOrder}>Add Order</Button>
                {/*<Button type={'submit'} variant={'light'} onClick={this.handleConfirm}>Add Transport</Button>*/}
                <Button variant={'light'} onClick={this.handleConfirm}>Add Transport</Button>
                <Button variant={'light'} onClick={() => this.props.onCancel()}>Cancel Transport</Button>
            </Form>
        )
    }
}

export default TransportInputTile;