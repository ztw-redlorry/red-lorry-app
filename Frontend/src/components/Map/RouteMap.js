import './RouteMap.scss';
import React from 'react'
import './RouteMap.scss'
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-routing-machine';



class RouteMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routePointsArray: props.routePointsArray
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log("Latitude");
        console.log(nextProps.routePointsArray);
        this.setState({ routePointsArray: nextProps.routePointsArray }, ()=>{
            var container = L.DomUtil.get('map');
            if(container != null){
                container._leaflet_id = null;
            }
            console.log("Latitude");
            console.log(this.state.routePointsArray);
            let map = L.map('map');

            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            let routeControl = L.Routing.control({
            }).addTo(map);
            routeControl.setWaypoints(this.state.routePointsArray);
        });
    }


    render(){
        return (
            <div id={'map'}>
                <LeafletMap
                    center={[50, 10]}
                    zoom={6}
                    maxZoom={10}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                >
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={[50, 10]}>
                        <Popup>
                            Popup for any custom information.
                        </Popup>
                    </Marker>
                </LeafletMap>
            </div>
        );
    }
}

export default RouteMap