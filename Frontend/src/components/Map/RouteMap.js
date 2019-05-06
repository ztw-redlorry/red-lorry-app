import './Map.scss';
import React from 'react'
import './Map.scss'
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';



class Map extends React.Component {

    addMap = () => {
        const provider = new OpenStreetMapProvider();
        const searchControl = new GeoSearchControl({
            provider: provider,
        });

        const map = new L.Map('map');
        map.addControl(searchControl);
        return map
    };

    render(){
        return (
            <div className={'mapa'}>
                {this.addMap()}
            </div>
        );
    }
}

export default Map