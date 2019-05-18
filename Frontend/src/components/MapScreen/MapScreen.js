import React, { Component } from 'react';
import Map from "../Map/RouteMap";
import {Container} from 'react-bootstrap'

class MapScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            routePointsArray: props.routePointsArray
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log("Latitude");
        console.log(this.props.routePointsArray);
        this.setState({ routePointsArray: nextProps.routePointsArray });
    }
    render () {
        return (
            <React.Fragment>
                {/*<Map latitude={this.state.latitude}/>*/}
            </React.Fragment>
        );
    }
}

export default MapScreen;