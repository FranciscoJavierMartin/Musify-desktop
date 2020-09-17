import React from 'react';
import { Icon, Table } from 'semantic-ui-react';

interface ISongProps {
  song: any;
  playSong: (albumImage: string, songName: string, songUrl: string) => void;
  albumImage: string;
}

const Song: React.FC<ISongProps> = ({ song, playSong, albumImage }) => {

  const onPlay = () => {
    playSong(albumImage, song.name, song.filename);
  }

  return (
    <Table.Row onClick={onPlay}>
      <Table.Cell collapsing>
        <Icon name='play circle outline' />
      </Table.Cell>
      <Table.Cell>{song.name}</Table.Cell>
    </Table.Row>
  );
};

export default Song;
