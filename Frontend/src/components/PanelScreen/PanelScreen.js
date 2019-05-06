import React, { Component } from "react";
import LogisticScreen from '../LogisticScreen/LogisticScreen'
import MapScreen from '../MapScreen/MapScreen'
import {Col, Row, Container, Button} from "react-bootstrap"
import './PanelScreen.scss'
import TransportCapacity from "../TransportCapacity/TransportCapacity";


class PanelScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: []
        };
    }
    onTransportClick = (latitudeArray) =>{
        this.setState({latitude: latitudeArray});
    };
    render () {
        return (
            <div className={'container-fluid'}>
                <Row>
                    <Col sm={5} fluid style={{ paddingLeft: 2, paddingRight: 1 }}><LogisticScreen onTransportClick={this.onTransportClick}/></Col>
                    <Col sm={7} fluid style={{ paddingLeft: 1, paddingRight: 4 }}>
                        <MapScreen latitude={this.state.latitude}/>
                        <TransportCapacity />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PanelScreen;