import { Box, Stack, Typography } from "@mui/material";
import { CardNft } from "../../../components/cards/nft";
import { ROUTES } from "../../../../config/navigation";
import { IVariant } from "../../../props/IVariant";

interface Props {
  data?: IVariant[];
}

export const ExploreNftList = ({ data }: Props) => {
  
  let year = "2020"
  if (data?.length === 0) {
    return (
      <Stack sx={{width: "100%", height: 200, alignItems: "center", justifyContent: "center"}}>
        <Typography variant="typography3">There is no NFT</Typography>
      </Stack>
    )
  }
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 270px)",
        // mobile: "repeat(2, minmax(150px, 275px))",
        sm: "repeat(3, minmax(150px, 275px))",
        md: "repeat(4, minmax(150px, 1fr))",
      }}
      justifyContent="center"
      gap={{ xs: 3, mobile: 4, sm: 5 }}
    >
      {data?.map((card, index) => (
        <CardNft
          key={card._id}
          collectionName={card.projectName}
          author={card.artistNickname}
          nft={card}
          id={card._id}
          target={ROUTES.checkout}
          imgSrc={card.coverUrl}
          startDateAsIso={year}
        />
      ))}
    </Box>
  );
};
