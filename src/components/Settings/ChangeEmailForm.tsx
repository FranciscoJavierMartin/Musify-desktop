import React, { useState } from 'react';
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import firebase from '../../utils/firebase';
import 'firebase/auth';
import { reauthenticate } from '../../utils/api';
import AlertErrors from '../AlertErrors';
import { toast } from 'react-toastify';

interface IChangeEmailFormProps {
  email: string | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeEmailForm: React.FC<IChangeEmailFormProps> = ({
  email,
  setShowModal,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (!formData.email) {
      setShowModal(false);
    } else {
      setIsLoading(true);

      reauthenticate(formData.password)
        ?.then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser
            ?.updateEmail(formData.email)
            .then(() => {
              toast.success('Email updated');
              setIsLoading(false);
              setShowModal(false);
              currentUser.sendEmailVerification().then(() => {
                firebase.auth().signOut();
              })
            })
            .catch((err) => {
              AlertErrors(err?.code);
            });
        })
        .catch((err) => {
          AlertErrors(err?.code);
          setIsLoading(false);
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={email}
          type='email'
          onChange={onChange}
          name='email'
        />
      </Form.Field>
      <Form.Field>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder='Password'
          name='password'
          icon={
            <Icon
              name={showPassword ? 'eye slash outline' : 'eye'}
              link
              onClick={toggleShowPassword}
            />
          }
        />
      </Form.Field>
      <Button type='submit' loading={isLoading}>
        Update email
      </Button>
    </Form>
  );
};

export default ChangeEmailForm;
