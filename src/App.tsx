import React, { useState } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import firebase from './utils/firebase';
import 'firebase/auth';
import Auth from './pages/Auth/Auth';
import LoggedLayout from './Layouts/LoggedLayout/LoggedLayout';

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reloadApp, setReloadApp] = useState<boolean>(false);

  firebase.auth().onAuthStateChanged((currentUser) => {
    if (!currentUser?.emailVerified) {
      firebase.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }

    setIsLoading(false);
  });

  return (
    <>
      {isLoading ? (
        <Dimmer active inverted>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
      ) : user ? (
        <LoggedLayout user={user} setReloadApp={setReloadApp}/>
      ) : (
        <Auth />
      )}
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={false}
      />
    </>
  );
};

export default App;
