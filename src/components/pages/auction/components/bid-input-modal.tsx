import React, { useState, useMemo, useEffect } from "react";
import {
  useMediaQuery,
  Typography,
  Box,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  styled,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { NotificationManager } from "react-notifications";
// import { Form, Field } from 'react-final-form';
// import { FieldArray } from 'react-final-form-arrays';
import { useMutation, useSubscription } from "@apollo/client";

import { AppTextField } from "../../../components/inputs/text";
import { ButtonGradient } from "../../../components/buttons/button-gradient";
import { useBlockchainContext } from "../../../../context";
import { theme } from "../../../../config/theme";
import { SUBSCRIBE_BID } from "../../../gql/subscriptions";
import { CREATE_BID } from "../../../gql/mutations";


interface Props {
  auctionId: string;
  open: boolean;
  highestPrice: number;
  startingPrice: number;
  onClose: () => void;
  bidCreated?: (...args: any[]) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    }
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiTabPanel-root": {
    [theme.breakpoints.down('sm')]: {
      paddingBottom: "19px"
    }
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 3,
        fontSize: "24px",
        fontStyle: "Bold",
        fontFamily: "Overpass",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 20,
            top: 20,
            color: (theme) => theme.palette.grey[100],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};


export const BidInputModal = ({ auctionId, highestPrice, startingPrice, open, onClose, bidCreated }: Props) => {

  const { translateLang } = useBlockchainContext();
  const {data} = useSubscription(SUBSCRIBE_BID, {
    variables: {auctionId}
  });
  const mediumViewport = useMediaQuery(theme.breakpoints.down("md"));
  const [highestBid, setHighestBid] = useState(highestPrice || startingPrice);
  
  const defaultPrice = useMemo(() => {
    if (!highestPrice) {
      return startingPrice;
    }
    return highestPrice + 200;
  }, [startingPrice, highestPrice]);

  const [amount, setAmount] = useState('');

  const showWarning = useMemo(() => {
    const _amount = Number(amount);
    if (_amount < defaultPrice) {
      return true;
    }
    return false;
  }, [amount, defaultPrice]);

  const [createBid] = useMutation(CREATE_BID);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    setAmount(defaultPrice.toString());
  }, [defaultPrice]);

  useEffect(() => {
    if (data) {
      const bidInfo = data.subscribeToBidAdded?.bid;
      bidInfo && setHighestBid(bidInfo.amount);
    }
  }, [data]);

  const handleChangeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length <= 7) {
      setAmount(event.target.value);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const variables = {auctionId, amount: Number(amount)};
      console.log(variables);
      await createBid({variables});
      NotificationManager.success('Successfully created');
      bidCreated && bidCreated();
    } catch (e: any) {
      NotificationManager.error(e.message);
    }
    setIsLoading(false);
  };

  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Make a bid
      </BootstrapDialogTitle>
      <DialogContent>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Stack spacing={3}>
            <Stack spacing={3}>
              <Stack spacing={2}>
                <Typography sx={{opacity: 0.7, fontWieght: 400, fontSize: "14px"}}>Current Bid</Typography>
                <Typography sx={{fontWieght: 700, fontSize: "16px"}}>
                  {highestBid ? `€ ${highestBid}` : 'No bid yet'}
                </Typography>
              </Stack>
            </Stack>
            <Stack spacing={2}>
              <Stack alignItems="start">
                <TextField
                  fullWidth
                  label={translateLang("amount")}
                  variant="standard"
                  type="number"
                  value={amount}
                  onChange={handleChangeAmount}
                />
                <Typography sx={{marginTop: "6px", opacity: 0.7, fontWieght: 400, fontSize: "13px", color: showWarning ? '#FF3349' : 'white'}}>
                  Your bid should be at least 200e above the latest bid
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Stack alignItems="end" marginTop={"24px"}>
            <ButtonGradient
              fullWidth={mediumViewport && true}
              loading={isLoading}
              disabled={showWarning}
              label={"Create Bid"}
              onClick={handleSubmit}
            />
          </Stack>
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
};
