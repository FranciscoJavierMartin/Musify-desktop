import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  ALBUMS_ROUTE,
  ALBUM_ROUTE,
  ARTISTS_ROUTE,
  ARTIST_ROUTE,
  HOME_ROUTE,
  SETTINGS_ROUTE,
} from '../constants/routes';
import Home from '../pages/Home/Home';
import Artist from '../pages/Artist/Artist';
import Artists from '../pages/Artists/Artists';
import Settings from '../pages/Settings/Settings';
import Albums from '../pages/Albums/Albums';
import Album from '../pages/Album/Album';

interface IRoutesProps {
  user: firebase.User;
  setReloadApp: React.Dispatch<React.SetStateAction<boolean>>;
  playSong: (albumImage: string, songName: string, songUrl: string) => void;
}

const Routes: React.FC<IRoutesProps> = ({ user, setReloadApp, playSong }) => {
  return (
    <Switch>
      <Route
        path={HOME_ROUTE}
        exact
        render={() => <Home playSong={playSong} />}
      />
      <Route path={ALBUMS_ROUTE} exact component={Albums} />
      <Route path={`${ALBUM_ROUTE}/:id`} exact render={() => <Album playSong={playSong}/>} />
      <Route path={ARTISTS_ROUTE} exact component={Artists} />
      <Route
        path={`${ARTIST_ROUTE}/:id`}
        exact
        render={() => <Artist playSong={playSong} />}
      />
      <Route
        path={SETTINGS_ROUTE}
        exact
        render={() => <Settings user={user} setReloadApp={setReloadApp} />}
      />
    </Switch>
  );
};

export default Routes;
