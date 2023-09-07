import {Link} from "react-router-dom";
import { ROUTES } from "../../../config/navigation";
import { useBlockchainContext } from "../../../context";
import { ButtonSecondary } from "./styles";

export const ButtonHeaderSignIn = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <Link to={ROUTES.signIn}>
      <ButtonSecondary
        size="small"
        sx={{
          borderRadius: "2px",
        }}
      >
        {translateLang("signin_title")}
      </ButtonSecondary>
    </Link>
  );
};
