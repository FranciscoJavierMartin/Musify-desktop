import React from 'react';

interface IAlbumHeaderProps {
  imageUrl: string;
  albumName: string;
  artistName: string;
}

const AlbumHeader: React.FC<IAlbumHeaderProps> = ({
  imageUrl,
  albumName,
  artistName,
}) => {
  return (
    <>
      <div
        className='image'
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />
      <div className='info'>
        <h1>{albumName}</h1>
        <p>
          De{' '}<span>{artistName}</span>
        </p>
      </div>
    </>
  );
};

export default AlbumHeader;
