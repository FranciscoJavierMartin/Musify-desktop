import firebaseApp from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { ADMINS_COLLECTION_NAME } from '../constants/firebase';

const db = firebase.firestore(firebaseApp);

export async function getIsUserAdmin(uid: string): Promise<boolean> {
  return (await db.collection(ADMINS_COLLECTION_NAME).doc(uid).get()).exists;
}

export const reauthenticate = (
  password: string
): Promise<firebase.auth.UserCredential> | undefined => {
  const user = firebase.auth().currentUser;

  const credentials = firebase.auth.EmailAuthProvider.credential(
    user?.email || '',
    password
  );

  return user?.reauthenticateWithCredential(credentials);
};
