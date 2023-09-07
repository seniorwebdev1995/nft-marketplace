import React, { useState, useEffect, useMemo } from "react";
import { Box, Container } from "@mui/material";
import { useLocation } from "react-router-dom";
import { LayoutDefault } from "../../layout/pages/layout-default";
import { ListArtist } from "../../components/lists/artist";
import { ExploreNftList } from "./components/nft-list";
import { ExploreOptions } from "./components/options";
import { ExploreTitle } from "./components/title";
import { ExploreCollectionList } from "./components/collection-list";
import { ExploreNftOnSaleList } from "./components/offer-list";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ALL_GENRES, LIST_ARTISTS, LIST_OFFERS, LIST_VARIANTS, LIST_PROJECTS, LIST_AUCTIONS } from "../../gql/queries";
import { IArtist, ICategory } from "../../props/IArtist";
import { IProject } from "../../props/IProject";
import { IVariant } from "../../props/IVariant";
import { IOffer } from "../../props/IOffer";
import { IAuction } from "../../props/IAuctions";
import { ROUTES } from "../../../config/navigation";
import { ExploreAuctionList } from "./components/auction-list";

export const ExploreScreen = () => {
  const location = useLocation();
  const pathName = location.pathname;

  const selectedIndex = useMemo(() => {
    if (pathName === ROUTES.artists) {
      return 0;
    } else if (pathName === ROUTES.projects) {
      return 1;
    } else if (pathName === ROUTES.nfts) {
      return 2;
    } else if (pathName === ROUTES.nftOnSale) {
      return 3;
    } else if (pathName === ROUTES.auctions) {
      return 4;
    }
    return 0;
  }, [pathName]);
  const hideFilter = selectedIndex === 2 || selectedIndex === 3 || selectedIndex === 4;
  const [artists, setArtists] = useState<IArtist[]>([]);
  const [nfts, setNFTs] = useState<IVariant[]>([]);
  const [projects, setProjects] = useState<IProject[]>([]);
  const [nftsOnSale, setNFTsOnSale] = useState<IOffer[]>([]);
  const [auctions, setAuctions] = useState<IAuction[]>([]);
  const [optionCartegories, setOptionCartegories] = useState<ICategory[]>([]);

  const sortedArtists = useMemo(() => {
    return artists?.sort((a, b) => a.nickname.localeCompare(b.nickname));
  }, [artists]);

  const sortedProjects = useMemo(() => {
    return projects?.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    });
  }, [projects]);

  const {data} = useQuery(GET_ALL_GENRES);
  const [listArtists] = useLazyQuery(LIST_ARTISTS, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      console.log(error.message);
    },
    onCompleted: (data) => {
      const _artists: IArtist[] = [];
      const edges = data.listArtists.edges;
      for (var index = 0; index < edges.length; index++) {
        _artists.push(edges[index].node);
      }
      setArtists(_artists);
    }
  });
  const [listVariants] = useLazyQuery(LIST_VARIANTS, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      console.log(error.message);
    },
    onCompleted: (data) => {
      const _nfts: IVariant[] = [];
      const edges = data.listVariants.edges;
      for (var index = 0; index < edges.length; index++) {
        _nfts.push(edges[index].node);
      }
      setNFTs(_nfts);
    }
  });
  const [listProjects] = useLazyQuery(LIST_PROJECTS, {
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
  const [listOffers] = useLazyQuery(LIST_OFFERS, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      console.log(error.message);
    },
    onCompleted: (data) => {
      const _nftsOnSale: IOffer[] = [];
      const offers = data.offers;
      for (var index = 0; index < offers.length; index++) {
        _nftsOnSale.push(offers[index]);
      }
      setNFTsOnSale(_nftsOnSale);
    }
  });
  const [listAuctions] = useLazyQuery(LIST_AUCTIONS, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      console.log(error.message);
    },
    onCompleted: (data) => {
      const _auctions: IAuction[] = [];
      const auctions = data.auctions;
      for (var index = 0; index < auctions.length; index++) {
        _auctions.push(auctions[index]);
      }
      setAuctions(_auctions);
    }
  })

  useEffect(() => {
    if (data) {
      const _genres: ICategory[] = [];
      data.getAllGenres?.forEach(item => {
        _genres.push({_id: item._id, label: item.name, value: item.name});
      });
      setOptionCartegories(_genres);
    }
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedIndex === 0) {
        await listArtists();
      } else if (selectedIndex === 1) {
        await listProjects({variables: {after: 30, before: 1}});
      } else if (selectedIndex === 2) {
        await listVariants();
      } else if (selectedIndex === 3) {
        await listOffers({variables: {after: 30, before: 1}});
      } else if (selectedIndex === 4) {
        await listAuctions({variables: {page: 0, perPage: 30}});
      }
    }
    fetchData()
      // make sure to catch any error
      .catch(console.error);;
  }, [listArtists, listProjects, listVariants, listOffers, listAuctions, selectedIndex]);

  const handleCategory = async (category:string, sortingType:string) => {
    const selectedOption = optionCartegories.find((item) => item.label === category)
    var variables = {};
    if (selectedOption) {
      variables = {genreIds: [selectedOption?._id]};
    }
    if (selectedIndex === 0) {
      await listArtists({variables});
    } else if (selectedIndex === 1) {
      variables = {...variables, after: 30, before: 1};
      await listProjects({variables});
    } else if (selectedIndex === 2) {
      await listVariants({variables});
    } else if (selectedIndex === 3) {
      await listAuctions({variables});
    } else {
      await listOffers({variables});
    }
  }

  return (
    <LayoutDefault>
      <Container sx={{ marginTop: 7 }}>
        <ExploreTitle selectedIndex={selectedIndex} />
        {!hideFilter && (
          <ExploreOptions selectedIndex={selectedIndex} options={optionCartegories} onOptionSelected={handleCategory}/>
        )}
        <Box marginTop={{ xs: 4, sm: 11 }} marginBottom={{ xs: 10, sm: 15 }}>
          {selectedIndex === 0 && <ListArtist data={sortedArtists} explore />}
          {selectedIndex === 1 && <ExploreCollectionList data={sortedProjects}/>}
          {selectedIndex === 2 && <ExploreNftList data={nfts}/>}
          {selectedIndex === 3 && <ExploreNftOnSaleList data={nftsOnSale}/>}
          {selectedIndex === 4 && <ExploreAuctionList data={auctions}/>}
        </Box>
      </Container>
    </LayoutDefault>
  );
};
