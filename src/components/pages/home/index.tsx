import { CircleBlur } from "../../components/circle-blur";
import { Box } from "@mui/material";
import { Header } from "../../layout/header/header";
import { HomeHero } from "./components/hero";
import { HomeLaunches } from "./components/launches";
import { HomeHowItWorks } from "./components/how-it-works";
import { HomeBenefits } from "./components/benefits";
import { FollowUsWithNewsletter } from "../../layout/follow-us/with-newsletter";
import { FooterNav } from "../../layout/footer/nav";


export default function Homethree() {
    // const {translateLang} = useBlockchainContext();

    return (
        <div>
          <CircleBlur
            background="secondary.main"
            width="100%"
            height="100%"
            blur="100px"
            propsStyle={{
              maxWidth: "614px",
              maxHeight: "614px",
              position: "absolute",
              left: "-215px",
              top: "-248px",
              opacity: "0.2",
            }}
          />
          <Box
            sx={{
              minHeight: "100vh",
              background: "url(/img/bg/bg-black-sky.png)",
              backgroundPosition: "50% 50%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Header />
            <HomeHero />
          </Box>
          <main style={{ marginTop: 87 }}>
            <HomeLaunches />
            <HomeHowItWorks />
            <HomeBenefits />
            <FollowUsWithNewsletter />
          </main>
          <FooterNav />
        </div>
    );
}
