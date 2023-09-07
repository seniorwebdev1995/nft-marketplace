import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";

import { theme } from "../../../../config/theme";
import { CardWithNumber } from "../../../components/cards/card-with-number";
import { useBlockchainContext } from "../../../../context";

export interface JoinContactListProps {
  showBtn?: boolean;
}

export const JoinContactList = ({ showBtn = false }: JoinContactListProps) => {
  const { translateLang } = useBlockchainContext();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const Content = [
    {
      number: "1",
      ellipse: "/img/ellipse-blue.svg",
      image: "/img/join/join-1.jpg",
      text: translateLang("contactText1"),
    },
    {
      number: "2",
      ellipse: "/img/ellipse-purple.svg",
      image: "/img/join/join-2.jpg",
      text: translateLang("contactText2"),
    },
    {
      number: "3",
      ellipse: "/img/ellipse-blue.svg",
      image: "/img/join/join-3.jpg",
      text: translateLang("contactText3"),
    },
  ];

  return (
    <Grid container spacing={{ xs: 15, md: 5 }}>
      {Content.map((card, index) => (
        <Grid key={card.number} item xs={12} md={4}>
          <CardWithNumber
            {...card}
            revert={index !== 1 && matches}
            showBtn={showBtn && index === 1 && matches}
          />
        </Grid>
      ))}
    </Grid>
  );
};
