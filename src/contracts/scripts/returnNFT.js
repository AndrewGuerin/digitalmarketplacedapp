export const returnNFTScript = `
import MyNFT from 0x48d98a1c02880291
import NonFungibleToken from 0x631e88ae7f1d7c20

pub fun main(account: Address): [&MyNFT.NFT] {
  let collection = getAccount(account).getCapability(/public/MyNFTCollection)
    .borrow<&MyNFT.Collection{NonFungibleToken.CollectionPublic, MyNFT.CollectionPublic}>()
    ?? panic("Can't get the User's collection.")

  let returnValues: [&MyNFT.NFT] = []

  let ids = collection.getIDs()
  for id in ids {
    returnValues.append(collection.borrowEntireNFT(id: id))
  }

  return returnValues
}
`