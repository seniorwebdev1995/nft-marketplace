import { Dialog, IconButton, TextField } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Close from "@mui/icons-material/Close"

import { ButtonGradient } from "../../../components/buttons/button-gradient";
import { useBlockchainContext } from "../../../../context";

interface Props {
  open: boolean,
  onClose: () => void;
}

export const WalletAddressModal = ({open, onClose}: Props) => {
  const { translateLang } = useBlockchainContext();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableScrollLock={ true }
      PaperProps={{
        sx: {
          margin: "0 12px",
          borderRadius: "8px"
        },
      }}>
      <Stack
        padding={{xs: 2, md: 3}}
        sx={{
          background: "#1A1C20",
        }}  
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography fontSize={22} fontWeight="700">{translateLang("walletAddress")}</Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Stack>
        <Typography marginTop={2} fontSize={15} lineHeight="140%" color="rgba(255, 255, 255, 0.75)">
          {translateLang("walletAddressTip")}
        </Typography>
        <Typography marginTop={4} marginBottom={4} fontSize={15} fontWeight="600">{translateLang("currentWallet")}</Typography>
        <TextField
          label={translateLang("enterWalletAddress")}
          type={"text"}
         />
         <Typography marginTop={4} fontSize={15} fontWeight="600">{translateLang("howtofindWalletAddress")}</Typography>
         <Typography marginTop={2} fontSize={14} color="#FF4800">{translateLang("howtofindWalletAddressTip")}</Typography>
         <Stack marginTop={3} direction="row" justifyContent="flex-end" alignItems="center" spacing={3}>
           <Typography color="#2F98FB" fontWeight="900" sx={{cursor: "pointer"}} onClick={onClose}>{translateLang("cancel")}</Typography>
           <ButtonGradient label={translateLang("addWallet")} />
         </Stack>
      </Stack>
    </Dialog>
  );
};
