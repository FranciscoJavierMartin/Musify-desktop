import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import AlbumHeader from '../../components/Albums/AlbumHeader/AlbumHeader';

import firebase from '../../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import {
  ALBUMS_COLLECTION_NAME,
  ALBUMS_FOLDER_NAME,
  ARTISTS_COLLECTION_NAME,
} from '../../constants/firebase';

import './Album.scss';

const db = firebase.firestore();

interface IAlbumRouteParams {
  id: string;
}

interface IAlbumProps extends RouteComponentProps<IAlbumRouteParams> {}

const Album: React.FC<IAlbumProps> = ({ match }) => {
  const [album, setAlbum] = useState<any>();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [artist, setArtist] = useState<any>();

  useEffect(() => {
    db.collection(ALBUMS_COLLECTION_NAME)
      .doc(match.params.id)
      .get()
      .then((response) => {
        setAlbum({
          ...response.data(),
          id: response.id,
        });
      });
  }, [match]);

  useEffect(() => {
    if (album) {
      firebase
        .storage()
        .ref(`${ALBUMS_FOLDER_NAME}/${album?.banner}`)
        .getDownloadURL()
        .then((url: string) => {
          setImageUrl(url);
        });
    }
  }, [album]);

  useEffect(() => {
    if (album) {
      db.collection(ARTISTS_COLLECTION_NAME)
        .doc(album?.artist)
        .get()
        .then((response) => {
          setArtist({
            ...response.data(),
            id: response.id,
          });
        });
    }
  }, [album]);

  return !album || !artist ? (
    <Loader active>Loading...</Loader>
  ) : (
    <div className='album'>
      <div className='album__header'>
        <AlbumHeader
          imageUrl={imageUrl}
          artistName={artist.name}
          albumName={album.name}
        />
      </div>
      <div className='album__songs'>
        <p>Songs list</p>
      </div>
    </div>
  );
};

export default withRouter(Album);
