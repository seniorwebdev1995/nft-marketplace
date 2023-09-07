import { Button, Box, Stack } from "@mui/material";
import { useParams } from "react-router-dom";
import { SignUpForm } from "./form";
import { SignUpMusic } from "./music";
import { SignUpButtonSignIn } from "./button-signin";
import { Logo } from "../../../components/images/logo";
import MuiLink from "@mui/material/Link";
import { ROUTES } from "../../../../config/navigation";
import { useBlockchainContext } from "../../../../context";

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
      paddingTop={9}
      paddingBottom={4}
    >
      <Stack
        maxWidth={{ xs: "lg", md: isInfo ? "400px" : "550px" }}
        width={1}
        height={1}
      >
        <Stack
          marginBottom={10}
          display={{ xs: "none", md: "flex" }}
          direction="row"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <MuiLink href={ROUTES.home}>
            <Logo height={24} />
          </MuiLink>
          {!isInfo && (
            <MuiLink href={ROUTES.signIn}>
              <Button
                variant="text"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                {translateLang("logIn")}
              </Button>
            </MuiLink>
          )}
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
