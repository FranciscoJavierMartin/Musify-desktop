import React, { useEffect, useState } from 'react';
import { map } from 'lodash';
import BannerHome from '../../components/BannerHome/BannerHome';

import firebase from '../../utils/firebase';
import 'firebase/firestore';

import './Home.scss';
import {
  ALBUMS_COLLECTION_NAME,
  ALBUMS_FOLDER_NAME,
  ARTISTS_COLLECTION_NAME,
  ARTISTS_FOLDER_NAME,
} from '../../constants/firebase';
import BasicSliderItems from '../../components/Sliders/BasicSliderItems/BasicSliderItems';
import { ALBUM_ROUTE, ARTIST_ROUTE } from '../../constants/routes';

const db = firebase.firestore();

const Home = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const [albums, setAlbums] = useState<any[]>([]);

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
    <>
      <BannerHome />
      <div className='home'>
        <BasicSliderItems
          title='Last artists'
          data={artists}
          folderImage={ARTISTS_FOLDER_NAME}
          urlName={ARTIST_ROUTE}
        />
        <BasicSliderItems
          title='Last albums'
          data={albums}
          folderImage={ALBUMS_FOLDER_NAME}
          urlName={ALBUM_ROUTE}
        />
      </div>
    </>
  );
};

export default Home;
