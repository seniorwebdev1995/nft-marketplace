import {gql} from '@apollo/client'

export const LIST_PROJECTS_ARTIST = gql`
  query listProjects($id: String, $artistIds: [String!], $after: Int, $before: Int, $genreIds: [String!]) {
    Projects(args:{ 
      criteria :{id: $id, artistIds: $artistIds, genreIds: $genreIds},
      order: {direction: Desc, field: createdAt}
      pagination : {after : $after, before : $before, cursor : ""} }) {
        totalCount
        edges {
          node {
            _id
            coverUrl
            address
            artist {
              _id
              nickname
              avatarUrl
            },
            variants {
            	_id
              artistId
              artistNickname
              coverUrl
              indexInProject
              name
              price
              projectId
              projectName
              remaining
              supply
              utilities
            },
            transactions {
              createdAt
              price
              txHash
              buyer {
                avatarUrl
                nickname
                walletAddress
              }
              nft {
                _id
                artistId
                artistNickname
                coverUrl
                name
                utilities
              }
            }
            conversionRate
            artistRevenue
            saleCount
            visitorCount
            description
            name
            createdAt
            updatedAt
            videoDesc
            videoURL
          }
        }
    }
  }
`

export const LIST_PROJECTS = gql`
  query listProjects($id: String, $artistIds: [String!], $after: Int, $before: Int, $genreIds: [String!]) {
    Projects(args:{ 
      criteria :{id: $id, artistIds: $artistIds, genreIds: $genreIds},
      order: {direction: Desc, field: createdAt}
      pagination : {after : $after, before : $before, cursor : ""} }) {
        totalCount
        edges {
          node {
            _id
            coverUrl
            address
            artist {
              _id
              nickname
              avatarUrl
              spotifyUrl
            },
            variants {
            	_id
              artistId
              artistNickname
              coverUrl
              indexInProject
              name
              price
              projectId
              projectName
              remaining
              supply
              utilities
            },
            transactions {
              createdAt
              price
              txHash
              buyer {
                avatarUrl
                nickname
                walletAddress
              }
              nft {
                _id
                artistId
                artistNickname
                coverUrl
                name
                utilities
              }
            }
            description
            name
            createdAt
            updatedAt
            videoDesc
            videoURL
          }
        }
    }
  }
`
