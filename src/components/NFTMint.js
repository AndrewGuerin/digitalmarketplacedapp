import '../index.css';

import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";

import { Button } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'

import {create} from 'ipfs-http-client';
import {mintNFT} from "../contracts/transactions/mintNFTImg.js";

import MYNFTCollection from "../NFTCollection.js";
import SaleCollection from "../SaleCollection.js";

import TransactionProgressBar from '../TransactionProgressBar';

//call ifps Hash
const client = create('https://ipfs.infura.io:5001/api/v0');

//essential for connection to testnet blockchain
fcl.config()
    .put("accessNode.api", "https://access-testnet.onflow.org")
    .put("discovery.wallet", "https://fcl-discovery.onflow.org/testnet/authn")

function NFTMint() {

  const [user, setUser] = useState();
  const [creatorOfNFT, setCreatorOfNFT] = useState('');
  const [nftName, setNFTname] = useState('');
  const [imageFile, setImageFile] = useState();

  const [currentUserAddress, setOfficialAddress] = useState('');

  //new progress bar
  const [transactionID, setTransactionID] = useState();
  const [transactionStatus, setTransactionStatus] = useState(-1);
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  
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

  const beginMinting = async () => {
    //Progress code
    setTransactionInProgress(true);
    setTransactionStatus(-1);


    try{
      const link = await client.add(imageFile);
      const hashData = link.path;

      const txId = await fcl.send([

        fcl.transaction(mintNFT),
        fcl.args([

          fcl.arg(hashData, t.String),
          fcl.arg(nftName, t.String),
          fcl.arg(creatorOfNFT, t.String)
        ]),
        //boilerplate code
        //This code is nesscessary for a transaction
        //authz = the current user signed in
        fcl.payer(fcl.authz),
        fcl.proposer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        //gas limit
        fcl.limit(999)
      ]).then(fcl.decode);

      //progress bar
      //everytime the state of the transaction changes this will run
      setTransactionID(txId);
      fcl.tx(txId).subscribe(result => {
        setTransactionStatus(result.status);
        console.log(result);
      });
      //return transaction
      return fcl.tx(txId).onceSealed();

    } catch(error) {
      console.log('Error upon file uploading: ', error);
    }
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
              <h1>Personal Account Address: {user && user.addr 
              ? user.addr : ''}</h1>
              
              <br></br><br></br>
              <div>
                <Input type="text" placeholder="Creator username" onChange={(e) => setCreatorOfNFT(e.target.value)} />
                <Input type="text" placeholder="NFT name" onChange={(e) => setNFTname(e.target.value)} /><br></br><br></br>
                <Input type="file" onChange={(e) => setImageFile(e.target.files[0])}/>
                <Button onClick={() => beginMinting()}>Start minting</Button>
              </div>

              <TransactionProgressBar transId={transactionID} transInProgress={transactionInProgress} transStatus={transactionStatus}/>

              { user && user.addr && currentUserAddress && currentUserAddress !== ''
                  ? <MYNFTCollection address={currentUserAddress}></MYNFTCollection>
                  : null
              }

              { user && user.addr && currentUserAddress && currentUserAddress !== ''
                  ? <SaleCollection address={currentUserAddress}></SaleCollection>
                  : null
              }
          </div>
      </div>  

    </div>
  );
}
export default NFTMint;