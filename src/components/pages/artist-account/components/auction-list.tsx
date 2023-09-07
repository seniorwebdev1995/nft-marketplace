import { useMemo, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Stack,
} from "@mui/material";

import { ButtonGradient } from "../../../components/buttons/button-gradient";
import { NoAuctions } from "./no-auctions";
import { useBlockchainContext } from "../../../../context";

import { theme } from "../../../../config/theme";

import { CardNewProject } from "../../../components/card-new-project";
import { NewAuctionSuccessModal } from "./new-auction-success-modal";
import { IAuction } from "../../../props/IAuctions";
import { NewAuctionModal } from "./new-auction-modal";
import { CardAuction } from "../../explore/components/auction-list";


export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface Stats {
  buyers: number;
  sales: number;
  amountUSD: number;
}


type AuctionListProps = {
  auctions: IAuction[];
  prCreated: () => void;
}

export const AuctionList = ({ auctions, prCreated }: AuctionListProps) => {
  const { auth } = useBlockchainContext();
  const profileComplete = useMemo(() => {
    var percentage = 0;
    if (auth) {
      if (auth.nickname) {
        percentage += 20;
      }
      if (auth.biography) {
        percentage += 20;
      }
      if (auth.avatarUrl) {
        percentage += 20;
      }
      if (auth.bannerUrl) {
        percentage += 20;
      }
      if (auth.genres && auth.genres.length > 0) {
        percentage += 20;
      } 
    }
    return percentage;
  }, [auth]);

  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);

  const [coverUrl, setSoverUrl] = useState("");
  const [nickName, setNickName] = useState("");
  const [auctionName, setAuctionName] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSuccess = () => {
    setOpenSuccess(false);
  }

  const handleAuctionCreated = ({ coverUrl, nickName, auctionName }) => {
    setSoverUrl(coverUrl);
    setNickName(nickName);
    setAuctionName(auctionName);

    setOpen(false);
    setOpenSuccess(true);
    prCreated();
  }

  const handleAuctionCreatedOkay = () => {
    setOpenSuccess(false);
  }

  return (
    <Container
      disableGutters
      maxWidth="lg"
      sx={{ marginBottom: 9, marginTop: 3 }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={4}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
          >
            <Typography fontSize={48} fontWeight="700" marginBottom="8px">
              {auth?.auctionRevenue || 0}
            </Typography>
            <Typography
              textTransform={"uppercase"}
              fontSize={12}
              fontWeight="700"
              marginBottom="8px"
              color={"#9BA0B5"}
            >
              EUR made 
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
          >
            <Typography fontSize={48} fontWeight="700" marginBottom="8px">
              {auth?.auctionOnGoingCount || 0}
            </Typography>
            <Typography
              textTransform={"uppercase"}
              fontSize={12}
              fontWeight="700"
              marginBottom="8px"
              color={"#9BA0B5"}
            >
              Ongoing auction(s)
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
          >
            <Typography fontSize={48} fontWeight="700" marginBottom="8px">
              {auth?.auctionFutureCount || 0}
            </Typography>
            <Typography
              textTransform={"uppercase"}
              fontSize={12}
              fontWeight="700"
              marginBottom="8px"
              color={"#9BA0B5"}
            >
              Planned auction(s)
            </Typography>
          </Stack>
        </Grid>
        <Stack
          width="100%"
          alignItems="flex-end"
          marginTop="20px"
        >
          <ButtonGradient
            label="Create auction"
            fullWidth={false}
            disabled={profileComplete !== 100}
            onClick={handleClickOpen}
          />
        </Stack>
      </Grid>
      <Stack marginTop={"20px"}>
        {auctions.length === 0 ? (
          <NoAuctions />
        ) : (
          <Box
            display="grid"
            justifyContent={"center"}
            gridTemplateColumns={{
              xs: "repeat(1, minmax(150px, 1fr))",
              md: "repeat(3, minmax(150px, 1fr))",
            }}
            gap={{ xs: "22px", lg: 5 }}
          >
            {auctions?.map((auction, index) => (
              <CardAuction
                key={auction._id}
                auction={auction}
              />
            ))}
          </Box>
        )}
      </Stack>
      <NewAuctionModal auctionCreated={handleAuctionCreated} onClose={handleClose} open={open} />
      <NewAuctionSuccessModal onClose={handleCloseSuccess} auctionCreated={handleAuctionCreatedOkay} open={openSuccess} coverUrl={coverUrl} nickName={nickName} auctionName={auctionName} />
    </Container>
  );
};
