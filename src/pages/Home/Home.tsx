import React, { useEffect, useState } from 'react';
import { map } from 'lodash';
import BannerHome from '../../components/BannerHome/BannerHome';

import firebase from '../../utils/firebase';
import 'firebase/firestore';

import './Home.scss';
import { ARTISTS_COLLECTION_NAME, ARTISTS_FOLDER_NAME } from '../../constants/firebase';
import BasicSliderItems from '../../components/Sliders/BasicSliderItems/BasicSliderItems';
import { ARTIST_ROUTE } from '../../constants/routes';

const db = firebase.firestore();

const Home = () => {
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
    <>
      <BannerHome />
      <BasicSliderItems title='Last artists' data={artists} folderImage={ARTISTS_FOLDER_NAME} urlName={ARTIST_ROUTE}/>
      <div className='home'></div>
    </>
  );
};

export default Home;
