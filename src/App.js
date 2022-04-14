import './App.css';

import * as fcl from "@onflow/fcl";
import {useState, useEffect} from 'react';


//essential for connection to testnet blockchain
fcl.config()
    .put("accessNode.api", "https://access-testnet.onflow.org")
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

function App() {
  const [user, setUser] = useState();

  //sets the user variable to the user that just logged in
  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, [])

  //Login in the user
  const login = () => {
    fcl.authenticate();
  }


  return (
    <div className="App">
        <h1>Account Address: {user && user.addr ? user.addr : ''}</h1>
        <button onClick={() => login()}>Log In Function</button>

    </div>
  );
}

export default App;
