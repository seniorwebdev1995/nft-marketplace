import { gql } from "@apollo/client";

export const MY_NFTS = gql`
  query myNfts {
    myNfts {
      _id
      artistId
      artistNickname
      coverUrl
      name
      ownerId
      pricePaid
      status {
        code
      }
      source {
        ...on NftProjectSource {
          variant {
            projectId
            projectName
            name
            price
          }
          indexInProject
        }
      }
      tokenId
      utilities
    }
  }
`;
