import { IArtist } from "./IArtist";
import { IVariant } from "./IVariant";
import { ITransaction } from "./ITransaction";

export interface IProject {
  _id: string;
  address: string;
  artist: IArtist;
  description: string;
  endDate: string;
  coverUrl: string;
  name: string;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
  videoDesc: string;
  videoURL: string;
  conversionRate?: number;
  artistRevenue?: number;
  saleCount?: number;
  visitorCount?: number;
  variants: IVariant[];
  transactions: ITransaction[];
}

export const initialProject: IProject = {
  _id: '',
  address: '',
  artist: {} as IArtist,
  description: '',
  endDate: '',
  coverUrl: '',
  name: '',
  releaseDate: '',
  createdAt: '',
  updatedAt: '',
  videoDesc: '',
  videoURL: '',
  variants: [],
  transactions: [],
};
