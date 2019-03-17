import React, { Component } from 'react';
import OrderColumn from '../OrdersColumn/OrdersColumn.js'
import {Col, Row,Container} from "react-bootstrap";
import './LogisticScreen.scss'


class LogisticScreen extends Component {
    render () {
        return (
            <React.Fragment>
                <Col sm={6} fluid style={{ paddingLeft: 1, paddingRight: 1 }}> <OrderColumn/></Col>
                <Col sm={6} fluid style={{ paddingLeft: 1, paddingRight: 1 }}> <OrderColumn/></Col>
            </React.Fragment>
        );
    }
}

export default LogisticScreen;