import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

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

export const TransactionItemMobile = ({ data, userId }: TransactionItemProps) => {
    const type = data?.buyerId === userId ? "Purchase" : data?.sellerId === userId ? "Selling" : "-";
    const CompleteStatus = <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#4FFF80" }} />Completed</>;
    const PendingStatus = <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#F7FB2F" }} />Pending</>;
    const ProcessingStatus = <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#F7FB2F" }} />Processing</>;
    const OnSaleStatus = <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#2F98FB" }} />On Sale</>;
    const FailedStatus = <><span style={{ display: "inline-block", marginRight: "5px", marginBottom: "3px", height: "6px", width: "6px", borderRadius: "6px", background: "#F70000" }} />Failed</>;

    const status = (data?.status === 'Idle') ? CompleteStatus :
        (data?.status === 'CreationPending' || data?.status === 'TransferPending') ? PendingStatus :
            (data?.status === 'CreationProcessing') ? ProcessingStatus :
                (data?.status === 'OnSale') ? OnSaleStatus : (data?.status === 'CreationFailed') ? FailedStatus : null;

    return (
        <Stack
            sx={{
                fontFamily: "Overpass",
                paddingTop: "16px",
                paddingBottom: "20px",
                paddingLeft: "16px",
                paddingRight: "16px",
                width: "100%",
                background: "#24282C",
                border: "1px solid #1A1E25",
                borderRadius: "8px",
                marginBottom: "24px"
            }}
        >
            <h5
                style={{
                    color: "#ffffff",
                    lineHeight: "24px",
                    fontSize: "14px",
                    fontWeight: "700",
                    fontStyle: "normal",
                    marginBottom: "4px"
                }}>
                {data?.name}
            </h5>
            <hr style={{
                border: "1px solid #515765",
                margin: 0
            }} />

            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                    marginTop: "12px",
                    paddingBottom: "7px"
                }}
            >
                <Typography
                    sx={{
                        color: "#9F9CAA",
                        fontWeight: "900",
                        fontSize: "12px",
                        lineHeight: "13px",
                        letterSpacing: "0.4px",
                        textTransform: "uppercase"
                    }}
                >TRANSACTION ID</Typography>
                <Typography
                    sx={{
                        color: "##E1DFE6",
                        fontFamily: "Roboto",
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "150%",
                        letterSpacing: "0.4px"
                    }}
                >{styledAddress(data?.txHash)}</Typography>
            </Stack>

            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                    paddingTop: "7px",
                    paddingBottom: "7px"
                }}

            >
                <Typography
                    sx={{
                        color: "#9F9CAA",
                        fontWeight: "900",
                        fontSize: "12px",
                        lineHeight: "13px",
                        letterSpacing: "0.4px",
                        textTransform: "uppercase"
                    }}
                >amount</Typography>
                <Typography
                    sx={{
                        color: "##E1DFE6",
                        fontFamily: "Roboto",
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "150%",
                        letterSpacing: "0.4px",
                    }}
                >${data?.price}</Typography>
            </Stack>

            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                    paddingTop: "7px",
                    paddingBottom: "7px"
                }}

            >
                <Typography
                    sx={{
                        color: "#9F9CAA",
                        fontWeight: "900",
                        fontSize: "12px",
                        lineHeight: "13px",
                        letterSpacing: "0.4px",
                        textTransform: "uppercase"
                    }}
                >buyer</Typography>
                <Typography
                    sx={{
                        color: "##E1DFE6",
                        fontFamily: "Roboto",
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "150%",
                        letterSpacing: "0.4px",
                    }}
                >{data?.buyer}</Typography>
            </Stack>

            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                    paddingTop: "7px",
                    paddingBottom: "7px"
                }}

            >
                <Typography
                    sx={{
                        color: "#9F9CAA",
                        fontWeight: "900",
                        fontSize: "12px",
                        lineHeight: "13px",
                        letterSpacing: "0.4px",
                        textTransform: "uppercase"
                    }}
                >seller</Typography>
                <Typography
                    sx={{
                        color: "##E1DFE6",
                        fontFamily: "Roboto",
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "150%",
                        letterSpacing: "0.4px",
                    }}
                >{data?.seller}</Typography>
            </Stack>

            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                    paddingTop: "7px",
                    paddingBottom: "7px"
                }}

            >
                <Typography
                    sx={{
                        color: "#9F9CAA",
                        fontWeight: "900",
                        fontSize: "12px",
                        lineHeight: "13px",
                        letterSpacing: "0.4px",
                        textTransform: "uppercase"
                    }}
                >type</Typography>
                <Typography
                    sx={{
                        color: "##E1DFE6",
                        fontFamily: "Roboto",
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "150%",
                        letterSpacing: "0.4px",
                    }}
                >{type}</Typography>
            </Stack>

            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                    paddingTop: "7px",
                    paddingBottom: 0
                }}

            >
                <Typography
                    sx={{
                        color: "#9F9CAA",
                        fontWeight: "900",
                        fontSize: "12px",
                        lineHeight: "13px",
                        letterSpacing: "0.4px",
                        textTransform: "uppercase"
                    }}
                >status</Typography>
                <Typography
                    sx={{
                        color: "##E1DFE6",
                        fontFamily: "Roboto",
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "150%",
                        letterSpacing: "0.4px",
                    }}
                >{status}</Typography>
            </Stack>
        </Stack>
    )
}