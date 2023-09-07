import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { NftCollection } from "./components/nft-collection";
import { IProject } from "../../props/IProject";
import { LIST_PROJECTS_ARTIST } from "../../gql/queries";
import { useBlockchainContext } from "../../../context";

export const MyCollection = (props) => {
  const { auth } = useBlockchainContext();
  const [projects, setProjects] = useState<IProject[]>([]);

  const [listProjects] = useLazyQuery(LIST_PROJECTS_ARTIST, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      console.log(error.message);
    },
    onCompleted: (data) => {
      if (data) {
        const _projects: IProject[] = [];
        const edges = data.Projects.edges;
        for (var index = 0; index < data.Projects.totalCount; index++) {
          _projects.push(edges[index].node);
        };
        setProjects(_projects);
      }
    }
  });

  const handleProjectCreated = async () => {
    if (auth.id) {
      await listProjects({ variables: { after: 10, before: 10, artistIds: [auth.id] } });
    }
  }

  useEffect(() => {
    (async () => {
      if (auth.id) {
        await listProjects({ variables: { after: 10, before: 10, artistIds: [auth.id] } });
      }
    })();
  }, [auth, listProjects]);

  return (
    <>
      <NftCollection projects={projects} prCreated={handleProjectCreated} />
    </>
  );
};
