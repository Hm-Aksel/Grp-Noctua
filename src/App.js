import React from "react";
import "./styles.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import BarLeft from "./components/BareLfet/BarLeft";
import BarMiddle from "./components/BarMiddle/BarMiddle";
import BarRight from "./components/BarRight/BarRight";
//   import Profile from './components/Profile/Profile';
import Login from "./components/Login/Login";
function App() {
  return (
    <div className="App">
      <Login />

      {/* <Router>
       <div className="app__mainContent">
        
         <BarLeft/>
         <Switch>

           <Route  excat path='/'>
           <div className="app__main">
               <BarMiddle/>
               <BarRight/>
           </div>
          </Route>

  
         </Switch>
        </div>
       </Router> */}
    </div>
  );
}

export default App;
