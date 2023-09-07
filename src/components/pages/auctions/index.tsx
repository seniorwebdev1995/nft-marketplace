import React, { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { LayoutDefault } from "../../layout/pages/layout-default";
import { useLazyQuery } from "@apollo/client";
import { LIST_AUCTIONS } from "../../gql/queries";
import { IAuction } from "../../props/IAuctions";
import { ExploreAuctionList } from "./components/auction-list";
import { ExploreTitle } from "./components/title";

export const AuctionsScreen = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [auctions, setAuctions] = useState<IAuction[]>([]);

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
    const fetchData = async () => {
      await listAuctions({variables: {page: 0, perPage: 30}});
    }
    fetchData()
  }, [listAuctions]);

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = async (
    _event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <LayoutDefault>
      <Container sx={{ marginTop: 7 }}>
        <ExploreTitle
          anchorEl={anchorEl}
          selectedIndex={selectedIndex}
          handleClickListItem={handleClickListItem}
          handleClose={handleClose}
          handleMenuItemClick={handleMenuItemClick}
        />
        <Box marginTop={{ xs: 4, sm: 11 }} marginBottom={{ xs: 10, sm: 15 }}>
          <ExploreAuctionList selectedIndex={selectedIndex} data={auctions}/>
        </Box>
      </Container>
    </LayoutDefault>
  );
};
