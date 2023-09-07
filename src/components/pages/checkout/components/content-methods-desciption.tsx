import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useBlockchainContext } from "../../../../context";

export const CheckoutContentMethodsDescription = () => {
  const { translateLang } = useBlockchainContext();

  const Infos = [
    { img: "/img/checkout/secure.svg", label: translateLang("secure") },
    { img: "/img/checkout/green.svg", label: translateLang("green") },
    { img: "/img/checkout/wallet.svg", label: translateLang("wallet") },
  ];

  return (
    <Stack spacing={6}>
      <Stack spacing={2}>
        {Infos.map((info) => (
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            key={info?.label}
          >
            <img src={info.img} />
            <Typography>{info?.label}</Typography>
          </Stack>
        ))}
      </Stack>
      <Stack spacing={3}>
        <Typography>{translateLang("whatIsNft")}</Typography>
        <Button sx={{ background: "#574E65", color: "white" }}>
          {translateLang("learnMore")}
        </Button>
      </Stack>
    </Stack>
  );
};
