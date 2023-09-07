import { Typography, Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { SignUpForm } from "./form";
import { SignUpMusic } from "./music";
import { Logo } from "../../../components/images/logo";
import MuiLink from "@mui/material/Link";
import { ROUTES } from "../../../../config/navigation";
import { useBlockchainContext } from "../../../../context";
import { SignUpButtonSignIn } from "./button-signin";

export const SignUpContent = () => {
  const { step } = useParams();
  const isInfo = step === "1";
  const { translateLang } = useBlockchainContext();

  return (
    <Stack
      minHeight={{ xs: "max-content", md: "100vh" }}
      direction="column"
      alignItems="center"
      height={1}
      paddingTop={{xs: 4, md: 8}}
      paddingBottom={4}
    >
      <Stack
        maxWidth={{ xs: "lg", md: isInfo ? "400px" : "550px" }}
        width={1}
        height={1}
      >
        <Stack
          marginBottom={10}
          marginTop={{ md: "20px", xs: "10px" }}
          display={{ xs: "none", md: "flex" }}
          direction="row"
          alignItems="center"
        >
          <Stack direction="row">
            <MuiLink href={ROUTES.home} marginRight="10px">
              <Logo height={24} />
            </MuiLink>
            <Typography
              fontSize="28px"
              lineHeight={"32px"}
              fontWeight="700"
              fontStyle="normal"
              fontFamily={"Overpass"}
              color={"#FFFFFF"}
              marginTop={"9px"}
            >
              {"/ Artist"}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          flex={1}
          spacing={{xs: 4, md: 0}}
          justifyContent={{xs: "flex-start", md: "space-between"}}
        >
          {isInfo ? <SignUpForm /> : <SignUpMusic />}
          {isInfo && <SignUpButtonSignIn />}
        </Stack>
      </Stack>
    </Stack>
  );
};
