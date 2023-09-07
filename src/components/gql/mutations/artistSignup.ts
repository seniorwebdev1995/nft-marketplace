import {gql} from '@apollo/client'

export const ARTIST_SIGNUP = gql`
  mutation createArtist($email: String!, $nickname: String!, $password: String!, $genreIds: [String!]!) {
    createArtist(form: {email: $email, nickname: $nickname, password: $password, genreIds: $genreIds}){
      email
      nickname
      avatarUrl
    }
  }
`