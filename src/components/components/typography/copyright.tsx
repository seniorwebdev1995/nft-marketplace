import Typography from "@mui/material/Typography";
import { useBlockchainContext } from "../../../context";

export const Copyright = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <Typography color="rgba(225,225,225,0.4)" variant="body3">
      {translateLang("copyright")}
    </Typography>
  );
};
