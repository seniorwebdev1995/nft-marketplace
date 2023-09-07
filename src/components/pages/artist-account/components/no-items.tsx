import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ButtonGradient } from "../../../components/buttons/button-gradient";
import { ROUTES } from "../../../../config/navigation";
import { useBlockchainContext } from "../../../../context";
import { useNavigate } from "react-router-dom";

export const NoItems = () => {
  const { translateLang } = useBlockchainContext();

  const navigation = useNavigate();

  const goTo = () => {
    navigation(ROUTES.projects);
  }


  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{
        padding: "50px",
        border: "1px dashed rgba(255, 255, 255, 0.2)",
        borderRadius: "4px"
      }}
    >
      <Typography 
        color="#2F98FB" 
        fontSize={{ xs: 14, sm: 16 }}
        fontWeight="600"
      >
        {translateLang("noProjectCreatedYet")}
      </Typography>
      <Typography
        color="rgba(255, 255, 255, 0.4)"
        fontSize={{ xs: 10, sm: 12 }}
      >
        {translateLang("createAndLaunchFirstOne")}
      </Typography>
      {/* <ButtonGradient label="Launch my first project" onClick={()=>goTo()} /> */}
    </Stack>
  );
};
