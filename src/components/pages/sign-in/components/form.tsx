import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, useField } from "react-final-form-hooks";
import MuiLink from "@mui/material/Link";
import { NotificationManager } from "react-notifications";

import { AppTextField } from "../../../components/inputs/text";
import { ButtonPrimary } from "../../../components/buttons/styles";
import { Toast } from "../../../components/toast";
import { ROUTES } from "../../../../config/navigation";
import { emailFormat } from "../../../../utils";
import { useBlockchainContext } from "../../../../context";
import { useMutation } from "@apollo/client";
import { SIGNIN } from "../../../gql/mutations";
import { AUTH_MODE, AUTH_TOKEN, AUTH_REFRESH_TOKEN, AUTH_USER } from "../../../../constants";

export const SignInForm = () => {
  const { signInMode } = useParams();
  const navigate = useNavigate();
  const { translateLang } = useBlockchainContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [login] = useMutation(SIGNIN, {
    fetchPolicy: "network-only",
    onError: (error) => {
      console.log(error.message);
      NotificationManager.error(translateLang("invalid_email_password"));
    },
    onCompleted: (data) => {
      if (data?.login) {
        NotificationManager.success(translateLang("sigin_success"));
        localStorage.setItem(AUTH_TOKEN, data.login.authToken.token);
        localStorage.setItem(AUTH_REFRESH_TOKEN, data.login.refreshToken.token);
        localStorage.setItem(AUTH_MODE, AUTH_USER);
        if (signInMode === 'checkout') {
          navigate(-1);
        } else {
          navigate(ROUTES.account);
        }
      }
    },
  });

  const validate = (values: any = {}) => {
    const errors: any = {};
    if (!values.password) {
      errors.password = translateLang("required");
    }
    if (!values.email) {
      errors.email = translateLang("required");
    }
    if (emailFormat(values.email)) {
      errors.email = translateLang("invalidEmail");
    }
    return errors;
  };

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const user = { email: values.email, password: values.password };
      await login({ variables: user });
      setIsLoading(false);
      // let userWallet = new ethers.Wallet(data.privateKey, state.provider);
      // dispatch({
      //     type: "auth",
      //     payload: {
      //         isAuth: true,
      //         name: data.name,
      //         email: data.email,
      //         bio: data.bio,
      //         address: data.address,
      //         privateKey: data.privateKey,
      //         signer: userWallet,
      //     },
      // });
      // axios.defaults.headers.common["Authorization"] = response.data;
      // NotificationManager.success(translateLang("sigin_success"));
      // navigate(ROUTES.account);
    } catch (e: any) {
      setIsLoading(false);
      Toast.error(`Try again!`, e.message);
    }
  };

  const { form, handleSubmit } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
    validate, // a record-level validation function to check all form values
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const email = useField("email", form);
  const password = useField("password", form);

  return (
    <Stack width="100%" spacing={{ xs: 3, md: 2 }}>
      <Typography variant="title1">{translateLang("logIn")}</Typography>
      <Stack
        onSubmit={handleSubmit}
        component="form"
        spacing={{ xs: 3, md: 2 }}
      >
        {[
          {
            label: translateLang("labelEmail"),
            props: { ...email.input },
            meta: { ...email.meta },
          },
          {
            label: translateLang("labelPassword"),
            type: "password",
            props: { ...password.input },
            meta: password.meta,
          },
        ].map((input) => (
          <Box key={input?.label}>
            <AppTextField
              fullWidth
              error={input.meta.submitFailed && input.meta.error}
              variant="filled"
              helperText={
                input.meta.submitFailed && input.meta.error && input.meta.error
              }
              label={input?.type === "date" ? "" : input?.label}
              type={
                input?.type === "password" && !showPassword
                  ? "password"
                  : "text"
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
            <MuiLink href={ROUTES.forgotPassword}>
              {input.type === "password" && (
                <Button
                  variant="text"
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  {"Forgot your password?"}
                </Button>
              )}
            </MuiLink>
          </Box>
        ))}
        <ButtonPrimary
          loading={isLoading}
          type="submit"
          size="large"
          sx={{
            fontSize: { xs: 18 },
          }}
        >
          {translateLang("continue")}
        </ButtonPrimary>
      </Stack>
    </Stack>
  );
};
