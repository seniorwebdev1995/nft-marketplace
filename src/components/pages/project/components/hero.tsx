import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { IProject } from "../../../props/IProject";

import { NftProjectHeroImg } from "./hero-img";
import { NftProjectHeroButtons } from "./hero-buttons";
import { NftProjectHeroTitle } from "./hero-title";
// import { NftProjectHeroDate } from "./hero-date";

export const NftProjectHero = ({project}:{project:IProject}) => {
  return (
    <Container component="section" sx={{ marginBottom: 8, paddingBottom: 0 }}>
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 5 }}
      >
        <Grid item xs={12} md={6} sx={{ marginTop: { xs: 3, md: 11 } }}>
          <NftProjectHeroTitle title={project.name} description={project.description} coverImageUrl={project.coverUrl} artist={project.artist} />
          <Divider sx={{ marginY: 3 }} />
          {/* <NftProjectHeroDate releaseDate={project.releaseDate} endDate={project.endDate}/>
          <Divider sx={{ marginY: 3 }} /> */}
          <NftProjectHeroButtons id={project._id} artist={project.artist} />
        </Grid>
        <Grid display={{ xs: "none", md: "block" }} item xs={12} md={6}>
          <NftProjectHeroImg imageUrl={project.coverUrl} />
        </Grid>
      </Grid>
    </Container>
  );
};
