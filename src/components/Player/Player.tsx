import React, { useEffect, useState } from 'react';
import { Grid, Progress, Icon, Input, Image } from 'semantic-ui-react';
import ReactPlayer from 'react-player';
import { ISongData } from '../../interfaces/interfaces';

import './Player.scss';
import './inputRange.scss';

interface IPlayerProps {
  songData?: ISongData;
}

const Player: React.FC<IPlayerProps> = ({ songData }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playerSeconds, setPlayerSeconds] = useState<number>(0);
  const [totalSeconds, setTotalSeconds] = useState<number>(120);
  const [volume, setVolume] = useState<number>(0.03);

  useEffect(() => {
    if (songData?.url) {
      onStart();
    }
  }, [songData]);

  const onStart = () => {
    setIsPlaying(true);
  };

  const onPause = () => {
    setIsPlaying(false);
  };

  const onProgress = (data: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => {
    setPlayerSeconds(data.playedSeconds);
    setTotalSeconds(data.loadedSeconds);
  };

  return (
    <div className='player'>
      <Grid>
        <Grid.Column width={4} className='left'>
          <Image src={songData?.albumImage} />
          {songData?.name}
        </Grid.Column>
        <Grid.Column width={8} className='center'>
          <div className='controls'>
            {isPlaying ? (
              <Icon name='pause circle outline' link onClick={onPause} />
            ) : (
              <Icon name='play circle outline' link onClick={onStart} />
            )}
          </div>
          <Progress
            progress='value'
            value={playerSeconds}
            total={totalSeconds}
            size='tiny'
          />
        </Grid.Column>
        <Grid.Column widescreen={4} className='right'>
          <Input
            type='range'
            label={<Icon name='volume up' />}
            min={0}
            max={1}
            step={0.01}
            name='volume'
            value={volume}
            onChange={(e, data) => {
              setVolume(+data.value);
            }}
          />
        </Grid.Column>
      </Grid>
      <ReactPlayer
        className='react-player'
        url={songData?.url}
        playing={isPlaying}
        height={0}
        volume={volume}
        onProgress={onProgress}
      />
    </div>
  );
};

export default Player;
