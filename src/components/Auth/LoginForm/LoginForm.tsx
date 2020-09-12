import React, { useState } from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { validateEmail } from '../../../utils/Validations';
import firebase from '../../../utils/firebase';
import { authSelectedForm } from '../../../constants/enums';

import './LoginForm.scss';
import ButtonResetSendEmailVerification from '../ButtonResetSendEmailVerification/ButtonResetSendEmailVerification';

interface ILoginFormProps {
  setSelectedForm: (selectedForm: authSelectedForm) => void;
}

interface IFormData {
  email: string;
  password: string;
}

interface IFormError {
  email: boolean;
  password: boolean;
}

const LoginForm: React.FC<ILoginFormProps> = ({ setSelectedForm }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState<Partial<IFormError>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUserActive, setIsUserActive] = useState<boolean>(true);
  const [user, setUser] = useState<firebase.User | null>(null);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setFormError({});

    let errors: Partial<IFormError> = {};
    let formOk = true;

    if (!validateEmail(formData.email)) {
      errors.email = true;
      formOk = false;
    }

    if (formData.password.length < 6) {
      errors.password = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      setIsLoading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then((res) => {
          setUser(res.user);
          setIsUserActive(!!res.user?.emailVerified);
          if (!res.user?.emailVerified) {
            toast.warning('Please verify your account');
          }
        })
        .catch((err) => {
          handleErrors(err.code);
        });
    }
  };

  return (
    <div className='login-form'>
      <h1>Music for everyone</h1>

      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input
            type='email'
            name='email'
            placeholder='Email'
            icon='mail outline'
            error={formError.email}
            onChange={onChange}
          />
          {formError.email && (
            <span className='error-text'>Type a valid email address</span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Password'
            icon={
              <Icon
                name={showPassword ? 'eye slash outline' : 'eye'}
                link
                onClick={toggleShowPassword}
              />
            }
            error={formError.password}
            onChange={onChange}
            required
          />
          {formError.password && (
            <span className='error-text'>Password too short</span>
          )}
        </Form.Field>
        <Button type='submit' loading={isLoading}>Log In</Button>
      </Form>

      {!isUserActive && (
        <ButtonResetSendEmailVerification
          user={user}
          setIsLoading={setIsLoading}
          setIsUserActive={setIsUserActive}
          handleErrors={handleErrors}
        />
      )}

      <div className='login-form__options'>
        <p onClick={() => setSelectedForm(authSelectedForm.AUTH_OPTIONS)}>
          Back
        </p>
        <p>
          You do not have an account?{' '}
          <span onClick={() => setSelectedForm(authSelectedForm.REGISTER)}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

function handleErrors(code: string): void {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      toast.warning('Email or password incorrect.');
      break;
    case 'auth/too-many-requests':
      toast.warning('Too many request. Wait some minutes until try again.');
      break;

    default:
      break;
  }
}

export default LoginForm;
