import { Typography, Stack, Button } from "@mui/material";
import MuiLink from "@mui/material/Link";
import { ROUTES } from "../../../../config/navigation";
import { useBlockchainContext } from "../../../../context";

export const SignUpButtonSignIn = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <Stack alignItems={"center"} width="100%" spacing="10px">
      <Typography>{translateLang("alreadyHaveAccount")}</Typography>
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
    </Stack>
  );
};
