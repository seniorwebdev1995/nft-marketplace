import { useEffect, useMemo, useState } from "react"
import { useLazyQuery, useQuery } from "@apollo/client";
import { NftCollection } from "./components/nft-collection";
// import { MyAccountNextLaunch } from "./components/next-launch";
import { MY_NFTS } from "../../gql/queries";
import { Box, Stack } from "@mui/material";
import { ButtonGradient } from "../../components/buttons/button-gradient";
import { SellNFTModal } from "./components/sell-nft-modal";
import { useBlockchainContext } from "../../../context";

export const MyCollection = () => {
  const { translateLang } = useBlockchainContext();
  const [openModal, setOpenModal] = useState(false);
  const [transactions, setTransaction] = useState<any[]>([]);
  const nftListToSell = useMemo(() => transactions?.filter(item => item.status === 'Idle'), [transactions]);
  const [getMyTransactions] = useLazyQuery(MY_NFTS, {
    fetchPolicy: "network-only",
    onCompleted(data) {
      if (data) {
        const _myNfts = data.myNfts;
        _myNfts.map(edge => {
          _tempTransactions.push({
            _id: edge._id,
            projectId: edge.source?.variant?.projectId,
            projectName: edge.source?.variant?.projectName,
            price: edge.source?.variant?.price,
            artistId: edge.artistId,
            artistNickname: edge.artistNickname,
            coverUrl: edge.coverUrl,
            name: edge.name,
            indexInProject: edge.source?.indexInProject,
            pricePaid: edge.pricePaid,
            status: edge.status.code,
            utilities: edge.utilities
          });
        });
        setTransaction(_tempTransactions);
      }
    },
  });
  let _tempTransactions: any[] = [];

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    if (!openModal) {
      (async () => {
        await getMyTransactions();
      })(); 
    }
  }, [getMyTransactions, openModal]);

  return (
    <>
      <Stack direction="row" justifyContent="flex-end">
        <ButtonGradient disabled={transactions?.length === 0} label={translateLang("sellNFT")} onClick={handleOpenModal} />
      </Stack>
      <NftCollection transactions={transactions} />
      {/* <MyAccountNextLaunch projects={projects}/> */}
      <SellNFTModal data={nftListToSell} open={openModal} onClose={handleCloseModal} />
    </>
  );
};
