import React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import MuiLink from "@mui/material/Link";
import { IconButton, Typography } from "@mui/material";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { useNavigate } from "react-router-dom";
import { ButtonContactManager } from "../../components/buttons/contact-manager";
import { ButtonHeaderSignIn } from "../../components/buttons/header-sign-in";
import { ButtonHeaderSignUp } from "../../components/buttons/header-sign-up";
import { ButtonFooterSocial } from "../../components/buttons/footer-social";
import { SocialLinksFooter } from "../../../config/data";
import { ROUTES } from "../../../config/navigation";
import { theme } from "../../../config/theme";
import { useBlockchainContext } from "../../../context";
import { AUTH_TOKEN, AUTH_USER } from "../../../constants";

export interface HeaderButtonsProps {
  login?: boolean;
  contact?: boolean;
  isMobile?: boolean;
}

export const HeaderButtons = ({
  login,
  contact,
  isMobile,
}: HeaderButtonsProps) => {
  const {translateLang, auth, dispatch} = useBlockchainContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem(AUTH_TOKEN);
      dispatch({
        type: "auth",
        payload: {
            isAuth: false,
        },
      });
      navigate(ROUTES.home);
    } catch (e) {
    }
  };

  return (
    <Box>
      {/* <Stack direction="row" gap="16px" justifyContent={{xs: "center", md: "end"}}>
        {SocialLinksFooter.map(({ order, ...btn }, index) => (
          <ButtonFooterSocial key={index} {...btn} />
        ))}
      </Stack> */}
      {contact ? (
        <ButtonContactManager />
      ) : login ? (
        <>
          <Stack direction="row" alignItems="center" spacing="4px">
            <Avatar src={auth?.avatarUrl} sizes="12px" alt="Remy Sharp" />
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}>
              { open ? (
                <ArrowDropUpIcon sx={{ color: "#666B7C" }}/>
              ): (
                <ArrowDropDownIcon sx={{ color: "#666B7C" }}/>
              )}
            </IconButton>
          </Stack>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            disableScrollLock={ true }
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              elevation: 0,
              sx: {
                minWidth: "250px",
                mt: 1.5,
                backgroundColor: "#24282C",
                borderColor: "#2F98FB rgba(255, 255, 255, 0.05) rgba(255, 255, 255, 0.05)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "0px 0px 8px 8px"
              },
            }}
          >
            <MenuItem>
              <Stack direction="row" alignItems="center" spacing="16px">
                <Avatar src={auth.avatarUrl} sizes="12px" alt="Remy Sharp" />
                <Stack>
                  <Typography>{auth.nickname}</Typography>
                  <Typography color={theme.palette.content.gray1}>{auth.email}</Typography>
                </Stack>
              </Stack>
            </MenuItem>
            <Divider />
            <MenuItem component={MuiLink} href={auth.authMode === AUTH_USER ? ROUTES.account : ROUTES.artistAccount}>
              <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center" paddingLeft="56px">
                <Typography color={theme.palette.content.gray1}>{translateLang("myAccount")}</Typography>
                <SettingsOutlinedIcon sx={{ color: theme.palette.content.gray1 }}/>
              </Stack>
            </MenuItem>
            <MenuItem component={MuiLink} href="https://metamusik.notion.site/FAQ-be1d370336c548819727ae1633ee0cf2">
              <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center" paddingLeft="56px">
                <Typography color={theme.palette.content.gray1}>{translateLang("faqTitle")}</Typography>
                <LiveHelpOutlinedIcon sx={{ color: theme.palette.content.gray1 }}/>
              </Stack>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <Stack width="100%" direction="row" justifyContent="space-between" alignItems="center" paddingLeft="56px">
                <Typography color={theme.palette.content.gray1}>{translateLang("logout")}</Typography>
                <LogoutOutlinedIcon sx={{ color: theme.palette.content.gray1 }}/>
              </Stack>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={isMobile ? 3 : 2}
          alignItems="center"
        >
          <ButtonHeaderSignIn />
          <ButtonHeaderSignUp />
        </Stack>
      )}
    </Box>
  );
};
