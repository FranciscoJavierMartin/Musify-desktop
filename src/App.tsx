import React from 'react';
import firebase from './utils/firebase';
import 'firebase/auth';

function App() {
  
  firebase.auth().onAuthStateChanged(currentUser => {

  });
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
