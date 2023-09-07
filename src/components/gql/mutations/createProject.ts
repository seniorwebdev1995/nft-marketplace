import {gql} from '@apollo/client'

export const CREATE_PROJECT = gql`
    mutation createProject(
      $coverFile: Upload!,
      $description: String!,
      $name: String!,
      $videoDesc: String,
      $videoURL: String,
      $variants: [CreateVariantDto!]!
    ) {
      createProject(form:
        {
          coverFile: $coverFile
          description: $description
          name: $name
          variants: $variants
          videoURL: $videoURL
          videoDesc: $videoDesc
        }){
        _id
        name
        description
        coverUrl
        artist {
          nickname
        }
        variants {
          coverUrl
          indexInProject
          name
          price
          supply
          utilities
        }
        updatedAt
        createdAt
      }
    }
  `
