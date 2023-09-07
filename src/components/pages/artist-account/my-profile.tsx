import { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  useMediaQuery,
  Chip,
  Paper,
  // TextField,
  // Checkbox,
  // FormControlLabel,
  // FormGroup,
  // FormControl,
  // FormLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useForm, useField } from "react-final-form-hooks";
import { NotificationManager } from "react-notifications";

import { emailFormat } from "../../../utils";
import { AppTextField } from "../../components/inputs/text";
import { AvatarModal } from "./components/avatar-modal";
import { ButtonGradient } from "../../components/buttons/button-gradient";
import { theme } from "../../../config/theme";
import { useBlockchainContext } from "../../../context";
import { useMutation } from "@apollo/client";
import { UPDATE_ARTIST_ME } from "../../gql/mutations";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { GenresModal } from "./components/genres-modal";
import { IGenres } from "../../../types/auth";
import { IArtist } from "../../props/IArtist";
import DropZone from "../../components/dropzone";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export const MyProfile = (props) => {
  const { translateLang, auth, dispatch } = useBlockchainContext();
  const mediumViewport = useMediaQuery(theme.breakpoints.down("md"));
  const [updateArtistMe] = useMutation(UPDATE_ARTIST_ME);
  const [isLoading, setIsLoading] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openGenres, setOpenGenres] = useState(false);
  const [genres, setGenres] = useState<IGenres[]>([]);
  const [bannerImage, setBannerImage] = useState<string>();
  const [bannerFile, setBannerFile] = useState<File>();

  const handleOpenGenres = () => setOpenGenres(true);
  const handleCloseGenres = () => setOpenGenres(false);
  const handleOpenAvatar = () => setOpenAvatar(true);
  const handleCloseAvatar = () => setOpenAvatar(false);

  const handleAvatarUpdated = (user: IArtist) => {
    NotificationManager.success("Avatar updated");
    handleCloseAvatar();
    dispatch({
      type: "auth",
      payload: {
        ...auth,
        avatarUrl: user.avatarUrl,
      },
    });
  };

  const handleGenresUpdated = (updatedGenres: IGenres[]) => {
    console.log("Genres updated:", updatedGenres);
    setGenres(updatedGenres);
    handleCloseGenres();
  };

  const handleSelectFile = file => {
    setBannerFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setBannerImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  const validate = (values: any = {}) => {
    const errors: any = {};

    if (!values.nickname) {
      errors.nickname = translateLang("required");
    }
    if (!values.biography) {
      errors.biography = translateLang("required");
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
    nickname: string;
    biography: string;
    spotifyUrl: string;
    videoTitle: string;
    videoUrl: string;
  }) => {
    try {
      setIsLoading(true);
      const genreIds = genres.map((genre) => genre._id);
      const payload = {
        email: values.email,
        nickname: values.nickname,
        biography: values.biography,
        spotifyUrl: values.spotifyUrl,
        videoTitle: values.videoTitle,
        videoUrl: values.videoUrl,
        genreIds: genreIds || [],
        ...(bannerFile && {bannerFile: bannerFile}),
      };
      const data = await updateArtistMe({ variables: payload });
      if (data && data.data.updateArtistMe) {
        const result = data.data.updateArtistMe;
        const payload = {
          ...auth,
          email: result.email,
          nickname: result.nickname,
          biography: result.biography,
          genres: result.genres,
          bannerUrl: result.bannerUrl,
          spotifyUrl: result.spotifyUrl,
          videoTitle: result.videoTitle,
          videoUrl: result.videoUrl
        };
        NotificationManager.success("Profile updated");
        dispatch({
          type: "auth",
          payload,
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
      biography: auth.biography,
      spotifyUrl: auth.spotifyUrl,
      videoTitle: auth.videoTitle,
      videoUrl: auth.videoUrl,
    }, // a record-level validation function to check all form values
  });

  const nickname = useField("nickname", form);
  const biography = useField("biography", form);
  const videoTitle = useField("videoTitle", form);
  const videoUrl = useField("videoUrl", form);
  const spotifyUrl = useField("spotifyUrl", form);

  const email = useField("email", form);

  const ListItem = styled("li")(({ theme }) => ({
    marginRight: theme.spacing(1.0),
  }));

  useEffect(() => {
    if (auth.genres) {
      setGenres(auth.genres);
      setBannerImage(auth.bannerUrl);
    }
  }, [auth]);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container disableGutters sx={{ marginBottom: 4, marginTop: 4}}>
      <Grid container spacing={3} alignItems="flex-start" sx={{padding: {xs: "0", md: "0 20px"}}} component="form" onSubmit={handleSubmit}>
        <Grid item xs={12}>
            <Stack direction={{xs: "column", md: "row"}} spacing={2}>
              <Box display={{ xs: "none", md: "block" }}>
                <Typography fontSize={16} fontWeight="700" marginBottom="8px">
                  {translateLang("avatar")}
                </Typography>
                <Box component="span" color="#FFFFFFB0" fontSize={14}>
                  {translateLang("avatarDescription")}
                  <Typography
                    color="#3495FB"
                    marginLeft="8px"
                    fontSize={14}
                    sx={{
                      display: "inline-block",
                      lineHeight: "180%",
                      cursor: "pointer",
                    }}
                    onClick={handleOpenAvatar}
                  >
                    {translateLang("change")}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={auth.avatarUrl}
                  sx={{ width: { xs: 80, md: 64 }, height: { xs: 80, md: 64 } }}
                />
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
                  <CameraAltOutlinedIcon
                    fontSize="inherit"
                    sx={{ color: "rgba(255,255,255,0.23)" }}
                  />
                </IconButton>
              </Box>
            </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack
            spacing={{ md: 6, xs: 3 }}
          >
            {[
              {
                label: translateLang("labelEmail"),
                props: { ...email.input },
                meta: { ...email.meta },
                type: "email"
              },
              {
                label: translateLang("labelNickName"),
                props: { ...nickname.input },
                meta: { ...nickname.meta },
              },
              {
                label: translateLang("labelBiography"),
                props: { ...biography.input },
                meta: { ...biography.meta },
              },
            ].map((input) => (
              <AppTextField
                error={input.meta.submitFailed && input.meta.error}
                variant="standard"
                helperText={
                  input.meta.submitFailed &&
                  input.meta.error &&
                  input.meta.error
                }
                multiline={
                  input.label === translateLang("labelBiography") ? true : false
                }
                maxRows={5}
                key={input?.label}
                label={input?.label}
                type={input?.type || "text"}
                {...input.props}
              />
            ))}

            <Stack>
              <Typography fontSize={16} fontWeight="700" marginBottom="8px">
                {"Banner"}
              </Typography>
              <DropZone fileTypes={["JPG", "JPEG", "PNG", "GIF"]} multiple={false} handleChange={handleSelectFile}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    height: "150px",
                    border: "1px dashed rgba(255, 255, 255, 0.2)",
                    borderRadius: "4px"
                  }}
                >
                  {bannerImage ? (
                    <img width="100%" src={bannerImage} alt="banner-img" style={{ objectFit: "cover" }}/>
                   ) : (
                    <Stack
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <FileDownloadOutlinedIcon />
                      <Stack direction="row" spacing={1}>
                        <Typography
                          color="#2F98FB"
                          fontSize={{ xs: 12, sm: 14 }}
                        >
                          Choose a file
                        </Typography>
                        <Typography
                          color="rgba(255, 255, 255, 1.0)"
                          fontSize={{ xs: 12, sm: 14 }}
                        >
                          or drag it here
                        </Typography>
                      </Stack>
                    </Stack>
                  )}
                </Box>
              </DropZone>
            </Stack>

            <Box>
              <ButtonGradient
                fullWidth={mediumViewport && true}
                loading={isLoading}
                label={translateLang("saveChanges")}
              />
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack
            spacing={{
                md: 6,
                xs:3
          }}>
{[
              {
                label: translateLang("labelVideoTitle"),
                props: { ...videoTitle.input },
                meta: { ...videoTitle.meta },
              },
              {
                label: translateLang("labelVideoUrl"),
                props: { ...videoUrl.input },
                meta: { ...videoUrl.meta },
                type: "url"
              },
              {
                label: translateLang("labelSpotifyUrl"),
                props: { ...spotifyUrl.input },
                meta: { ...spotifyUrl.meta },
                type: "url"
              },
            ].map((input) => (
              <AppTextField
                error={input.meta.submitFailed && input.meta.error}
                variant="standard"
                helperText={
                  input.meta.submitFailed &&
                  input.meta.error &&
                  input.meta.error
                }
                maxRows={5}
                key={input?.label}
                label={input?.label}
                type={input?.type || "text"}
                {...input.props}
              />
            ))}
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
          </Stack>


        </Grid>
      </Grid>
      <GenresModal
        genres={genres}
        open={openGenres}
        onClose={handleCloseGenres}
        onGenresUpdated={handleGenresUpdated}
      />
      <AvatarModal
        email={auth.email}
        biography={auth.biography}
        imgSrc={"/img/avatar-user-default.svg"}
        open={openAvatar}
        onClose={handleCloseAvatar}
        onAvatarUpdated={handleAvatarUpdated}
      />
    </Container>
  );
};
