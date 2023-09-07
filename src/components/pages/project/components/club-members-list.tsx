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
import { IProject } from "../../../props/IProject";
import { convertFromISODateWithFormat, styledAddress } from "../../../../utils";

const MAX = 20;
const STEP = 4;

export const ProjectMembersList = ({project}:{project: IProject}) => {
  const [length, setLength] = React.useState(STEP);
  const transactions = project.transactions;

  const handleShowMore = () => {
    setLength((prev) => {
      return Math.min(prev + STEP, MAX);
    });
  };

  return (
    <Stack spacing={3}>
      {transactions.length === 0 && (
      <Stack sx={{width: "100%", height: 200, alignItems: "center", justifyContent: "center"}}>
        <Typography variant="typography3">There is no buyers yet. Be the first one!</Typography>
      </Stack>
      )}
      <List disablePadding>
        <TransitionGroup>
          {transactions
            .map((item, idx) => (
              <Collapse key={idx}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src={item.buyer?.avatarUrl} />
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
                        <Box>{item.buyer?.nickname}</Box>
                        <Box sx={{textAlign: "right"}}>{item.nft?.name}</Box>
                      </Stack>
                    }
                    secondary={
                      <Stack
                        direction="row"
                        alignItems={"center"}
                        justifyContent="space-between"
                      >
                          <MuiLink href={`${process.env.REACT_APP_MATIC_URL}/tx/${item.txHash}`} target="_blank" underline="none">
                            <Box color="white">{styledAddress(item?.txHash)}</Box>
                          </MuiLink>
                        <Box>{convertFromISODateWithFormat(item.createdAt, "DD/MM/YY HH:mm")}</Box>
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
