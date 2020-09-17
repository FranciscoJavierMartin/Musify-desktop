import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { map } from 'lodash';
import BannerArtist from '../../components/Artists/BannerArtist/BannerArtist';
import BasicSliderItems from '../../components/Sliders/BasicSliderItems/BasicSliderItems';
import SongsSlider from '../../components/Sliders/SongsSlider/SongsSlider';

import firebase from '../../utils/firebase';
import 'firebase/firestore';

import { ALBUM_ROUTE } from '../../constants/routes';
import {
  ALBUMS_COLLECTION_NAME,
  ALBUMS_FOLDER_NAME,
  ARTISTS_COLLECTION_NAME,
} from '../../constants/firebase';

import './Artist.scss';

interface IArtistParamProps {
  id: string;
}

interface IArtistProps extends RouteComponentProps<IArtistParamProps> {
  playSong: (albumImage: string, songName: string, songUrl: string) => void;
}

const db = firebase.firestore();

const Artist: React.FC<IArtistProps> = ({ match, playSong }) => {
  const [artist, setArtist] = useState<any>(null);
  const [albums, setAlbums] = useState<any[]>([]);
  const [songs, setSongs] = useState<any[]>([]);

  useEffect(() => {
    db.collection(ARTISTS_COLLECTION_NAME)
      .doc(match?.params?.id)
      .get()
      .then((response) => {
        setArtist({ ...response.data(), id: response.id });
      });
  }, [match]);

  useEffect(() => {
    if (artist) {
      db.collection(ALBUMS_COLLECTION_NAME)
        .where('artist', '==', artist.id)
        .get()
        .then((response) => {
          setAlbums(
            map(response?.docs, (album) => ({
              ...album.data(),
              id: album.id,
            }))
          );
        });
    }
  }, [artist]);

  useEffect(() => {
    const arraySongs: any[] = [];

    (async () => {
      await Promise.all(
        map(albums, async (album) => {
          await db
            .collection(ARTISTS_COLLECTION_NAME)
            .where('album', '==', album.id)
            .get()
            .then((response) => {
              map(response?.docs, (song) => {
                const data = song.data();
                data.id = song.id;
                arraySongs.push(data);
              });
            });
        })
      );
      setSongs(arraySongs);
    })();
  }, [albums]);
  return (
    <div className='artist'>
      {artist && <BannerArtist artist={artist} />}
      <div className='artist__content'></div>
      <BasicSliderItems
        title='Albums'
        data={albums}
        folderImage={ALBUMS_FOLDER_NAME}
        urlName={ALBUM_ROUTE}
      />
      <SongsSlider title='Songs' data={songs} playSong={playSong}/>
    </div>
  );
};

export default withRouter(Artist);
