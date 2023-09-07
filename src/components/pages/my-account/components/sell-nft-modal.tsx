import { useState } from "react";
import { Dialog, IconButton, TextField } from "@mui/material";
import { Box, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Close from "@mui/icons-material/Close"
import { useMutation } from "@apollo/client";
import { NotificationManager } from "react-notifications";

import { ButtonGradient } from "../../../components/buttons/button-gradient";
import { useBlockchainContext } from "../../../../context";
import { CardNft } from "../../../components/cards/nft";
import { IVariant } from "../../../props/IVariant";
import { Carousel } from "../../../components/carousel";
import { PUT_NFT_ON_SALE } from "../../../gql/mutations";

interface Props {
  data: IVariant[],
  open: boolean,
  onClose: () => void;
}

export const SellNFTModal = ({open, data, onClose}: Props) => {
  const { translateLang } = useBlockchainContext();
  const [putNFTOnSale] = useMutation(PUT_NFT_ON_SALE, {
    onError: (error) => {
      setLoading(false);
      console.log(error);
      NotificationManager.error(translateLang("operation_error"));
    },
    onCompleted: async (data) => {
      setLoading(false);
      if (data) {
        NotificationManager.success(translateLang("operation_success"));
        onClose();
      }
    },
  });
  const [loading, setLoading] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<IVariant>();
  const [price, setPrice] = useState('');
  const buttonDisabled = Number(price) === 0 || selectedNFT === undefined;
  const reponsive = [
    {
      breakpoint: 990,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        // centerMode: true,
        // initialSlide: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        swipeToSlide: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ]

  const onSelect = (nft: IVariant) => {
    setSelectedNFT(nft);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    if (onlyNums.length <= 9) {
      setPrice(event.target.value);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const variables = {nftId: selectedNFT?._id, price: Number(price)};
    console.log(variables);
    await putNFTOnSale({variables});
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableScrollLock={ true }
      PaperProps={{
        sx: {
          maxHeight: "100%",
          margin: "0 12px",
          borderRadius: "8px"
        },
      }}>
      <Stack
        minWidth={{xs: "350px", md: "640px", overflow: "hidden"}}
        padding={{xs: 2, md: 3}}
        sx={{
          background: "#1A1C20",
        }}  
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontSize={22} fontWeight="700">{translateLang("sellNFT")}</Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Stack>
        <Typography marginTop={4} marginBottom={4} fontSize={15} fontWeight="600">{translateLang("selectNFTSell")}</Typography>
        {data?.length === 0 ? (
          <Stack sx={{width: "100%", height: 200, alignItems: "center", justifyContent: "center"}}>
            <Typography variant="typography3">No NFT to sell</Typography>
          </Stack>
        ) : (
          <Carousel slidesToShow={2} responsive={reponsive}>
          {data?.map((card, index) => (
            <Box
              key={index}
              minWidth={235}
              maxWidth={270}
              paddingLeft={{ xs: 2, md: 0 }}
            >
              <CardNft
                onSelect={onSelect}
                selected={selectedNFT?._id === card._id}
                collectionName={card.projectName}
                author={card.artistNickname}
                nft={card}
                id={card._id}
                imgSrc={card.coverUrl}
                />
            </Box>
          ))}
          </Carousel>
        )}
        {selectedNFT ? (
          <>
            <Stack marginTop={3} direction="row" alignItems="center" spacing={1}>
              <TextField
                label={`${translateLang("sellprice")} (EUR)`}
                variant="standard"
                type="number"
                value={price}
                onChange={handleChange}
              />
            </Stack>
            <Stack marginTop={3} direction="row" justifyContent="flex-end" alignItems="center" spacing={3}>
              <ButtonGradient loading={loading} disabled={buttonDisabled} label={translateLang("btn_ok")} onClick={handleSubmit} />
            </Stack>
          </>
        ) : (
          <Box height="40px" />
        )}
      </Stack>
    </Dialog>
  );
};
