import React, { useState } from 'react';
import AuthOptions from '../../components/Auth/AuthOptions/AuthOptions';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import BackgroundAuth from '../../assets/jpg/background-auth.jpg';
import LogoNameWhite from '../../assets/png/logo-name-white.png';
import './Auth.scss';
import { authSelectedForm } from '../../constants/enums';

const Auth: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<authSelectedForm>(authSelectedForm.AUTH_OPTIONS);

  const handlerForm = () => {
    let choosenForm;

    switch (selectedForm) {
      case authSelectedForm.LOGIN:
        choosenForm = <LoginForm setSelectedForm={setSelectedForm}/>;
        break;
      case authSelectedForm.REGISTER:
        choosenForm = <RegisterForm setSelectedForm={setSelectedForm}/>;
        break;
      case authSelectedForm.AUTH_OPTIONS:
        choosenForm = <AuthOptions setSelectedForm={setSelectedForm} />;
        break;
      default:
        choosenForm = null;
    }

    return choosenForm;
  };
  return (
    <div className='auth' style={{backgroundImage: `url(${BackgroundAuth})`}}>
      <div className='auth__dark'/>
      <div className='auth__box'>
        <div className='auth__box-logo'>
          <img src={LogoNameWhite} alt='Musify'/>
        </div>
        {handlerForm()}
      </div>
    </div>
  );
};

export default Auth;
