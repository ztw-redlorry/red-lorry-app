import React, { Component } from 'react';
//import './OrderInputTile.scss';
import Button from "react-bootstrap/Button";

class OrderInputTile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zamId: '',
            miastoStart: '',
            miastoKoniec: '',
            zamIloscTowaru: ''
        };
    }
    onChangeValue = event => {
        console.log('a1111');
        if (event.target.name === 'miastoStart') {
            this.setState({ miastoStart: event.target.value });
        }
        if (event.target.name === 'miastoKoniec') {
            this.setState({ miastoKoniec: event.target.value });
        }
        if (event.target.name === 'zamIloscTowaru') {
            this.setState({ zamIloscTowaru: event.target.value });
        }
    };
    handleConfirm = () => {
        this.props.onClick(this.state);
    };
    render() {
        return (
            <div className={'orderTile'}>
                <div className={'orderName'}>
                    Zamówienie <span>{this.props.zamId}</span>
                </div>
                <div className={'orderRoute'}>
                    <input
                        type={'text'}
                        name={'miastoStart'}
                        value={this.state.miastoStart}
                        onChange={this.onChangeValue}
                    />
                    -
                    <input
                        type={'text'}
                        name={'miastoKoniec'}
                        value={this.state.miastoKoniec}
                        onChange={this.onChangeValue}
                    />
                </div>
                <div className={'orderAmount'}>
                    Sztuk:
                    <input
                        type={'text'}
                        name={'zamIloscTowaru'}
                        value={this.state.zamIloscTowaru}
                        onChange={this.onChangeValue}
                    />
                </div>
                <Button variant={'light'} onClick={this.handleConfirm}>Add Order</Button>
            </div>
        )
    }
}

export default OrderInputTile;