import { IArtist } from "./IArtist";
import { IUser } from "./IUser";

type Bid = {
  amount: number;
  bidderId: string;
  bidder?: IUser
  date: string;
};

export type IAuction = {
  _id: string;
  address: string;
  artist: IArtist;
  bids: Bid[];
  contractAddress: string;
  createdAt: string;
  coverUrl: string;
  description: string;
  endDate: string;
  genreIds: string[];
  highestBid: number;
  metadataUrl: string;
  name: string;
  startingPrice: number;
  status: string;
  startDate: string;
  utilities: string[];
  updatedAt: string;
  videoDesc: string;
  videoURL: string;
};
