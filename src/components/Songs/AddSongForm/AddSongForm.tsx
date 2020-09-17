import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Button, Icon, Dropdown } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { map } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import firebase from '../../../utils/firebase';
import 'firebase/firestore';
import 'firebase/storage';
import {
  ALBUMS_COLLECTION_NAME,
  SONGS_COLLECTION_NAME,
  SONGS_FOLDER_NAME,
} from '../../../constants/firebase';

import './AddSongForm.scss';

const db = firebase.firestore();

interface IAddSongFormPros {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSongForm: React.FC<IAddSongFormPros> = ({ setShowModal }) => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    album: '',
  });

  useEffect(() => {
    db.collection(ALBUMS_COLLECTION_NAME)
      .get()
      .then((response) => {
        setAlbums(
          map(response?.docs, (album) => ({
            key: album.id,
            value: album.id,
            text: album.data().name,
          }))
        );
      });
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: '.mp3',
    noKeyboard: true,
  });

  const uploadSong = (filename: string): firebase.storage.UploadTask => {
    return firebase
      .storage()
      .ref()
      .child(`${SONGS_FOLDER_NAME}/${filename}`)
      .put(file!!);
  };

  const onSubmit = () => {
    if (!formData.name || !formData.album) {
      toast.warning('Song name and album are required');
    } else if (!file) {
      toast.warning('Song file is required');
    } else {
      setIsLoading(true);
      const filename = uuidv4();
      uploadSong(filename)
        .then(() => {
          db.collection(SONGS_COLLECTION_NAME)
            .add({
              name: formData.name,
              album: formData.album,
              filename,
            })
            .then(() => {
              toast.success('Song created');
              setFormData({ name: '', album: '' });
              setIsLoading(false);
              setShowModal(false);
            })
            .catch(() => {
              toast.error('Error on upload song');
              setIsLoading(false);
            });
        })
        .catch(() => {
          toast.error('Error on upload song');
          setIsLoading(false);
        });
    }
  };

  return (
    <Form className='add-song-form' onSubmit={onSubmit}>
      <Form.Field>
        <Input
          placeholder='Song name'
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </Form.Field>
      <Form.Field>
        <Dropdown
          placeholder='Assign to an album'
          search
          options={albums}
          selection
          lazyLoad
          onChange={(e, data) => {
            setFormData({ ...formData, album: data.value as string });
          }}
        />
      </Form.Field>
      <Form.Field>
        <div className='song-upload' {...getRootProps()}>
          <input {...getInputProps()} />
          <Icon name='cloud upload' className={file && 'load'} />
          <div>
            {file ? (
              <p>
                Song uploaded: <span>{file.name}</span>
              </p>
            ) : (
              <p>
                Drag your song or click <span>here</span>
              </p>
            )}
          </div>
        </div>
      </Form.Field>
      <Button type='submit' loading={isLoading}>
        Upload song
      </Button>
    </Form>
  );
};

export default AddSongForm;
