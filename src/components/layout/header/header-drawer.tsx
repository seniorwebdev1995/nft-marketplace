import React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MenuItem from '@mui/material/MenuItem';
import IconButton from "@mui/material/IconButton";
import Divider from '@mui/material/Divider';
import { Drawer, Typography } from "@mui/material";
import MuiLink from "@mui/material/Link";
import CloseIcon from "@mui/icons-material/Close";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { HeaderNavLink } from "./header-nav-link";
import { ROUTES } from "../../../config/navigation";
import { Logo } from "../../components/images/logo";

import { HeaderButtons, HeaderButtonsProps } from "./header-buttons";
import { Copyright } from "../../components/typography/copyright";
import { theme } from "../../../config/theme";
import { useBlockchainContext } from "../../../context";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../../../constants";

interface Props extends HeaderButtonsProps {
  toggle: (willBeOpen: boolean) => void;
  open: boolean;
}

export const HeaderDrawer = ({ open, toggle, login, ...props }: Props) => {
  const navigate= useNavigate();
  const { auth, translateLang, dispatch } = useBlockchainContext();

  const handleLogout = async () => {
    try {
      dispatch({
        type: "auth",
        payload: {
            isAuth: false,
        },
      });
      toggle(false);
      localStorage.removeItem(AUTH_TOKEN);
      navigate(ROUTES.home);
    } catch (e) {
    }
  };

  return (
    <Drawer
      anchor={"top"}
      open={open}
      onClose={() => {
        toggle(false);
      }}
    >
      <Box textAlign={"center"} bgcolor={auth.isAuth ? "#1A1C20" : "bg.dark"}>
        <Container>
          <Stack minHeight={"100vh"} alignItems={"center"}>
            <Box alignSelf={"flex-end"} marginBottom={10}>
              <IconButton
                size="large"
                color="inherit"
                aria-label="menu"
                onClick={() => {
                  toggle(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{display: auth.isAuth ? "none" : "block"}}>
              <Stack spacing={5} component="nav">
                {[
                  // { label: t("header.explore"), path: ROUTES.projects },
                  // { label: t("header.join"), path: ROUTES.join },
                  { label: translateLang("artists"), path: ROUTES.artists },
                  { label: translateLang("projects"), path: ROUTES.projects },
                  { label: translateLang("nfts"), path: ROUTES.nfts },
                  { label: translateLang("nftOnSale"), path: ROUTES.nftOnSale },
                  { label: translateLang("auctions"), path: ROUTES.auctions },
                  { label: translateLang("about"), path: ROUTES.aboutus },
                ].map((link) => (
                  <HeaderNavLink key={link?.path} {...link} />
                ))}
              </Stack>
              <Box marginY={10}>
                <HeaderButtons {...props} />
              </Box>

              <Stack spacing={3}>
                <Link to={ROUTES.home}>
                  <Logo height={"22px"} />
                </Link>
                <Copyright />
              </Stack>
            </Box>
            <Stack sx={{display: auth.isAuth ? "block" : "none"}} width="100%">
              <MenuItem>
                <Stack direction="row" alignItems="center" spacing="16px">
                  <Avatar src={auth?.avatarUrl} sizes="12px" alt="Remy Sharp" />
                  <Box>
                    <Typography textAlign="left">{auth?.nickname}</Typography>
                    <Typography textAlign="left" color={theme.palette.content.gray1}>{auth?.email}</Typography>
                  </Box>
                </Stack>
              </MenuItem>
              <Divider />
              <MenuItem component={MuiLink} href={ROUTES.account}>
                <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
                  <Typography color={theme.palette.content.gray1}>{translateLang("myAccount")}</Typography>
                  <SettingsOutlinedIcon sx={{ color: theme.palette.content.gray1 }}/>
                </Stack>
              </MenuItem>
              <MenuItem component={MuiLink} href="https://metamusik.notion.site/FAQ-be1d370336c548819727ae1633ee0cf2">
                <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
                  <Typography color={theme.palette.content.gray1}>{translateLang("faqTitle")}</Typography>
                  <LiveHelpOutlinedIcon sx={{ color: theme.palette.content.gray1 }}/>
                </Stack>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center">
                  <Typography color={theme.palette.content.gray1}>{translateLang("logout")}</Typography>
                  <LogoutOutlinedIcon sx={{ color: theme.palette.content.gray1 }}/>
                </Stack>
              </MenuItem>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Drawer>
  );
};
