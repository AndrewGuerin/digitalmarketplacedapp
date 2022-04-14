import './App.css';

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {useState, useEffect} from 'react';

import {create} from 'ipfs-http-client';
import {mintNFT} from "./contracts/transactions/mint_NFT.js";


//call ifps Hash
const client = create('https://ipfs.infura.io:5001/api/v0');


//essential for connection to testnet blockchain
fcl.config()
    .put("accessNode.api", "https://access-testnet.onflow.org")
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

function App() {
  const [user, setUser] = useState();
  const [nameOfNFT, setNameOfNFT] = useState('');
  const [file, setFile] = useState();

  //sets the user variable to the user that just logged in
  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, [])

  //Login in the user
  const login = () => {
    fcl.authenticate();
  }

  const mint = async () => {

    try{
      const added = await client.add(file);
      const hash = added.path;
      const transactionId = await fcl.send([
        fcl.transaction(mintNFT),
        fcl.args([
          fcl.arg(hash, t.String),
          fcl.arg(nameOfNFT, t.String)
        ]),
        //boilerplate code
        //This code is nesscessary for a transaction
        //authz = the current user signed in
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations(fcl.authz),
        //gas limit
        fcl.limit(9999)
      ]).then(fcl.decode);

      console.log(transactionId);
      //return transaction
      return fcl.tx(transactionId).onceSealed();

    } catch(error) {
      console.log('Error upon file uploading: ', error);
    }
  }

  return (
    <div className="App">
        <h1>Account Address: {user && user.addr ? user.addr : ''}</h1>
        <button onClick={() => login()}>Log In Function</button>

        <button onClick={() => fcl.unauthenticate()}>Log Out Function</button>

        <div>
            <input type="text" onChange={(e) => setNameOfNFT(e.target.value)} />
            <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
            <button onClick={() => mint()}>Mint</button>
        </div>
    </div>
  );
}

export default App;
