import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import MuiLink from "@mui/material/Link";
import { SocialLink } from "../../../components/social-link";
import { ISocial } from "../../../props/ISocial";

type IArtistHero = {
  avatarImageUrl?:string,
  name?:string,
  description?:string,
  musicCategory?:string,
  spotifyUrl?: string,
  socials:ISocial[]
}

export const ArtistHero = ({ avatarImageUrl, name, description, musicCategory, spotifyUrl, socials = []}: IArtistHero) => {
  ;
  return (
    <Container maxWidth="md">
      <Stack
        textAlign="center"
        justifyContent="center"
        alignItems="center"
        minHeight={"70vh"}
      >
        <Avatar
          src={avatarImageUrl}
          sx={{
            height: 140,
            width: 140,
            boxShadow: "0px 7px 28px rgba(0, 118, 227, 0.7)",
          }}
        />
        <Typography
          marginTop={1}
          marginBottom={2}
          fontSize={30}
          lineHeight="110%"
          letterSpacing={"-1px"}
          fontWeight={"700"}
        >
          {name?.toUpperCase()}
        </Typography>
        <MuiLink
          underline="none"
          target={"_blank"}
          href={spotifyUrl || "https://www.spotify.com/fr/"}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <img src={"/img/music.svg"} height={27} alt="note-icon" />
            <Typography variant="title3">{musicCategory}</Typography>
          </Stack>
        </MuiLink>
        <Stack marginY={2} direction="row" alignItems="center" spacing={3}>
          {socials.map((social) => SocialLink(social))}
        </Stack>
        <Typography fontSize={{ xs: 14, sm: 18 }} lineHeight="140%">
          {description || 'About artist.'}
        </Typography>
      </Stack>
    </Container>
  );
};
