import React, { ReactNode, useEffect, useState } from "react";
import { Tabs, Tab, Stack, Container, useMediaQuery, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { LayoutProfile } from "../../layout/pages/layout-profile";
import { IncompleteProfile } from "./components/incomplete-profile";
import { MyCollection } from "./my-collection";
import { MyProfile } from "./my-profile";
import { Security } from "./security";
import { Transactions } from "./transactions";
import { theme } from "../../../config/theme";
import { useBlockchainContext } from "../../../context";

interface TabPanelProps {
  children?: ReactNode;
  title: string;
  value: number;
  index: number;
}

const TabPanel = ({ children, title, value, index }: TabPanelProps) => {

  return (
    <Box
      width="100%"
      paddingTop={5}
      hidden={value !== index}>
      <Typography fontSize={28} fontWeight={700} marginBottom={5}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

export const MyAccountScreen = () => {
  const useQueryParams = () => new URLSearchParams(useLocation().search);
  const query = useQueryParams();
  const tabMode = query.get('tab');
  const { translateLang } = useBlockchainContext();
  const mediumViewport = useMediaQuery(theme.breakpoints.down("md"));
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (tabMode === 'nft') {
      setValue(1);
    }
  }, [tabMode]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <LayoutProfile>
      {false && <IncompleteProfile />}
      <Container maxWidth="lg">
        <Stack direction={mediumViewport ? "column" : "row"} minHeight="60vh">
          <Tabs
            orientation={mediumViewport ? "horizontal" : "vertical"}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{
              style: {
                display: "none",
              },
            }}
            sx={{
              marginTop: { md: "100px" },
              width: { md: "300px" },
            }}>
            <Tab key="tab1" label={translateLang("profile")} sx={{ alignItems: mediumViewport ? "center" : "flex-start" }} />              
            <Tab key="tab2" label={translateLang("myNFTCollections")} sx={{ alignItems: mediumViewport ? "center" : "flex-start" }} />
            <Tab key="tab3" label={translateLang("transactions")} sx={{ alignItems: mediumViewport ? "center" : "flex-start" }} />
            <Tab key="tab4" label={translateLang("security")} sx={{ alignItems: mediumViewport ? "center" : "flex-start" }} />
          </Tabs>
          <TabPanel title={translateLang("profile")} value={value} index={0}>
            <MyProfile />
          </TabPanel>
          <TabPanel title={translateLang("myNFTCollections")} value={value} index={1}>
            <MyCollection />
          </TabPanel>
          <TabPanel title={translateLang("transactions")} value={value} index={2}>
            <Transactions />
          </TabPanel>
          <TabPanel title={translateLang("securitySettings")} value={value} index={3}>
            <Security />
          </TabPanel>
        </Stack>
      </Container>
    </LayoutProfile>
  );
};
