import React, {Component} from 'react';
import OrderColumn from '../OrdersColumn/OrdersColumn.js'
import {Col, Row, Container} from "react-bootstrap";
import './LogisticScreen.scss'
import TransportColumn from "../TransportColumn/TransportColumn";


class LogisticScreen extends Component {
    state = {
        numChildren: 0
    };

    render() {
        const children = [];

        for (var i = 0; i < this.state.numChildren; i += 1) {
            children.push(<ChildComponent key={i} number={i} />);
        };

        return (
            <React.Fragment>
                <div className={'logisticScreenHeader'}>
                    <div className={'title'}>Zamówienia</div>
                    <div className={'title'}>Transporty</div>
                    {/*<Col sm={6} className={'title'}>Zamówienia</Col>*/}
                    {/*<Col sm={6} className={'title'}>Transporty</Col>*/}
                </div>
                <Col sm={6} fluid style={{paddingLeft: 1, paddingRight: 1}}> <OrderColumn addChild={this.onAddChild}>{children}</OrderColumn></Col>
                <Col sm={6} fluid style={{paddingLeft: 1, paddingRight: 1}}> <TransportColumn/></Col>
            </React.Fragment>
        );
    }

    onAddChild = () => {
        this.setState({
            numChildren: this.state.numChildren + 1
        });
    }
}

export default LogisticScreen;