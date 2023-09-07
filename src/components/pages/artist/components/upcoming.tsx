import Box from "@mui/material/Box";
import { Stack, Typography } from "@mui/material";
import { SectionDefault } from "../../../layout/section";
import { IProject } from "../../../props/IProject";
import { useBlockchainContext } from "../../../../context";
import { CardProject } from "../../../components/card-project";

export const ArtistUpcoming = ({name, projects}:{name?: string, projects?:IProject[]}) => {
  const { translateLang } = useBlockchainContext();

  return (
    <SectionDefault
      title={translateLang("listOfProjects")}
      subtitle={`${name}'s project`}
    >
      {projects?.length === 0 && (
        <Stack sx={{width: "100%", height: 200, alignItems: "center", justifyContent: "center"}}>
          <Typography variant="typography3">{`${name} don't have any projects yet.`}</Typography>
        </Stack>
      )}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1)",
          sm: "repeat(2, minmax(100px, 270px))",
          md: "repeat(4, minmax(150px, 366px))",
        }}
        justifyContent="center"
        gap={{ xs: 2, mobile: 3, md: 5, lg: 7 }}
      >
        {projects?.map((project) => (
          <CardProject key={project._id} project={project} />
        ))}
      </Box>
    </SectionDefault>
  );
};
