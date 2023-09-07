import { Box, Stack, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import RCountdown from "react-countdown";

import { NftProjectHeroImg } from "./hero-img";
import { AuctionHeroButtons } from "./hero-buttons";
import { NftProjectHeroTitle } from "./hero-title";
import { IAuction } from "../../../props/IAuctions";
import { NftProjectHeroDate } from "./hero-date";
import { useBlockchainContext } from "../../../../context";

export const AuctionHero = ({auction}:{auction: IAuction}) => {
  const {translateLang} = useBlockchainContext();
  const status = auction.status === "Future" ? "Auction planned" : auction.status === "OnGoing" ? "Auction ongoing" : "Auction ended"
  const statusColor = auction.status === "Future" ? "#F7FB2F" : auction.status === "OnGoing" ? "#4FFF80" : "#F70000"

  return (
    <Container component="section" sx={{ marginBottom: 8, paddingBottom: 0 }}>
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 5 }}
      >
        <Grid item xs={12} md={6} sx={{ marginTop: { xs: 3, md: 11 } }}>
          <NftProjectHeroTitle title={auction.name} description={auction.description} coverImageUrl={auction.coverUrl} artist={auction.artist} />
          <Stack sx={{ marginY: 3 }} direction="row" alignItems="center" spacing={1}>
            <Box
              sx={{
                width: "6px",
                height: "6px",
                borderRadius: "6px",
                backgroundColor: `${statusColor}`
              }}/>
            <Typography sx={{fontWeight: 600, fontSize: "15px"}}>{status}</Typography>
          </Stack>
          <Divider sx={{ marginY: 3 }} />
          <NftProjectHeroDate releaseDate={auction.startDate} endDate={auction.endDate}/>
          <AuctionHeroButtons auction={auction}/>
          {auction.status === "OnGoing" && (
            <Stack sx={{ marginY: 3 }} spacing={1} alignItems={{ xs: "center", md: "flex-start" }}>
              <Typography color="rgba(255, 255, 255, 0.8)">
                Time Left
              </Typography>
              <RCountdown
                date={new Date(auction.endDate)}
                renderer={({
                  days,
                  hours,
                  minutes,
                  seconds,
                }: {
                  days: number;
                  hours: number;
                  minutes: number;
                  seconds: number;
                }) => (
                  <Stack direction="row" spacing="6px">
                    {days > 0 && (
                    <>
                      <Typography
                        variant="subheadline"
                        fontSize={15}
                        color="primary.main"
                      >
                        {days}
                      </Typography>
                      <Typography
                        variant="subheadline"
                        fontSize={15}
                        color="white"
                      >
                        {translateLang("sdays")}
                      </Typography>
                    </>
                    )}
                    <Typography
                      variant="subheadline"
                      fontSize={15}
                      color="primary.main"
                    >
                      {hours}
                    </Typography>
                    <Typography
                      variant="subheadline"
                      fontSize={15}
                      color="white"
                    >
                      {translateLang("shours")}
                    </Typography>
                    <Typography
                      variant="subheadline"
                      fontSize={15}
                      color="primary.main"
                    >
                      {minutes}
                    </Typography>
                    <Typography
                      variant="subheadline"
                      fontSize={15}
                      color="white"
                    >
                      {translateLang("smins")}
                    </Typography>
                    <Typography
                      variant="subheadline"
                      fontSize={15}
                      color="primary.main"
                    >
                      {seconds}
                    </Typography>
                    <Typography
                      variant="subheadline"
                      fontSize={15}
                      color="white"
                    >
                      {translateLang("seconds")}
                    </Typography>
                  </Stack>
                )}
              />
            </Stack>
          )}
          <Divider sx={{ marginY: 3 }} />
        </Grid>
        <Grid display={{ xs: "none", md: "block" }} item xs={12} md={6}>
          <NftProjectHeroImg imageUrl={auction.coverUrl} />
        </Grid>
      </Grid>
    </Container>
  );
};
