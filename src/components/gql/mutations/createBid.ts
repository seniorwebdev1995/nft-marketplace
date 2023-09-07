import {gql} from '@apollo/client'

export const CREATE_BID = gql`
  mutation createBid($auctionId: String!, $amount: Int!){
    createBid(
      auctionId: $auctionId
      amount: $amount
    ) {
      highestBid
    }
  }
`
