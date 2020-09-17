import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import MenuLeft from '../../components/MenuLeft/MenuLeft';
import Player from '../../components/Player/Player';
import TopBar from '../../components/TopBar/TopBar';
import { ISongData } from '../../interfaces/interfaces';
import Routes from '../../routes/Routes';
import './LoggedLayout.scss';

import firebase from '../../utils/firebase';
import 'firebase/storage';
import { SONGS_FOLDER_NAME } from '../../constants/firebase';

interface ILoggedLayoutProps {
  user: firebase.User;
  setReloadApp: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoggedLayout: React.FC<ILoggedLayoutProps> = ({ user, setReloadApp }) => {
  const [songData, setSongData] = useState<ISongData>();

  const playSong = (
    albumImage: string,
    songName: string,
    songFileName: string
  ): void => {
    firebase
      .storage()
      .ref(`${SONGS_FOLDER_NAME}/${songFileName}`)
      .getDownloadURL()
      .then((url: string) => {
        setSongData({
          albumImage,
          name: songName,
          url,
        });
      });
  };

  return (
    <BrowserRouter>
      <Grid className='logged-layout'>
        <Grid.Row>
          <Grid.Column width={3}>
            <MenuLeft user={user} />
          </Grid.Column>
          <Grid.Column className='content' width={13}>
            <TopBar user={user} />
            <Routes
              user={user}
              setReloadApp={setReloadApp}
              playSong={playSong}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16}>
            <Player songData={songData} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </BrowserRouter>
  );
};

export default LoggedLayout;
