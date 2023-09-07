import {gql} from '@apollo/client'

export const IS_EMAIL_TAKEN = gql`
  query isEmailTaken($email: String!) {
    isEmailTaken(email: $email)
  }
`
