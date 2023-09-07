import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NotificationManager } from "react-notifications";

import { useBlockchainContext } from "../../../../context";
import { IAuction } from "../../../props/IAuctions";
import { ButtonGradient } from "../../../components/buttons/button-gradient";
import { BidInputModal } from "./bid-input-modal";
import { ROUTES } from "../../../../config/navigation";
import { AUTH_USER } from "../../../../constants";

export const AuctionHeroButtons = ({auction}:{auction: IAuction}) => {
  const { auth } = useBlockchainContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const onBidCreated = () => {
    handleClose();
  }

  const handleBidNow = () => {
    if (auth.authMode !== AUTH_USER) {
      navigate(ROUTES.signIn);
    } else if (auth.phoneNumber) {
      setOpen(true);
    } else {
      NotificationManager.warning("To make a bid you have to provide your phone number. Metamusik will contact the winner directly by phone", "", 10000);
      navigate(ROUTES.account);
    }
  }

  return (
    <Stack sx={{ marginY: 3 }} direction="row" justifyContent={{xs: "center", md: "flex-start"}}>
      <Stack flex={1} spacing={2}>
        <Stack
          direction={"row"}
          alignItems="center"
          spacing={2}
        >
          <Stack
            width="50%"
            height="74px"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Typography sx={{opacity: 0.7, fontWieght: 400, fontSize: "20px"}}>Starting Price</Typography>
            <Typography sx={{fontWieght: 700, fontSize: "24px"}}>€ {auction.startingPrice}</Typography>
          </Stack>
          <Stack
            width="50%"
            height="74px"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Typography sx={{opacity: 0.7, fontWieght: 400, fontSize: "20px"}}>Highest bid</Typography>
            <Typography sx={{fontWieght: 700, fontSize: "24px"}}>
              {auction.highestBid ? `€ ${auction.highestBid}` : 'No bid yet'}
            </Typography>
          </Stack>
        </Stack>
        {auction.status === "OnGoing" && (
          <Stack alignItems="center">
            <Stack marginTop="24px" width="250px">
              <ButtonGradient label="Bid now" onClick={handleBidNow} />
            </Stack>
          </Stack>
        )}
        <BidInputModal
          auctionId={auction._id}
          highestPrice={auction.highestBid}
          startingPrice={auction.startingPrice}
          onClose={handleClose}
          open={open}
          bidCreated={onBidCreated}
        />
      </Stack>
    </Stack>
  );
};
