import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../../utils/firebase';
import 'firebase/storage';
import { ARTISTS_FOLDER_NAME } from '../../../constants/firebase';
import { ARTIST_ROUTE } from '../../../constants/routes';

interface IArtistProps {
  artist: any;
}

const Artist: React.FC<IArtistProps> = ({ artist }) => {
  const [bannerURL, setBannerURL] = useState<string>('');

  useEffect(() => {
    firebase
      .storage()
      .ref(`${ARTISTS_FOLDER_NAME}/${artist.banner}`)
      .getDownloadURL()
      .then((url: string) => {
        setBannerURL(url);
      });
  }, [artist]);
  return (
    <Link to={`${ARTIST_ROUTE}/${artist.id}`}>
      <div className='artists__item'>
        <div
          className='avatar'
          style={{ backgroundImage: `url('${bannerURL}')` }}
        />
        <h3>{artist.name}</h3>
      </div>
    </Link>
  );
};

export default Artist;
