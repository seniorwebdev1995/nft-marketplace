import React from "react";
import { Stack, Typography } from "@mui/material";
import { CheckoutContentMethodsButton } from "./content-methods-button";
import { useBlockchainContext } from "../../../../context";

export const CheckoutContentMethodsButtonMetamask = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <CheckoutContentMethodsButton
      icon={"/img/checkout/crypto-rounded.svg"}
      title={translateLang("metamaskTitle")}
      instruction={translateLang("metamaskInstruction")}
      logo={
        <Stack spacing={1} direction="row" alignItems={"center"}>
          <img src={"/img/checkout/metamask-fox.svg"} />
          <Typography
            display={{ xs: "none", md: "block" }}
            variant="body3"
            textTransform={"uppercase"}
          >
            {translateLang("metamaskLogo")}
          </Typography>
        </Stack>
      }
    />
  );
};
