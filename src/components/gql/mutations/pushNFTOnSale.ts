import { gql } from "@apollo/client";

export const PUT_NFT_ON_SALE = gql`
  mutation putNFTOnSale(
    $nftId: String!
    $price: Int!
  ) {
    putNFTOnSale(
      form: {
        nftId: $nftId
        price: $price
      }
    ) {
      _id
    }
  }
`;
