import {gql} from '@apollo/client'

export const ARTIST_KPI = gql`
  query artistKpi($artistIds: [String!]!, $projectIds: [String!]) {
    artistKpi(artistIds: $artistIds, projectIds: $projectIds) {
      conversionRate
      fromDate
      revenue
      saleCount
      toDate
      visitorCount    
    }
  }
`
