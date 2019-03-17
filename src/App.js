import React, {Component} from 'react';
import './App.scss';
import OrderTile from "./components/OrderTile/OrderTile";
import TransportTile from "./components/TransportTile/TransportTile";
import OrdersColumn from "./components/OrdersColumn/OrdersColumn";

class App extends Component {
    render() {
        return (
            <div className={'container'}>
            <OrdersColumn/>
            {/*<TransportTile transportNumber={5} transportRoute={['Katowice', 'Bytom', 'Pyrzowice']} handledOrders={['Zamówienie 1', 'Zamówienie 2', 'Zamówienie 3']}/>*/}
            </div>
        );
    }
}

export default App;
