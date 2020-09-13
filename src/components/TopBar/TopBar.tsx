import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import firebase from '../../utils/firebase';
import 'firebase/auth';

import UserImage from '../../assets/png/user.png';

import './TopBar.scss';
import { SETTINGS_ROUTE } from '../../constants/routes';

interface ITopBarProp extends RouteComponentProps {
  user: firebase.User;
}

const TopBar: React.FC<ITopBarProp> = ({ user, history }) => {
  const logout = (): void => {
    firebase.auth().signOut();
  };
  const goBack = (): void => {
    history.goBack();
  };
  return (
    <div className='top-bar'>
      <div className='top-bar__left'>
        <Icon name='angle left' onClick={goBack} />
      </div>
      <div className='top-bar__right'>
        <Link to={SETTINGS_ROUTE}>
          <Image src={UserImage} />
          {user.displayName}
        </Link>
        <Icon name='power off' onClick={logout} />
      </div>
    </div>
  );
};

export default withRouter(TopBar);
