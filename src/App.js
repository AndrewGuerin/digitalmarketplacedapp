import './App.css';

import Collection from "./Collection.js";
import SaleCollection from "./SaleCollection.js";

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {useState, useEffect} from 'react';

import {create} from 'ipfs-http-client';
import {mintNFT} from "./contracts/transactions/mint_NFT.js";
import {setupUserTx} from "./contracts/transactions/setup_user.js";
import {listForSaleTx} from "./contracts/transactions/list_for_sale.js";
import {unlistFromSaleTx} from "./contracts/transactions/unlistFromSale.js";

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
  const [id, setID] = useState();
  const [price, setPrice] = useState();
  const [address, setAddress] = useState();
  const [officialAddress, setOfficialAddress] = useState('');

  //sets the user variable to the user that just logged in
  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, [])

  //Login in the user
  const logIn = () => {
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
        fcl.authorizations([fcl.authz]),
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

  const setupUser = async () => {
    const transactionId = await fcl.send([
      fcl.transaction(setupUserTx),
      fcl.args([]),
      //boilerplate code
      //This code is nesscessary for a transaction
      //authz = the current user signed in
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      //gas limit
      fcl.limit(9999)
    ]).then(fcl.decode);

        console.log(transactionId);
        //return transaction
        return fcl.tx(transactionId).onceSealed();
  }

  const listForSale = async () => {
    const transactionId = await fcl.send([
      fcl.transaction(listForSaleTx),
      fcl.args([
        fcl.arg(parseInt(id), t.UInt64),
        fcl.arg(price, t.UFix64)
      ]),
      //boilerplate code
      //This code is nesscessary for a transaction
      //authz = the current user signed in
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      //gas limit
      fcl.limit(9999)
    ]).then(fcl.decode);

    console.log(transactionId);
    //return transaction
    return fcl.tx(transactionId).onceSealed();
  }

  const unlistFromSale = async () => {
    const transactionId = await fcl.send([
      fcl.transaction(unlistFromSaleTx),
      fcl.args([
        fcl.arg(parseInt(id), t.UInt64)
      ]),
      //boilerplate code
      //This code is nesscessary for a transaction
      //authz = the current user signed in
      fcl.payer(fcl.authz),
      fcl.proposer(fcl.authz),
      fcl.authorizations([fcl.authz]),
      //gas limit
      fcl.limit(9999)
    ]).then(fcl.decode);

    console.log(transactionId);
    //return transaction
    return fcl.tx(transactionId).onceSealed();

  }

  return (
    <div className="App">
        <h1>Account Address: {user && user.addr ? user.addr : ''}</h1>
        <button onClick={() => logIn()}>Log In Function</button>
        <button onClick={() => fcl.unauthenticate()}>Log Out Function</button>
        <button onClick={() => setupUser()}>Setup User</button>

        <div>
          <input type="text" onChange={(e) => setAddress(e.target.value)} />
          <button onClick={() => setOfficialAddress(address)}>Search</button>
        </div>

        <div>
          <input type="text" onChange={(e) => setNameOfNFT(e.target.value)} />
          <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
          <button onClick={() => mint()}>Mint</button>
        </div>

        <div>
          <input type="text" onChange={(e) => setID(e.target.value)} />
          <input type="text" onChange={(e) => setPrice(e.target.value)}/>
          <button onClick={() => listForSale()}>List NFT for sale</button>
          <button onClick={() => unlistFromSale()}>Unlist an NFT from sale</button>
        </div>

        { user && user.addr && officialAddress && officialAddress !== ''
            ?
            <Collection address={officialAddress}></Collection>
            :
            null
        }

        { user && user.addr && officialAddress && officialAddress !== ''
            ?
            <SaleCollection address={officialAddress}></SaleCollection>
            :
            null
        }


    </div>
  );
}

export default App;
