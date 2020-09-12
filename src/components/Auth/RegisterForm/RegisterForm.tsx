import React, { useState } from 'react';
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import 'firebase/auth';
import { validateEmail } from '../../../utils/Validations';
import firebase from '../../../utils/firebase';

import './RegisterForm.scss';
import { authSelectedForm } from '../../../constants/enums';

interface IRegisterFormProps {
  setSelectedForm: (selectedForm: authSelectedForm) => void;
}

interface IFormData {
  email: string;
  password: string;
  username: string;
}

interface IFormError {
  email: boolean;
  password: boolean;
  username: boolean;
}

const RegisterForm: React.FC<IRegisterFormProps> = ({ setSelectedForm }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    password: '',
    username: '',
  });
  const [formError, setFormError] = useState<Partial<IFormError>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
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

    if (!formData.username) {
      errors.username = true;
      formOk = false;
    }

    setFormError(errors);

    if (formOk) {
      setIsLoading(true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          changeUserName();
          sendVerificationEmail();
        })
        .catch(() => {
          toast.error('Error on create account');
        })
        .finally(() => {
          setIsLoading(false);
          setSelectedForm(authSelectedForm.AUTH_OPTIONS);
        });
    }
  };

  const changeUserName = () => {
    firebase
      .auth()
      .currentUser?.updateProfile({
        displayName: formData.username,
      })
      .catch(() => {
        toast.error('Error assigning username');
      });
  };

  const sendVerificationEmail = () => {
    firebase
      .auth()
      .currentUser?.sendEmailVerification()
      .then(() => {
        toast.success('An verification email has been sent.')
      })
      .catch(() => {
        toast.error('Error on verification email.');
      });
  };

  return (
    <div className='register-form'>
      <h1>Start to listen with a free account</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Input
            type='text'
            name='email'
            placeholder='Email'
            icon='mail outline'
            onChange={onChange}
            error={formError.email}
          />
          {formError.email && (
            <span className='error-text'>Invalid email.</span>
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
            onChange={onChange}
            error={formError.password}
          />
          {formError.password && (
            <span className='error-text'>Invalid password. Too short.</span>
          )}
        </Form.Field>
        <Form.Field>
          <Input
            type='text'
            name='username'
            placeholder='Username'
            icon='user circle outline'
            onChange={onChange}
            error={formError.username}
          />
          {formError.username && (
            <span className='error-text'>Username required</span>
          )}
        </Form.Field>
        <Button type='submit' loading={isLoading}>
          Continue
        </Button>
      </Form>
      <div className='register-form__options'>
        <p onClick={() => setSelectedForm(authSelectedForm.AUTH_OPTIONS)}>
          Back
        </p>
        <p>
          Have you an account?{' '}
          <span onClick={() => setSelectedForm(authSelectedForm.LOGIN)}>
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
