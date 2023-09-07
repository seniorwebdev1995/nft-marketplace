import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import MuiLink from "@mui/material/Link";
import { ROUTES } from "../../../../config/navigation";
import { ButtonPrimary } from "../../../components/buttons/styles";
import { HomeHeroTitle } from "./hero-title";
import { HomeHeroCard } from "./hero-card";
import { useBlockchainContext } from "../../../../context";

export const HomeHeroMobile = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <Grid
      sx={{ display: { xs: "flex", md: "none" } }}
      container
      alignItems={"center"}
    >
      <Grid item xs={12}>
        <Container>
          <HomeHeroTitle />
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container>
          <HomeHeroCard />
        </Container>
      </Grid>

      <Grid item xs={12}>
        <Container>
          <MuiLink
            href={ROUTES.projects}
            sx={{
              width: "100%",
            }}
          >
            <ButtonPrimary
              size="large"
              fullWidth
              sx={{
                textTransform: "uppercase",
                boxShadow: "0px 8px 32px rgba(191, 255, 98, 0.3)",
              }}
            >
              {translateLang("explore")}
            </ButtonPrimary>
          </MuiLink>
        </Container>
      </Grid>
    </Grid>
  );
};
