import { LayoutDefault } from "../../layout/pages/layout-default";
import { JoinHero } from "./components/hero";
import { FollowUsWithContact } from "../../layout/follow-us/with-contact";
// import { TestimonialList } from "../../components/lists/testimonial";

import { JoinWhyUs } from "./components/why-us";
import { JoinSafety } from "./components/safety";
import { JoinContact } from "./components/contact";

import Box from "@mui/material/Box";

const JoinScreen = () => {

  return (
    <LayoutDefault>
      <JoinHero />
      <Box sx={{ background: "bg.dark", zIndex: 2, marginTop: 17 }}>
        <JoinContact showBtn />
        <JoinSafety />
        <JoinWhyUs />

        {/* <TestimonialList /> */}
      </Box>

      <FollowUsWithContact />
    </LayoutDefault>
  );
};

export default JoinScreen;
