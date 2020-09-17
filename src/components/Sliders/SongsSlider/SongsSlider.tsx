import React from 'react';
import { map } from 'lodash';
import Slider from 'react-slick';
import SongSlide from '../SongSlide/SongSlide';

import './SongsSlider.scss';

interface ISongsSlider {
  title: string;
  data: any[];
  playSong: (albumImage: string, songName: string, songUrl: string) => void;
}

const SongsSlider: React.FC<ISongsSlider> = ({ title, data, playSong }) => {
  return (
    <div className='songs-slider'>
      <h2>{title}</h2>
      <Slider
        infinite
        centerMode
        dots={false}
        speed={500}
        slidesToShow={3}
        slidesToScroll={1}
        className='songs-slider__list'
      >
        {map(data, (song) => (
          <SongSlide key={song.id} song={song} playSong={playSong} />
        ))}
      </Slider>
    </div>
  );
};

export default SongsSlider;
