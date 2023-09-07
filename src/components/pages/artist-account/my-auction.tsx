import { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { AuctionList } from "./components/auction-list";
import { LIST_AUCTIONS, LIST_PROJECTS_ARTIST } from "../../gql/queries";
import { useBlockchainContext } from "../../../context";
import { IAuction } from "../../props/IAuctions";

export const MyAuction = (props) => {
  const { auth } = useBlockchainContext();
  const [auctions, setAuctions] = useState<IAuction[]>([]);

  const [listAuctions] = useLazyQuery(LIST_AUCTIONS, {
    fetchPolicy: 'no-cache',
    onError: (error) => {
      console.log(error.message);
    },
    onCompleted: (data) => {
      if (data) {
        setAuctions(data.auctions);
      }
    }
  });

  const handleRefreshAuctions = useCallback(async () => {
    if (auth.id) {
      await listAuctions({ variables: { artistIds: [auth.id] } });
    }
  }, [auth, listAuctions]);

  useEffect(() => {
    (async () => {
      await handleRefreshAuctions();
    })();
  }, [auth, handleRefreshAuctions]);

  return (
    <>
      <AuctionList auctions={auctions} prCreated={handleRefreshAuctions} />
    </>
  );
};
