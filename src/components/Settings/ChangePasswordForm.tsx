import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import { reauthenticate } from '../../utils/api';
import AlertErrors from '../AlertErrors';
import firebase from '../../utils/firebase';
import 'firebase/auth';

interface IChangePasswordFormProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangePasswordForm: React.FC<IChangePasswordFormProps> = ({
  setShowModal,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  });

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.repeatNewPassword
    ) {
      toast.warning('Fields cannot be empty.');
    } else if (formData.currentPassword === formData.newPassword) {
      toast.warning(
        'New password cannot be the same than the current password.'
      );
    } else if (formData.newPassword !== formData.repeatNewPassword) {
      toast.warning('New passwords does not match.');
    } else if (formData.newPassword.length < 6) {
      toast.warning(
        'New password is too short. Must contains at least 6 characters.'
      );
    } else {
      setIsLoading(true);
      reauthenticate(formData.currentPassword)
        ?.then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser?.updatePassword(formData.newPassword).then(() => {
            toast.success('Password updated');
            setIsLoading(false);
            setShowModal(false);
          }).catch(err => {
            AlertErrors(err.code);
            setIsLoading(false);
          })
        })
        .catch((err) => {
          AlertErrors(err.code);
          setIsLoading(false);
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder='Current password'
          name='currentPassword'
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
          icon={
            <Icon
              name={showPassword ? 'eye slash outline' : 'eye'}
              link
              onClick={toggleShowPassword}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder='New password'
          name='newPassword'
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
          icon={
            <Icon
              name={showPassword ? 'eye slash outline' : 'eye'}
              link
              onClick={toggleShowPassword}
            />
          }
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder='Repeat password'
          name='repeatNewPassword'
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
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
        Update password
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;
