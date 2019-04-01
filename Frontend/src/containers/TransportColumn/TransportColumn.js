import React, { Component } from 'react';
import './TransportColumn.module.scss';
import plus from '../../plus.png';
import TransportTile from "../../components/TransportTile/TransportTile";
import classes from "../TransportColumn/TransportColumn.module.scss";
import TransportInputTile from "../../components/TransportInputTile/TransportInputTile";

class TransportColumn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            transports: [],
            isInputActive: false
        }
    }
    handleCreateOrderInput = () => {
        this.setState({isInputActive: true});
    };
    handleCancelOrder = () => {
        console.log("cancel");
        this.setState({isInputActive: false});
    };

    renderInput = () => {
        const isInputActive = this.state.isInputActive;
        if (isInputActive) {
            return (
                <TransportInputTile onConfirm={this.handleConfirmOrder} onCancel={() => this.handleCancelOrder()}/>
            )
        }
    };
    render() {
        return (
            <div className={classes.transportColumn}>
                <TransportTile transportNumber={3} transportRoute={['Katowice', 'Bytom', 'Sosnowiec']} handledOrders={['Zamówienie 1']}/>
                {this.renderInput()}
                <img className={classes.addTransport} src={plus} onClick={this.handleCreateOrderInput}/>
            </div>
        )
    }
}
export default TransportColumn;