import React from "react";

import { ButtonPrimary } from "../../../components/buttons/styles";
import { Stack, Typography } from "@mui/material";
import { CheckoutContentMethodsButtonMetamask } from "./content-methods-button-metamask";
import { CheckoutContentMethodsButtonMeoonpay } from "./content-methods-button-moonpay";
import { CheckoutContentMethodsButtonPaypal } from "./content-methods-button-paypal";
import { useBlockchainContext } from "../../../../context";

export const CheckoutContentMethodsButtonGroup = () => {
  const [method] = React.useState<number | null>(null);
  const { translateLang } = useBlockchainContext();

  return (
    <Stack spacing={3} width={1}>
      <Typography variant="title3">{translateLang("choose")}</Typography>
      <Stack spacing={2} width={1}>
        <CheckoutContentMethodsButtonMetamask />
        <CheckoutContentMethodsButtonPaypal />
        <CheckoutContentMethodsButtonMeoonpay />
      </Stack>
      <ButtonPrimary disabled={!method}>
        {translateLang("chooseBtn")}
      </ButtonPrimary>
    </Stack>
  );
};
