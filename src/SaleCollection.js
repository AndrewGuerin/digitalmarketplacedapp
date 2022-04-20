import './App.css';

import * as fcl from "@onflow/fcl";
import * as t from "@onflow/types";
import {useState, useEffect} from 'react';
import {getSaleNFTsScript} from "./contracts/scripts/get_sale_nfts.js"


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

  return (
    <div style={{backgroundColor: 'lightblue'}}>
      {Object.keys(nfts).map(price => (
            <div key={price}>
                <h1>Price: {price}</h1>
                <h1>{nfts[price].id}</h1>
                <img style={{width: "200px"}}src={`https://ipfs.infura.io/ipfs/${nfts[price].ipfsHash}`} />
                <h1>{nfts[price].metadata.name}</h1>
            </div>
      ))}
    </div>
  );
}

export default SaleCollection;