export interface IGenres {
    _id: string;
    name: string;
}

export interface IArtist {
    _id: string;
    biography: string;
    email: string;
    nickname: string;
    avatarUrl: string;
    bannerUrl?: string;
    spotifyUrl: string;
    videoTitle: string;
    videoURL: string;
    description?: string;
    genres: IGenres[];
}

export interface ICategory {
    _id?: string;
    label?: string;
    desription?: string;
    value?: string;
    disabled?: boolean;
}
