import React, { useState, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { map } from 'lodash';
import firebase from '../../utils/firebase';
import 'firebase/firestore';
import { ALBUMS_COLLECTION_NAME } from '../../constants/firebase';

import './Albums.scss';
import AlbumItem from '../../components/Albums/AlbumItem/AlbumItem';

const db = firebase.firestore();

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<any[]>([]);

  useEffect(() => {
    db.collection(ALBUMS_COLLECTION_NAME)
      .get()
      .then((response) => {
        const arrayAlbums = map(response?.docs, (album) => ({
          ...album.data(),
          id: album.id,
        }));
        setAlbums(arrayAlbums);
      });
  }, []);

  return (
    <div className='albums'>
      <h1>Albums</h1>
      <Grid>
        {map(albums, (album) => (
          <Grid.Column key={album.id} mobile={8} tablet={4} computer={3}>
            <AlbumItem album={album}/>
          </Grid.Column>
        ))}
      </Grid>
    </div>
  );
};

export default Albums;
