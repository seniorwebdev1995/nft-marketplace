import { Box } from "@mui/material";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useBlockchainContext } from "../../../../context";

import { HomeHeroArtists } from "./hero-artists";

export const HomeHeroTitle = () => {

  const { translateLang } = useBlockchainContext();

  return (
    <Stack>
      <Typography
        variant={"subheadline"}
        marginBottom={"20px"}
        color="primary.main"
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            fontSize: 18,
          },
        })}
      >
        {translateLang("fightClubMusicDescription")}
      </Typography>
      <Typography
        variant={"headline1"}
        marginBottom={"20px"}
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            fontSize: 32,
          },
        })}
      >
        {translateLang("metaDescription")}
      </Typography>
      <Typography
        variant={"subheader1"}
        marginBottom={10}
        sx={(theme) => ({
          color: "rgba(255, 255, 255, 0.8)",
          [theme.breakpoints.down("md")]: {
            fontSize: 18,
          },
        })}
      >
      {translateLang("punchline")}
      </Typography>

      <Box display={{ xs: "none", md: "block" }}>
        <HomeHeroArtists />
      </Box>
    </Stack>
  );
};
