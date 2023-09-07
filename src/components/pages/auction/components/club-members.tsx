import { Grid } from "@mui/material";
// import { ProjectMembersRanks } from "./club-members-ranks";
import { AuctionMembersList } from "./club-members-list";
import { AuctionMembersInfo } from "./club-members-info";
import { SectionDefault } from "../../../layout/section";
import { IAuction } from "../../../props/IAuctions";

export const AuctionMembers = ({auction}:{auction:IAuction}) => {
  return (
    <SectionDefault subtitle="Bidders">
      {/* <ProjectMembersRanks /> */}
      <Grid container columnSpacing={9}>
        <Grid xs={12} md={7} item>
          <AuctionMembersList auction={auction}/>
        </Grid>
        <Grid md={5} item display={{ xs: "none", md: "block" }}>
          <AuctionMembersInfo auction={auction}/>
        </Grid>
      </Grid>
    </SectionDefault>
  );
};
