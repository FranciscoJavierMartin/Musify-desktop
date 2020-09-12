import React from 'react';
import { toast } from 'react-toastify';

import './ButtonResetSendEmailVerification.scss';

interface IButtonResetSendEmailVerificationProps {
  user: firebase.User | null;
  setIsLoading: (isLoading: boolean) => void;
  setIsUserActive: (isActive: boolean) => void;
  handleErrors: (code: string) => void;
}

const ButtonResetSendEmailVerification: React.FC<IButtonResetSendEmailVerificationProps> = ({
  user,
  setIsLoading,
  setIsUserActive,
  handleErrors,
}) => {
  const resendVerificationEmail = () => {
    user
      ?.sendEmailVerification()
      .then(() => {
        toast.success(
          'An verification email has been sent. Please check your inbox'
        );
      })
      .catch((err) => {
        handleErrors(err.code);
      })
      .finally(() => {
        setIsLoading(false);
        setIsUserActive(true);
      });
  };
  return (
    <div className='resend-verification-email'>
      <p>
        If you has not received the verification email, you can click{' '}
        <span onClick={resendVerificationEmail}>here</span> to send again
      </p>
    </div>
  );
};



export default ButtonResetSendEmailVerification;
