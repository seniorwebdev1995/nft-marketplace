import { gql } from "@apollo/client";

export const FETCH_ARTIST = gql`
  query {
    meArtist {
      _id
      avatarUrl
      bannerUrl
      biography
      email
      nickname
      videoTitle
      videoURL
      spotifyUrl
      genreIds
      genres {
        _id
        name
        description
      }
      projectCount
      revenue
      saleCount
      visitorCount
      auctionCount
      auctionPastCount
      auctionOnGoingCount
      auctionFutureCount
      projectRevenue
      auctionRevenue
    }
  }
`;
