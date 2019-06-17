import React, {Component} from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import axios from "axios";
import styles from "./styles.module.scss"
class RightsPanel extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false,
            users: [],
            capacity: null
        };
    }
    handleRightsChange = (user) => {
        const url = 'http://localhost:3000/users';
        axios.post(url, user)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    };
    handleConfirm = () => {
        const url = 'http://localhost:3000/users';
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
        axios.get('http://localhost:3000/users')
            .then(
                (result) => {
                    console.log(result.data);
                    this.setState({
                        users: result.data
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            );

    }


    render() {
        return (
            <div className={styles.container}>
                <h1>Panel nadawania uprawnień użytkownikom</h1>
                <h2>Dostępni użytkownicy: </h2>
                {this.state.users.map((user) => (
                    <div className={styles.userWrapper}>
                        <div className={styles.userElement}>ID : {user.uzyId} </div>
                        <div className={styles.userElement}>Login: {user.uzyLogin}</div>
                        <div className={styles.userElement}> Uprawnienia Administratora: {(user.uzyUprawnieniaAdmin === 1) ? <span>Tak</span> : <span>Nie</span>}</div>
                        <Button onClick={() => this.handleRightsChange(user)}>Zmień uprawnienia</Button>
                    </div>
                ))}
                <br/>

            </div>
        );
    }
}

export default RightsPanel;