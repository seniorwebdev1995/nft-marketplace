import Stack from "@mui/material/Stack";
import { useBlockchainContext } from "../../../../context";

import { CardWithNumber } from "../../../components/cards/card-with-number";

export const HomeHowItWorksDesktop = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <Stack
      display={{ xs: "none", md: "flex" }}
      direction="row"
      spacing={10}
      alignItems="center"
    >
      <Stack spacing={15}>
        <CardWithNumber
          number="1"
          ellipse="/img/ellipse-blue.svg"
          image="/img/join/join-1.jpg"
          text={translateLang("contactText1")}
        />
        <CardWithNumber
          number="3"
          ellipse="/img/ellipse-blue.svg"
          image="/img/join/join-3.jpg"
          text={translateLang("contactText3")}
        />
      </Stack>
      <CardWithNumber
        number="2"
        ellipse="/img/ellipse-purple.svg"
        image="/img/join/join-2.jpg"
        text={translateLang("contactText2")}
      />
    </Stack>
  );
};
