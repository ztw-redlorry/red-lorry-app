import React, {Component} from "react";
import classes from './LoginScreen.module.scss';
import axios from 'axios';


class LoginScreen extends Component {

    handleClick (event) {
        event.preventDefault();
        let data = {
            username: event.target.username.value,
            password: event.target.password.value
        };
        axios.post('http://localhost:3000/login', data )
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div className={'screen'}>
                <div className={classes["login-form"]}>
                    <h1>Login Form</h1>
                    <form onSubmit={this.handleClick}>
                        <input type="text" name="username" placeholder="Username" required/>
                        <input type="password" name="password" placeholder="Password" required/>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginScreen;