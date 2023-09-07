import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { AuctionHero } from "./components/hero";
import { AuctionMembers } from "./components/club-members";
import { LayoutDefault } from "../../layout/pages/layout-default";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { LIST_AUCTIONS } from "../../gql/queries";
import { PUSH_EVENT } from "../../gql/mutations";
import { ROUTES } from "../../../config/navigation";
import { IAuction } from "../../props/IAuctions";
import { SUBSCRIBE_BID } from "../../gql/subscriptions";

export const AuctionDetailScreen = () => {
  const navigate = useNavigate();
  const {id} = useParams(); 
  const [auction, setAuction] = useState<IAuction>();
  
  const [pushEvent] = useMutation(PUSH_EVENT, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: async (data) => {
      console.log(data);
    },
  });

  const {data, refetch} = useQuery(LIST_AUCTIONS, {variables: {id}});
  const {data: subscriptionData} = useSubscription(SUBSCRIBE_BID, {
    variables: {auctionId: id}
  });

  useEffect(() => {
    if (subscriptionData) {
      refetch();
    }
  }, [refetch, subscriptionData]);

  useEffect(() => {
    if (data) {
      const edges = data.auctions;
      if (edges && edges.length > 0) {
        const auction = edges[0];
        setAuction(auction);
      } else {
        navigate(ROUTES.notFound);
      }
    }
  }, [data, navigate]);

  return (
    <LayoutDefault>
      {auction && <AuctionHero auction={auction}/>}
      {/* {auction && <AuctionAbout auction={auction}/>} */}
      {auction && <AuctionMembers auction={auction}/>}
    </LayoutDefault>
  );
};
