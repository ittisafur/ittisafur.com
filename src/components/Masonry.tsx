import * as React from 'react';
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import Image from 'next/image'

import bindClassNames from 'classnames/bind';

import styles from '@/styles/home.module.scss';
const cx = bindClassNames.bind(styles);

export default function ImageMasonry() {
  return (
    <Box className="w-full ">
      <Masonry columns={{ xs: 2, md: 3 }} spacing={1}>
        {itemData.map((item, index) => (
          <div key={index} className="">
            <Image
              src={`${item.img}?w=162&auto=format`}
              alt={item.title}
              height={item.height}
              width={item.width}
              className="h-full w-full rounded-lg "
            />
          </div>
        ))}
      </Masonry>
    </Box>
  );
}

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    height: 200,
    width: 150 
  },
  {
    img: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f',
    title: 'Snacks',
    height: 56,
    width: 28
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    height: 60,
    width: 28
  },
  {
    img: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383',
    title: 'Tower',
    height: 64,
    width: 28
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    height: 72,
    width: 24
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    height: 80,
    width: 28
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',

    height: 80,
    width: 28
  },
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',

    height: 80,
    width: 24
  },
  {
    img: 'https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d',
    title: 'Tree',

    height: 80,
    width: 28
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',

    height: 80,
    width: 28
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',

    height: 80,
    width: 24
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',

    height: 80,
    width: 28
  },
  {
    img: 'https://images.unsplash.com/photo-1627000086207-76eabf23aa2e',
    title: 'Camping Car',

    height: 80,
    width: 28
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',

    height: 80,
    width: 28
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',

    height: 80,
    width: 24
  },
  {
    img: 'https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7',
    title: 'Mountain',

    height: 80,
    width: 28
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',

    height: 80,
    width: 28
  },
];
