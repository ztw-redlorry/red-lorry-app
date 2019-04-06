import React, {Component} from 'react';
import OrderColumn from '../../containers/OrdersColumn/OrdersColumn.js'
import {Col, Row, Container} from "react-bootstrap";
import './LogisticScreen.scss'
import TransportColumn from "../../containers/TransportColumn/TransportColumn";


class LogisticScreen extends Component {
  render() {
    return (
      <div className={'logisticScreen'}>
        <div className={'logisticScreenHeader'}>
          <div className={'title'}>Zamówienia</div>
          <div className={'title'}>Transporty</div>
          {/*<Col sm={6} className={'title'}>Zamówienia</Col>*/}
          {/*<Col sm={6} className={'title'}>Transporty</Col>*/}
        </div>
        <Col sm={6} fluid style={{paddingLeft: 1, paddingRight: 1}}> <OrderColumn/></Col>
        <Col sm={6} fluid style={{paddingLeft: 1, paddingRight: 1}}> <TransportColumn/></Col>
      </div>
    );
  }
}

export default LogisticScreen;