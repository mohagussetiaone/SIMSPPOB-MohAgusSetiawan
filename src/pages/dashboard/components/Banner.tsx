import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ProfileImage from '@/assets/images/profile/ProfilePhoto.png';
import backgroundSaldo from '@/assets/images/background/BackgroundSaldo.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '@/features/membership/profileThunks';
import { fetchBalance } from '@/features/transaction/balanceThunks';
import { RootState, AppDispatch } from '@/store/store';

const Banner: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSaldoVisible, setIsSaldoVisible] = useState(false);
  const { profile } = useSelector((state: RootState) => state.profile);
  const { balance } = useSelector((state: RootState) => state.balance);

  console.log('profile', profile);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  const toggleSaldoVisibility = () => {
    setIsSaldoVisible(!isSaldoVisible);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-6">
        <div className="col-span-1 md:col-span-5">
          <div className="flex flex-col">
            <img
              src={
                profile?.data?.profile_image &&
                !profile.data.profile_image.includes('null')
                  ? profile.data.profile_image
                  : ProfileImage
              }
              alt="Profile"
              className="w-20 h-auto object-cover rounded-full"
            />
            <h3 className="flex mt-4">Selamat Datang,</h3>
            <h3 className="flex text-3xl font-semibold">
              {profile?.data.first_name} {profile?.data.last_name}
            </h3>
          </div>
        </div>
        <div className="col-span-1 md:col-span-7">
          <div
            className="flex flex-col justify-center text-start rounded-xl p-4 space-y-2 text-white"
            style={{
              backgroundImage: `url(${backgroundSaldo})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <h6 className="font-bold">Saldo Anda</h6>
            <p className="text-3xl font-bold">
              Rp.{' '}
              {isSaldoVisible
                ? balance?.data.balance
                  ? balance?.data.balance
                  : 0
                : '••••••••'}
            </p>
            <span
              className="flex gap-0.5 pt-2 cursor-pointer"
              onClick={toggleSaldoVisibility}
            >
              <p className="text-sm">Lihat Saldo</p>
              {isSaldoVisible ? (
                <EyeOff className="w-5 h-5 pt-0.5 pl-[6px]" />
              ) : (
                <Eye className="w-5 h-5 pt-0.5 pl-[6px]" />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
