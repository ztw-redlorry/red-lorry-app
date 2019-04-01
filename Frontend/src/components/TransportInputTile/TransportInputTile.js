import React, { Component } from 'react';
import classes from './TransportInputTile.module.scss';
import Button from "react-bootstrap/Button";
import {Form, InputGroup} from "react-bootstrap";

class OrderInputTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: this.props.orderNumber,
            pointFrom: '',
            pointTo: '',
            amount: ''
        };
        // this.onCancel= this.onCancel.bind(this);
        // this.onConfirm= this.onConfirm.bind(this);
    }
    onChangeValue = event => {
        console.log('a1111');
        if (event.target.name === 'pointFrom') {
            this.setState({ pointFrom: event.target.value });
        }
        if (event.target.name === 'pointTo') {
            this.setState({ pointTo: event.target.value });
        }
        if (event.target.name === 'amount') {
            this.setState({ amount: event.target.value });
        }
    };

    handleConfirm = () => {
        this.props.onConfirm(this.state);
    };
    render() {
        return (
            <Form className={classes.orderInputTile}>
                <div className={classes.orderName}>
                    Zamówienie <span>{this.props.orderNumber}</span>
                </div>
                <InputGroup size="lg" className={classes.orderRoute}>
                    <InputGroup.Text>From:</InputGroup.Text>
                    <Form.Control
                        type="text"
                        placeholder="Enter start point"
                        name={'pointFrom'}
                        value={this.state.pointFrom}
                        onChange={this.onChangeValue}
                    />
                    <InputGroup.Text>To:</InputGroup.Text>
                    <Form.Control
                        type={'text'}
                        placeholder={"Enter end point"}
                        name={'pointTo'}
                        value={this.state.pointTo}
                        onChange={this.onChangeValue}
                    />
                </InputGroup>
                <InputGroup className={classes.orderAmount}>
                    <InputGroup.Text>Ilość sztuk:</InputGroup.Text>
                    <Form.Control
                        type={'text'}
                        name={'amount'}
                        value={this.state.amount}
                        onChange={this.onChangeValue}
                    />
                </InputGroup>

                <Button type={'submit'} variant={'light'} onClick={this.handleConfirm}>Add Order</Button>
                <Button variant={'light'} onClick={() => this.props.onCancel()}>Cancel Order</Button>
            </Form>
        )
    }
}

export default OrderInputTile;