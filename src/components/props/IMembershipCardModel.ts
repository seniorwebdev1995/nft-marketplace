import { IProject } from "./IProject";
import { IArtist } from "./IArtist";
import { IImage } from "./IImage";
import { NftRankType } from "../components/cards/nft-rank-info";

export interface IMembershipCardModel {
    objectId: string;
    type:NftRankType;
    projectRef: IProject;
    artistRef:IArtist
    perks: string[];
    currentSupply:number;
    maxSupply:number;
    media:IImage;
    price:number;
    currency:string;
}


export interface IMembershipCardModelJson {
    type:NftRankType;
    projectRef: IProject;
    perks: string[];
    currentSupply:number;
    maxSupply:number;
    media:IImage;
    price?:string;
    currency:string;
    year?:string;
}