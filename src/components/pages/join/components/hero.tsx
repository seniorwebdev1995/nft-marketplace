import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { JoinHeroButton } from "../../../components/buttons/hero-button";
import { JoinHeroImg } from "./hero-img";
import { useBlockchainContext } from "../../../../context";

export const JoinHero = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <Box overflow="hidden">
      <Container component="section" sx={{ marginBottom: 20 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          paddingTop={{ xs: 3, md: 10 }}
          justifyContent={{ xs: "flex-start", md: "space-between" }}
          spacing={4}
        >
          <Stack flex={1}>
            <Typography
              variant={"subheadline"}
              marginBottom={3}
              sx={{ color: "primary.main" }}
            >
              {translateLang("heroTitle")}
            </Typography>
            <Typography variant={"headline1"} marginBottom={2}>
              {translateLang("heroSubtitle")}
            </Typography>
            <Typography
              variant={"subheader1"}
              marginBottom={{ xs: 2, lg: 5 }}
              sx={{ color: "rgba(255, 255, 255, 0.8)" }}
            >
              {translateLang("heroText")}
            </Typography>
            <Box display={{ xs: "none", md: "block" }}>
              <JoinHeroButton />
            </Box>
          </Stack>

          <JoinHeroImg />
          <Box
            paddingTop={10}
            display={{ xs: "block", md: "none" }}
            alignSelf="center"
          >
            <JoinHeroButton />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};
