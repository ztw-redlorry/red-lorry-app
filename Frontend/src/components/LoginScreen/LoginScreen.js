import React, {Component} from "react";
import classes from './LoginScreen.module.scss';
import axios from 'axios';
import { Link } from 'react-router-dom'


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.handleClick = this.handleClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleClick (event) {
        event.preventDefault();
        let data = {
            username: this.state.email,
            password: this.state.password
        };
        axios.post('http://localhost:3000/login', data )
            .then(res => {
                localStorage.setItem('usertoken', res.data);
                alert("Logged in!");
                this.props.history.push(`/`);
                console.log(res.data);
            })
            .catch(err => {
                console.log('error = '+err);
            })
    }

    onChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <div className={'screen'}>
                <div className={classes["login-form"]}>
                    <h1>Login Form</h1>
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
                        <div className={classes.register}>
                            <Link to="/register" >Don't have an account? Register now! </Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginScreen;