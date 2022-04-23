import './App.css';

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {useState, useEffect} from 'react';
import {getSaleNFTsScript} from "./contracts/scripts/get_sale_nfts.js"
import {purchaseTx} from "./contracts/transactions/purchase.js"
import { Button } from 'semantic-ui-react'


function SaleCollection(props) {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    getUserSaleNFTs();
  }, [])

  const getUserSaleNFTs = async () => {
      const result = await fcl.send([
          fcl.script(getSaleNFTsScript),
          fcl.args([
              fcl.arg(props.address, t.Address)
          ])
      ]).then(fcl.decode);

      console.log(result);
      setNFTs(result);
  }

  const purchase = async (id) => {
    const transactionId = await fcl.send([
      fcl.transaction(purchaseTx),
      fcl.args([
        fcl.arg(props.address, t.Address),
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
    <div style={{backgroundColor: 'lightgrey', border: '5px outset black', position: 'relative', width: '50%', float: 'right'}}>
      {Object.keys(nfts).map(price => (
            <div key={price}>
              <br></br>
                <h1>Price: {price} FLOW</h1>
                <h1>NFT ID: {nfts[price].id}</h1>
                <img style={{width: "300px", height:"300px"}}src={`https://ipfs.infura.io/ipfs/${nfts[price].ipfsHash}`} />
                <h1>{nfts[price].metadata.name}</h1>
                <h1>creator: {nfts[price].metadata.creator}</h1>
                <Button onClick={() => purchase(nfts[price].id)}>Purchase this NFT</Button>
                <br></br><br></br>
            </div>
      ))}
    </div>
  );
}

export default SaleCollection;