import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { NftProjectHeroImg } from "./hero-img";
import MuiLink from "@mui/material/Link";
import { ROUTES } from "../../../../config/navigation";
import { IArtist } from "../../../props/IArtist";

interface INftProjectHeroTitleProps
{ 
  title:string; 
  description: string;
  coverImageUrl:string;
  artist: IArtist;
}

export const NftProjectHeroTitle = ({title, description, coverImageUrl, artist}:INftProjectHeroTitleProps) => {
  return (
    <Box>
      <MuiLink
        underline="none"
        href={ROUTES.artistProfile + artist?._id}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={artist?.nickname} src={artist?.avatarUrl} />
          <Typography variant="title2">{artist?.nickname}</Typography>
        </Stack>
      </MuiLink>
      <Typography
        variant="headline1"
        component="h1"
        marginTop={2}
        marginBottom={3}
      >
        {title}
      </Typography>
      <Box marginBottom={4} display={{ md: "none", xs: "block" }}>
        <NftProjectHeroImg imageUrl={coverImageUrl}/>
      </Box>
      <Typography
        variant="subheader3"
        sx={{ display: "flex", fontSize: 16 }}
        textAlign={{ xs: "center", md: "start" }}
      >
        {description}
      </Typography>
    </Box>
  );
};
