import {gql} from '@apollo/client'

export const ARTIST_SIGNIN = gql`
  mutation artistLogin($email: String!, $password: String!) {
    artistLogin(email: $email, password: $password){
      authToken {
        token
        expiresAt
      }
      refreshToken {
        token
        expiresAt
      }
    }
  }
`
