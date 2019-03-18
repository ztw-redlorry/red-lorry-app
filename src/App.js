import React, {Component} from 'react';
import './App.scss';
import NavBar from './components/Navbar/NavBar'
import PanelScreen from "./components/PanelScreen/PanelScreen";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <PanelScreen/>
      </div>
    );
  }
}

export default App;
