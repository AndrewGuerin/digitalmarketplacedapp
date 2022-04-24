import '../index.css';

import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

import MYNFTCollection from "../NFTCollection.js";
import SaleCollection from "../SaleCollection.js";

import * as fcl from "@onflow/fcl";

import {create} from 'ipfs-http-client';


//call ifps Hash
const client = create('https://ipfs.infura.io:5001/api/v0');


//essential for connection to testnet blockchain
fcl.config()
    .put("accessNode.api", "https://access-testnet.onflow.org")
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

function SearchScreen() {
  const [searchAddress, setSearchAddress] = useState();
  const [currentUserAddress, setOfficialAddress] = useState('');
  const [user, setUser] = useState();

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
              <div >
                <Input type="text" size="large" placeholder="eg. 0x8a969f1f92cc1776" onChange={(e) => setSearchAddress(e.target.value)} />
                <Button onClick={() => setOfficialAddress(searchAddress)}>Search</Button>
              </div>

            <br></br>
            <div id="div1-style">
            <h1>User NFT Collection</h1>
            </div>

            <div id="div2-style">
            <h1>NFT's For Sale</h1>
            </div>
               
            <div classname='displayNFT'>
              { user && user.addr && currentUserAddress && currentUserAddress !== ''
                  ? <MYNFTCollection address={currentUserAddress}></MYNFTCollection>
                  : null
              }
            </div>
              { user && user.addr && currentUserAddress && currentUserAddress !== ''
                  ? <SaleCollection address={currentUserAddress}></SaleCollection>
                  : null
              }
          </div>
      </div>  

    </div>
  );
}
export default SearchScreen;