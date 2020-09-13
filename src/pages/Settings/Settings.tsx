import React, { useState } from 'react';
import BasicModal from '../../components/Modal/BasicModal/BasicModal';

import UploadAvatar from '../../components/Settings/UploadAvatar';
import UserEmail from '../../components/Settings/UserEmail';
import UserName from '../../components/Settings/UserName';
import UserPassword from '../../components/Settings/UserPassword';

import './Settings.scss';

interface ISettingsProps {
  user: firebase.User;
  setReloadApp: React.Dispatch<React.SetStateAction<boolean>>;
}

const Settings: React.FC<ISettingsProps> = ({ user, setReloadApp }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  return (
    <div className='settings'>
      <h1>Settings</h1>
      <div className='avatar-name'>
        <UploadAvatar user={user} setReloadApp={setReloadApp} />
        <UserName
          user={user}
          setShowModal={setShowModal}
          setModalTitle={setModalTitle}
          setModalContent={setModalContent}
          setReloadApp={setReloadApp}
        />
      </div>
      <UserEmail
        user={user}
        setShowModal={setShowModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
      />
      <UserPassword
        setShowModal={setShowModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}/>
      <BasicModal show={showModal} setShow={setShowModal} title={modalTitle}>
        {modalContent}
      </BasicModal>
    </div>
  );
};

export default Settings;
