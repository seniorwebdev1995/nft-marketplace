import React from "react";
import { Stack } from "@mui/material";
import { CheckoutContentMethodsButton } from "./content-methods-button";
import { useBlockchainContext } from "../../../../context";

export const CheckoutContentMethodsButtonMeoonpay = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <CheckoutContentMethodsButton
      icon={"/img/checkout/crypto-rounded.svg"}
      title={translateLang("moonpayTitle")}
      instruction={translateLang("moonpayInstruction")}
      logo={
        <Stack spacing={3} direction="row" alignItems={"center"}>
          <img src={"/img/checkout/moonpay-img-logo.svg"} />
          <img src={"/img/checkout/moonpay-text-logo.svg"} />
        </Stack>
      }
    />
  );
};
