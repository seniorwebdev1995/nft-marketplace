import React from "react";
import { styled, DialogTitle, Dialog, DialogContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";

import { CardNewNft } from "../../../components/card-nft";

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

interface Props {
    open: boolean;
    onClose: () => void;
    auctionCreated: (...args: any[]) => void;
    coverUrl: string;
    nickName: string;
    auctionName: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        maxWidth: "339px",
        textAlign: "center",
        padding: "32px"
    },
    "& .MuiDialogContent-root": {
        padding: theme.spacing(0)
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle
            sx={{
                p: 0,
                m: 0,
                lineHeight: 1,
                fontSize: "28px",
                fontWeight: "700",
                // fontStyle: "Bold",
                fontFamily: "Overpass",
                marginBottom: "30px"
            }}
            {...other}
        >
            {children}
        </DialogTitle>
    );
};

export const NewAuctionSuccessModal = ({ open, onClose, auctionCreated, ...props }: Props) => {
    const handleAuctionCreated = () => {
        auctionCreated()
    }
    return (
        <BootstrapDialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                Auction has been
                successfully created.
            </BootstrapDialogTitle>
            <DialogContent>
                <Stack spacing={3}>
                    <CardNewNft
                        padding={{ xs: "14px 16px 40px", sm: "24px 24px" }}
                        width={{ xs: 225, sm: 225 }}
                        height={{ xs: 279, sm: 279 }}
                        imgHeight={{ xs: 177, sm: 177 }}
                        margin="0 auto"
                        marginBottom="16px"
                        imgSrc={props.coverUrl}
                    >
                        <Stack direction={"row"} spacing={1}>
                            <Stack spacing={1} style={{ textAlign: "left" }}>
                                <Typography variant="p2" fontSize={{ xs: 13, sm: "inherit" }} color="white" style={{
                                    fontSize: "10px",
                                    fontWeight: "400",
                                    textTransform: "uppercase"
                                }}
                                >
                                    {props.nickName ? props.nickName : "Big flo & Oli"}
                                </Typography>
                                <Typography
                                    variant="subheadline"
                                    display="inline-block"
                                    fontSize={{ xs: 15, sm: "inherit" }}
                                    color="white"
                                    noWrap
                                    style={{
                                        marginTop: 0,
                                        fontSize: "14px",
                                        fontWeight: "600",
                                        textTransform: "none"
                                    }}
                                >
                                    {props.auctionName ? props.auctionName : "La vie de reve"}
                                </Typography>
                            </Stack>
                        </Stack>
                    </CardNewNft>
                    <button style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                        marginTop: "32px",
                        padding: "9px 20px",
                        border: "none",
                        borderRadius: "32px",
                        color: "#ffffff",
                        background: "linear-gradient(93.81deg, #2F98FB 8.44%, #9B4AFA 129.42%)"
                    }}
                        onClick={handleAuctionCreated}
                    >ok</button>
                </Stack>
            </DialogContent>
        </BootstrapDialog>
    )
}