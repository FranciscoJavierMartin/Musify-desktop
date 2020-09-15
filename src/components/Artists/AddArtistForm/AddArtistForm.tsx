import React, { useCallback, useState } from 'react';
import { Form, Input, Button, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import firebase from '../../../utils/firebase';
import 'firebase/storage';
import 'firebase/firestore';

import NoImage from '../../../assets/png/no-image.png';

import './AddArtistForm.scss';
import {
  ARTISTS_COLLECTION_NAME,
  ARTISTS_FOLDER_NAME,
} from '../../../constants/firebase';

interface IAddArtistFormProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const db = firebase.firestore();

const AddArtistForm: React.FC<IAddArtistFormProps> = ({ setShowModal }) => {
  const [banner, setBanner] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [formData, setFormData] = useState({
    name: '',
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    setBanner(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  });

  const onSubmit = () => {
    if (!formData.name) {
      toast.warning('Add artist name');
    } else if (!file) {
      toast.warning('Add artist image');
    } else {
      setIsLoading(true);
      const filename = uuidv4();
      uploadImage(filename)
        .then(() => {
          db.collection(ARTISTS_COLLECTION_NAME)
            .add({ name: formData.name, banner: filename })
            .then(() => {
              toast.success('Artist created');
              resetForm();
            })
            .catch(() => {
              toast.error('Error on create artist');
            })
            .finally(() => {
              setIsLoading(false);
              setShowModal(false);
            });
        })
        .catch(() => {
          toast.error('Error on upload image');
          setIsLoading(false);
        });
    }
  };

  const uploadImage = (filename: string): firebase.storage.UploadTask => {
    const ref = firebase
      .storage()
      .ref()
      .child(`${ARTISTS_FOLDER_NAME}/${filename}`);
    return ref.put(file!!);
  };

  const resetForm = () => {
    setFormData({ name: '' });
    setFile(undefined);
    setBanner('');
  };

  return (
    <Form className='add-artist-form' onSubmit={onSubmit}>
      <Form.Field className='artist-banner'>
        <div
          {...getRootProps()}
          className='banner'
          style={{ backgroundImage: `url('${banner}')` }}
        />
        <input {...getInputProps()} />
        {!banner && <Image src={NoImage} />}
      </Form.Field>
      <Form.Field className='artist-avatar'>
        <div
          className='avatar'
          style={{ backgroundImage: `url('${banner || NoImage}')` }}
        />
      </Form.Field>
      <Form.Field>
        <Input
          placeholder='Artist name'
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </Form.Field>
      <Button type='submit' loading={isLoading}>
        Create
      </Button>
    </Form>
  );
};

export default AddArtistForm;
