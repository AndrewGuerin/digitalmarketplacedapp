export const purchaseTransact = `
import NonFungibleToken from 0x631e88ae7f1d7c20
import MyNFT from 0x48d98a1c02880291
import FlowToken from 0x7e60df042a9c0868
import NFTMarketplace from 0x48d98a1c02880291

transaction(account: Address, id: UInt64) {

  prepare(acct: AuthAccount) {
    let nftSaleCollection = getAccount(account).getCapability(/public/MySaleCollection)
      .borrow<&NFTMarketplace.SaleCollection{NFTMarketplace.SaleCollectionPublic}>()
      ?? panic("Could not return the user's SaleCollection")

    let recipientCollection = getAccount(acct.address).getCapability(/public/MyNFTCollection)
      .borrow<&MyNFT.Collection{NonFungibleToken.CollectionPublic, MyNFT.CollectionPublic}>()
      ?? panic("User's collection cannot be found")

    let price = nftSaleCollection.getPrice(id: id)

    let payment <- acct.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)!.withdraw(amount: price) as! @FlowToken.Vault

    nftSaleCollection.purchase(id: id, recipientCollection: recipientCollection, payment: <- payment)
  }

  execute {
    log("A user purchased the selected NFT")
  }
}

`