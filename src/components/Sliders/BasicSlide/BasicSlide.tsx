import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../../utils/firebase';
import 'firebase/storage';

interface IBasicSlideProps {
  item: any;
  folderImage: string;
  urlName: string;
}

const BasicSlide: React.FC<IBasicSlideProps> = ({
  item,
  folderImage,
  urlName,
}) => {
  const [imageURL, setImageURL] = useState<string>('');

  useEffect(() => {
    firebase
      .storage()
      .ref(`${folderImage}/${item.banner}`)
      .getDownloadURL()
      .then((url: string) => {
        setImageURL(url);
      });
  }, [item, folderImage]);

  return (
    <Link to={`${urlName}/${item.id}`}>
      <div className='basic-slider-items__list-item'>
        <div
          className='avatar'
          style={{ backgroundImage: `url('${imageURL}')` }}
        />
        <h2>{item.name}</h2>
      </div>
    </Link>
  );
};

export default BasicSlide;
