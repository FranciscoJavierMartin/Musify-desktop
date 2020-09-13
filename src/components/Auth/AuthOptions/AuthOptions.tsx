import React from 'react';
import { Button } from 'semantic-ui-react';
import { authSelectedForm } from '../../../constants/enums';
import './AuthOptions.scss';

interface IAuthOptionsProps {
  setSelectedForm: React.Dispatch<React.SetStateAction<authSelectedForm>>;
}

const AuthOptions: React.FC<IAuthOptionsProps> = ({ setSelectedForm }) => {
  return (
    <div className='auth-options'>
      <h2>Millions of free songs on Musify</h2>
      <Button
        className='register'
        onClick={() => setSelectedForm(authSelectedForm.REGISTER)}
      >
        Register
      </Button>
      <Button
        className='login'
        onClick={() => setSelectedForm(authSelectedForm.LOGIN)}
      >
        Login
      </Button>
    </div>
  );
};

export default AuthOptions;
