import React, { Component } from 'react';
//import './OrderInputTile.scss';
import Button from "react-bootstrap/Button";

class OrderInputTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderNumber: '',
            pointFrom: '',
            pointTo: '',
            amount: ''
        };
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
        this.props.onClick(this.state);
    };
    render() {
        return (
            <div className={'orderTile'}>
                <div className={'orderName'}>
                    Zamówienie <span>{this.props.orderNumber}</span>
                </div>
                <div className={'orderRoute'}>
                    <input
                        type={'text'}
                        name={'pointFrom'}
                        value={this.state.pointFrom}
                        onChange={this.onChangeValue}
                    />
                    -
                    <input
                        type={'text'}
                        name={'pointTo'}
                        value={this.state.pointTo}
                        onChange={this.onChangeValue}
                    />
                </div>
                <div className={'orderAmount'}>
                    Sztuk:
                    <input
                        type={'text'}
                        name={'amount'}
                        value={this.state.amount}
                        onChange={this.onChangeValue}
                    />
                </div>
                <Button variant={'light'} onClick={this.handleConfirm}>Add Order</Button>
            </div>
        )
    }
}

export default OrderInputTile;