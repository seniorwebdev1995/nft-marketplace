import {gql} from '@apollo/client'

export const LIST_MY_TRANSACTIONS = gql`
  query listMyTransaction($sessionId: String) {
    getMyTransactions(args:{
      criteria :{stripeSessionId: $sessionId}
      order: {direction: Desc, field: createdAt}
      pagination : {after : 10, before : 1, cursor : ""} }){
      edges
       {
        node {
          _id
          createdAt
          buyer {
            _id
            nickname
          }
          buyerId
          seller {
            _id
            nickname
          }
          sellerId
          price
          txHash          
          nft {
            _id
            artistId
            artistNickname
            coverUrl
            name
            ownerId
            status {
              code
            }
            source {
              ...on NftProjectSource {
                variant {
                  indexInProject
                  projectName
                  price
                }
              }
            }
            utilities
          }
        }
      }
    }
  }
`
