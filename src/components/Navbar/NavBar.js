import React, { Component } from 'react';
import './navbar.scss'
import {Navbar} from "react-bootstrap"


class NavBar extends React.Component{
    render() {
        return (
            <Navbar>
                <ul id="nav">
                    <li><img src={require('../../images/logo.svg')}/></li>
                    <li><a href="#">RedLorry</a></li>
                    <li><img className={"logOut"} src={require('../../images/logOut.svg')}/></li>
                </ul>
            </Navbar>
        );
    }
}

export default NavBar;
