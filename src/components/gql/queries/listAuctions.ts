import { gql } from "@apollo/client";

export const LIST_AUCTIONS = gql`
  query Auctions($page: Int, $perPage: Int, $id: String, $artistIds: [String!], $genreIds: [String!]) {
    auctions(page: $page, perPage: $perPage, filter: {id: $id, artistIds: $artistIds, genreIds: $genreIds}) {
      _id
      artist {
        _id
        avatarUrl
        nickname
      }
      artistId
      bids {
        amount
        bidder {
          _id
          avatarUrl
          nickname
        }
        bidderId
        date
      }
      contractAddress
      coverUrl
      createdAt
      description
      endDate
      genreIds
      genres {
        _id
        name
      }
      highestBid
      metadataUrl
      name
      nftId
      status
      startDate
      endDate
      startingPrice
      utilities
      videoDesc
      videoURL
    }
  }
`
