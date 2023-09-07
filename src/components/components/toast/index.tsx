import { Box, Stack, Typography } from "@mui/material";
import { toast } from "react-toastify";

interface Props{
  type: string,
  title?: string,
  message?: string,
}

const ToastWrapper = ({ type, title, message }: Props) => {
  return (
    <Stack direction="row" spacing={2}>
      <img
        src={type === 'success' ? "img/icon-check.svg" : "img/icon-info.svg"}
        width="24px"
        height="24px"
      />
      <Box>
        <Typography fontSize={18} color="white">{title}</Typography>
        <Typography fontSize={16} color="white" marginTop="6px">{message}</Typography>
      </Box>
    </Stack>
  );
};

export const Toast = {

  error(title: string, message: string) {
    toast.error(
      <ToastWrapper type={"error"} title={title} message={message}/>, {
      // @ts-ignore: Unreachable code error
      icon: false,
      position: "top-right",
      hideProgressBar: true,
      closeButton: false,
    });
  },
  
  success(title: string, message: string) {
    toast.success(
      <ToastWrapper type={"success"} title={title} message={message}/>, {
    // @ts-ignore: Unreachable code error
      icon: false,
      position: "top-right",
      hideProgressBar: true,
      closeButton: false,
    });
  },

};
