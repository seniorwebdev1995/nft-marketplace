import {gql} from '@apollo/client'

export const UPDATE_ARTIST_ME = gql`
  mutation updateArtistMe(
    $avatarFile: Upload,
    $bannerFile: Upload,
    $email: String,
    $nickname: String,
    $biography: String,
    $genreIds: [String!],
    $spotifyUrl: String,
    $videoUrl: String,
    $videoTitle: String,
    $currentPassword: String,
    $newPassword: String
  ) {
    updateArtistMe(form: {
      avatarFile: $avatarFile
      bannerFile: $bannerFile
      email: $email
      nickname: $nickname
      biography: $biography
      genreIds: $genreIds
      spotifyUrl: $spotifyUrl
      videoURL: $videoUrl
      videoTitle: $videoTitle
      currentPassword: $currentPassword
      newPassword: $newPassword
    }) {
      _id
      avatarUrl
      bannerUrl
      spotifyUrl
      biography
      email
      nickname
      videoTitle
      videoURL
      genreIds
      genres {
        _id
        name
        description
      }
      projectCount
      saleCount
      visitorCount
    }
  }
`