import './App.css';

import * as fcl from "@onflow/fcl";


//essential for connection to testnet blockchain
fcl.config()
    .put("accessNode.api", "https://access-testnet.onflow.org")
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

function App() {

  const login = () => {
    fcl.authenticate();
  }


  return (
    <div className="App">
        <h1>Hello look at this</h1>
        <button onClick={() => login()}>Log In Function</button>
    </div>
  );
}

export default App;
