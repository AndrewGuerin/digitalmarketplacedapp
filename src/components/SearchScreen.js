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


//call ifps Hash
const client = create('https://ipfs.infura.io:5001/api/v0');


//essential for connection to testnet blockchain
fcl.config()
    .put("accessNode.api", "https://access-testnet.onflow.org")
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

function SearchScreen() {
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

              <div>
                <Input type="text" onChange={(e) => setAddress(e.target.value)} />
                <Button onClick={() => setOfficialAddress(address)}>Search</Button>
              </div>

              
            <div classname='displayNFT'>
              { user && user.addr && officialAddress && officialAddress !== ''
                  ?
                  <Collection address={officialAddress}></Collection>
                  :
                  null
              }
            </div>
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

export default SearchScreen;