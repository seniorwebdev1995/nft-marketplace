import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useBlockchainContext } from "../../../../context";

import { JoinSafetyBackground } from "./safety-background";

export const JoinSafety = () => {
  const { translateLang } = useBlockchainContext();

  const iconGroup = [
    { icon: "/img/secure.svg", text: translateLang("joinSecure") },
    { icon: "/img/cb.svg", text: translateLang("joinGreen") },
    { icon: "/img/wallet.svg", text: translateLang("joinWallet") },
  ];

  return (
    <JoinSafetyBackground>
      <Stack
        marginBottom={{ xs: 4, md: 2 }}
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <Typography component="span" variant={"headline1"} color="primary.main">
          {translateLang("safety")}
        </Typography>
        <Typography component="span" variant={"headline1"}>
          {translateLang("first")}
        </Typography>
      </Stack>
      <Typography
        variant={"typography7"}
        marginBottom={{ xs: 11, md: 4 }}
        maxWidth={{ xs: 325, md: 840 }}
        textAlign={"center"}
      >
        {translateLang("safetyDescription")}
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyItems="center"
        spacing={"40px"}
      >
        {iconGroup.map((item) => {
          return (
            <Stack
              direction={"row"}
              spacing={2}
              alignItems="center"
              key={item.text}
            >
              <img
                src={item.icon}
                alt=""
                style={{ width: "36px", height: "36px" }}
              />
              <Typography variant={"body1"}>{item.text}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </JoinSafetyBackground>
  );
};
