import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Form, Input } from 'semantic-ui-react';
import firebase from '../../utils/firebase';

interface IChangeDisplayNameFormProps {
  displayName: string | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setReloadApp: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeDiplayNameForm: React.FC<IChangeDisplayNameFormProps> = ({
  displayName,
  setShowModal,
  setReloadApp,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    displayName,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    if (!formData.displayName || formData.displayName === displayName) {
      setShowModal(false);
    } else {
      setIsLoading(true);

      firebase
        .auth()
        .currentUser?.updateProfile({ displayName: formData.displayName })
        .then(() => {
          setReloadApp((prevState) => !prevState);
          toast.success('Name updated');
          setIsLoading(false);
          setShowModal(false);
        })
        .catch(() => {
          toast.error('Error updating name');
        });
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <Input
          defaultValue={displayName}
          onChange={(e) => setFormData({ displayName: e.target.value })}
        />
      </Form.Field>
      <Button type='submit' loading={isLoading}>
        Update name
      </Button>
    </Form>
  );
};

export default ChangeDiplayNameForm;
