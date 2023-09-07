import {gql} from '@apollo/client'

export const REFRESH_AUTH_TOKEN = gql`
  mutation refreshAuthToken {
    refreshAuthToken {
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
