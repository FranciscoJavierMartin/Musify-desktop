import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import MenuLeft from '../../components/MenuLeft/MenuLeft';
import Routes from '../../routes/Routes';
import './LoggedLayout.scss';

interface ILoggedLayoutProps {
  user: firebase.User | null;
}

const LoggedLayout: React.FC<ILoggedLayoutProps> = ({ user }) => {
  return (
    <Grid className='logged-layout'>
      <Grid.Row>
        <Grid.Column width={3}>
          <MenuLeft />
        </Grid.Column>
        <Grid.Column className='content' width={13}>
          <h2>TopBar</h2>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={16}>
          <h2>Player</h2>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default LoggedLayout;
