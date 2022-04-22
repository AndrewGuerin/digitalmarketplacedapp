import './index.css';

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {useState, useEffect} from 'react';
import {getNFTsScript} from "./contracts/scripts/get_nfts.js"


function Collection(props) {
  const [nfts, setNFTs] = useState([]);

  useEffect(() => {
    getUserNFTs();
  }, [])

  const getUserNFTs = async () => {
      const result = await fcl.send([
          fcl.script(getNFTsScript),
          fcl.args([
              fcl.arg(props.address, t.Address)
          ])
      ]).then(fcl.decode);

      console.log(result);
      setNFTs(result);
  }

  return (
    <div style={{backgroundColor: 'lightgreen', border: '5px outset black', position: 'relative', width: '50%', float: 'left'}}>
      {nfts.map(nft => (
            <div key={nft.id}>
              <br></br>
                <h1>NFT ID: {nft.id}</h1>
                <img style={{width: "200px", height: "200px"}}src={`https://ipfs.infura.io/ipfs/${nft.ipfsHash}`} />
                <h1>NFT Name: {nft.metadata.name}</h1>
                <h1>creator: {nft.metadata.creator}</h1>
                <br></br><br></br>
            </div>
      ))}
    </div>
  );
}

export default Collection;