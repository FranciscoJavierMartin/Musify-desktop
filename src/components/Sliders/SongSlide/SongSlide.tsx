import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';

import firebase from '../../../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import {
  ALBUMS_COLLECTION_NAME,
  ALBUMS_FOLDER_NAME,
} from '../../../constants/firebase';
import { ALBUM_ROUTE } from '../../../constants/routes';

const db = firebase.firestore();

interface ISongSlideProps {
  song: any;
  playSong: (albumImage: string, songName: string, songUrl: string) => void;
}

const SongSlide: React.FC<ISongSlideProps> = ({ song, playSong }) => {
  const [banner, setBanner] = useState<string>('');
  const [album, setAlbum] = useState<any>();

  useEffect(() => {
    db.collection(ALBUMS_COLLECTION_NAME)
      .doc(song.album)
      .get()
      .then((response) => {
        const albumTemp = { ...response.data(), id: response.id };
        setAlbum(albumTemp);
        getImage(albumTemp);
      });
  }, [song, album]);

  const getImage = (album: any) => {
    firebase
      .storage()
      .ref(`${ALBUMS_FOLDER_NAME}/${album.banner}`)
      .getDownloadURL()
      .then((bannerUrl: string) => {
        setBanner(bannerUrl);
      });
  };

  const onPlay = () => {
    playSong(album.banner, song.name, song.filename);
  };

  return (
    <div className='songs-slider__list-song'>
      <div
        className='avatar'
        style={{ backgroundImage: `url('${banner}')` }}
        onClick={onPlay}
      >
        <Icon name='play circle outline' />
      </div>
      <Link to={`${ALBUM_ROUTE}/${album?.id}`}>
        <h3>{song.name}</h3>
      </Link>
    </div>
  );
};

export default SongSlide;
