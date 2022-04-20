export const getSaleNFTsScript = `
import MyNFT from 0x48d98a1c02880291
import NonFungibleToken from 0x631e88ae7f1d7c20
import NFTMarketplace from 0x48d98a1c02880291

pub fun main(account: Address): {UFix64: &MyNFT.NFT} {
    let saleCollection = getAccount(account).getCapability(/public/MySaleCollection)
                            .borrow<&NFTMarketplace.SaleCollection{NFTMarketplace.SaleCollectionPublic}>()
                            ?? panic("Could not return the user's SaleCollection")

    let collection = getAccount(account).getCapability(/public/MyNFTCollection)
                            .borrow<&MyNFT.Collection{NonFungibleToken.CollectionPublic, MyNFT.CollectionPublic}>()
                            ?? panic("User's collection cannot be found")

    let saleIDs = saleCollection.getIDs()

    let returnVals: {UFix64: &MyNFT.NFT} = {}

    for saleID in saleIDs {
        let price = saleCollection.getPrice(id: saleID)

        let nft = collection.borrowEntireNFT(id: saleID)

        returnVals.insert(key: price, nft)
    }

    return returnVals
}
`