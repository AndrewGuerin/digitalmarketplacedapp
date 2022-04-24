export const returnNFT4Sale = `
import MyNFT from 0x48d98a1c02880291
import NonFungibleToken from 0x631e88ae7f1d7c20
import NFTMarketplace from 0x48d98a1c02880291

pub fun main(account: Address): {UFix64: &MyNFT.NFT} {
    let saleCollection = getAccount(account).getCapability(/public/MySaleCollection)
        .borrow<&NFTMarketplace.SaleCollection{NFTMarketplace.SaleCollectionPublic}>()
        ?? panic("users sale collection could not be returned")

    let collection = getAccount(account).getCapability(/public/MyNFTCollection)
        .borrow<&MyNFT.Collection{NonFungibleToken.CollectionPublic, MyNFT.CollectionPublic}>()
        ?? panic("User's collection cannot be found")

    let nftSaleIDs = saleCollection.getIDs()

    let returnValues: {UFix64: &MyNFT.NFT} = {}

    for nftSaleID in nftSaleIDs {
        let price = saleCollection.getPrice(id: nftSaleID)

        let nft = collection.borrowEntireNFT(id: nftSaleID)

        returnValues.insert(key: price, nft)
    }

    return returnValues
}
`

