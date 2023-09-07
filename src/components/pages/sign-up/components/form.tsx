import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useForm, useField } from "react-final-form-hooks";
import { NotificationManager } from "react-notifications";
import { Box } from "@mui/material";
import MuiLink from "@mui/material/Link";
import { ROUTES } from "../../../../config/navigation";
import { ButtonBack } from "../../../components/buttons/back";
import { AppTextField } from "../../../components/inputs/text";
// import { SignInButtonGroupSocialNetwork } from "../../sign-in/components/button-group-social-network";
import { ButtonPrimary } from "../../../components/buttons/styles";
import { isValidPassword, emailFormat } from "../../../../utils";
import { useBlockchainContext } from "../../../../context";
import { SIGNIN, SIGNUP } from "../../../gql/mutations";
import { IS_EMAIL_TAKEN } from "../../../gql/queries";
import { AUTH_MODE, AUTH_TOKEN, AUTH_REFRESH_TOKEN, AUTH_USER } from "../../../../constants";

export const SignUpForm = () => {
  const navigate = useNavigate();
  const { translateLang } = useBlockchainContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isEmailTaken] = useLazyQuery(IS_EMAIL_TAKEN);
  const [signUp] = useMutation(SIGNUP);
  const [login] = useMutation(SIGNIN, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      localStorage.setItem(AUTH_TOKEN, data.login.authToken.token);
      localStorage.setItem(AUTH_REFRESH_TOKEN, data.login.refreshToken.token);
      localStorage.setItem(AUTH_MODE, AUTH_USER);
      navigate(ROUTES.signUpStep2);
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
      if (result?.data?.isEmailTaken === false) {
        const payload = {
          email: values.email,
          password: values.password,
          nickname: values.nickname,
        };
        const registeredUser = await signUp({ variables: payload });
        if (registeredUser && registeredUser.data.createUser) {
          const user = { email: values.email, password: values.password };
          await login({ variables: user });
        }
      } else {
        NotificationManager.error(translateLang("existingEmail"));
      }
      setIsLoading(false);
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      toast.error(e.message);
    }
  };

  // const handleRegisterWithGoogle = async () => {
  //   try {
  //     let oauth = await null;
  //     if (oauth) {
  //       window.location.href = oauth;
  //     }
  //   } catch (e) {
  //     toast.error("oups");
  //   }
  // };

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

  const nickname = useField("nickname", form);
  const email = useField("email", form);
  const password = useField("password", form);

  return (
    <Stack width="100%" spacing={{ xs: 3, md: 2 }}>
      {/* <ButtonBack /> */}
      <Typography variant="title1">{translateLang("stepOneTitle")}</Typography>
      <Typography variant="p1">{translateLang("stepOneSubtitle")}</Typography>
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
        ))}
        <ButtonPrimary
          loading={isLoading}
          type="submit"
          fullWidth
          size="medium"
        >
          {translateLang("createAccount")}
        </ButtonPrimary>
      </Stack>
      {/* <SignInButtonGroupSocialNetwork
        handleSocialAction={handleRegisterWithGoogle}
      /> */}
    </Stack>
  );
};
