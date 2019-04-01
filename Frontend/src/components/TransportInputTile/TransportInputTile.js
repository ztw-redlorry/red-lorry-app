import React, { Component } from 'react';
import classes from './TransportInputTile.module.scss';
import Button from "react-bootstrap/Button";
import {Form, InputGroup} from "react-bootstrap";
import axios from 'axios'
import OrderTile from "../../containers/OrdersColumn/OrdersColumn";

class TransportInputTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOrder: {},
            handledOrders: [],
            availableOrders:[],
            route: [],
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/orders')
            .then(
                (result) => {
                    console.log(result.data);
                    this.setState({
                        isLoaded: true,
                        availableOrders: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }
    renderHandledOrders = () => {
        const handledOrders = this.state.handledOrders;
        console.log("handledOrders length = " + handledOrders.length);
        return handledOrders.map(({zamId, miastoStart, miastoKoniec}) => (
            <div>{zamId}: {miastoStart} - {miastoKoniec} </div>
        ));
    };
    createSelectItems() {
        let items = [];
        for (let i = 0; i < this.state.availableOrders.length; i++) {
            items.push(<option key={i} value={this.state.availableOrders[i].zamId}>{'Zamówienie nr ' + this.state.availableOrders[i].zamId}</option>);
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return items;
    }
    onDropdownSelected = (e) => {
        console.log("THE VAL", e.target.value);
        console.log('availableOrders: ' + this.state.availableOrders);
        var selectedOrder = this.state.availableOrders.find(obj => {
            console.log("obj: " + obj.zamId);
            console.log("e.target.value: " + e.target.value);
            return obj.zamId == e.target.value
        });
        console.log("sel or:" + selectedOrder.zamId);
        console.log("selectedOrder before set: ", this.state.selectedOrder);
        this.setState({ selectedOrder: selectedOrder}, () => {
            console.log("selectedOrder after set: ", this.state.selectedOrder);
        });
        //here you will see the current selected value of the select input
    };
    handleAddingOrder = () => {
        this.setState(state => {
            const selectedOrder = this.state.selectedOrder;
            const handledOrders = [...state.handledOrders, selectedOrder];
            const availableOrders = state.availableOrders.filter(order => order !== selectedOrder);
            return {
                handledOrders,
                availableOrders
            };
        });
    };
    handleConfirm = () => {
        this.props.onConfirm(this.state);
    };
    render() {
        return (
            <Form className={classes.orderInputTile}>
                {this.renderHandledOrders()}
                <Form.Control as="select" onChange={this.onDropdownSelected}>
                    {this.createSelectItems()}
                </Form.Control>
                <Button variant={'light'} onClick={this.handleAddingOrder}>Add Order</Button>
                <Button type={'submit'} variant={'light'} onClick={this.handleConfirm}>Add Transport</Button>
                <Button variant={'light'} onClick={() => this.props.onCancel()}>Cancel Transport</Button>
            </Form>
        )
    }
}

export default TransportInputTile;