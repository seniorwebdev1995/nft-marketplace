import {gql} from '@apollo/client'

export const LIST_OFFERS = gql`
  query listOffers($page: Int, $perPage: Int) {
    offers(page: $page, perPage: $perPage, filter: {statuses : [Open]}){
      _id
      artist {
        _id
        nickname
        avatarUrl
      }
      seller {
        _id
        nickname
        avatarUrl
      }
      createdAt
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
              artistNickname
              indexInProject
              projectName
              price
              remaining
              supply
              utilities
            }
          }
        }
        txHash
        utilities
      }
      price
    }
  }
`
