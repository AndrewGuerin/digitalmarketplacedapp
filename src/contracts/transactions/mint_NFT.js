export const mintNFT = `
import MyNFT from x48d98a1c02880291

transaction(ipfsHash: String, name: String) {

  prepare(acct: AuthAccount) {
    let collection = acct.borrow<&MyNFT.Collection>(from: /storage/MyNFTCollection)
        ?? panic("This collection does not exist here")
    let nft <- MyNFT.createToken(ipfsHash: ipfsHash, metadata: {"name": name})

    collection.deposit(token: <- nft)
  }
  execute {
    log("A user minted an NFT into their account")
  }
}
`