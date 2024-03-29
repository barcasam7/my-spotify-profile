import { useState, useEffect } from 'react';
import { catchErrors } from '../utils';
import {
  getCurrentUserProfile,
  getCurrentUserPlaylists,
  getTopArtists,
  getTopTracks
} from '../spotify';
import {
  SectionWrapper,
  ArtistsGrid,
  TrackList,
  PlaylistsGrid,
  Loader
} from '../components';
import { StyledHeader } from '../styles';
import { ProfileData, MusicList } from '../types';

const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [playlists, setPlaylists] = useState<MusicList | null>(null);
  const [topArtists, setTopArtists] = useState<MusicList | null>(null);
  const [topTracks, setTopTracks] = useState<MusicList | null>(null);

  useEffect(() => {
    const fetchData: Function = async () =>  {
      const userProfile = await getCurrentUserProfile();
      setProfile(userProfile.data);

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data);

      const userTopArtists = await getTopArtists();
      setTopArtists(userTopArtists.data);

      const userTopTracks = await getTopTracks();
      setTopTracks(userTopTracks.data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {profile && (
        <>
          <StyledHeader type="user">
            <div className="header__inner">
              {profile.images.length && profile.images[0].url && (
                <img className="header__img" src={profile.images[0].url} alt="Avatar"/>
              )}
              <div>
                <div className="header__overline">Profile</div>
                <h1 className="header__name">{profile.display_name}</h1>
                <p className="header__meta">
                  {playlists && (
                    <span>{playlists.total} Playlist{playlists.total !== 1 ? 's' : ''}</span>
                  )}
                  <span>
                    {profile.followers.total} Follower{profile.followers.total !== 1 ? 's' : ''}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>

          <main>
            {topArtists && topTracks && playlists ? (
              <>
                <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
                  <ArtistsGrid artists={topArtists.items.slice(0, 10)} />
                </SectionWrapper>

                <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
                  <TrackList items={topTracks.items.slice(0, 10)} />
                </SectionWrapper>

                <SectionWrapper title="Public Playlists" seeAllLink="/playlists">
                  <PlaylistsGrid items={playlists.items.slice(0, 10)} />
                </SectionWrapper>
              </>
            ) : (
              <Loader />
            )}
          </main>
        </>
      )}
    </>
  )
};

export default Profile;
