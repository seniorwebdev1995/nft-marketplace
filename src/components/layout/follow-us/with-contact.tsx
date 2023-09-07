import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

import { FollowUsBlock } from "./block";
import { useBlockchainContext } from "../../../context";
import { ROUTES } from "../../../config/navigation";
import { useNavigate } from "react-router-dom";
import { ButtonPrimary } from "../../components/buttons/styles";

export const FollowUsWithContact = () => {
  const navigate = useNavigate();
  const { translateLang } = useBlockchainContext();

  return (
    <FollowUsBlock>
      <Grid container spacing={3}>
        <Grid
          xs={12}
          md={8}
          item
          sx={{
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Typography
            marginBottom={5}
            color="#7A3EE0"
            variant="subheadline"
            component="h2"
            sx={(theme) => ({
              [theme.breakpoints.down("md")]: {
                fontSize: 18,
              },
            })}
          >
            {translateLang("titleDefault")}
          </Typography>
          <Typography
            variant="headline1"
            color="#191225"
            sx={(theme) => ({
              [theme.breakpoints.down("md")]: {
                fontSize: 32,
              },
            })}
          >
            {translateLang("subtitleContact")}
          </Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack justifyContent={"center"} alignItems="center" height="100%">
            <ButtonPrimary
              onClick={() => navigate(ROUTES.artistSignUp)}
              size="large"
              sx={{ 
                maxWidth: "387px",
                textTransform: "uppercase"
              }}>
              {translateLang("registerAsArtist")}
            </ButtonPrimary>
          </Stack>
        </Grid>
      </Grid>
    </FollowUsBlock>
  );
};
