import React, {Component} from 'react';
import './navbar.scss'
import {Navbar} from "react-bootstrap"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import CarsView from "../CarsView/CarsView";


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
    }
    handleClick = () => {
        localStorage.setItem('usertoken', "");
        if(this.state.loggedIn === true){
            this.setState({loggedIn: false})
        }
        else{
            this.setState({loggedIn: true})
        }
    };
    render() {
        return (
            <Navbar>
                <ul id="nav">
                    <li>
                        <Link to="/">
                            <img src={require('../../images/logo.svg')}/>
                        </Link>
                    </li>
                    <li className='logoText'>RedLorry</li>

                    <li>
                        <CarsView loggedIn={this.state.loggedIn}/>
                        <Link to="/login" onClick={this.handleClick}>
                            <img className={"logOut"} src={require('../../images/logOut.svg')}/>
                        </Link>
                    </li>
                </ul>
            </Navbar>
        );
    }
}

export default NavBar;
