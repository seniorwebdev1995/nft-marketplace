
export type IVariant = {
  _id: string;
  nftId?: string;
  offerId?: string; 
  artistId: string;
  artistNickname: string;
  artistAvatar?: string;
  coverUrl: string;
  indexInProject: number;
  name: string;
  price: number;
  pricePaid?: number;
  projectId: string;
  projectName: string;
  remaining: number;
  supply: number; 
  utilities: string[];
  status?: string;
};

export  interface VariantProps {
  data: IVariant;
};

