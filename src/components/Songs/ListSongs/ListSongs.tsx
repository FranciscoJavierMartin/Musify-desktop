import React from 'react';
import { Table } from 'semantic-ui-react';
import { map } from 'lodash';

import './ListSongs.scss';
import Song from '../Song/Song';

interface IListSongsProps {
  albumImage: string;
  songs: any[];
  playSong: (albumImage: string, songName: string, songUrl: string) => void;
}

const ListSongs: React.FC<IListSongsProps> = ({ songs, albumImage, playSong }) => {
  return (
    <Table inverted className='list-songs'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Title</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {map(songs, (song) => (
          <Song key={song.id} song={song} playSong={playSong} albumImage={albumImage}/>
        ))}
      </Table.Body>
    </Table>
  );
};

export default ListSongs;
