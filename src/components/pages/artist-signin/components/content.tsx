import MuiLink from "@mui/material/Link";
import { SignInForm } from "./form";
import { SignInButtonSignUp } from "./button-signup";
import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Logo } from "../../../components/images/logo";
import { ROUTES } from "../../../../config/navigation";

export const SignInContent = () => {
  return (
    <Stack
      minHeight={{ xs: "max-content", md: "100vh" }}
      direction="column"
      alignItems="center"
      height={1}
      paddingTop={9}
      paddingBottom={4}
    >
      <Stack
        maxWidth={{ xs: "lg", md: "400px" }}
        width={1}
        height={1}
        justifyContent={"space-between"}
      >
        <Stack spacing={{ md: 4, xs: 3 }}>
          <Stack
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

          <SignInForm />
        </Stack>

        <SignInButtonSignUp />
      </Stack>
    </Stack>
  );
};
