import {useEffect, useState} from "react"
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { FooterNav } from "../../layout/footer/nav";
import { Header } from "../../layout/header/header";
import { IArtist } from "../../props/IArtist";
import { IProject } from "../../props/IProject";

import { ArtistHero } from "./components/hero";
import { ArtistUpcoming } from "./components/upcoming";
import { Artistvideo } from "./components/video";
import { useLazyQuery } from "@apollo/client";
import { LIST_ARTISTS, LIST_PROJECTS } from "../../gql/queries";

const ArtistScreen = () => {
  const {id} = useParams(); 
  const [artist, setArtist] = useState<IArtist>();
  const [projects, setProjects] = useState<IProject[]>([]);

  const [listCollections] = useLazyQuery(LIST_PROJECTS, {
    variables: {artistIds: [id], after: 4, before: 1},
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

  const [listArtists] = useLazyQuery(LIST_ARTISTS, {
    variables: {artistId: [id]},
    onError: (error) => {
      console.log(error.message);
    },
    onCompleted: (data) => {
      const edges = data.listArtists.edges;
      if (edges) {
        setArtist(edges[0].node);
      }
    }
  });

  useEffect(() => {
    listArtists();
    listCollections();
  }, [listArtists, listCollections]);

  // useEffect(() => {
  //   let isSubscribed = true;
  
  //   // declare the async data fetching function
  //   const fetchData = async () => {

  //     const projectsQuery =  artist.get('Projects').query().equalTo('isActive', true);

  //     const activeProject = await projectsQuery.first()

  //     if (isSubscribed) {
  //       setCurrentProject(activeProject);
  //     }
  //   }
  
  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);;
  
  //   // cancel any future `setData`
  //   return () => isSubscribed = false;
  // }, [currentProject])


  // const toot = projects.filter(projects => projects.isActive);
  return (
    <div>
      <Box
        sx={{
          backgroundImage:
            `linear-gradient(180deg, rgba(25, 18, 37, 0.06) 0%, #191225 97.74%),url(${artist?.bannerUrl})`,
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Header />
        <ArtistHero 
          avatarImageUrl={artist?.avatarUrl} 
          name={artist?.nickname}
          description={artist?.biography}
          socials={[]}
          spotifyUrl={artist?.spotifyUrl}
          musicCategory={artist?.description}
        />
      </Box>
      {artist?.videoURL && <Artistvideo url={artist?.videoURL} title={artist?.videoTitle}/>}
      <ArtistUpcoming name={artist?.nickname} projects={projects} />
      <FooterNav />
    </div>
  )
};

export default ArtistScreen;
