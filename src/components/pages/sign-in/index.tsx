import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/navigation";
import { AUTH_USER } from "../../../constants";
import { useBlockchainContext } from "../../../context";
import { LayoutAuth } from "../../layout/pages/layout-auth";
import { SignInContent } from "./components/content";

export const SignInScreen = () => {
  const navigate = useNavigate();
  const {auth} = useBlockchainContext();
  useEffect(() => {
    if (auth.isAuth && auth.authMode === AUTH_USER) {
      navigate(ROUTES.account);
    }
  }, [auth, navigate]);
  return (
    <LayoutAuth>
      <SignInContent />
    </LayoutAuth>
  );
};
