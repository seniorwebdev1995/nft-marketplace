import {gql} from '@apollo/client'

export const SIGNUP = gql`
  mutation createUser( $email: String!, $nickname: String!, $password: String!) {
    createUser(form: {email: $email, nickname: $nickname, password: $password}){
      email
      nickname
      walletAddress
    }
  }
`
