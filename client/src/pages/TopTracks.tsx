import { useState, useEffect } from 'react';
import { getTopTracks } from '../spotify';
import { catchErrors } from '../utils';
import {
  SectionWrapper,
  TrackList,
  TimeRangeButtons,
  Loader
} from '../components';

type TopTracks = {
  items: {} | Item[]
}

type Item = {
  name: string,
  id: string
  images: []
}

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState<TopTracks | null>(null);
  const [activeRange, setActiveRange] = useState('short');

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
          <TrackList tracks={topTracks.items} />
        ) : (
          <Loader />
        )}
      </SectionWrapper>
    </main>
  );
};

export default TopTracks;
