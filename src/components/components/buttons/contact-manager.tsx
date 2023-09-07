import { useBlockchainContext } from "../../../context";
import { ButtonPrimary } from "./styles";

export const ButtonContactManager = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <ButtonPrimary
      size="small"
      sx={{
        borderRadius: "2px",
      }}
    >
      {translateLang("header.contact")}
    </ButtonPrimary>
  );
};
