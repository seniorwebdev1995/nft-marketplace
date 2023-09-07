import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box, Stack } from "@mui/material";
import MuiLink from "@mui/material/Link";
import { CardNewNft } from "../../../components/card-nft";
// import { NftRankInfo } from "../../../components/cards/nft-rank-info";
import { CardNftBlockTitle } from "../../../components/cards/nft-block-title";
import { CardNftUtilities } from "../../../components/cards/nft-utilities";
import { CardNftBlockPrice } from "../../../components/cards/nft-block-price";
import { NoItems } from "./no-items";
import { IVariant } from "../../../props/IVariant";
import { ROUTES } from "../../../../config/navigation";
// import { useBlockchainContext } from "../../../../context";

export const NftCollection = ({ transactions }) => {
  // const { translateLang } = useBlockchainContext();
  const List: IVariant[] = transactions;

  return (
    <Container disableGutters maxWidth="lg" sx={{ marginTop: 3, marginBottom: 9 }}>
      {/* <Typography
        component="h2"
        variant="subheadline"
        textAlign={{ xs: "center", md: "left" }}
        marginBottom={{ md: 6, xs: 3 }}
      >
        {translateLang("nftCollection")}
      </Typography> */}
      {List.length === 0 ? (
        <NoItems />
      ) : (
        <Box
          display="grid"
          justifyContent={"center"}
          gridTemplateColumns={{
            xs: "repeat(1, 270px)",
            //mobile: "repeat(2, minmax(150px, 300px))",
            sm: "repeat(2, minmax(150px, 270px))",
            md: "repeat(3, minmax(150px, 1fr))",
          }}
          gap={{ xs: "22px", lg: 5 }}
        >
          {List.map((nft, index) => {
            const nftrank = nft?.indexInProject === 0 ? "basic" : nft?.indexInProject === 1 ? "gold" : nft?.indexInProject === 2 ? "platinium" : "diamond";
            return (
              <MuiLink
                href={`${ROUTES.project}${nft.projectId}`}
                sx={{color: "white", textDecoration: "none"}}
              >
                <CardNewNft
                  key={index}
                  nftrank={nftrank}
                  width={"100%"}
                  height={"auto"}
                  padding={{ xs: "10px 12px", mobile: "13px 16px", sm: "21px 24px" }}
                  imgHeight={{ xs: 240, md: 280 }}
                  imgSrc={nft?.coverUrl}
                  status={nft?.status}
                  showStatus={true}
                >
                  <Stack spacing={2}>
                    <Stack direction="row" alignItems="alignItems" spacing={2} marginBottom="20px">
                      <CardNftBlockTitle
                        isUnknown={false}
                        avatarUrl={nft?.artistAvatar}
                        author={nft?.artistNickname}
                        name={nft?.projectName}
                      />
                      <Typography variant="body3" style={{ marginTop: "5px" }} color="white">
                        {nft?.remaining && `${nft?.remaining} / ${nft?.supply}`}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <CardNftUtilities perks={nft?.utilities} />
                    <CardNftBlockPrice
                      // year={"2021"}
                      // day={nft?.tokens}
                      price={nft?.pricePaid}
                    />
                  </Stack>
                </CardNewNft>
              </MuiLink>
            )
          })}
        </Box>
      )}
    </Container>
  );
};
