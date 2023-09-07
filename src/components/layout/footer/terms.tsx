import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { Logo } from "../../components/images/logo";
import { Copyright } from "../../components/typography/copyright";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { SxProps } from "@mui/material";
import { useBlockchainContext } from "../../../context";

interface Props {
  sx?: SxProps;
}

export const FooterTerms = ({ sx }: Props) => {
  const { translateLang } = useBlockchainContext();

  return (
    <Container
      component="footer"
      sx={{ paddingTop: { xs: 4, md: 11 }, paddingBottom: 4, ...sx }}
    >
      <Grid container spacing={7} textAlign={{ xs: "center", md: "left" }}>
        <Grid item xs={12}>
          <Logo height={"30px"} />
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={6} direction={{ xs: "column", md: "row" }}>
            <MuiLink
              underline="none"
              href="/"
              variant="subheader2"
              color="primary.main"
            >
              {translateLang("terms")}
            </MuiLink>
            <MuiLink
              underline="none"
              href="/"
              variant="subheader2"
              color="secondary.main"
            >
              {translateLang("privacy")}
            </MuiLink>
          </Stack>
        </Grid>
        <Grid item xs={12} textAlign={{ xs: "center", md: "right" }}>
          <Copyright />
        </Grid>
      </Grid>
    </Container>
  );
};
