type stringOrNull = string | null;
type numberOrNull = number | null;

export type Params = {
  id: string;
};

export type TracksData = {
  next: null | string;
  items: Tracks[];
};

export type Tracks = {
  track: Track;
  total: number;
};

export type Track = {
  track_number: number;
  id: string;
  audio_features: AudioFeatures;
  album: Album;
  name: string;
  artists: Artist[];
  duration_ms: number;
  images: Image[];
};

export type Album = {
  images: Image[];
  name: string;
};

export type AudioFeatures = {
  danceability: number;
  tempo: number;
  energy: number;
};

export type PlaylistData = {
  name: string;
  id: string;
  images: Image[];
  followers: { total: number };
  tracks: Tracks;
};

interface Response {
  total: number;
  limit: number;
  href: stringOrNull;
  next: stringOrNull;
}

export interface Playlist {
  items: Item[];
}

export interface PlaylistResponse extends Response, Playlist {}

export type Item = {
  name: string;
  id: string;
  images: Image[];
};

export type Image = {
  height: numberOrNull;
  width: numberOrNull;
  url: string;
};

export type Follower = {
  total: number;
  href: stringOrNull;
};

export type ProfileData = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: Object;
  external_urls: Object;
  followers: Follower;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
};

export type MusicList = {
  total: number;
  limit: number;
  href: stringOrNull;
  items: [];
};

export type TopArtist = {
  items: Artist[];
};

export type TopTracksData = {
  items: Track[];
};

export type Artists = {
  artists: Artist[];
};

export type Artist = {
  name: string;
  images: Image[];
};

export type Ranges = "short" | "medium" | "long";

export type TimeRange = {
  activeRange: Ranges;
  setActiveRange: React.Dispatch<React.SetStateAction<Ranges>>;
};

export type TrackListData = {
  items: Track[];
};
