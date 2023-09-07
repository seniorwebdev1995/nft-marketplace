import { Box } from "@mui/material";

export const HomeHeroCard = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Box width={{xs: "100%", sm: "400px"}}>
        <video 
          width="100%"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={"/img/passport_card.mp4"} type="video/mp4" />
        </video>
      </Box>
    </Box>
  );
};
