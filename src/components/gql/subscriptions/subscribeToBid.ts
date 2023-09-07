import { gql } from "@apollo/client";

export const SUBSCRIBE_BID = gql`
  subscription subscribeToBidAdded($auctionId: String!){
    subscribeToBidAdded(auctionId: $auctionId) {
      auctionId
      bid {
        amount
        bidderId
        date
      }
    }
  }
`;