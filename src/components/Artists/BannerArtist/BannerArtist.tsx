import React, { useEffect, useState } from 'react';
import firebase from '../../../utils/firebase';
import 'firebase/firestore';
import { ARTISTS_FOLDER_NAME } from '../../../constants/firebase';

import './BannerArtist.scss';

interface IBannerArtistProps {
  artist: any;
}

const BannerArtist: React.FC<IBannerArtistProps> = ({ artist }) => {
  const [bannerUrl, setBannerUrl] = useState<string>('');

  useEffect(() => {
    firebase
      .storage()
      .ref(`${ARTISTS_FOLDER_NAME}/${artist?.banner}`)
      .getDownloadURL()
      .then((url: string) => {
        setBannerUrl(url);
      });
  }, [artist]);

  return (
    <div
      className='banner-artist'
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <div className='banner-artist__gradient' />
      <div className='banner-artist__info'>
        <h4>Artist</h4>
        <h1>{artist.name}</h1>
      </div>
    </div>
  );
};

export default BannerArtist;
