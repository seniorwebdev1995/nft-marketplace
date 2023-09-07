import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import RCountdown from "react-countdown";

import { theme } from "../../../../config/theme";
import { useBlockchainContext } from "../../../../context";
import { IProject } from "../../../props/IProject";

export const NextLaunchCard = ({data} : {data:IProject}) => {
  const mediumViewport = useMediaQuery(theme.breakpoints.down("md"));
  const { translateLang } = useBlockchainContext();

  return (
    <Box
      padding={"16px 0 16px 0"}
      position="relative"
      overflow="hidden"
      sx={{        
        borderBottom: "1px solid #343944"
      }}
    >
      <Stack direction="row">
        <img width={mediumViewport ? "100px" : "150px"} height={mediumViewport ? "66px" : "100px"} src={data?.coverUrl} />
        <Stack 
          flex={1}
          sx={{ position: "relative" }}
          direction={{xs: "column", md: "row"}}
          alignItems={{md:"center"}}
          justifyContent="space-between"
          marginLeft={{xs: 2, md: 4}}
          spacing={{xs: 1, md: 2}}>
          <Box>
            <Stack spacing={1} direction={"row"} alignItems="center">
              <Box width="8px" height="8px" bgcolor="white" borderRadius="4px"/>
              <Typography fontSize={{xs: "14px", md: "16px"}} color="rgba(255,255,255,0.4)">
                {translateLang("account.tokensLeft")}
              </Typography>
            </Stack>
            <Stack maxWidth="400px" marginTop={2}>
              <Typography fontSize={{xs: "16px", md: "17px"}}>{data?.artist?.nickname} - {data?.name}</Typography>
            </Stack>
          </Box>
          <RCountdown
            date={Date.now() + 1000 * 60 * 60 * 60}
            renderer={({
              days,
              hours,
              minutes,
            }: {
              days: number;
              hours: number;
              minutes: number;
            }) => (
              <Typography fontSize={{xs: "14px", md: "16px"}}>{`${days}${translateLang("time.sdays")} ${hours}${translateLang("time.shours")} ${minutes}`}{translateLang("time.smins")}</Typography>
            )}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
