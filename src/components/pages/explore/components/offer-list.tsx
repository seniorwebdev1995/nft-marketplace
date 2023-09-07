import { Box, Stack, Typography } from "@mui/material";
import { CardNft } from "../../../components/cards/nft";
import { ROUTES } from "../../../../config/navigation";
import { IOffer } from "../../../props/IOffer";

interface Props {
  data?: IOffer[];
}

export const ExploreNftOnSaleList = ({ data }: Props) => {
  
  if (data?.length === 0) {
    return (
      <Stack sx={{width: "100%", height: 200, alignItems: "center", justifyContent: "center"}}>
        <Typography variant="typography3">There is no NFT on sale</Typography>
      </Stack>
    )
  }
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(auto-fit, minmax(150px, 1fr))",
        // mobile: "repeat(2, minmax(150px, 275px))",
        sm: "repeat(3, minmax(150px, 275px))",
        md: "repeat(4, minmax(150px, 1fr))",
      }}
      gap={{ xs: 3, mobile: 4, sm: 5 }}
    >
      {data?.map((card, index) => (
        <CardNft
          key={card._id}
          collectionName={card.nft?.source?.variant?.projectName}
          author={card.nft?.artistNickname}
          nft={card.nft?.source?.variant}
          seller={card.seller}
          id={card._id}
          price={card.price}
          target={ROUTES.checkout}
          imgSrc={card.nft?.coverUrl}
          withInfo
          />
      ))}
    </Box>
  );
};
