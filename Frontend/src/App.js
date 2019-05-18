import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import styles from './App.scss';
import NavBar from './components/Navbar/NavBar'
import PanelScreen from "./components/PanelScreen/PanelScreen";
import LoginScreen from "./components/LoginScreen/LoginScreen";

class App extends Component {
    render() {
        return (
            <div className={styles.appWrapper}>
                <Router>
                    <div className="App">
                        <NavBar/>
                        <Route exact path="/" component={PanelScreen}/>
                        <Route exact path="/login" component={LoginScreen}/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
