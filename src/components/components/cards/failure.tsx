import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useBlockchainContext } from "../../../context";

export const FailureCard = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <Stack
      spacing={"15px"}
      padding={"21px 109px 36px 20px"}
      borderRadius={"10px"}
      width="100%"
      sx={{
        background:
          "linear-gradient(90deg, #D86A6A 13.99%, rgba(25, 18, 37, 0) 108.37%)",
      }}
      direction="row"
      alignItems="start"
    >
      <ErrorOutlineIcon sx={{ fontSize: 30, marginTop: "-4px" }} />
      <Stack alignItems="start" maxWidth={"263px"} spacing={"24px"}>
        <Typography variant="typography3">
          {translateLang("transactionFailure.failure")}
        </Typography>
        <Typography variant="typography4">
          {translateLang("transactionFailure.try")}
        </Typography>
      </Stack>
    </Stack>
  );
};
