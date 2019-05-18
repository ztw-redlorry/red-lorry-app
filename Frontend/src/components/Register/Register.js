import React, { Component } from 'react'
import classes from "./Register.module.scss";
import axios from "axios";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleClick (event) {
        event.preventDefault();
        let data = {
            username: this.state.email,
            password: this.state.password
        };
        axios.post('http://localhost:3000/register', data )
            .then(res => {
                alert("Registered!");
                this.props.history.push(`/login`);
                console.log(res.data);
            })
            .catch(err => {
                console.log('error = '+err);
            })
    }

    render () {
        return (
            <div className={'screen'}>
                <div className={classes["login-form"]}>
                    <h1>Register Form</h1>
                    <form noValidate onSubmit={this.handleClick}>
                        <input type="email"
                               className="form-control"
                               name="email"
                               placeholder="Enter Email"
                               value={this.state.email}
                               onChange={this.onChange}
                        />
                        <input type="password"
                               className="form-control"
                               name="password"
                               placeholder="Enter Password"
                               value={this.state.password}
                               onChange={this.onChange}
                        />
                        <input type="submit" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Register