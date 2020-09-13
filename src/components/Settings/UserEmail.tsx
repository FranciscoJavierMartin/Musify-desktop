import React from 'react';
import { Button } from 'semantic-ui-react';
import ChangeEmailForm from './ChangeEmailForm';

interface IUserEmailProps {
  user: firebase.User;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const UserEmail: React.FC<IUserEmailProps> = ({
  user,
  setShowModal,
  setModalContent,
  setModalTitle,
}) => {
  const onEdit = () => {
    setModalTitle('Update email');
    setModalContent(
      <ChangeEmailForm email={user.email} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };
  return (
    <div className='user-email'>
      <h3>Email: {user.email}</h3>
      <Button circular onClick={onEdit}>
        Update
      </Button>
    </div>
  );
};

export default UserEmail;
