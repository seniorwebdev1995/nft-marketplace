import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { HeaderButtons, HeaderButtonsProps } from "./header-buttons";
import { HeaderNav } from "./header-nav";
import React, { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { HeaderDrawer } from "./header-drawer";
import { useBlockchainContext } from "../../../context";
import {
  AUTH_ARTIST,
  AUTH_MODE,
  AUTH_TOKEN,
  AUTH_USER,
} from "../../../constants";
import { useLazyQuery } from "@apollo/client";
import { FETCH_ARTIST, FETCH_PROFILE } from "../../gql/queries";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../config/navigation";

export const Header = (props: HeaderButtonsProps) => {
  const { dispatch } = useBlockchainContext();
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const [open, toggle] = React.useState(false);
  const token = localStorage.getItem(AUTH_TOKEN);
  const authMode = localStorage.getItem(AUTH_MODE);
  const [fetchUserProfile] = useLazyQuery(FETCH_PROFILE, {
    fetchPolicy: "network-only",
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      dispatch({
        type: "auth",
        payload: {
          id: data.me._id,
          isAuth: true,
          authMode: AUTH_USER,
          email: data.me.email,
          nickname: data.me.nickname,
          address: data.me.walletAddress,
          avatarUrl: data.me.avatarUrl,
          phoneNumber: data.me.phoneNumber,
          genres: data.me.genres,
        },
      });
    },
  });
  const [fetchArtistProfile] = useLazyQuery(FETCH_ARTIST, {
    fetchPolicy: "network-only",
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      dispatch({
        type: "auth",
        payload: {
          isAuth: true,
          authMode: AUTH_ARTIST,
          id: data.meArtist._id,
          email: data.meArtist.email,
          nickname: data.meArtist.nickname,
          biography: data.meArtist.biography,
          genres: data.meArtist.genres,
          avatarUrl: data.meArtist.avatarUrl,
          videoUrl: data.meArtist.videoURL,
          videoTitle: data.meArtist.videoTitle,
          spotifyUrl: data.meArtist.spotifyUrl,
          bannerUrl: data.meArtist.bannerUrl,
          projectCount: data.meArtist.bannerUrl,
          revenue: data.meArtist.revenue,
          saleCount: data.meArtist.saleCount,
          visitorCount: data.meArtist.visitorCount,
          auctionCount: data.meArtist.auctionCount,
          auctionPastCount: data.meArtist.auctionPastCount,
          auctionOnGoingCount: data.meArtist.auctionOnGoingCount,
          auctionFutureCount: data.meArtist.auctionFutureCount,
          projectRevenue: data.meArtist.projectRevenue,
          auctionRevenue: data.meArtist.auctionRevenue,
        },
      });
    },
  });
  useEffect(() => {
    if (token) {
      if (authMode === AUTH_USER) {
        fetchUserProfile();
      } else if (authMode === AUTH_ARTIST) {
        fetchArtistProfile();
      }
    } else {
      if (pathname === ROUTES.artistAccount) {
        navigate(ROUTES.artistSignIn)
      } else if (pathname === ROUTES.account) {
        navigate(ROUTES.signIn)
      }
    }
  }, [token, authMode, fetchArtistProfile, fetchUserProfile, pathname]);

  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(40px)",
      }}
    >
      <Container component="header" maxWidth="lg">
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent="space-between"
          height="70px"
        >
          <HeaderNav />
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <HeaderButtons login={token !== null} {...props} />
          </Box>
          <Box display={{ xs: "block", md: "none" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => {
                toggle(true);
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Stack>
      </Container>
      <HeaderDrawer open={open} toggle={toggle} {...props} isMobile />
    </Box>
  );
};
