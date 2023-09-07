import { useMemo } from "react";
import { Box, Stack, Card, CardMedia, Typography } from "@mui/material";
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { styled } from "@mui/material/styles";
import MuiLink from "@mui/material/Link";
import { ROUTES } from "../../../../config/navigation";
import { IAuction } from "../../../props/IAuctions";
import { SectionDefault } from "../../../layout/section";
import { useBlockchainContext } from "../../../../context";
import { convertFromISODateWithFormat } from "../../../../utils";
import { AUTH_ARTIST } from "../../../../constants";

interface Props {
  data?: IAuction[];
}

const CardBorder = styled(Box)(
  () => ({
    borderRadius: "4px",
    padding: "2px",
    overflow: "hidden",
    background: "linear-gradient(153.71deg, #5F5F5F 1.03%, #9DB7C9 51.87%, #705BC5 106.43%);",
  })
);

export const CardAuction = ({auction}: {auction: IAuction}) => {
  const {auth} = useBlockchainContext();
  const isArtist = auth.authMode === AUTH_ARTIST;
  return (
    <MuiLink
      href={`${ROUTES.auction}${auction._id}`}
      sx={{color: "white", textDecoration: "none"}}
    >
      <CardBorder
        marginBottom={3}
        color="white"
      >
        <Card>
          <CardMedia
            component="img"
            height="228px"
            src={auction.coverUrl || "/img/author/author-9.jpg"}
          />
          <Stack
            sx={{
              padding: "16px",
              background: "linear-gradient(110.56deg, rgba(255, 255, 255, 0.5) 2.43%, rgba(255, 255, 255, 0.5) 54.82%, rgba(204, 200, 196, 0) 106.69%);"
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <CalendarTodayOutlinedIcon sx={{fontSize: 16}} />
              <Typography sx={{fontSize: "14px", fontWeight: 400}}>
                {convertFromISODateWithFormat(auction.startDate, "DD/MM/YY HH:mm")} - {convertFromISODateWithFormat(auction.endDate, "DD/MM/YY HH:mm")}
              </Typography>
            </Stack>
            <Typography sx={{marginTop: "16px", fontSize: " 24px", fontWeight: 700}} noWrap>{auction.name}</Typography>
            <Stack direction="row" justifyContent="space-between" marginTop="16px">
              <Stack spacing="4px">
                <Typography sx={{fontSize: "28px", fontWeight: 700}}>{auction.startingPrice}</Typography>
                <Typography sx={{fontSize: "12px", fontWeight: 400}}>Starting Price (EUR)</Typography>
              </Stack>
              <Stack width="40%" spacing="4px">
                <Typography sx={{fontSize: "28px", fontWeight: 700}}>{auction.bids.length}</Typography>
                <Typography sx={{fontSize: "12px", fontWeight: 400}}>Number of Bids</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" marginTop="16px" height="49px">
              {auction.highestBid > 0 && (
                <Stack spacing="4px">
                  <Typography sx={{fontSize: "28px", fontWeight: 700}}>{auction.highestBid}</Typography>
                  <Typography sx={{fontSize: "12px", fontWeight: 400}}>Highest Bid (EUR)</Typography>
                </Stack>
              )}
              {isArtist && (
                <Stack width="40%" spacing="4px">
                  <Typography sx={{fontSize: "28px", fontWeight: 700}}>{auction.status || 0}</Typography>
                  <Typography sx={{fontSize: "12px", fontWeight: 400}}>Status</Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Card>
      </CardBorder>
    </MuiLink>
  )
}

export const ExploreAuctionList = ({ data }: Props) => {
  const {translateLang} = useBlockchainContext();
  const plannedList = useMemo(() => data?.filter((item) => item.status === 'Future'), [data]);

  const ongoingList = useMemo(() => data?.filter((item) => item.status === 'OnGoing'), [data]);

  const pastList = useMemo(() => data?.filter((item) => item.status === 'Past'), [data]);

  if (data?.length === 0) {
    return (
      <Stack sx={{width: "100%", height: 200, alignItems: "center", justifyContent: "center"}}>
        <Typography variant="typography3">There is no auctions</Typography>
      </Stack>
    )
  }

  return (
    <>
      {plannedList && plannedList.length > 0 && (
        <SectionDefault subtitle={translateLang("plannedAuction")}>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 270px)",
              // mobile: "repeat(2, minmax(150px, 275px))",
              sm: "repeat(3, minmax(150px, 275px))",
              md: "repeat(4, minmax(150px, 1fr))",
            }}
            justifyContent="center"
            gap={{ xs: 3, mobile: 4, sm: 5 }}
          >
            {plannedList?.map((auction, index) => (
              <CardAuction
                key={auction._id}
                auction={auction}
              />
            ))}
          </Box>
        </SectionDefault>
      )}
      {ongoingList && ongoingList.length > 0 && (
        <SectionDefault subtitle={translateLang("ongoingAuction")}>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 270px)",
              // mobile: "repeat(2, minmax(150px, 275px))",
              sm: "repeat(3, minmax(150px, 275px))",
              md: "repeat(4, minmax(150px, 1fr))",
            }}
            justifyContent="center"
            gap={{ xs: 3, mobile: 4, sm: 5 }}
          >
            {ongoingList?.map((auction, index) => (
              <CardAuction
                key={auction._id}
                auction={auction}
              />
            ))}
          </Box>
        </SectionDefault>
      )}
      {pastList && pastList.length > 0 && (
        <SectionDefault subtitle={translateLang("passedAuction")}>
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: "repeat(1, 270px)",
              // mobile: "repeat(2, minmax(150px, 275px))",
              sm: "repeat(3, minmax(150px, 275px))",
              md: "repeat(4, minmax(150px, 1fr))",
            }}
            justifyContent="center"
            gap={{ xs: 3, mobile: 4, sm: 5 }}
          >
            {pastList?.map((auction, index) => (
              <CardAuction
                key={auction._id}
                auction={auction}
              />
            ))}
          </Box>
        </SectionDefault>
      )}
    </>
  );
};
