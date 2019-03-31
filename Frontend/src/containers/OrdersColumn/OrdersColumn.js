import React, {Component} from 'react';
import './OrdersColumn.scss';
import OrderTile from "../../components/OrderTile/OrderTile";
import plus from '../../plus.png';
import OrderInputTile from "../../components/OrderInputTile/OrderInputTile";
import axios from "axios";

class OrdersColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/orders')
            .then(
                (result) => {
                    console.log(result.data);
                    this.setState({
                        isLoaded: true,
                        orders: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )

    }

    /*response.data.forEach(function(entry) {
                  const zamId = Math.floor(Math.random() * 100);
                  const newElement = {
                      zamId: zamId,
                      miastoStart: entry['miastoStart'],
                      miastoKoniec: entry['miastoKoniec'],
                      zamIloscTowaru: entry['zamIloscTowaru']
                  };
                  console.log(newElement);
                  this.setState(state => {
                      const orders = [...state.orders, newElement];
                      return {
                          orders
                      };
                  });
              });*/
/*

    componentDidMount() {
        axios.get('http://localhost:3000/orders')
            .then(res => this.setState({ data: res.data }))
            .catch(err => console.log(err));
    }
*/

   /* componentDidMount() {
        axios.get('http://localhost:3000/orders')
            .then(function (response) {
                response.data.forEach(function(entry) {
                    const zamId = Math.floor(Math.random() * 100);
                    const newElement = {
                        zamId: zamId,
                        miastoStart: entry['miastoStart'],
                        miastoKoniec: entry['miastoKoniec'],
                        zamIloscTowaru: entry['zamIloscTowaru']
                    };
                    console.log(newElement);
                    this.setState(state => {
                        const orders = [...state.orders, newElement];
                        return {
                            orders
                        };
                    });
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }*/

    handleCreateOrderInput = () => {
        console.log("asdasdasd");
        const newElement = {
            zamId: '144231',
            miastoStart: 'Katowice',
            miastoKoniec: 'Poznań',
            zamIloscTowaru: '200'
        };
        this.setState(state => {
            const orders = [...state.orders, newElement];
            return {
                orders
            };
        });
    };

    handleConfirmOrder = (order) => {
        this.setState(state => {
            const orders = [...state.orders, order];
            return {
                orders
            };
        });
    };

    renderOrders = () => {
        const orders = this.state.orders;
        console.log("Order = "+orders.length);
        return orders.map(({ zamId: zamId, miastoStart: miastoStart, miastoKoniec, zamIloscTowaru }) => (
            <OrderTile
                key={zamId}
                id={zamId}
                orderNumber={zamId}
                pointFrom={miastoStart}
                pointTo={miastoKoniec}
                amount={zamIloscTowaru}
            >
            </OrderTile>
    ));
    };

    render() {
        return (
            <div className={'ordersColumn'}>
                {this.renderOrders()}
                <OrderInputTile onClick={this.handleConfirmOrder}/>
                <img className={'addOrder'} src={plus} onClick={this.handleCreateOrderInput}/>
            </div>
        )
    }
}

export default OrdersColumn;