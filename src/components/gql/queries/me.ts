import {gql} from '@apollo/client'

export const FETCH_PROFILE = gql`
  query {
    me {
      _id
      avatarUrl
      email
      nickname
      walletAddress
      phoneNumber
      genreIds
      genres {
        _id
        name
      }
    }
  }
`
