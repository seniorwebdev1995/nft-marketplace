import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import { Stack, Typography, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useForm, useField } from "react-final-form-hooks";
import { NotificationManager } from "react-notifications";
import { ROUTES } from "../../../../config/navigation";
import { ButtonBack } from "../../../components/buttons/back";
import { AppTextField } from "../../../components/inputs/text";
import { ButtonPrimary } from "../../../components/buttons/styles";
import { isValidPassword, emailFormat } from "../../../../utils";
import { useBlockchainContext } from "../../../../context";
import { ARTIST_SIGNIN, ARTIST_SIGNUP } from "../../../gql/mutations";
import { IS_ARTIST_EMAIL_TAKEN } from "../../../gql/queries";
import { AUTH_TOKEN, AUTH_REFRESH_TOKEN, AUTH_MODE, AUTH_ARTIST } from "../../../../constants";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { translateLang, dispatch } = useBlockchainContext();
  const [isLoading, setIsLoading] = useState(false);

  const [isEmailTaken] = useLazyQuery(IS_ARTIST_EMAIL_TAKEN);
  const [artistSignUp] = useMutation(ARTIST_SIGNUP);
  const [artistLogin] = useMutation(ARTIST_SIGNIN, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      localStorage.setItem(AUTH_TOKEN, data.artistLogin.authToken.token);
      localStorage.setItem(AUTH_REFRESH_TOKEN, data.artistLogin.refreshToken.token);
      localStorage.setItem(AUTH_MODE, AUTH_ARTIST);
      navigate(ROUTES.artistSignUp2);
    },
  });

  const validate = (values: any = {}) => {
    const errors: any = {};
    if (!values.email) {
      errors.email = translateLang("required");
    }
    if (!values.nickname) {
      errors.nickname = translateLang("required");
    }
    if (!values.password) {
      errors.password = translateLang("required");
    } else if (values.password.length < 10 || !isValidPassword(values.password)) {
      errors.password = translateLang("password_not_matching");
    }

    if (emailFormat(values.email)) {
      errors.email = translateLang("invalidEmail");
    }
    return errors;
  };

  const onSubmit = async (values: {
    email: string;
    password: string;
    nickname: string;
  }) => {
    try {
      setIsLoading(true);
      const result = await isEmailTaken({ variables: { email: values.email } });
      if (result?.data?.isArtistEmailTaken === false) {
        const payload = {
          email: values.email,
          password: values.password,
          nickname: values.nickname,
          genreIds: [],
        };
        const registeredUser = await artistSignUp({ variables: payload });
        console.log(registeredUser);
        if (registeredUser && registeredUser.data.createArtist) {
          const user = { email: values.email, password: values.password };
          await artistLogin({ variables: user });
        }
      } else {
        NotificationManager.error(translateLang("existingEmail"));
      }
      setIsLoading(false);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      NotificationManager.error(e.message);
    }
  };

  const handleRegisterWithGoogle = async () => {
    try {
      let oauth = await null;
      if (oauth) {
        window.location.href = oauth;
      }
    } catch (e) {
      toast.error("oups");
    }
  };

  const { form, handleSubmit } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
    validate, // a record-level validation function to check all form values
  });

  const nickname = useField("nickname", form);
  const email = useField("email", form);
  const password = useField("password", form);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Stack width="100%" spacing={{ xs: 3, md: 4 }}>
      <ButtonBack />
      <Typography
        variant="title1"
        fontSize="28px"
        lineHeight={"32px"}
        fontWeight="700"
        fontStyle="normal"
        fontFamily={"Overpass"}
        marginBottom="16px"
      >
        {translateLang("stepOneTitle")}
      </Typography>
      <Stack
        onSubmit={handleSubmit}
        component="form"
        spacing={{ xs: 2, md: 3 }}
      >
        {[
          {
            label: translateLang("labelEmail"),
            props: { ...email.input },
            meta: { ...email.meta },
          },
          {
            label: translateLang("labelNickName"),
            props: { ...nickname.input },
            meta: { ...nickname.meta },
          },
          {
            label: translateLang("labelPassword"),
            type: "password",
            props: { ...password.input },
            meta: password.meta,
          },
        ].map((input) => (
          <AppTextField
            error={input.meta.submitFailed && input.meta.error}
            variant="filled"
            helperText={
              input.meta.submitFailed && input.meta.error && input.meta.error
            }
            key={input?.label}
            label={input?.type === "date" ? "" : input?.label}
            type={
              input?.type === "password" && !showPassword ? "password" : "text"
            }
            {...input.props}
            InputProps={{
              endAdornment: input?.type ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ width: "15px", height: "15px" }} />
                    ) : (
                      <Visibility sx={{ width: "15px", height: "15px" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ) : (
                <></>
              ),
            }}
          />
        ))}

        <ButtonPrimary
          loading={isLoading}
          type="submit"
          fullWidth
          size="medium"
        >
          {translateLang("continue")}
        </ButtonPrimary>
      </Stack>
    </Stack>
  );
};
