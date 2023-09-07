import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useBlockchainContext } from "../../../../context";

export const HomeBenefits = () => {
  const { translateLang } = useBlockchainContext();

  const items = [
    {
      icon: "img/setup.svg",
      title: translateLang("benefitsEventsTitle"),
      text: translateLang("benefitsEventsText"),
    },
    {
      icon: "img/disc.svg",
      title: translateLang("benefitsDigitalTitle"),
      text: translateLang("benefitsDigitalText"),
    },
    {
      icon: "img/people.svg",
      title: translateLang("benefitsPrivateTitle"),
      text: translateLang("benefitsPrivateText"),
    },
    {
      icon: "img/dress.svg",
      title: translateLang("benefitsMerchandizingTitle"),
      text: translateLang("benefitsMerchandizingText"),
    },
  ];
  return (
    <Container sx={{ marginBottom: 15 }}>
      <Typography
        component="h3"
        variant={"headline3"}
        textAlign={{ xs: "center", sm: "left" }}
        sx={(theme) => ({
          [theme.breakpoints.down("sm")]: {
            fontSize: 25,
          },
        })}
      >
        {translateLang("benefitsTitle")}
      </Typography>

      <Grid container spacing={4} marginTop={{ xs: 4, sm: 8 }}>
        {items.map((item) => {
          return (
            <Grid key={item.title} item xs={12} sm={6} lg={3}>
              <Stack
                maxWidth={300}
                marginX={{ xs: "auto", sm: 0 }}
                alignItems={{ xs: "center", sm: "flex-start" }}
                textAlign={{ xs: "center", sm: "left" }}
              >
                <img
                  src={item.icon}
                  alt={`${item?.title} icon`}
                  height={48}
                />
                <Typography
                  variant={"title2"}
                  marginTop={2}
                  marginBottom={1}
                  sx={(theme) => ({
                    [theme.breakpoints.down("sm")]: {
                      fontSize: 22,
                    },
                  })}
                >
                  {item.title}
                </Typography>
                <Typography variant={"body1"}>{item.text}</Typography>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
