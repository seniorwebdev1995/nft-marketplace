import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { useBlockchainContext } from "../../../../context";

export const JoinWhyUsList = () => {
  const { translateLang } = useBlockchainContext();

  const items = [
    {
      icon: "/img/thunder.svg",
      title: translateLang("adviseTitle"),
      text: translateLang("adviseText"),
    },
    {
      icon: "/img/setup.svg",
      title: translateLang("setupTitle"),
      text: translateLang("setupText"),
    },
    {
      icon: "/img/disc.svg",
      title: translateLang("fansTitle"),
      text: translateLang("fansText"),
    },
    {
      icon: "/img/people.svg",
      title: translateLang("fundsTitle"),
      text: translateLang("fundsText"),
    },
  ];
  return (
    <Grid container spacing={4}>
      {items.map((item) => {
        return (
          <Grid key={item?.title} item xs={12} sm={6} md={3}>
            <Stack
              key={item.title}
              alignItems={{ xs: "center", sm: "flex-start" }}
              textAlign={{ xs: "center", sm: "left" }}
            >
              <img
                src={item.icon}
                alt=""
                style={{
                  width: "48px",
                  height: "60px",
                  paddingBottom: "12px",
                }}
              />
              <Typography variant={"title2"} marginBottom={1}>
                {item.title}
              </Typography>
              <Typography variant={"body1"}>{item.text}</Typography>
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
};
