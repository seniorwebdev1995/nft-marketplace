import { Card, CardMedia } from "@mui/material";
import { ROUTES } from "../../../config/navigation";
import MuiLink from "@mui/material/Link";

import { CardArtistInfo } from "./artist-info";
import { IArtist } from "../../props/IArtist";

export const CardArtist = ({ _id, nickname, avatarUrl, genres }: IArtist) => {
  return (
    <MuiLink
      href={ROUTES.artistProfile + _id}
      underline="none"
    >
      <Card
        sx={{
          width: "100%",

          display: "flex",
          background:
            "linear-gradient(119.34deg, rgba(255, 255, 255, 0.2) 17.99%, rgba(255, 255, 255, 0.3) 18%, rgba(255, 255, 255, 0.05) 81.29%)",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 151, minHeight: 151 }}
          image={avatarUrl ?  avatarUrl : "/img/author/author-9.jpg"}
          alt={`${nickname} cover`}
        />
        <CardArtistInfo name={nickname} category={''} id={_id} genres={genres} />
      </Card>
    </MuiLink>
  );
};
