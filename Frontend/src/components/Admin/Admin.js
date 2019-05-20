import React, { Component } from 'react';
import TransportTile from "../../components/TransportTile/TransportTile";
import classes from "./Admin.module.scss";
import TransportInputTile from "../../components/TransportInputTile/TransportInputTile";
import axios from "axios";

class Admin extends Component{
    constructor(props) {
        super(props);
        this.state = {
            transports: []
        }
    }
    componentDidMount() {
        axios.get('http://localhost:3000/transports')
            .then(
                (result) => {
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
    renderTransports = () => {
        const transports = this.state.transports;
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
    render() {
        return (
            <div className={classes.transportColumn}>
                {this.renderTransports()}
                {this.renderInput()}
            </div>
        );
    }
}
export default Admin;