import {gql} from '@apollo/client'

export const IS_ARTIST_EMAIL_TAKEN = gql`
  query isArtistEmailTaken($email: String!) {
    isArtistEmailTaken(email: $email)
  }
`
