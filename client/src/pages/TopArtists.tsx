import { useState, useEffect } from 'react';
import { getTopArtists } from '../spotify';
import { catchErrors } from '../utils';
import {
  ArtistsGrid,
  SectionWrapper,
  TimeRangeButtons,
  Loader
} from '../components';

import { TopArtist } from '../types';

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState< null | TopArtist>(null);
  const [activeRange, setActiveRange] = useState('short');

  useEffect(() => {
    const fetchData: Function = async () => {
      const { data } = await getTopArtists(`${activeRange}_term`);
      setTopArtists(data);
    };

    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      <SectionWrapper title="Top Artists" breadcrumb={true}>
        <TimeRangeButtons
          activeRange={activeRange}
          setActiveRange={setActiveRange}
        />

        {topArtists && topArtists.items ? (
          <ArtistsGrid artists={topArtists.items} />
        ) : (
          <Loader />
        )}
      </SectionWrapper>
    </main>
  );
};

export default TopArtists;
