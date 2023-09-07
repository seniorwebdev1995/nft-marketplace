import React, { ReactNode, useMemo, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Stack,
  Container,
  useMediaQuery
} from "@mui/material";
import PropTypes from "prop-types";
// import { styled } from "@mui/material/styles";
import { LayoutProfile } from "../../layout/pages/layout-profile";
import { IncompleteProfile } from "./components/incomplete-profile";
import { MyCollection } from "./my-collection";
import { MyProfile } from "./my-profile";
// import { Transactions } from "./transactions";
import { theme } from "../../../config/theme";
import { useBlockchainContext } from "../../../context";
import { NewProjectModal } from "./components/new-project-modal";
import { MyAuction } from "./my-auction";
import { Security } from "./security";

interface TabPanelProps {
  children?: ReactNode;
  title: string;
  value: number;
  index: number;
}

const TabPanel = ({ children, title, value, index }: TabPanelProps) => {
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  // const [project, setProject] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleProjectCreated = ({ coverUrl, nickName, projectName }) => {
    setOpen(!open);
    setOpenSuccess(!openSuccess);
  }
  return (
    <Box width="100%" paddingTop={5} hidden={value !== index}>
      {children}

      {index === 0 ? (
        <NewProjectModal projectCreated={handleProjectCreated} onClose={handleClose} open={open} />
      ) : (
        <></>
      )}
    </Box>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export const ArtistAccountScreen = () => {
  const { translateLang, auth } = useBlockchainContext();
  const [value, setValue] = useState(0);
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

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <LayoutProfile>
      {false && <IncompleteProfile />}
      <Container maxWidth="lg">
        <Stack direction="column" minHeight="60vh" paddingTop="40px">
          {profileComplete !== 100 && (
            <Stack
              justifyContent={"center"}
              height="100%"
              sx={{padding: {xs: "0", md: "0 20px"}}}
              marginBottom="24px"
              spacing={3}>
              <Stack
                padding={{xs: "25px 18px", md: "25px 24px"}}
                sx={{
                  background: "#24282C",
                  borderRadius: "8px",
                }}
              >
                <Typography fontSize={{ xs: 14, sm: 18}} fontWeight="700">
                  {translateLang("completeYourProfile")}
                </Typography>
                <Box
                  marginTop="16px"
                  borderRadius="10px"
                  overflow="hidden"
                  sx={{background: "#DDDDDD"}}>
                  <Box sx={{width: `${profileComplete}%`, height: "10px", background: "linear-gradient(93.81deg, #2F98FB 8.44%, #9B4AFA 129.42%);"}}/>
                </Box>
                <Typography
                  marginTop="12px"
                  fontSize={{ xs: 12, sm: 12}}
                  color={theme.palette.content.secondary}>
                  You profile is {profileComplete}% complete
                </Typography>
                <Typography
                  marginTop="12px"
                  fontSize={{ xs: 12, sm: 12}}
                  color={theme.palette.content.secondary}>
                  You cannot create any project and auction and your profile won't be visible until it's 100% completed
                </Typography>
              </Stack>
          </Stack>
          )}
          <Tabs
            orientation="horizontal"
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab
              key="tab1"
              label={translateLang("myProjects")}
              sx={{
                alignItems: "flex-start",
                fontWeight: 700,
                fontSize: "28px",
                textTransform: "none",
                lineHeight: "13px",
              }}
            />
            <Tab
              key="tab2"
              label={translateLang("myAuctions")}
              sx={{
                alignItems: "flex-start",
                fontWeight: 700,
                fontSize: "28px",
                textTransform: "none",
                lineHeight: "13px",
              }}
            />
            <Tab
              key="tab3"
              label={translateLang("profile")}
              sx={{
                alignItems: "flex-start",
                fontWeight: 700,
                fontSize: "28px",
                textTransform: "none",
                lineHeight: "13px",
              }}
            />
            <Tab
              key="tab4"
              label={translateLang("security")}
              sx={{
                alignItems: "flex-start",
                fontWeight: 700,
                fontSize: "28px",
                textTransform: "none",
                lineHeight: "13px",
              }}
            />
          </Tabs>

          <TabPanel
            title={translateLang("myProjects")}
            value={value}
            index={0}
          >
            <MyCollection />
          </TabPanel>
          <TabPanel
            title={translateLang("myAuctions")}
            value={value}
            index={1}
          >
            <MyAuction />
          </TabPanel>
          <TabPanel title={translateLang("profile")} value={value} index={2}>
            <MyProfile />
          </TabPanel>
          <TabPanel title={translateLang("security")} value={value} index={3}>
            <Security />
          </TabPanel>
        </Stack>
      </Container>
    </LayoutProfile>
  );
};
