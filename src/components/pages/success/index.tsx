import { useMemo } from "react";
import MuiLink from "@mui/material/Link";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ROUTES } from "../../../config/navigation";
import { FooterNav } from "../../layout/footer/nav";
import { Header } from "../../layout/header/header";
import { Stack, Typography, Box } from "@mui/material";
import { useBlockchainContext } from "../../../context";
import { CardNft } from "../../components/cards/nft";
import { ButtonGradient } from "../../components/buttons/button-gradient";
import { LIST_MY_TRANSACTIONS } from "../../gql/queries";

const CheckoutSuccessScreen = () => {
  const navigate = useNavigate();
  const useQueryParams = () => new URLSearchParams(useLocation().search);
  const query = useQueryParams();
  const sessionId = query.get('session_id');
  const {data} = useQuery(LIST_MY_TRANSACTIONS, {
    variables: {sessionId},
    onError: (error) => {
      console.log(error);
      navigate(ROUTES.account);
    }
  });
  const { translateLang } = useBlockchainContext();
  const card = useMemo(() => {
    if (data) {
      const edges = data.getMyTransactions.edges;
      var transaction;
      var nft;
      if (edges.length > 0) {
        transaction = edges[0].node;
        nft = {...transaction.nft, price: transaction.price, indexInProject: transaction.nft?.source?.variant?.indexInProject};
      } else {
        navigate(ROUTES.account);
      }
      return nft;
    }
    return null;
  }, [data]);  

  return (
    <div>
      <Stack minHeight={"100vh"} sx={{background: "#1A1C20"}}>
        <Stack
          flex={{ xs: "auto", md: 1 }}
          sx={{
            backgroundImage: "url(/img/bg/success-bg.jpg)",
            backgroundPosition: "50% 50%",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Header />
          {card && (
            <Stack
              flex={1}
              height={"100%"}
              marginTop="24px"
              alignItems="center"
              justifyContent="center">

              <Stack
                maxWidth="1050px"
                justifyContent="center"
                alignItems="center"
                direction={{xs: "column", md: "row"}}
                padding={{ xs: 4, md: 8 }}
                spacing={6}
                sx={{
                  background: "rgba(36, 40, 44, 0.4);",
                  backdropFilter: "blur(125px);",
                  borderRadius: "4px;",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <Stack width="280px">
                  <CardNft
                    collectionName={card?.name}
                    author={card?.artistNickname}
                    nft={card}
                    id={card?._id}
                    imgSrc={card?.coverUrl}
                  />
                </Stack>
                <Stack spacing={4} maxWidth="550px">
                  <Typography
                    fontSize={{ xs: 30, sm: 50 }}
                    lineHeight="110%"
                    letterSpacing={"-1px"}
                    color="white"
                    fontWeight={"600"}
                  >
                    {translateLang("congrats")}
                  </Typography>
                  <Typography
                    fontSize={{ xs: 20, sm: 24 }}
                    color="white"
                    fontWeight="600"
                  >
                    You are now a proud owner of 
                    <Box
                      component="span"
                      color="primary.main"
                      fontSize={{ xs: 20, sm: 24 }}
                      fontWeight="600"
                      sx={{marginLeft: "8px"}}
                    >
                      {card?.name}
                    </Box> by 
                    <Box
                      component="span"
                      color="primary.main"
                      fontSize={{ xs: 20, sm: 24 }}
                      fontWeight="600"
                      sx={{marginLeft: "8px"}}
                    >
                    {card?.artistNickname}
                    </Box>
                    !
                  </Typography>
                  <Typography
                    fontSize={{ xs: 14, sm: 14 }}
                    lineHeight="150%"
                    letterSpacing={"-1px"}
                    fontWeight={"400"}
                    color={"rgba(255, 255, 255, 0.7);"}
                  >
                    {translateLang("congratsTip")}
                  </Typography>
                  <Box>
                    <MuiLink href={`${ROUTES.account}?tab=nft`} underline="none">
                      <ButtonGradient label={translateLang("seeMyNfts")} />
                    </MuiLink>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          )}
        </Stack>
        <FooterNav sx={{ paddingY: 2 }} />
      </Stack>
    </div>
  );
};

export default CheckoutSuccessScreen;
