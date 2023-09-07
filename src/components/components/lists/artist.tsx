import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { IArtist } from "../../props/IArtist";
import { CardArtist } from "../cards/artist";

interface Props {
  data?:IArtist[];
  explore?: boolean;
}

export const ListArtist = ({ data = [], explore = false }: Props) => {
  if (data.length === 0) {
    return (
      <Stack sx={{width: "100%", height: 200, alignItems: "center", justifyContent: "center"}}>
        <Typography variant="typography3">There is no artist</Typography>
      </Stack>
    )
  }
  return (
    <Grid
      container
      rowSpacing={{ xs: 5, md: 10 }}
      columnSpacing={{ xs: 4, md: 8 }}
      flexWrap={explore ? undefined : { xs: "nowrap", md: "wrap" }}
      overflow={explore ? undefined : { xs: "auto", md: "hidden" }}
      sx={
        explore
          ? undefined
          : {
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }
      }
    >
      {data.map((artist, index) => (
        <Grid
          minWidth={{ xs: "370px", md: undefined }}
          item
          md={4}
          xs={12}
          key={index}
        >
          <CardArtist {...artist} />
        </Grid>
      ))}
    </Grid>
  );
};
