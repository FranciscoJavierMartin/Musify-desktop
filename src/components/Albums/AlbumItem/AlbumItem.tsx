import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../../../utils/firebase';
import 'firebase/storage';
import { ALBUMS_FOLDER_NAME } from '../../../constants/firebase';
import { ALBUM_ROUTE } from '../../../constants/routes';

interface IAlbumItemProps {
  album: any;
}

const AlbumItem: React.FC<IAlbumItemProps> = ({ album }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    firebase
      .storage()
      .ref(`${ALBUMS_FOLDER_NAME}/${album.banner}`)
      .getDownloadURL()
      .then((url: string) => {
        console.log(url);
        setImageUrl(url);
      });
  }, [album]);

  return (
    <Link to={`${ALBUM_ROUTE}/${album.id}`}>
      <div className='albums__item'>
        <div
          className='avatar'
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <h3>{album.name}</h3>
      </div>
    </Link>
  );
};

export default AlbumItem;
