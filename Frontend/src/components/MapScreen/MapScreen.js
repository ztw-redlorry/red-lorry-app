import React, { Component } from 'react';
import Map from "../Map/RouteMap";
import {Container} from 'react-bootstrap'

class MapScreen extends Component {
    constructor(props){
        super(props);
        console.log("Latitude");
        console.log(this.props.latitude);
    }
    render () {
        return (
            <React.Fragment>
                <Map latitude={this.props.latitude}/>
            </React.Fragment>
        );
    }
}

export default MapScreen;