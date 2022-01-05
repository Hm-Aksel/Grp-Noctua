import React from 'react';

import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import BarLeft from "./components/BarLeft/BarLeft";
import BarMiddle from "./components/BarMiddle/BarMiddle";
import BarRight from "./components/BarRight/BarRight";
import BottomNav from "./components/BottomNav/BottomNav"
function App() {
  
  return (
    <div className="App">
    
       <Router>
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
        <BottomNav/>
       </Router>
    </div>
  );
}

export default App;
