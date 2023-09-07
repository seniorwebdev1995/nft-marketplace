import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Logo } from "../../components/images/logo";

import { FooterNavList } from "./nav-list";
import { Copyright } from "../../components/typography/copyright";
import { SxProps } from "@mui/material";
import { ButtonFooterSocial } from "../../components/buttons/footer-social";

import { SocialLinksFooter } from "../../../config/data";
import { useBlockchainContext } from "../../../context";

interface Props {
  sx?: SxProps;
}

export const FooterNav = ({ sx }: Props) => {
  const { translateLang } = useBlockchainContext();

  return (
    <Container component="footer" sx={{ paddingTop: { xs: 4, md: 5 }, paddingBottom: {xs: 4, md: 3}, ...sx }}>
      <Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Logo height={"30px"}/>
            <Typography
              paragraph
              color="rgba(225,225,225,0.8)"
              sx={(theme) => ({
                fontSize: 17,
                marginTop: 2,
                maxWidth: 400,
                [theme.breakpoints.down("md")]: {
                  fontSize: 14,
                  maxWidth: "100%",
                },
              })}
            >
              {translateLang("footerDescription")}
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <FooterNavList />
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack direction="row" gap="16px" justifyContent="end">
              {SocialLinksFooter.map(({ order, ...btn }, index) => (
                <ButtonFooterSocial key={index} {...btn} />
              ))}
            </Stack>
            <Box display="flex" justifyContent="flex-end" marginTop="48px">
              <Copyright />
            </Box>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};
