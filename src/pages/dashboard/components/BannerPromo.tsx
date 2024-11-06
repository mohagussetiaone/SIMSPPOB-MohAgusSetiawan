import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanner } from '@/features/information/bannerThunks';
import { RootState, AppDispatch } from '@/store/store';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const BannerPromo: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { banner } = useSelector((state: RootState) => state.banner);

  const [selectedBanner, setSelectedBanner] = useState<null | {
    banner_name: string;
    description: string;
    banner_image: string;
  }>(null);

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  const handleBannerClick = (service: {
    banner_name: string;
    description: string;
    banner_image: string;
  }) => {
    setSelectedBanner(service);
  };

  return (
    <>
      <div className="scrollbar-hidden whitespace-nowrap p-4">
        {banner?.data?.map((service, index) => (
          <div key={index} className="inline-block mr-4">
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src={service.banner_image}
                  alt={service.banner_name}
                  className="w-60 h-auto object-cover cursor-pointer"
                  onClick={() => handleBannerClick(service)}
                />
              </DialogTrigger>
              <DialogContent className="p-0 rounded-xl">
                <img
                  src={selectedBanner?.banner_image}
                  alt={selectedBanner?.banner_name}
                  className="w-full h-auto object-cover cursor-pointer"
                />
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </>
  );
};

export default BannerPromo;
