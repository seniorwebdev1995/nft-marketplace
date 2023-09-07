import {useMemo} from "react";
import { theme } from "../../../../config/theme";
import { Box, Typography, Collapse, Stack } from "@mui/material";
import MuiLink from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import React from "react";
import { TransitionGroup } from "react-transition-group";
import { convertFromISODateWithFormat, styledAddress } from "../../../../utils";
import { IAuction } from "../../../props/IAuctions";

const MAX = 20;
const STEP = 4;

export const AuctionMembersList = ({auction}:{auction: IAuction}) => {
  const [length, setLength] = React.useState(STEP);
  const transactions = useMemo(() => {
    const _reversedBids = [...auction.bids];
    return _reversedBids.reverse();
  },[auction])

  const handleShowMore = () => {
    setLength((prev) => {
      return Math.min(prev + STEP, MAX);
    });
  };

  return (
    <Stack spacing={3}>
      {transactions.length === 0 && (
      <Stack sx={{width: "100%", height: 200, alignItems: "center", justifyContent: "center"}}>
        <Typography variant="typography3">No bidder yet!</Typography>
      </Stack>
      )}
      <List disablePadding>
        <TransitionGroup>
          {transactions
            .map((item, idx) => (
              <Collapse key={idx}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={item.bidder?.avatarUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    // @ts-ignore
                    primaryTypographyProps={{
                      marginBottom: 1,
                      ...theme.typography.bodyB1,
                    }}
                    // @ts-ignore
                    secondaryTypographyProps={{
                      color: "rgba(255, 255, 255, 0.8)",
                      ...theme.typography.body2,
                    }}
                    primary={
                      <Stack
                        direction="row"
                        alignItems={"center"}
                        justifyContent="space-between"
                      >
                        <Box>{item.bidder?.nickname}</Box>
                        <Box sx={{textAlign: "right"}}>€ {item.amount}</Box>
                      </Stack>
                    }
                    secondary={
                      <Stack
                        direction="row"
                        alignItems={"center"}
                        justifyContent="space-between"
                      >
                        <Box>{convertFromISODateWithFormat(item.date || "", "DD/MM/YY HH:mm")}</Box>
                      </Stack>
                    }
                  />
                </ListItem>
              </Collapse>
            ))}
        </TransitionGroup>
      </List>
      {/* {length < MAX && (
        <Button
          sx={{
            alignSelf: "center",
            background: "rgba(87, 78, 101, 1)",
            width: 175,
            color: "white",
          }}
          onClick={handleShowMore}
        >
          View more
        </Button>
      )} */}
    </Stack>
  );
};
