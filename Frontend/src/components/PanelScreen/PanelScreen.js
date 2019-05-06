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
            latitude:  [
                {
                    "title": 'Chennai',
                    "lat": '13.0827',
                    "lng": '80.2707',
                    "description": '',
                    "flag":'1'
                }
                ,
                {
                    "title": 'Ramapuram',
                    "lat": '13.0317',
                    "lng": '80.1817',
                    "description": ''

                }
                ,
                {
                    "title": 'Kanchipuram',
                    "lat": '12.8342',
                    "lng": '79.7036',
                    "description": '',
                    "flag":'1'
                },

            ]
        };
    }
    render () {
        return (
            <div className={'container-fluid'}>
                <Row>
                    <Col sm={5} fluid style={{ paddingLeft: 2, paddingRight: 1 }}><LogisticScreen latitude={this.state.latitude}/></Col>
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