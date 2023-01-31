import { useState, useEffect } from 'react';
import { getTopTracks } from '../spotify';
import { catchErrors } from '../utils';
import {
  SectionWrapper,
  TrackList,
  TimeRangeButtons,
  Loader
} from '../components';

import { TopTracksData, Ranges } from '../types';


const TopTracks = () => {
  const [topTracks, setTopTracks] = useState<TopTracksData | null>(null);
  const [activeRange, setActiveRange] = useState<Ranges>('short');

  useEffect(() => {
    const fetchData: Function = async () => {
      const { data } = await getTopTracks(`${activeRange}_term`);
      setTopTracks(data);
    };

    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      <SectionWrapper title="Top Tracks" breadcrumb={true}>
        <TimeRangeButtons
          activeRange={activeRange}
          setActiveRange={setActiveRange}
        />

        {topTracks && topTracks.items ? (
          <TrackList items={topTracks.items} />
        ) : (
          <Loader />
        )}
      </SectionWrapper>
    </main>
  );
};

export default TopTracks;
