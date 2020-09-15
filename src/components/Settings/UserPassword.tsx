import React from 'react';
import { Button } from 'semantic-ui-react';
import ChangePasswordForm from './ChangePasswordForm';

interface IUserPasswordProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalTitle: React.Dispatch<React.SetStateAction<string>>;
  setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const UserPassword: React.FC<IUserPasswordProps> = ({
  setShowModal,
  setModalContent,
  setModalTitle,
}) => {
  const onEdit = (): void => {
    setModalTitle('Update Password');
    setModalContent(<ChangePasswordForm setShowModal={setShowModal} />);
    setShowModal(true);
  };
  return (
    <div className='user-password'>
      <h3>Password</h3>
      <Button circular onClick={onEdit}>
        Update
      </Button>
    </div>
  );
};

export default UserPassword;
