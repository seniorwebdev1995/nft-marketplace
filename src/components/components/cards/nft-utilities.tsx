import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { PERK_LIST } from "../../../config/data";

export const CardNftUtilities = ({perks=PERK_LIST}) => {
  return (
    <Stack spacing="4px" alignItems="flex-start" justifyContent="flex-end" height="64px">
      {perks?.filter((item, idx) => idx < 3).map((perk, i) => (
          <Stack key={i}  direction="row" alignItems="start" width={"150px"}>
           <Typography variant="body2" color="white" noWrap>
              - {perk}
           </Typography>
         </Stack>
      ))}
    </Stack>
  );
};
