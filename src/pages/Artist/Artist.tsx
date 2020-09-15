import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import firebase from '../../utils/firebase';
import 'firebase/firestore';

import './Artist.scss';
import { ARTISTS_COLLECTION_NAME } from '../../constants/firebase';
import BannerArtist from '../../components/Artists/BannerArtist/BannerArtist';

interface IArtistParamProps {
  id: string;
}

interface IArtistProps extends RouteComponentProps<IArtistParamProps> {}

const db = firebase.firestore();

const Artist: React.FC<IArtistProps> = ({ match }) => {
  const [artist, setArtist] = useState<any>(null);

  useEffect(() => {
    db.collection(ARTISTS_COLLECTION_NAME)
      .doc(match?.params?.id)
      .get()
      .then((response) => {
        setArtist(response.data());
      });
  }, [match]);

  return (
    <div className='artist'>{artist && <BannerArtist artist={artist} />}</div>
  );
};

export default withRouter(Artist);
