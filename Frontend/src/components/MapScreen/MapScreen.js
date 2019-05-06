import React, { Component } from 'react';
import Map from "../Map/RouteMap";
import {Container} from 'react-bootstrap'

class MapScreen extends Component {
    constructor(props){
        super(props)
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