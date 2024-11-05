import React from 'react';
import Banner1 from '@/assets/images/banner/Banner1.png';
import Banner2 from '@/assets/images/banner/Banner2.png';
import Banner3 from '@/assets/images/banner/Banner3.png';
import Banner4 from '@/assets/images/banner/Banner4.png';
import Banner5 from '@/assets/images/banner/Banner5.png';

interface BannerProps {
  banner_name: string;
  banner_image: string;
  description: string;
  color_style: string;
}

const dataBanner: BannerProps[] = [
  {
    banner_name: 'Banner 1',
    banner_image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Lerem Ipsum Dolor sit amet',
    color_style: '#D53630',
  },
  {
    banner_name: 'Banner 2',
    banner_image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Lerem Ipsum Dolor sit amet',
    color_style: '#E396A6',
  },
  {
    banner_name: 'Banner 3',
    banner_image:
      'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Lerem Ipsum Dolor sit amet',
    color_style: '#4BC5EA',
  },
  {
    banner_name: 'Banner 4',
    banner_image:
      'https://images.unsplash.com/photo-1479936343636-73cdc5aae0c3?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Lerem Ipsum Dolor sit amet',
    color_style: '#E1E8F2',
  },
  {
    banner_name: 'Banner 5',
    banner_image:
      'https://plus.unsplash.com/premium_photo-1673957923985-b814a9dbc03d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description: 'Lerem Ipsum Dolor sit amet',
    color_style: '#D5B6A3',
  },
];

const services = [
  { img: Banner1, text: 'Banner 1' },
  { img: Banner2, text: 'Banner 2' },
  { img: Banner3, text: 'Banner 3' },
  { img: Banner4, text: 'Banner 4' },
  { img: Banner5, text: 'Banner 5' },
];

const BannerPromo: React.FC = () => {
  return (
    <>
      <div className="scrollbar-hidden flex gap-4 flex-1">
        {dataBanner.map((service, index) => (
          <div
            key={index}
            className="flex justify-between w-80 max-w-80 rounded-lg"
            style={{ backgroundColor: service.color_style }}
          >
            <div className="flex flex-col gap-1 p-4">
              <h1 className="text-xl">{service.banner_name}</h1>
              <p className="text-xs">{service.description}</p>
              <p className="text-xs">SIMS PPOB</p>
            </div>
            <div className="flex justify-center items-center w-24 h-24">
              <img src={service.banner_image} alt={service.banner_name} />
            </div>
          </div>
        ))}
      </div>
      <div className="scrollbar-hidden whitespace-nowrap p-4">
        {services.map((service, index) => (
          <div key={index} className="inline-block px-4">
            <img
              src={service.img}
              alt={service.text}
              className="w-60 h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BannerPromo;
