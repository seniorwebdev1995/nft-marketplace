import {useEffect, useState} from "react";
import { NotificationManager } from "react-notifications";
import Stack from "@mui/material/Stack";
import Input from "@mui/material/Input";
import { LoadingButton } from "@mui/lab";

import { useBlockchainContext } from "../../../context";
import { emailFormat } from "../../../utils";

type INewsLetterProps = {
  status: string;
  message: string;
  onValidated: (formData: any) => void;
};

export const FollowUsWithNewsletterInput = ({status, message, onValidated}: INewsLetterProps) => {
  const { translateLang } = useBlockchainContext();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'success') {
      NotificationManager.success(translateLang("success"), translateLang("followUs.success"));
      setLoading(false);
      setEmail('');
    } else if (status === 'error') {
      NotificationManager.error(message);
      setLoading(false);
    }
  }, [status, message, translateLang]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const validateEmail = (email: string) => {
    var errorEmail = "";
    if (!email) {
      errorEmail = translateLang("invalidEmail");
    }
    if (emailFormat(email)) {
      errorEmail = translateLang("invalidEmail");
    }
    return errorEmail;
  };

  const onJoin = async () => {
    const errorEmail = validateEmail(email);
    if (errorEmail !== "") {
      NotificationManager.error(errorEmail);
      return;
    }
    setLoading(true);
    onValidated({EMAIL: email});
  };

  return (
    <Stack
      sx={{
        background: "#CBC9CF",
      }}
      marginTop={{ xs: 3, md: 7 }}
      marginBottom={{ xs: 3, md: 12 }}
      padding={1}
      borderRadius={"12px"}
      maxWidth={580}
      width="100%"
      direction="row"
      alignItems="center"
      spacing={2}
    >
      <Input
        placeholder="Type your email here"
        aria-placeholder="Type your email here"
        disableUnderline
        value={email}
        onChange={handleChange}
        sx={{
          color: "#574E65",
          marginLeft: 2,
          flex: 1,
        }}
      />
      <LoadingButton
        variant="contained"
        disableElevation
        loading={loading}
        onClick={onJoin}
        sx={{ borderRadius: "8px", color: "white" }}
      >
        {translateLang("subscribeBtn")}
      </LoadingButton>
    </Stack>
  );
};
