
import React from "react";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

import {AuthProvider} from "../contexts/AuthContext";

import Chats from "./Chats";
import ListingScreen from "./ListingScreen";
import Login from "./Login";
import UserStepGuide from "./UserStepGuide"
import NFTMint from "./NFTMint"
import SearchScreen from "./SearchScreen";


function App() {
  return (
    <div style={{ fontFamily: 'Avenir'}}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/UserStepGuide" component={UserStepGuide} />
            <Route path="/NFTMint" component={NFTMint} />
            <Route path="/SearchScreen" component={SearchScreen} />
            <Route path="/ListingScreen" component={ListingScreen} />
            <Route path="/" component={Login} /> 

          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App;
