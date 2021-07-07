// This import loads the firebase namespace.


export interface ISearchParams {
  minFollowers: number,
  maxFollowers: number,
  minEngagementRate: number,
}

export type IArtist = {
  avg_comments: number,
  avg_likes: number,
  engagement_rate: string,
  engaged_fans: number
  followers: number,
  following: number,
  genre: string,
  ig_handle: string,
  media_uploads: number,
  song_listens: number,
  song_name: string,
  soundcloud_name: string,
  timestamp: firebase.firestore.Timestamp,
}