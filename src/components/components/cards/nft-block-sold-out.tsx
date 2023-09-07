import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useBlockchainContext } from "../../../context";

export interface CardNftBlockSoldOutProps {
  nftSold?: number;
}

export const CardNftBlockSoldOut = ({
  nftSold = 500,
}: CardNftBlockSoldOutProps) => {
  const { translateLang } = useBlockchainContext();

  return (
    <Stack
      direction="row"
      alignItems="alignItems"
      justifyContent={"space-between"}
    >
      <Box>
        <Typography
          fontSize={{ xs: 12, sm: 21 }}
          lineHeight="110%"
          letterSpacing={"-0.02em"}
          fontWeight={"800"}
          color="#BD482B"
          textTransform={"uppercase"}
        >
          {translateLang("artist.sodlOut")}
        </Typography>
        <Typography
          fontSize={{ xs: 10, sm: 16 }}
          lineHeight="110%"
          letterSpacing={"-0.02em"}
          textTransform={"uppercase"}
        >
          {translateLang("artist.tokensSold")}
        </Typography>
      </Box>
    </Stack>
  );
};
