import {Link} from "react-router-dom";
import { ROUTES } from "../../../config/navigation";
import { useBlockchainContext } from "../../../context";
import { ButtonPrimary } from "./styles";

export const ButtonHeaderSignUp = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <Link to={ROUTES.signUp}>
      <ButtonPrimary
        size="small"
        sx={{
          borderRadius: "2px",
        }}
      >
        {translateLang("signup_title")}
      </ButtonPrimary>
    </Link>
  );
};
