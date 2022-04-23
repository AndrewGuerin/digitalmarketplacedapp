import '../index.css';

import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

import Collection from "../Collection.js";
import SaleCollection from "../SaleCollection.js";

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import {create} from 'ipfs-http-client';

import {listForSaleTx} from "../contracts/transactions/list_for_sale.js";
import {unlistFromSaleTx} from "../contracts/transactions/unlistFromSale.js";

import TransactionProgress from '../TransactionProgress';

//call ifps Hash
const client = create('https://ipfs.infura.io:5001/api/v0');


//essential for connection to testnet blockchain
fcl.config()
    .put("accessNode.api", "https://access-testnet.onflow.org")
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

function ListingScreen() {
  const [user, setUser] = useState();

  const [id, setID] = useState();
  const [unlistId, setUnlistId] = useState();
  const [price, setPrice] = useState();

  const [officialAddress, setOfficialAddress] = useState('');

  //new progress bar
  const [txId, setTxId] = useState();
  const [txInProgress, setTxInProgress] = useState(false);
  const [txStatus, setTxStatus] = useState(-1);

  const history = useHistory();

  //sets the user variable to the user that just logged in
  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, [])

  //Login in the user
  const logIn = () => {
    fcl.authenticate();
  }

  const Logout = () => {
    fcl.unauthenticate();
  }

  const handleMintScreenMove = async () => {
    history.push('/NFTMint')
  }

  const handleSearchScreenMove = async () => {
    history.push('/SearchScreen')
  }

  const handleListingScreenMove = async () => {
    history.push('/ListingScreen')
  }

  const handleChatScreenMove = async () => {
    history.push('/Chats')
  }

  const handleMarketpageMove = async () => {
    history.push('/UserStepGuide')
  }

  const listForSale = async () => {
    setTxInProgress(true);
    setTxStatus(-1);

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

    //console.log(transactionId);

      //progress bar
      //everytime the state of the transaction changes this will run
      setTxId(transactionId);
      fcl.tx(transactionId).subscribe(res => {
        setTxStatus(res.status);
        console.log(res);
      });

    //return transaction
    return fcl.tx(transactionId).onceSealed();
  }

  const unlistFromSale = async () => {

    setTxInProgress(true);
    setTxStatus(-1);
    const transactionId = await fcl.send([
      fcl.transaction(unlistFromSaleTx),
      fcl.args([
        fcl.arg(parseInt(unlistId), t.UInt64)
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

    //console.log(transactionId);

      //progress bar
      //everytime the state of the transaction changes this will run
      setTxId(transactionId);
      fcl.tx(transactionId).subscribe(res => {
        setTxStatus(res.status);
        console.log(res);
      });

    //return transaction
    return fcl.tx(transactionId).onceSealed();

  }

  return (
    <div className='chats-page'>

<div className="nav-bar">
          <div className="logo-tab">
                    NFT Marketplace
          </div>          

          <div id="mybutton-header" onClick={logIn} className="connect-wallet-tab">
                    Connect Your Crypto Wallet
          </div>

          <div id="mybutton-header" onClick={Logout} className="logout-tab">
                    Disconnect Wallet
          </div>

          <div id="mybutton-header" onClick={handleMintScreenMove} className="mint-tab">
                    Mint / Create NFT's
          </div>

          <div id="mybutton-header" onClick={handleSearchScreenMove} className="search-tab">
                    View Account NFT's
          </div>

          <div id="mybutton-header" onClick={handleListingScreenMove} className="listUnlist-tab">
                    List / Unlist NFT's
          </div>

          <div id="mybutton-header" onClick={handleChatScreenMove} className="chat-button-tab">
                    Back To Chatroom
          </div>

          <div id="mybutton-header" onClick={handleMarketpageMove} className="setup-tab">
                    Setup Collection
          </div>

          




          <div className='App'>
              <h1>Personal Account Address: {user && user.addr ? user.addr : ''}</h1>
              
              <br></br><br></br>
              <div>
                <Input type="text" placeholder="eg. NFT ID" onChange={(e) => setID(e.target.value)} />
                <Input type="text" placeholder="Set FLOW Price eg. 20.0" onChange={(e) => setPrice(e.target.value)}/>
                <Button onClick={() => listForSale()}>List NFT for sale</Button>

                <br></br><br></br><br></br><br></br>
                <Input type="text" placeholder="eg. NFT ID" onChange={(e) => setUnlistId(e.target.value)} />
                <Button onClick={() => unlistFromSale()}>Unlist an NFT from sale</Button>
              </div>

              <TransactionProgress txId={txId} txInProgress={txInProgress} txStatus={txStatus}/>

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
      </div>  

    </div>
  );
}
export default ListingScreen;