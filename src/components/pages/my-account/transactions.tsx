import { useLazyQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useBlockchainContext } from "../../../context";
import { LIST_MY_TRANSACTIONS } from "../../gql/queries";

import { TransactionItem } from "./components/transaction-item";
import { TransactionItemMobile } from "./components/transaction-item-mobile";

export const Transactions = () => {
  const { translateLang, auth } = useBlockchainContext();
  const [transactions, setTransaction] = useState<any[]>([]);
  const [getMyTransactions] = useLazyQuery(LIST_MY_TRANSACTIONS, {
    fetchPolicy: "network-only",
    onCompleted(data) {
      if (data) {
        const edges = data.getMyTransactions.edges;
        const _tempTransactions: any[] = [];
        edges.map(edge => {
          _tempTransactions.push({
            _id: edge.node._id,
            createdAt: edge.node.createdAt,
            nftId: edge.node.nft ? edge.node.nft._id : null,
            buyerId: edge.node.buyerId,
            sellerId: edge.node.sellerId,
            buyer: edge.node.buyer?.nickname,
            seller: edge.node.seller?.nickname,
            name: edge.node.nft?.name,
            status: edge.node.nft?.status?.code,
            price: edge.node?.price,
            txHash: edge.node.txHash,
            projectName: edge.node.nft?.source?.variant?.projectName,
          });
        });
        setTransaction(_tempTransactions);
      }
    },
  });

  useEffect(() => {
    (async () => {
      await getMyTransactions();
    })();
  }, [getMyTransactions])
  return (
    <Container disableGutters sx={{ marginBottom: 4, marginTop: 4, overflow: "auto" }}>
      {transactions.length === 0 ? (
        <Stack sx={{ width: "100%", height: 200, alignItems: "center", justifyContent: "center" }}>
          <Typography variant="typography3">There is no transactions yet</Typography>
        </Stack>
      ) : isMobile ? transactions.map((transaction, index) => <TransactionItemMobile key={index} userId={auth?.id} data={transaction} />) : <Stack spacing={3} width="1024px">
        <Stack
          direction="row"
          justifyContent="space-between"
          padding="12px"
          sx={{
            paddingBottom: "24px",
            borderBottom: "1px solid #515765",
          }}>
          <Typography color="#9BA0B5" width="180px">
            Collection Name
          </Typography>
          <Typography color="#9BA0B5" width="150px" textAlign="center">
            Variant
          </Typography>
          <Typography color="#9BA0B5" width="150px" textAlign="center">
            Tx Hash
          </Typography>
          <Typography color="#9BA0B5" width="150px" textAlign="center">
            Price
          </Typography>
          <Typography color="#9BA0B5" width="150px" textAlign="center">
            Buyer
          </Typography>
          <Typography color="#9BA0B5" width="150px" textAlign="center">
            Seller
          </Typography>
          <Typography color="#9BA0B5" width="150px" textAlign="center">
            Date
          </Typography>
          <Typography color="#9BA0B5" width="150px" textAlign="center">
            {translateLang("type")}
          </Typography>
          <Typography color="#9BA0B5" width="150px" textAlign="center">
            Status
          </Typography>
        </Stack>
        {
          transactions.map((transaction, index) =>
            <TransactionItem key={index} userId={auth?.id} data={transaction} />
          )
        }
      </Stack>}
    </Container>
  );
};
