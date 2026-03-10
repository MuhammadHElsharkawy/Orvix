export interface IProfile {
    _id: string;
    name: string;
    username: string;
    email: string;
    dateOfBirth: Date;
    gender: string;
    photo: string;
    cover: string;
    bookmarks: any[];
    followers: any[];
    following: any[];
    createdAt: Date;
    followersCount: number;
    followingCount: number;
    bookmarksCount: number;
    id: string;
}
