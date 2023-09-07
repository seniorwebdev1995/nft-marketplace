import {gql} from '@apollo/client'

export const CREATE_AUCTION = gql`
  mutation createAuction(
    $coverFile: Upload!,
    $description: String!,
    $name: String!,
    $startingPrice: Int!,
    $startDate: DateTime!,
    $endDate: DateTime!,
    $utilities: [String!]!,
    $videoDesc: String,
    $videoURL: String,
  ) {
    createAuction(
      coverFile: $coverFile
      description: $description
      name: $name
      startDate: $startDate
      startingPrice: $startingPrice
      endDate: $endDate
      utilities: $utilities
      videoDesc: $videoDesc
      videoURL: $videoURL
    ) {
      _id
      artist {
        _id
        avatarUrl
        nickname
      }
      name
      coverUrl
    }
  }
`
