import './index.css';

import {useState, useEffect} from 'react';
import {returnNFTScript} from "./contracts/scripts/returnNFT.js";
import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";



function MYNFTCollection(found) {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    getUserAddressNFTs();
  }, [])

  const getUserAddressNFTs = async () => {
      const result = await fcl.send([
          fcl.script(returnNFTScript),
          fcl.args([
            //required function props.address
              fcl.arg(found.address, t.Address)
          ])
      ]).then(fcl.decode);

      console.log(result);
      setNFTs(result);
  }

  return (
    <div style={{backgroundColor: 'lightgrey', border: '5px outset black', position: 'relative', width: '50%', float: 'left'}}>
      {nfts.map(nft => (
            <div key={nft.id}>
              <br></br>
                <h1>NFT ID: {nft.id}</h1>
                <img style={{width: "300px", height: "300px"}}src={`https://ipfs.infura.io/ipfs/${nft.ipfsHash}`} />
                <h1>NFT Name: {nft.metadata.name}</h1>
                <h1>creator: {nft.metadata.creator}</h1>
                <br></br><br></br>
            </div>
      ))}
    </div>
  );
}

export default MYNFTCollection;