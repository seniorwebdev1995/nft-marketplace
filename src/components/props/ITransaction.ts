import { IProject } from "./IProject";
import { INftStatus } from "./INft";

export type IBuyer = {
  _id: string;
  avatarUrl?: string;
  nickname: string;
  walletAddress: string;
}

export type ITransaction = {
  _id: string;
  nft: {
    _id: string;
    artistId: string;
    artistNickname: string;
    coverUrl: string;
    name: string;
    offerId: string;
    status: INftStatus;
  }
  txHash: string;  
  createdAt: string;
  price: number;
  buyer: IBuyer;
  buyerId: string;
  sellerId: string;
  project: IProject;
};
