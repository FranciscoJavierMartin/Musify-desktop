import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ARTIST_ROUTE, HOME_ROUTE, SETTINGS_ROUTE } from '../constants/routes';
import Home from '../pages/Home/Home';
import Artists from '../pages/Artists/Artists';
import Settings from '../pages/Settings/Settings';

interface IRoutesProps {
  user: firebase.User;
  setReloadApp: React.Dispatch<React.SetStateAction<boolean>>;
}

const Routes: React.FC<IRoutesProps> = ({ user, setReloadApp }) => {
  return (
    <Switch>
      <Route path={HOME_ROUTE} exact component={Home} />
      <Route path={ARTIST_ROUTE} exact component={Artists} />
      <Route
        path={SETTINGS_ROUTE}
        exact
        render={() => <Settings user={user} setReloadApp={setReloadApp}/>}
      />
    </Switch>
  );
};

export default Routes;
