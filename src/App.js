import React from 'react';
import "./styles.css";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import BarLeft from "./components/BareLfet/BarLeft";
import BarMiddle from "./components/BarMiddle/BarMiddle";
import BarRight from "./components/BarRight/BarRight";
//   import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';
import Home from "./Pages/Home/Home";
function App() {

  return (
    <div className="App">
      <Router>
        <div className='app__mainContent'>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
        </div>
      </Router>
    </div>
  );
}

export default App;
