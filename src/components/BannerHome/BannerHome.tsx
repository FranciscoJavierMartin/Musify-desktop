import React, { useEffect, useState } from 'react';
import firebase from '../../utils/firebase';
import 'firebase/storage';

import './BannerHome.scss';
import { OTHERS_FOLDER_NAME } from '../../constants/firebase';

const BannerHome = () => {
  const [bannerUrl, setBannerUrl] = useState<string>('');

  useEffect(() => {
    firebase
      .storage()
      .ref(`${OTHERS_FOLDER_NAME}/banner-home.jpg`)
      .getDownloadURL()
      .then((url: string) => {
        setBannerUrl(url);
      })
      .catch(() => {});
  }, []);

  return bannerUrl ? (
    <div
      className='banner-home'
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    />
  ) : null;
};

export default BannerHome;
