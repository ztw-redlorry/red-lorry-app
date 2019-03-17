import React, { Component } from "react";
import LogisticScreen from '../LogisticScreen/LogisticScreen'
import MapScreen from '../MapScreen/MapScreen'
import {Col, Row, Container, Button} from "react-bootstrap"

class PanelScreen extends Component {
    render () {
        return (
            <div>
            <Container>
                <Row>
                    <Col sm={7}><LogisticScreen/></Col>
                    <Col sm={5}><MapScreen/></Col>
                </Row>
            </Container>
            </div>
        );
    }
}

export default PanelScreen;