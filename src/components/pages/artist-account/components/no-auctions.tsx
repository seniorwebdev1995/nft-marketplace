import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useBlockchainContext } from "../../../../context";

export const NoAuctions = () => {
  const { translateLang } = useBlockchainContext();

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{
        padding: "50px",
        border: "1px dashed rgba(255, 255, 255, 0.2)",
        borderRadius: "4px"
      }}
    >
      <Typography 
        color="#2F98FB" 
        fontSize={{ xs: 14, sm: 16 }}
        fontWeight="600"
      >
        No auction created yet
      </Typography>
      <Typography
        color="rgba(255, 255, 255, 0.4)"
        fontSize={{ xs: 10, sm: 12 }}
      >
        Create and launch your first auction
      </Typography>
      {/* <ButtonGradient label="Launch my first project" onClick={()=>goTo()} /> */}
    </Stack>
  );
};
