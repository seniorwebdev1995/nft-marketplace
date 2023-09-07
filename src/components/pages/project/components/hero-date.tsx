import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TextCounter } from "../../../components/typography/counter";
import { convertFromISODate } from "../../../../utils";
import { useBlockchainContext } from "../../../../context";

interface NftProjectHeroDateProps {
  releaseDate:string | undefined;
  endDate:string | undefined;
}


export const NftProjectHeroDate = ({releaseDate, endDate}:NftProjectHeroDateProps) => {

  const { translateLang } = useBlockchainContext();

  return (
    <Stack spacing={2} alignItems={{ xs: "center", md: "flex-start" }}>
      <Stack spacing={1} alignItems={{ xs: "center", md: "flex-start" }}>
        <Typography color="rgba(255, 255, 255, 0.8)">
          {translateLang("heroStartDate")}
        </Typography>
        <TextCounter
          variantColor="light"
          counter={convertFromISODate(releaseDate)}
        />
      </Stack>
      <Stack spacing={1} alignItems={{ xs: "center", md: "flex-start" }}>
        <Typography color="rgba(255, 255, 255, 0.8)">
          {translateLang("heroEnd")}
        </Typography>
        <TextCounter
          variantColor="light"
          counter={convertFromISODate(endDate)}
        />
      </Stack>
    </Stack>
  );
};
