import { gql } from '@apollo/client'

export const UPDATE_ME = gql`
  mutation updateMe(
    $avatarFile: Upload,
    $email: String,
    $nickname: String,
    $genreIds: [String!],
    $phoneNumber: String,
    $currentPassword: String,
    $newPassword: String
  ) {
    updateMe(form: {
      avatarFile: $avatarFile
      email: $email
      nickname: $nickname
      genreIds: $genreIds
      phoneNumber: $phoneNumber
      currentPassword: $currentPassword
      newPassword: $newPassword
    }) {
      _id
      avatarUrl
      email
      nickname
      walletAddress
      phoneNumber
      genreIds
    }
  }
`
