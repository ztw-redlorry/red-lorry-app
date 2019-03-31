import React, { Component } from 'react';
import Map from "../Map/Map";
import {Container} from 'react-bootstrap'

class MapScreen extends Component {
    render () {
        return (
            <React.Fragment>
                <Map/>
            </React.Fragment>
        );
    }
}

export default MapScreen;