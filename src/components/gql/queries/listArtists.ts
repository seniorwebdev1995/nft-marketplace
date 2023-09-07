import { gql } from "@apollo/client";

export const LIST_ARTISTS = gql`
  query listArtists($artistId: [String!], $genreIds: [String!]) {
    listArtists(
      args: {
        criteria: { artistId: $artistId, genreIds: $genreIds }
        pagination: { after: 30, before: 1, cursor: "" }
      }
    ) {
      totalCount
      edges {
        node {
          _id
          avatarUrl
          bannerUrl
          biography
          genres {
            _id
            name
            description
          }
          nickname
          spotifyUrl
          videoTitle
          videoURL
        }
      }
    }
  }
`;
