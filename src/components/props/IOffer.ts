import { IArtist } from "./IArtist";
import { IUser } from "./IUser";
import { INft } from "./INft";

export type IOffer = {
  _id: string;
  artist: IArtist;
  artistId: string;
  createdAt: string;
  nft: INft;
  price: number;
  seller: IUser;
};
