import React from "react";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { ROUTES } from "../../../../config/navigation";
import Stack from "@mui/material/Stack";

import { ButtonPrimary } from "../../../components/buttons/styles";
import { useBlockchainContext } from "../../../../context";

export const HomeHeroArtists = () => {
  const {translateLang} = useBlockchainContext();

  return (
    <Stack alignItems={{ xs: "center", md: "flex-start" }}>
      <MuiLink
        href={ROUTES.projects}
        underline="none"
        sx={{
          width: "100%",
          order: { xs: 1, md: 0 },
          marginTop: { xs: 6.5, md: 0 },
        }}
      >
        <ButtonPrimary
          size="large"
          fullWidth
          sx={{
            textTransform: "uppercase",
            boxShadow: "0px 8px 32px rgba(191, 255, 98, 0.3)",
            maxWidth: "387px",
          }}
        >
          {translateLang("explore")}
        </ButtonPrimary>
      </MuiLink>
    </Stack>
  );
};
