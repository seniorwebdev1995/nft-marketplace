import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useQuery } from "@apollo/client";
import { SectionDefault } from "../../../layout/section";
import { IProject } from "../../../props/IProject";
import { useBlockchainContext } from "../../../../context";
import { LIST_PROJECTS } from "../../../gql/queries";
import { CardProject } from "../../../components/card-project";

export const HomeLaunches = () => {
  const { translateLang } = useBlockchainContext();
  const [projects, setProjects] = useState<IProject[]>([]);
  const {data} = useQuery(LIST_PROJECTS, {variables: {after: 4, before: 0}});

  useEffect(() => {
    if (data) {
      const _projects: IProject[] = [];
      const edges = data.Projects.edges;
      for (var index = 0; index < data.Projects.totalCount; index++) {
        _projects.push(edges[index].node);
      };
      setProjects(_projects);
    }
  }, [data]);

  const content = projects.map((project) => {
    return (
      <CardProject key={project._id} project={project} />
    );
  })

  return (
    <SectionDefault
      title={translateLang("lauchesTitle")}
      subtitle={translateLang("lauchesSubtitle")}
      titleColor="secondary.main"
    >
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(1, minmax(100px, 270px))",
          sm: "repeat(2, minmax(100px, 270px))",
          md: "repeat(4, minmax(150px, 366px))",
        }}
        justifyContent="center"
        gap={{ xs: 2, xm: 3, md: 5 }}
      >
      {content}
      </Box>
    </SectionDefault>
  );
};
