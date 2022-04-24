export const listNFT4SaleTrans = `

import NFTMarketplace from 0x48d98a1c02880291

transaction(id: UInt64, 
            price: UFix64) {

  prepare(acct: AuthAccount) {
    let nftSaleCollection = acct.borrow<&NFTMarketplace.SaleCollection>(from: /storage/MySaleCollection)
      ?? panic("This instance NFTSaleCollection does not exist")

      nftSaleCollection.listForSale(id: id, price: price)
  }

  execute {
    log("A user listed an NFT for Sale successfully")
  }
}
`