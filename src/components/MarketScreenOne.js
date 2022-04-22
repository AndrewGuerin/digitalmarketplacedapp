import '../index.css';

import React, {useRef, useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { Avatar, ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

import Collection from "../Collection.js";
import SaleCollection from "../SaleCollection.js";

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";


import {create} from 'ipfs-http-client';
import {mintNFT} from "../contracts/transactions/mint_NFT.js";
import {setupUserTx} from "../contracts/transactions/setup_user.js";
import {listForSaleTx} from "../contracts/transactions/list_for_sale.js";
import {unlistFromSaleTx} from "../contracts/transactions/unlistFromSale.js";

//call ifps Hash
const client = create('https://ipfs.infura.io:5001/api/v0');


//essential for connection to testnet blockchain
fcl.config()
    .put("accessNode.api", "https://access-testnet.onflow.org")
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

function MarketScreenOne() {
  const [user, setUser] = useState();
  const [nameOfNFT, setNameOfNFT] = useState('');
  const [file, setFile] = useState();
  const [id, setID] = useState();
  const [price, setPrice] = useState();
  const [address, setAddress] = useState();
  const [officialAddress, setOfficialAddress] = useState('');

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
    <div className='chats-page'>

      <div className="nav-bar">
          <div className="logo-tab">
                    NFT Marketplace
          </div>          

          <div onClick={logIn} className="connect-wallet-tab">
                    Connect Your Crypto Wallet
          </div>

          <div onClick={Logout} className="logout-tab">
                    Disconnect Wallet
          </div>

          <div onClick={handleMintScreenMove} className="mint-tab">
                    Mint / Create NFT's
          </div>

          <div onClick={handleSearchScreenMove} className="search-tab">
                    View Account NFT's
          </div>

          <div onClick={handleListingScreenMove} className="listUnlist-tab">
                    List / Unlist NFT's
          </div>

          <div onClick={handleChatScreenMove} className="chat-button-tab">
                    Back To Chatroom
          </div>

          




          <div className='App'>
              <h1>Account Address: {user && user.addr ? user.addr : ''}</h1>
              <Button onClick={() => logIn()}>Connect Crypto Wallet</Button>
              <Button onClick={() => fcl.unauthenticate()}>Log Out</Button>

              <h1>Steps to get Started:</h1>
              <h2>Step 1: Connect your crypto wallet using the button on the top right 
                of the screen.</h2>
              <h2>Step 2: Setup your Collection using the button below.</h2>
              <h2>This only needs to be done once.</h2>
              <h2>Without a collection your NFT's will have no where to be saved.</h2>
              <h2>Step 3: Now Mint / Create your NFT's and list them for sale or start by purchasing.</h2>

              <div>
                <br></br>
                
                <Button onClick={() => setupUser()}>Setup User Collection</Button>
                
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
      </div>  

    </div>
  );
}

export default MarketScreenOne;