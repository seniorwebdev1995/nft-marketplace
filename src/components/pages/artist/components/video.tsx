import { SectionDefault } from "../../../layout/section";
import Box from "@mui/material/Box";
import ReactPlayer from "react-player";
import { useBlockchainContext } from "../../../../context";

export const Artistvideo = ({url = '', title = ''}:{url?:string, title?:string}) => {
  const { translateLang } = useBlockchainContext();

  return (
    <SectionDefault title={translateLang("featuredVideo")} subtitle={title}>
      <Box
        sx={{
          width: "100%",
          height: { xs: 177, mobile: 300, sm: 418, md: 518, lg: 718 },
          borderRadius: "8px",
          zIndex: 10,
        }}
      >
        <ReactPlayer
          width="100%"
          height="100%"
          controls
          style={{
            zIndex: 1,
            borderRadius: "80px",
          }}
          url={url}
        />
      </Box>
    </SectionDefault>
  );
};
