import { useState } from "react";
import Box from "@mui/material/Box";
import { CardNftBlock, NftItemCardProps } from "./nft-block";
import { CardNftTitle } from "./nft-title";
import { IVariant } from "../../props/IVariant";
import { IUser } from "../../props/IUser";

interface Props extends NftItemCardProps {
  withInfo?: boolean;
  fullHeight?: boolean;
  perks?:string[];
  maxSupply?:number;
  currentSupply?:number;
  projectTitle?:string;
  startDateAsIso?:string;
  id?: string;
  target?:string;
  nft?: IVariant;
  seller?: IUser;
  selected?: boolean;
  onSelect?: (nft) => void;
}

export const CardNft = ({
  withInfo = false,
  collectionName,
  albumCategory,
  fullHeight,
  currentSupply,
  maxSupply,
  projectTitle,
  author,
  perks,
  price,
  id,
  target,
  nft,
  seller,
  selected,
  onSelect,
  ...cardProps
}: Props) => {
  const [nftBlock, setNftBlock] = useState(nft);
  const colorCategory = nftBlock?.indexInProject === 0 ? "basic" : nftBlock?.indexInProject === 1 ? "gold" : nftBlock?.indexInProject === 2 ? "platinium" : "diamond";

  const handleUpdateCard = (variant: IVariant) => {
    const newVariant: IVariant = {...variant};
    setNftBlock(newVariant);
  }

  return (
    <Box
      height={fullHeight ? "100%" : undefined}
      onClick={() => onSelect && onSelect(nftBlock)}
      sx={{opacity: nftBlock?.remaining !== 0 ? 1.0 : 0.7}}>
      {withInfo && <CardNftTitle albumCategory={nftBlock?.name} />}
      <CardNftBlock
        id={id}
        albumCategory={colorCategory}
        target={target}
        price={price || nftBlock?.price}
        tokensLeft={nftBlock?.remaining}
        totalSupply={nftBlock?.supply}
        author={nftBlock?.artistNickname}
        seller={seller}
        title={collectionName}
        utilities={nftBlock?.utilities}
        selected={selected}
        onUpdateCard={handleUpdateCard}
        {...cardProps}  />
    </Box>
  );
};