import React, { Component } from 'react';
import './TransportColumn.module.scss';
import plus from '../../plus.png';
import TransportTile from "../../components/TransportTile/TransportTile";
import classes from ".//TransportColumn.module.scss";
import TransportInputTile from "../../components/TransportInputTile/TransportInputTile";
import axios from "axios";

class TransportColumn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            transports: [],
            isInputActive: false
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3000/transports')
            .then(
                (result) => {
                    console.log(result.data);
                    this.setState({
                        transports: result.data
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    deleteTransport = (id) => {
        //console.log(id);
        // const url = 'http://localhost:3000/transports';
        // axios.delete(url, {data: {id}});
        // this.setState({
        //     transports: this.state.transports.filter((element) => element.transportNumber !== id )
        // });
    };
    renderTransports = () => {
        const transports = this.state.transports;
        //console.log("Transports number: " + transports.length);

        return transports.map(({transportNumber, transportRoute, handledOrders}) => (
            <TransportTile
                transportNumber={transportNumber}
                transportRoute={transportRoute}
                handledOrders={handledOrders}
                onDelete={this.deleteTransport}
                onTransportClick={this.props.onTransportClick}
            >
            </TransportTile>
        ))
    };
    handleCreateTransportInput = () => {
        this.setState({isInputActive: true});
    };
    handleCancelTransport = () => {
        //console.log("cancel");
        this.setState({isInputActive: false});
    };
    handleConfirmTransport = (transport) => {
        //console.log(transport);
        this.setState(state => {
            const transports = [...state.transports, transport];
            return {
                transports,
                isInputActive: false
            };
        }, () => {console.log(this.state.transports)});
        //console.log(this.state.transports);
    };

    renderInput = () => {
        const isInputActive = this.state.isInputActive;
        if (isInputActive) {
            return (
                <TransportInputTile onConfirm={this.handleConfirmTransport} onCancel={() => this.handleCancelTransport()}/>
            )
        }
    };

    render() {
        return (
            <div className={classes.transportColumn}>
                {/*<TransportTile transportNumber={3} transportRoute={['Katowice', 'Bytom', 'Sosnowiec']} handledOrders={['Zamówienie 1']}/>*/}
                {this.renderTransports()}
                {this.renderInput()}
                <img className={classes.addTransport} src={plus} onClick={this.handleCreateTransportInput}/>
            </div>
        );
    }
}
export default TransportColumn;