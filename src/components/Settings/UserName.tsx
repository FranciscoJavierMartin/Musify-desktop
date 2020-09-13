import React from 'react';
import {  Button } from 'semantic-ui-react';
import ChangeDiplayNameForm from './ChangeDiplayNameForm';

interface IUserNameProps {
  user: firebase.User;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
  setReloadApp: React.Dispatch<React.SetStateAction<boolean>>;
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const UserName: React.FC<IUserNameProps> = ({
  user,
  setShowModal,
  setModalContent,
  setModalTitle,
  setReloadApp,
}) => {
  const onEdit = () => {
    setModalTitle('Update name');
    setModalContent(
      <ChangeDiplayNameForm
        displayName={user.displayName}
        setShowModal={setShowModal}
        setReloadApp={setReloadApp}
      />
    );
    setShowModal(true);
  };
  return (
    <div className='user-name'>
      <h2>{user.displayName}</h2>
      <Button onClick={onEdit}>Update</Button>
    </div>
  );
};

export default UserName;
