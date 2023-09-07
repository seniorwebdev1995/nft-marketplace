import { gql } from "@apollo/client";

export const SUBSCRIBE_TO_BID = gql`
  mutation subscribeToBidAdded(
    $auctionId: String!
  ) {
    auctionId
    bid {
      amount
      bidderId
      date
    }
  }
`;
