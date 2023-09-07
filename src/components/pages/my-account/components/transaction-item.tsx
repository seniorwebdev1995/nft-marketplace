
import React from "react";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import MuiLink from "@mui/material/Link";
import { convertFromISODateWithFormat, styledAddress } from "../../../../utils";

export type ITransactionItem = {
  _id: string,
  createdAt: string,
  nftId: string,
  offerId: string,
  txHash?: string,
  buyerId?: string,
  sellerId?: string,
  buyer?: string,
  seller?: string,
  name: string,
  price: string,
  projectName: string,
  status?: string,
}

export interface TransactionItemProps {
  userId?: string
  data?: ITransactionItem
}

export const TransactionItem = ({data, userId}: TransactionItemProps) => {
  const type = data?.buyerId === userId ? "Purchase" : data?.sellerId === userId ? "Selling" : "-";
  const CompleteStatus = <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#4FFF80" }} />Completed</>;
  const PendingStatus = <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#F7FB2F" }} />Pending</>;
  const ProcessingStatus = <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#F7FB2F" }} />Processing</>;
  const OnSaleStatus = <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#2F98FB" }} />On Sale</>;
  const FailedStatus = <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#F70000" }} />Failed</>;

  const status = (data?.status === 'Idle') ? CompleteStatus :
    (data?.status === 'CreationPending' || data?.status === 'TransferPending') ? PendingStatus :
    (data?.status === 'CreationProcessing') ? ProcessingStatus :
    (data?.status === 'OnSale') ? OnSaleStatus : (data?.status === 'CreationFailed') ? FailedStatus: null;

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      padding="12px"
      sx={{
        width: "100%",
        paddingBottom: "24px",
        borderBottom: "1px solid #25272C",
      }}>
      <Typography width="180px" noWrap={true}>
        {data?.projectName}
      </Typography>
      <Typography width="150px" textAlign="center">
        {data?.name}
      </Typography>
      {data?.txHash ? (
      <MuiLink width="150px" href={`${process.env.REACT_APP_MATIC_URL}/tx/${data?.txHash}`} target="_blank" underline="none">
        <Typography textAlign="center" color="white">
          {styledAddress(data?.txHash)}
        </Typography>
      </MuiLink>
      ): <Typography width="150px"/>}
      <Typography width="150px" textAlign="center">
        {data?.price}
      </Typography>
      <Typography width="150px" textAlign="center">
        {data?.buyer}
      </Typography>
      <Typography width="150px" textAlign="center">
        {data?.seller}
      </Typography>
      <Typography width="150px" textAlign="center">
        {data?.createdAt ? convertFromISODateWithFormat(data.createdAt, "DD/MM/YY HH:mm") : "UNSPECIFIED"}
      </Typography>
      <Typography width="150px" textAlign="center">
        {type}
      </Typography>
      <Typography width="150px" textAlign="center">{status}</Typography>
    </Stack>
  );
};
