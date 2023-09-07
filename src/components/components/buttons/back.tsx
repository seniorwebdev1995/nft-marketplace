import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useBlockchainContext } from "../../../context";
import { useNavigate } from "react-router-dom";

interface Props {
  variant?: "text" | "icon";
}

export const ButtonBack = ({ variant = "text" }: Props) => {
  const { translateLang } = useBlockchainContext();
  const navigate = useNavigate();

  return (
    <Box>
      {variant === "text" ? (
        <Button
          onClick={() => navigate(-1)}
          variant="text"
          startIcon={<ArrowBackIosNew />}
          sx={{
            color: "#2F98FB",
            textTransform: "capitalize",
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "12px",
            lineHeight: "14px",
          }}
        >
          {translateLang("backBtn")}
        </Button>
      ) : (
        <IconButton onClick={() => navigate(-1)} aria-label="back icon button">
          <ChevronLeftIcon sx={{ fontSize: 30 }} />
        </IconButton>
      )}
    </Box>
  );
};
