import { FollowUsBlock } from "./block";
import { Stack, Typography } from "@mui/material";
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { FollowUsWithNewsletterInput } from "./with-newsletter-input";
import { useBlockchainContext } from "../../../context";

export const FollowUsWithNewsletter = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <FollowUsBlock>
      <Stack alignItems={"center"} sx={{ textAlign: "center" }}>
        <Typography
          marginBottom={3}
          color="#7A3EE0"
          variant="subheadline"
          component="h2"
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              fontSize: 18,
            },
          })}
        >
          {translateLang("titleDefault")}
        </Typography>
        <Typography
          variant="headline1"
          color="#191225"
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              fontSize: 20,
            },
          })}
        >
          {translateLang("subtitleNewsletter")}
        </Typography>
        <MailchimpSubscribe
          url={process.env.REACT_APP_MAILCHIMP_URL}
          render={(props) => {
            const {subscribe, status, message} = props || {};
            return (
              <FollowUsWithNewsletterInput
                status={status}
                message={message}
                onValidated={formData => subscribe(formData)}
              />
            )
          }}
        />
      </Stack>
    </FollowUsBlock>
  );
};
