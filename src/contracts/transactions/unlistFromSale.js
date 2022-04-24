export const unlistFromSaleTransaction = `

import NFTMarketplace from 0x48d98a1c02880291

transaction(id: UInt64) {

  prepare(acct: AuthAccount) {
    let nftSaleCollection = acct.borrow<&NFTMarketplace.SaleCollection>(from: /storage/MySaleCollection)
      ?? panic("This saleCollection does not exist or cannot be found")

    nftSaleCollection.unlistFromSale(id: id)
  }

  execute {
    log("A user unlisted their NFT for Sale")
  }
}
`