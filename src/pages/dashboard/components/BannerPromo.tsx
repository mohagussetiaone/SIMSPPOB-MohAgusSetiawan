import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanner } from '@/features/information/bannerThunks';
import { RootState, AppDispatch } from '@/store/store';

const BannerPromo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { banner, status, error } = useSelector(
    (state: RootState) => state.banner
  );

  console.log('dataBanner', banner);

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  return (
    <>
      {/* <div className="scrollbar-hidden flex gap-4 flex-1">
        {banner &&
          banner?.data?.map((service, index) => (
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
      </div> */}
      <div className="scrollbar-hidden whitespace-nowrap p-4">
        {banner?.data?.map((service, index) => (
          <div key={index} className="inline-block mr-4">
            <img
              src={service.banner_image}
              alt={service.banner_name}
              className="w-60 h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BannerPromo;
