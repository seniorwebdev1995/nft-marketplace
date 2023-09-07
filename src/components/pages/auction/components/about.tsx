import { Box, Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { SectionDefault } from "../../../layout/section";
import ReactPlayer from "react-player";
import { SocialLink } from "../../../components/social-link";
import { useBlockchainContext } from "../../../../context";
import { IAuction } from "../../../props/IAuctions";

export const AuctionAbout = ({auction}:{auction:IAuction}) => {
  const { translateLang } = useBlockchainContext();
  
  const artist = auction.artist;
  return (
    <SectionDefault
      title={translateLang("aboutTitle")}
      subtitle={translateLang("theAuction")}
      titleColor={translateLang("#BB6BE0")}
    >
      <Grid
        container
        spacing={10}
        direction={{ xs: "column-reverse", md: "row" }}
      >
        <Grid item xs={5}>
          <Typography paragraph variant="subheader3">
            {auction.description?.split('\\n')[0]}
          </Typography>
          <br />
          <br />
          <Typography paragraph variant="subheader3">
            {auction.description?.split('\\n')[1]}
          </Typography>
          {/* <Typography
            paragraph
            variant="bodyB1"
            marginTop={5}
            marginBottom={4}
            textAlign={{ xs: "center", md: "start" }}
          >
            Follow {artist?.nickname} on
          </Typography>
          <Stack marginY={2} direction="row" alignItems="center" spacing={3}>
            {artist?.socials?.map((social) => SocialLink(social))}
          </Stack> */}
        </Grid>
        {auction.videoURL && (
          <Grid item xs={7}>
            <Box
              sx={{
                height: 370,
                width: "100%",
                borderRadius: "8px",
                zIndex: 10,
                marginTop: "-90px"
              }}
            >
              <ReactPlayer
                width="100%"
                height="100%"
                controls
                style={{
                  zIndex: 1,
                  borderRadius: "80px",
                }}
                url={auction.videoURL}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </SectionDefault>
  );
};
