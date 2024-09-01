// src/components/ImageSlider.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Image } from 'semantic-ui-react';

const images = [
  'https://picsum.photos/800/300?random=1',
  'https://picsum.photos/800/300?random=2',
  'https://picsum.photos/800/300?random=3',
  'https://picsum.photos/800/300?random=4',
  'https://picsum.photos/800/300?random=5',
];

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
  };

  return (
    <Slider {...settings}>
      {images.map((url, index) => (
        <div key={index}>
          <Image src={url} centered />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
