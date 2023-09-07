import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import { ROUTES } from "../../../../config/navigation";
import { useBlockchainContext } from "../../../../context";

export const SignInButtonSignUp = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <Stack alignItems={"center"} width="100%" spacing="10px">
      <Typography>{translateLang("noAccountYet")}</Typography>
      <MuiLink href={ROUTES.artistSignUp}>
        <Button
          variant="text"
          sx={{
            textTransform: "capitalize",
          }}
        >
          {translateLang("signUp")}
        </Button>
      </MuiLink>
    </Stack>
  );
};
