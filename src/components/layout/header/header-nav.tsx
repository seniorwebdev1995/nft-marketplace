
import { Logo } from "../../components/images/logo";
import { ROUTES } from "../../../config/navigation";

import {Box, Stack, Typography} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import { HeaderNavLink } from "./header-nav-link";
import { useBlockchainContext } from "../../../context";
import {useEffect, useState} from "react";
import MuiLink from "@mui/material/Link";

export const HeaderNav = () => {
  const { translateLang } = useBlockchainContext();
  const {pathname} = useLocation();
  const [isArtistPage, setIsArtistPage] = useState(false);

  useEffect(() => {
      if (["artist-signin", "artist-signup", "artist-account"].find(path => path === pathname.slice(1))){
          setIsArtistPage(true);
      }
  }, [pathname])

  return (
    <Stack direction="row" alignItems="center">
      <Link to={ROUTES.home}>
        <Stack direction="row" alignItems="center">
          <Box marginRight="10px">
            <Logo height={24} />
          </Box>
          { isArtistPage && (
            <Typography
              fontSize="24px"
              lineHeight={"32px"}
              fontWeight="700"
              fontStyle="normal"
              fontFamily={"Overpass"}
              color={"#FFFFFF"}
              marginTop={"9px"}
            >
              {"/ Artist"}
            </Typography> 
          )}
        </Stack>
      </Link>
      <Stack
        spacing={"40px"}
        component="nav"
        direction="row"
        alignItems={"center"}
        marginLeft={"60px"}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        {[
          { label: translateLang("artists"), path: ROUTES.artists },
          { label: translateLang("projects"), path: ROUTES.projects },
          { label: translateLang("nfts"), path: ROUTES.nfts },
          { label: translateLang("nftOnSale"), path: ROUTES.nftOnSale },
          { label: translateLang("auctions"), path: ROUTES.auctions },
        ].map((link) => (
          <HeaderNavLink key={link?.path} {...link} />
        ))}
      </Stack>
    </Stack>
  );
};
