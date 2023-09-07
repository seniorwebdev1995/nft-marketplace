import {Box, Stack, Typography} from "@mui/material";
import { IProject } from "../../../props/IProject";
import { CardProject } from "../../../components/card-project";

interface Props {
  data?: IProject[];
}

export const ExploreCollectionList = ({ data }: Props) => {
  if (data?.length === 0) {
    return (
      <Stack sx={{ width: "100%", height: 200, alignItems: "center", justifyContent: "center" }}>
        <Typography variant="typography3">There is no collection</Typography>
      </Stack>
    )
  }

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 300px)",
        sm: "repeat(2, minmax(100px, 270px))",
        md: "repeat(4, minmax(150px, 366px))",
      }}
      justifyContent="center"
      gap={{ xs: 2, mobile: 3, md: 5, lg: 7 }}
    >
      {data?.map((project) => (
        <CardProject key={project._id} project={project} />
      ))}
    </Box>
  );
};
