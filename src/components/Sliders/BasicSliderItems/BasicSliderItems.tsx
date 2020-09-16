import React from 'react';
import { map, size } from 'lodash';
import Slider from 'react-slick';
import './BasicSliderItems.scss';
import BasicSlide from '../BasicSlide/BasicSlide';

interface IBasicSlideItemsProps {
  title: string;
  data: any[];
  folderImage: string;
  urlName: string;
}

const BasicSliderItems: React.FC<IBasicSlideItemsProps> = ({ data, title, folderImage, urlName }) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    className: 'basic-slider-items__list',
  };

  return size(data) < 3 ? null : (
    <div className='basic-slider-items'>
      <h2>{title}</h2>
      <Slider {...settings}>
        {map(data, (item) => (
          <BasicSlide item={item} key={item.id} folderImage={folderImage} urlName={urlName}/>
        ))}
      </Slider>
    </div>
  );
};

export default BasicSliderItems;
