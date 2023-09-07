import {gql} from '@apollo/client'

export const SIGNIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password){
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
