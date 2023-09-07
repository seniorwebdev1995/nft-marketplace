import { IImage } from "./IImage";

export interface IProfile
{
    objectId?: string;
    email: string;
    phoneNumber?: string;
    birthDate?: string;
    walletAddress?:string;
    avatarImage?:IImage;
}
