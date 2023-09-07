/* eslint-disable no-eval */
import { Container, Box, Stack, Typography, Grid } from "@mui/material";
import { useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, useField } from "react-final-form-hooks";
import { NotificationManager } from "react-notifications";
import { useMutation } from "@apollo/client";

import { useBlockchainContext } from "../../../context";
import { ButtonGradient } from "../../components/buttons/button-gradient";
import { AppTextField } from "../../components/inputs/text";
import { UPDATE_ME } from "../../gql/mutations";
import { isValidPassword } from "../../../utils";

export const Security = () => {
  const { translateLang } = useBlockchainContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword0, setShowPassword0] = useState<boolean>(false);
  const [showPassword1, setShowPassword1] = useState<boolean>(false);

  const [updateMe] = useMutation(UPDATE_ME);

  const validate = (values: any = {}) => {
    const errors: any = {};
    if (!values.currentPassword) {
      errors.currentPassword = translateLang("required");
    }

    if (!values.newPassword) {
      errors.newPassword = translateLang("required");
    } else if (values.newPassword.length < 10 || !isValidPassword(values.newPassword)) {
      errors.newPassword = translateLang("password_not_matching");
    }
    return errors;
  };

  const onSubmit = async (values: {
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      setIsLoading(true);
      const payload = { currentPassword: values.currentPassword, newPassword: values.newPassword };
      const data = await updateMe({ variables: payload });
      if (data && data.data.updateMe) {
        NotificationManager.success("Password changed");
        form.reset();
      };
    } catch (e: any) {
      console.log(e);
      NotificationManager.error("Please try again", e.message);
    }
    setIsLoading(false);
  };

  const { form, handleSubmit } = useForm({
    onSubmit, // the function to call with your form values upon valid submit
    validate,
    initialValues: {
      currentPassword: '',
      newPassword: ''
    } // a record-level validation function to check all form values
  });

  const handleClickShowPassword0 = () => {
    setShowPassword0(!showPassword0);
  };
  const handleMouseDownPassword0 = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleMouseDownPassword1 = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const currentPassword = useField("currentPassword", form);
  const newPassword = useField("newPassword", form);

  return (
    <Container disableGutters sx={{ marginBottom: 4, marginTop: 4 }}>
      <Grid
        container spacing={3}
        alignItems="flex-start"
      >
        <Grid item xs={12} md={7}>
          <Stack spacing={2} onSubmit={handleSubmit} component="form">
            <Typography fontSize={16} fontWeight="700">
              {translateLang("labelPassword")}
            </Typography>
            {[
              {
                label: translateLang("labelOldPassword"),
                type: "password",
                props: { ...currentPassword.input },
                meta: { ...currentPassword.meta },
              },
              {
                label: translateLang("labelNewPassword"),
                type: "password",
                props: { ...newPassword.input },
                meta: { ...newPassword.meta },
              },
            ].map((input, index) =>
              <AppTextField
                error={input.meta.submitFailed && input.meta.error}
                variant="filled"
                helperText={
                  input.meta.submitFailed && input.meta.error && input.meta.error
                }
                key={input?.label}
                label={input?.label}
                type={
                  input?.type === "password" && !eval("showPassword" + index)
                    ? "password"
                    : "text"
                }
                {...input.props}
                InputProps={{
                  endAdornment: input?.type ? (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={eval("handleClickShowPassword" + index)}
                        onMouseDown={eval("handleMouseDownPassword" + index)}
                      >
                        {eval("showPassword" + index) ? (
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
            )}
            <Box>
              <ButtonGradient loading={isLoading} label={translateLang("saveChanges")} />
            </Box>
          </Stack>
          {/* <Stack maxWidth="480px" direction="column" spacing={2}>
            <Typography fontSize={16} fontWeight="700">
              {translateLang("deactivateAccount")}
            </Typography>
            <Typography
              color="rgba(255,255,255,0.7)"
              marginTop="8px"
              lineHeight="150%"
              fontSize={14}>
              {translateLang("deactivateAccountTip")}
            </Typography>
            <Typography
              color="#2F98FB"
              marginLeft="8px"
              fontSize={14}
              fontWeight="900"
              onClick={handleDesactivateAccount}
              sx={{display: "inline-block", cursor: "pointer"}}>
              {translateLang("deactivate")}
            </Typography>
          </Stack> */}
        </Grid>
      </Grid>
    </Container>
  );
};
