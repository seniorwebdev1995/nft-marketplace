import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Container,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery
} from "@mui/material";
import MuiLink from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { useForm, useField } from "react-final-form-hooks";
import { NotificationManager } from "react-notifications";
import { isMobile } from "react-device-detect";

import { emailFormat } from "../../../utils";
import { AppTextField } from "../../components/inputs/text";
import { AvatarModal } from "./components/avatar-modal";
import { WalletAddressModal } from "./components/wallet-modal";
import { ReferralModal } from "./components/referral-modal";
import { ButtonGradient } from "../../components/buttons/button-gradient";
import { theme } from "../../../config/theme";
import { useBlockchainContext } from "../../../context";
import { useMutation } from "@apollo/client";
import { UPDATE_ME } from "../../gql/mutations";
import { IUser } from "../../props/IUser";
import { GenresModal } from "../artist-account/components/genres-modal";
import { IGenres } from "../../../types/auth";

export const MyProfile = () => {
  const { translateLang, auth, dispatch } = useBlockchainContext();
  const mediumViewport = useMediaQuery(theme.breakpoints.down("md"));
  const [updateMe] = useMutation(UPDATE_ME);
  const [isLoading, setIsLoading] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openGenres, setOpenGenres] = useState(false);
  const [openWallet, setOpenWallet] = useState(false);
  const [openReferral, setOpenReferral] = useState(false);
  const [genres, setGenres] = useState<IGenres[]>([]);

  const handleOpenAvatar = () => setOpenAvatar(true);
  const handleCloseAvatar = () => setOpenAvatar(false);
  const handleOpenGenres = () => setOpenGenres(true);
  const handleCloseGenres = () => setOpenGenres(false);
  const handleCloseWallet = () => setOpenWallet(false);
  const handleCloseReferral = () => setOpenReferral(false);
  const handleCopyReferral = () => navigator.clipboard.writeText('https://metamusik.io/364234');

  const handleAvatarUpdated = (user: IUser) => {
    NotificationManager.success("Avatar updated");
    handleCloseAvatar();
    dispatch({
      type: "auth",
      payload: {
        ...auth,
        avatarUrl: user.avatarUrl
      },
    });
  };

  const handleGenresUpdated = (updatedGenres: IGenres[]) => {
    console.log("Genres updated:", updatedGenres);
    setGenres(updatedGenres);
    handleCloseGenres();
  };

  useEffect(() => {
    if (auth.genres) {
      setGenres(auth.genres);
    }
  }, [auth]);

  const validate = (values: any = {}) => {
    const errors: any = {};
    if (!values.nickname) {
      errors.nickname = translateLang("required");
    }
    if (!values.email) {
      errors.email = translateLang("required");
    }
    if (emailFormat(values.email)) {
      errors.email = translateLang("invalidEmail");
    }
    return errors;
  };

  const onSubmit = async (values: {
    email: string;
    phoneNumber: string;
    nickname: string;
  }) => {
    try {
      setIsLoading(true);
      const genreIds = genres.map((genre) => genre._id);
      const payload = {
        email: values.email,
        nickname: values.nickname,
        phoneNumber: values.phoneNumber,
        genreIds: genreIds || [],
      };
      const data = await updateMe({ variables: payload });
      if (data && data.data.updateMe) {
        NotificationManager.success("Profile updated");
        dispatch({
          type: "auth",
          payload: {
            ...auth,
            ...payload,
            genres: genres,
          },
        });
      }
    } catch (e: any) {
      console.log(e);
      NotificationManager.error("Please try again");
    }
    setIsLoading(false);
  };

  // const loggeduser = auth.getLoggedUser();

  const { form, handleSubmit } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
    validate,
    initialValues: {
      email: auth.email,
      nickname: auth.nickname,
      phoneNumber: auth.phoneNumber
    } // a record-level validation function to check all form values
  });

  const phoneNumber = useField("phoneNumber", form);
  const nickname = useField("nickname", form);
  const email = useField("email", form);
  const ListItem = styled("li")(({ theme }) => ({
    marginRight: theme.spacing(1.0),
  }));

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container disableGutters sx={{ marginBottom: 4, marginTop: 4 }}>
      <Grid
        container spacing={3}
        alignItems="flex-start"
      >
        {isMobile && <Grid item xs={12} md={5}>
          <Stack
            marginLeft={{ lg: "32px" }}
            justifyContent={"center"}
            height="100%"
            spacing={3}>
            <MuiLink
              href={`${process.env.REACT_APP_MATIC_URL}/address/${auth.address}`}
              target="_blank"
              underline="none"
            >
              <Stack
                padding={{ xs: "25px 18px", md: "25px 24px" }}
                sx={{
                  background: "#24282C",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  fontSize={{ xs: 14, sm: 18 }}
                  fontWeight="700"
                  color="white"
                >
                  {translateLang("receivingWallet")}
                </Typography>
                <Box
                  marginTop="16px"
                  sx={{ background: "#1A1C20", padding: "8px", paddingLeft: "12px", borderRadius: "2px" }}>
                  <Typography
                    fontSize={{ xs: 12, sm: 12 }}
                    color={theme.palette.content.secondary}>
                    {auth.address}
                  </Typography>
                </Box>
              </Stack>
            </MuiLink>
          </Stack>
        </Grid>}
        <Grid item xs={12} md={7}>
          <Stack spacing={{ md: 5, xs: 3 }} onSubmit={handleSubmit} component="form">
            <Stack direction="row" justifyContent={{ xs: "center" }}>
              <Box display={{ xs: "none", md: "block" }}>
                <Typography fontSize={16} fontWeight="700" marginBottom="8px">
                  {translateLang("avatar")}
                </Typography>
                <Box
                  component="span"
                  color="#FFFFFFB0"
                  fontSize={14}>
                  {translateLang("avatarDescription")}
                  <Typography
                    color="#3495FB"
                    marginLeft="8px"
                    fontSize={14}
                    sx={{ display: "inline-block", lineHeight: "180%", cursor: "pointer" }}
                    onClick={handleOpenAvatar}>
                    {translateLang("change")}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ position: "relative" }}>
                <Avatar src={auth.avatarUrl} sx={{ width: { xs: 80, md: 64 }, height: { xs: 80, md: 64 } }} />
                <IconButton
                  sx={{
                    position: "absolute",
                    right: "-4px",
                    bottom: "-4px",
                    backgroundColor: "#24282C",
                    borderRadius: "50%",
                  }}
                  aria-label="avatar link"
                  size="small"
                  onClick={handleOpenAvatar}
                >
                  <CameraAltOutlinedIcon fontSize="inherit" sx={{ color: "rgba(255,255,255,0.23)" }} />
                </IconButton>
              </Box>
            </Stack>
            {[
              {
                label: translateLang("labelNickName"),
                props: { ...nickname.input },
                meta: { ...nickname.meta },
              },
              {
                label: translateLang("labelEmail"),
                props: { ...email.input },
                meta: { ...email.meta },
              },
              {
                label: translateLang("labelPhoneNumber"),
                props: { ...phoneNumber.input },
                meta: { ...phoneNumber.meta },
              },
            ].map((input) =>
              <AppTextField
                error={input.meta.submitFailed && input.meta.error}
                variant="filled"
                helperText={
                  input.meta.submitFailed && input.meta.error && input.meta.error
                }
                key={input?.label}
                label={input?.label}
                type={"text"}
                {...input.props}
              />
            )}
            <Stack>
              <Typography fontSize={16} fontWeight="700" marginBottom="8px">
                {"Music style"}
              </Typography>
              <Paper
                sx={{
                  backgroundImage: "none",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  display: "flex",
                  justifyContent: "start",
                  flexWrap: "wrap",
                  listStyle: "none",
                  padding: "4px 0",
                  m: 0,
                }}
              // component="ul"
              >
                {genres.map((data) => {
                  let icon;

                  return (
                    <ListItem key={data._id}>
                      <Chip
                        icon={icon}
                        label={data.name}
                        sx={{
                          backgroundImage: "none",
                          backgroundColor: "transparent",
                          border: "1px solid rgba(255, 255, 255, 0.2)",
                          fontWeight: "400",
                        }}
                      />
                    </ListItem>
                  );
                })}

                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleOpenGenres}
                  onMouseDown={handleMouseDownPassword}
                >
                  <ControlPointIcon />
                </IconButton>
              </Paper>
            </Stack>
            <Box>
              <ButtonGradient fullWidth={mediumViewport && true} loading={isLoading} label={translateLang("saveChanges")} />
            </Box>
          </Stack>
        </Grid>
        {!isMobile && <Grid item xs={12} md={5}>
          <Stack
            marginLeft={{ lg: "32px" }}
            justifyContent={"center"}
            height="100%"
            spacing={3}>
            <MuiLink
              href={`${process.env.REACT_APP_MATIC_URL}/address/${auth.address}`}
              target="_blank"
              underline="none"
            >
              <Stack
                padding={{ xs: "25px 18px", md: "25px 24px" }}
                sx={{
                  background: "#24282C",
                  borderRadius: "8px",
                }}
              >
                <Typography
                  fontSize={{ xs: 14, sm: 18 }}
                  fontWeight="700"
                  color="white"
                >
                  {translateLang("receivingWallet")}
                </Typography>
                <Box
                  marginTop="16px"
                  sx={{ background: "#1A1C20", padding: "8px", paddingLeft: "12px", borderRadius: "2px" }}>
                  <Typography
                    fontSize={{ xs: 12, sm: 12 }}
                    color={theme.palette.content.secondary}>
                    {auth.address}
                  </Typography>
                </Box>
                {/* <Typography
                  color="#2F98FB"
                  marginTop="32px"
                  fontWeight="900"
                  onClick={handleOpenWallet}
                  sx={{cursor: "pointer", textTransform: "uppercase"}}>
                  {translateLang("editWallet")}
                </Typography> */}
              </Stack>
            </MuiLink>
            {/* <Stack
              sx={{
                padding: "25px",
                background: "#24282C",
                borderRadius: "8px",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
              >
                <Typography fontSize={{ xs: 14, sm: 18}} fontWeight="700">
                  {translateLang("earnWithReferral")}
                </Typography>
                <Typography
                  color="#42A4FF"
                  fontSize={{ xs: 14, sm: 16}}
                  onClick={handleOpenReferral}
                  sx={{cursor: "pointer"}}
                >
                  {translateLang("common.more")}
                </Typography>
              </Stack>
              <Typography
                marginTop="16px"
                color="rgba(255, 255, 255, 0.4)"
                fontSize={{ xs: 14, sm: 16}}>
                {translateLang("earnWithReferralDescription")}
              </Typography>
              <Box
                marginTop="16px"
                sx={{background: "#1A1C20", padding: "8px", paddingLeft: "12px", borderRadius: "2px"}}>
                <Typography
                  fontSize={{ xs: 14, sm: 16}}
                  color={theme.palette.content.secondary}>
                  https://metamusik.io/364234
                </Typography>
              </Box>
              <Typography
                color="#2F98FB"
                marginTop="32px"
                fontWeight="900"
                onClick={handleCopyReferral}
                sx={{cursor: "pointer", textTransform: "uppercase"}}>
                {translateLang("copyReferral")}
              </Typography>
            </Stack> */}
          </Stack>
        </Grid>}
      </Grid>
      <GenresModal
        genres={genres}
        open={openGenres}
        onClose={handleCloseGenres}
        onGenresUpdated={handleGenresUpdated}
      />
      <AvatarModal
        imgSrc={"/img/avatar-user-default.svg"}
        email={auth.email}
        nickname={auth.nickname}
        open={openAvatar}
        onClose={handleCloseAvatar}
        onAvatarUpdated={handleAvatarUpdated} />
      <WalletAddressModal open={openWallet} onClose={handleCloseWallet} />
      <ReferralModal open={openReferral} onClose={handleCloseReferral} />
    </Container>
  );
};
