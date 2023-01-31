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

export type Playlist = {
  total: number;
  limit: number;
  href: stringOrNull;
  items: Item[];
  next: stringOrNull;
};

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

export type follower = {
  total: number;
  href: stringOrNull;
};

export type ProfileData = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: Object;
  external_urls: Object;
  followers: follower;
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
  items: {} | [];
};

export type TopTracksData = {
  items: {} | Item[];
};
