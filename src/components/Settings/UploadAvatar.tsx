import React, { useState, useCallback } from 'react';
import { Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import firebase from '../../utils/firebase';
import 'firebase/storage';
import 'firebase/auth';

import NoAvatar from '../../assets/png/user.png';
import { AVATARS_FOLDER_NAME } from '../../constants/firebase';

interface IUploadAvatarProps {
  user: firebase.User;
  setReloadApp: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadAvatar: React.FC<IUploadAvatarProps> = ({ user, setReloadApp }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user.photoURL);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setAvatarUrl(URL.createObjectURL(file));
    uploadImage(file)
      .then(() => {
        updateUserAvatar();
      })
      .catch(console.log);
  }, []);

  const uploadImage = (file: File): firebase.storage.UploadTask => {
    const ref = firebase
      .storage()
      .ref()
      .child(`${AVATARS_FOLDER_NAME}/${user.uid}`);
    return ref.put(file);
  };

  const updateUserAvatar = () => {
    firebase
      .storage()
      .ref(`${AVATARS_FOLDER_NAME}/${user.uid}`)
      .getDownloadURL()
      .then(async (response: string) => {
        console.log(response)
        await firebase.auth().currentUser?.updateProfile({ photoURL: response });
        setReloadApp((prevState: boolean) => !prevState);
      })
      .catch((err) => {
        toast.error('Error on update avatar');
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className='user-avatar' {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Image src={NoAvatar} />
      ) : (
        <Image src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
};

export default UploadAvatar;
