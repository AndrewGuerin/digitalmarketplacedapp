export const unlistFromSaleTx = `

import NFTMarketplace from 0x48d98a1c02880291

transaction(id: UInt64) {

  prepare(acct: AuthAccount) {
    let saleCollection = acct.borrow<&NFTMarketplace.SaleCollection>(from: /storage/MySaleCollection)
                ?? panic("This saleCollection does not exist")

    saleCollection.unlistFromSale(id: id)
  }

  execute {
    log("A user unlisted their NFT for Sale")
  }
}
`