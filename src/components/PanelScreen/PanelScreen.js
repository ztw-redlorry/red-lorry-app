import React, { Component } from "react";
import LogisticScreen from '../LogisticScreen/LogisticScreen'
import MapScreen from '../MapScreen/MapScreen'
import {Col, Row, Container, Button} from "react-bootstrap"
import './PanelScreen.scss'


class PanelScreen extends Component {
    render () {
        return (
            <div className={'container-fluid'}>
                <Row>
                    <Col sm={5} fluid style={{ paddingLeft: 2, paddingRight: 1 }}><LogisticScreen/></Col>
                    <Col sm={7} fluid style={{ paddingLeft: 1, paddingRight: 4 }}><MapScreen/></Col>
                </Row>
            </div>
        );
    }
}

export default PanelScreen;