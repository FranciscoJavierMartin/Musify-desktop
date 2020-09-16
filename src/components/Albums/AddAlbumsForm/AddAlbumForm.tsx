import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, Dropdown, Image } from 'semantic-ui-react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { map } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import {
  ALBUMS_COLLECTION_NAME,
  ALBUMS_FOLDER_NAME,
  ARTISTS_COLLECTION_NAME,
} from '../../../constants/firebase';
import firebase from '../../../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';

import NoImage from '../../../assets/png/no-image.png';
import './AddAlbumForm.scss';

const db = firebase.firestore();

interface IAddAlbumFormProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddAlbumForm: React.FC<IAddAlbumFormProps> = ({ setShowModal }) => {
  const [artists, setArtists] = useState<any[]>([]);
  const [albumImage, setAlbumImage] = useState<string>('');
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    artist: '',
  });

  useEffect(() => {
    db.collection(ARTISTS_COLLECTION_NAME)
      .get()
      .then((response) => {
        const arrayArtists = map(response?.docs, (artist) => ({
          value: artist.id,
          key: artist.id,
          text: artist.data().name,
        }));

        setArtists(arrayArtists);
      });
  }, [setArtists]);

  const uploadImage = (filename: string): firebase.storage.UploadTask => {
    return firebase
      .storage()
      .ref()
      .child(`${ALBUMS_FOLDER_NAME}/${filename}`)
      .put(file!!);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const myFile = acceptedFiles[0];
    setFile(myFile);
    setAlbumImage(URL.createObjectURL(myFile));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png',
    noKeyboard: true,
    onDrop,
  });

  const onSubmit = () => {
    if (!formData.name || !formData.artist) {
      toast.warning('Album name and artist are required');
    } else if (!file) {
      toast.warning('Album image is required');
    } else {
      const filename = uuidv4();
      setIsLoading(true);
      uploadImage(filename)
        .then(() => {
          db.collection(ALBUMS_COLLECTION_NAME)
            .add({
              name: formData.name,
              artist: formData.artist,
              banner: filename,
            })
            .then(() => {
              toast.success('Album created');
              setFormData({
                name: '',
                artist: '',
              });
              setFile(undefined);
              setAlbumImage('');
              setIsLoading(false);
              setShowModal(false);
            })
            .catch(() => {
              toast.warning('Error on create album');
              setIsLoading(false);
            });
        })
        .catch(() => {
          toast.warning('Error on upload image');
        });
    }
  };

  return (
    <Form className='add-album-form' onSubmit={onSubmit}>
      <Form.Group>
        <Form.Field className='album-avatar' width={5}>
          <div
            {...getRootProps()}
            className='avatar'
            style={{ backgroundImage: `url('${albumImage}')` }}
          />
          <input {...getInputProps()} />
          {/*!albumImage && <Image src={NoImage} />*/}
        </Form.Field>
        <Form.Field className='album-inputs' width={11}>
          <Input
            placeholder='Album name'
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Dropdown
            placeholder='Album belong to...'
            search
            fluid
            selection
            lazyLoad
            options={artists}
            onChange={(e, data) =>
              setFormData({ ...formData, artist: data.value as string })
            }
          />
        </Form.Field>
      </Form.Group>
      <Button type='submit' loading={isLoading}>
        Create Album
      </Button>
    </Form>
  );
};

export default AddAlbumForm;
