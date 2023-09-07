import React from "react";
import { CheckoutContentMethodsButton } from "./content-methods-button";

import { useBlockchainContext } from "../../../../context";

export const CheckoutContentMethodsButtonPaypal = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <CheckoutContentMethodsButton
      icon={"/img/checkout/paypal-rounded.svg"}
      title={translateLang("paypalTitle")}
      instruction={translateLang("paypalInstruction")}
      logo={<img src={"/img/checkout/paypal-logo.svg"} />}
    />
  );
};
