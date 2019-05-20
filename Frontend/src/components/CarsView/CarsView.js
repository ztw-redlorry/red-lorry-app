import React, {Component} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import axios from "axios";
import classes from './CarsView.module.scss';

class CarsView extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
            cars: [],
            capacity: null
        };
    }

    handleConfirm = () => {
        const url = 'http://localhost:3000/cars';
        axios.post(url, this.state.capacity)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };
    onChangeValue = event => {
        console.log(event);
        if (event.target.name === 'capacity') {
            this.setState({capacity: event.target.value});
        }
    };

    componentDidMount() {
        axios.get('http://localhost:3000/cars')
            .then(
                (result) => {
                    console.log(result.data);
                    this.setState({
                        cars: result.data
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            );

    }

    handleClose() {
        this.setState({show: false});
    }

    handleShow() {
        this.setState({show: true});
    }

    render() {
        return (
            <>
                <li className={classes.button}>
                    <Button  variant="secondary" onClick={this.handleShow}>
                        Launch demo modal
                    </Button>
                </li>

                <Modal size="lg" style={{opacity: 1}} show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><h1>Panel zarządzania samochodami</h1></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h2>Dostępne samochody: </h2>
                        {this.state.cars.map((car) => (
                            <div className={classes.carWrapper}>
                                <div className={classes.carId}>ID pojazdu: {car.pojId} </div>
                                <div> Ładowność pojazdu {car.pojLadownosc}</div>
                            </div>
                        ))}
                        <h3>Dodaj nowy samochód: </h3>
                        <div className={classes.newCarInputWrapper}>
                            <h4>Podaj ładowność: </h4>
                            <Form className={classes.newCarInputWrapper}>
                                <Form.Group>
                                    <Form.Control name={'capacity'} onChange={this.onChangeValue} type="text"/>
                                </Form.Group>
                                <Button variant="secondary" onClick={this.handleConfirm} type="submit">
                                    Zapisz
                                </Button>
                            </Form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default CarsView;