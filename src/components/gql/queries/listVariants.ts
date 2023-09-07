import { gql } from "@apollo/client";

export const LIST_VARIANTS = gql`
  query listVariants($id: String) {
    listVariants(args:{ 
      criteria :{id: $id}, 
      pagination : {after : 50, before : 10, cursor : ""} }) {
      totalCount
      edges {
        node{
          _id,
          artistId,
          artistNickname,
          coverUrl,
          indexInProject,
          name,
          price,
          projectId,
          projectName,
          remaining,
          supply,
          utilities
        }
      }
    }
  }
`;
