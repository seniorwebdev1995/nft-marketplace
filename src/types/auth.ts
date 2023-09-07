export interface IAuthData {
  id?: string;
  isAuth: boolean;
  authMode?: string;
  phoneNumber?: string;
  nickname?: string;
  email?: string;
  url?: string;
  address?: string;
  biography?: string;
  signer?: any;
  privateKey?: string;
  genres?: IGenres[];
  avatarUrl?: string;
  spotifyUrl?: string;
  bannerUrl?: string;
  projectCount?: number;
  revenue?: number;
  saleCount?: number;
  visitorCount?: number;
  videoUrl?: string;
  videoTitle?: string;
  auctionCount?: number;
  auctionPastCount?: number;
  auctionOnGoingCount?: number;
  auctionFutureCount?: number;
  projectRevenue?: number;
  auctionRevenue?: number;
}

export interface IGenres {
  _id: string;
  name: string;
  description: string;
}
