import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/navigation";
import { useBlockchainContext } from "../../../context";
import { ButtonPrimary } from "./styles";

export const JoinHeroButton = () => {
  const navigate = useNavigate();
  const { translateLang } = useBlockchainContext();

  return (
    <ButtonPrimary
      onClick={() => navigate(ROUTES.artistSignUp)}
      size="large"
      sx={{ 
        maxWidth: "387px",
        textTransform: "uppercase"
      }}>
      {translateLang("registerAsArtist")}
    </ButtonPrimary>
  );
};
