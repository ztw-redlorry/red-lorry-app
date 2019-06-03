import React, {Component} from 'react';
import './navbar.scss'
import {Navbar, Button} from "react-bootstrap"
import {BrowserRouter as Router, Route, Link} from "react-router-dom";


class NavBar extends React.Component {
    handleClick = () => {
        localStorage.setItem('usertoken', "");
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
                        <Button variant={'light'}>
                            <Link to="/adminpanel">
                                Panel Administratora
                            </Link>
                        </Button>
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
