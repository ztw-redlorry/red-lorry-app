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
            latitude: [],
            token: null
        };
    };
    componentDidMount() {
        let userToken = localStorage.getItem('usertoken');
        console.log(userToken);
        if(userToken===null || userToken===""){
            this.props.history.push(`/login`);
        }
        else{
            this.setState({token: userToken} );
        }
    }
    onTransportClick = (routePointsArray) => {
        console.log("Latitude");
        this.setState({routePointsArray: routePointsArray}, () => {
            console.log(this.state.routePointsArray);
        });
    };
    render () {
        return (
            <div className={'container-fluid'}>
                <Row>
                    <Col sm={5} fluid style={{ paddingLeft: 2, paddingRight: 1 }}><LogisticScreen onTransportClick={this.onTransportClick}/></Col>
                    <Col sm={7} fluid style={{ paddingLeft: 1, paddingRight: 4 }}>
                        <MapScreen routePointsArray={this.state.routePointsArray}/>
                        <TransportCapacity maxLoad={1000} routePointsArray={this.state.routePointsArray}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PanelScreen;