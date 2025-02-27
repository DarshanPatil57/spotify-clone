export interface Song{
    _id: string,
    title:string,
    artist:string,
    albumId:string | null ,
    duration:number,
    imageUrl:string,
    audioUrl:string,
    createdAt:Date,
    updatedAt:Date
}

export interface Album {
    _id: string,
    title:string,
    artist:string,
    song:Song[],
    imageUrl:string,
    releaseYear:string,

}

export interface Stats{
    totalSongs:number,
    totalAlbums:number,
    totalUsers:number,
    totalArtists:number
}