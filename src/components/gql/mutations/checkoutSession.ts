import {gql} from '@apollo/client'

export const CHECKOUT_PRIMARY_SESSION = gql`
  mutation checkoutPrimaryMarketSession($variantId: String!) {
    checkoutPrimaryMarketSession(variantId: $variantId) {
      session {
        id
      }
    }
  }
`
export const CHECKOUT_SECONDARY_SESSION = gql`
  mutation checkoutSecondaryMarketSession($offerId: String!) {
    checkoutSecondaryMarketSession(offerId: $offerId) {
      session {
        id
      }
    }
  }
`