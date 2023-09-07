import MuiLink from "@mui/material/Link";
import { ISocial } from "../props/ISocial";

export const SocialLink = (item:ISocial) => {
  const images = { "instagram":"/img/social-network/insta-artist.svg", "youtube":"/img/social-network/ytb-artist.svg", "twitter":"/img/social-network/twitter-artist.svg" } as any
  return (
    <MuiLink href={item.url} target="_blank" key={item.type}>
    <img src={images[item.type]} alt="link-img" />
  </MuiLink>
  )
}
