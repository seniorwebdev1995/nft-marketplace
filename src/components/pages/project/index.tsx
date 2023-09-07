import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { NftProjectHero } from "./components/hero";
import { NftProjectAcess } from "./components/access";
import { ProjectAbout } from "./components/about";
import { ProjectMembers } from "./components/club-members";
import { LayoutDefault } from "../../layout/pages/layout-default";
import { IProject, initialProject } from "../../props/IProject";
import { IVariant } from "../../props/IVariant";
import { useMutation, useQuery } from "@apollo/client";
import { LIST_PROJECTS } from "../../gql/queries";
import { PUSH_EVENT } from "../../gql/mutations";
import { ROUTES } from "../../../config/navigation";

export const NftProjectScreen = () => {
  const navigate = useNavigate();
  const {id} = useParams(); 
  const [project, setProject] = useState<IProject>(initialProject);
  const [nftCards, setCards] = useState<IVariant[]>();
  const [pushEvent] = useMutation(PUSH_EVENT, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: async (data) => {
      console.log(data);
    },
  });

  const {data} = useQuery(LIST_PROJECTS, {variables: {id, after: 10, before: 10}});

  useEffect(() => {
    pushEvent({variables: {projectId: id, key: "ProjectDetailShown"}});
  }, [id, pushEvent]);

  useEffect(() => {
    if (data) {
      const edges = data.Projects.edges;
      if (edges && edges.length > 0) {
        const project = edges[0].node;
        setProject(project);
        setCards(project.variants);
      } else {
        navigate(ROUTES.notFound);
      }
    }
  }, [data]);

  return (
    <LayoutDefault>
      <NftProjectHero project={project}/>
      <NftProjectAcess project={project} cards={nftCards} artist={project.artist}/>
      {project.videoURL && (<ProjectAbout project={project}/>)}
      <ProjectMembers project={project}/>
    </LayoutDefault>
  );
};
