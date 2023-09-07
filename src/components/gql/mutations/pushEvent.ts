import {gql} from '@apollo/client'

export const PUSH_EVENT = gql`
  mutation pushEvent($extra: String, $projectId: String, $key: ListEventsPossible!) {
    pushEvent(form: {extra: $extra, projectId: $projectId, key: $key}) {
      _id
      key
      projectId
      extra
    }
  }
`
