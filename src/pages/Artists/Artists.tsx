import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { map } from 'lodash';
import firebase from '../../utils/firebase';
import 'firebase/firestore';

import './Artists.scss';
import { ARTISTS_COLLECTION_NAME } from '../../constants/firebase';
import Artist from '../../components/Artists/Artist/Artist';

interface IArtistsProps {}

const db = firebase.firestore();

const Artists: React.FC<IArtistsProps> = () => {
  const [artists, setArtists] = useState<any[]>([]);

  useEffect(() => {
    db.collection(ARTISTS_COLLECTION_NAME)
      .get()
      .then((response) => {
        const arrayArtists = map(response?.docs, (artist) => ({
          ...artist.data(),
          id: artist.id,
        }));
        setArtists(arrayArtists);
      });
  }, []);

  return (
    <div className='artists'>
      <h1>Artists</h1>
      <Grid>
        {map(artists, (artist) => (
          <Grid.Column key={artist.id} mobile={8} tablet={4} computer={3}>
            <Artist artist={artist} />
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default Artists;
