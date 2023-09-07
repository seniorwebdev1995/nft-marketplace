import { ButtonPrimary, ButtonSecondary } from "../../../components/buttons/styles";
import { ROUTES } from "../../../../config/navigation";
import { ReactComponent as SpotifyIcon } from "../../../../assets/images/spotify.svg";

import Stack from "@mui/material/Stack";
import MuiLink from "@mui/material/Link";
import { useBlockchainContext } from "../../../../context";
import { useNavigate } from "react-router-dom";
import { IArtist } from "../../../props/IArtist";
import {SvgIcon} from "@mui/material";

export const NftProjectHeroButtons = ({id, artist}:{id:string, artist: IArtist}) => {
  const { translateLang } = useBlockchainContext();
  const navigate = useNavigate();

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      alignItems="center"
      spacing={2}
    >
      {/* <ButtonPrimary
        onClick={() => {
          navigate(ROUTES.projectRegister);
        }}
        fullWidth
        size="large"
        sx={(theme) => ({
          flex: 2,

          maxWidth: 350,
          [theme.breakpoints.down("sm")]: {
            fontSize: 18,
          },
        })}
      >
        {translateLang("heroJoinBtn")}
      </ButtonPrimary> */}
      <MuiLink
        underline="none"
        target={"_blank"}
        href={artist.spotifyUrl || "https://www.spotify.com/fr/"}
      >
        <ButtonSecondary
          size="large"
          sx={(theme) => ({
            flex: 1,

            [theme.breakpoints.down("sm")]: {
              fontSize: 14,
            },
              backgroundColor: "#1DB954"
          })}
          startIcon={
              <img src={"/img/social-network/spotify.svg"} alt={"Spotify icon"}/>
          }
        >
          {translateLang("heroSpotifyBtn")}
        </ButtonSecondary>
      </MuiLink>
    </Stack>
  );
};
