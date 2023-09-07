import { IVariant } from "./IVariant";

export type INft = {
  _id: string;
  artistId: string;
  artistNickname: string;
  coverUrl: string;
  name: string;
  ownerId: string;
  txHash: string;
  price: number;
  source: {
    variant: IVariant;
  }
};

export type INftStatus = {
  code: string;
}
export  interface NFTProps {
  data: INft;
};

