import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { CircleBlur } from "../../../components/circle-blur";

import { HomeHowItWorksDesktop } from "./how-it-works-desktop";
import { useBlockchainContext } from "../../../../context";
import { JoinContactList } from "../../join/components/contact.list";

export const HomeHowItWorks = () => {
  const { translateLang } = useBlockchainContext()

  return (
    <Box sx={{ position: "relative", paddingBottom: 15, paddingTop: 10 }}>
      <Container>
        <CircleBlur
          background={"secondary.main"}
          width={"100%"}
          height={"100%"}
          blur="300px"
          propsStyle={{
            position: "absolute",
            top: "25%",
            right: -300,
            maxWidth: 298,
            maxHeight: 334,
          }}
        />
        <Stack direction={"row"} spacing={{ xs: 5, md: 10 }}>
          <Stack spacing={4}>
            <Typography
              variant={"subheadline"}
              color="primary.main"
              sx={{
                marginBottom: 4,
                maxWidth: 160,
              }}
            >
              {translateLang("howTitle")}
            </Typography>
            <Typography variant={"headline1"} sx={{ maxWidth: 375 }}>
              {translateLang("howSubtitle")}
            </Typography>
          </Stack>
          <HomeHowItWorksDesktop />
        </Stack>
      </Container>
      <Box marginTop={13} display={{ xs: "block", md: "none" }}>
        <JoinContactList />
      </Box>
    </Box>
  );
};
