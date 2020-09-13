import firebaseApp from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { ADMINS_COLLECTION_NAME } from '../constants/firebase';

const db = firebase.firestore(firebaseApp)

export async function getIsUserAdmin(uid: string){
  return (await db.collection(ADMINS_COLLECTION_NAME).doc(uid).get()).exists;
}