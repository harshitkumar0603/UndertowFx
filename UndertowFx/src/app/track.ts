export class Track {
  Key;
  ETag;
  Name;
  constructor(
  Key: string,
  ETag: string | undefined,
  Name: string | undefined,
  ) {
    this.Key = Key;
    this.ETag = ETag;
    this.Name = Name;
  }
}

export class TrackDets {
  Title;
  Artist;
  Genre;
  Likes;
  Track_Duration;
  constructor(
    Title: string,
    Artist: string | undefined,
    Genre: string | undefined,
    Likes: number | undefined,
    Track_Duration: number | undefined
  ) {
    this.Title = Title;
    this.Artist = Artist;
    this.Genre = Genre;
    this.Likes = Genre;
    this.Track_Duration = Track_Duration;
  }
}
