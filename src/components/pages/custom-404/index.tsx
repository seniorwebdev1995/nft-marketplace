import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { ROUTES } from "../../../config/navigation";
import { FooterNav } from "../../layout/footer/nav";
import { Header } from "../../layout/header/header";
import { Container, Stack, Typography, Box } from "@mui/material";

import { ButtonBack } from "../../components/buttons/back";
import { ButtonPrimary } from "../../components/buttons/styles";
import { useBlockchainContext } from "../../../context";

const Custom404Screen = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <div>
      <Stack minHeight={"100vh"}>
        <Stack
          flex={{ xs: "auto", md: 1 }}
          sx={{
            backgroundImage: "url(/img/bg/404.jpg)",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Header />

          <Stack flex={1} height={"100%"} paddingY={{ xs: 4, md: 0 }}>
            <Container maxWidth="sm">
              <Box display={{ xs: "block", sm: "none" }}>
                <ButtonBack variant="icon" />
              </Box>
            </Container>

            <Stack
              textAlign="center"
              justifyContent="center"
              alignItems="center"
              flex={1}
            >
              <Container maxWidth="sm">
                <Typography
                  fontSize={{ xs: 80, sm: 120 }}
                  lineHeight="110%"
                  letterSpacing={"-1px"}
                  color="primary.main"
                  fontWeight={"600"}
                >
                  {translateLang("notFoundTitle")}
                </Typography>
                <Typography
                  fontSize={{ xs: 18, sm: 30 }}
                  lineHeight="110%"
                  letterSpacing={"-1px"}
                  fontWeight={"600"}
                >
                  {translateLang("notFoundDescription")}
                </Typography>
                <Typography
                  marginY={3}
                  fontSize={{ xs: 15, sm: 20 }}
                  lineHeight="110%"
                  letterSpacing={"-1px"}
                >
                  {translateLang("notFoundParagraph")}
                </Typography>
                <MuiLink href={ROUTES.projects} sx={{ width: "100%" }}>
                  <ButtonPrimary fullWidth size="large" sx={{ maxWidth: 334 }}>
                    {translateLang("notFoundButton")}
                  </ButtonPrimary>
                </MuiLink>
              </Container>
            </Stack>
          </Stack>
        </Stack>
        <FooterNav />
      </Stack>
    </div>
  );
};

export default Custom404Screen;
