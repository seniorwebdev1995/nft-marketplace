import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface CardNftBlockPriceProps {
  price?: number;
  quantity?: number;
}

export const CardNftBlockPrice = ({
  price,
  quantity,
}: CardNftBlockPriceProps) => {
  
  return (
    <Stack
    style={{
      position: "relative"
    }}
      direction="row"
      alignItems="alignItems"
      justifyContent={"space-between"}
    >
    {quantity && (
      <Box sx={{display: "flex", alignItems: "center"}}>
        <Typography variant="body2">{quantity}</Typography>
      </Box>
    )}
    {price ? (
      <Chip
        sx={(theme) => ({
          borderRadius: "8px",
          backgroundColor: "white",
          color: "black",
          ...theme.typography.bodyB2,
        })}
        label={`€ ${price}`}
      />
    ) : null}
    </Stack>
  );
};
