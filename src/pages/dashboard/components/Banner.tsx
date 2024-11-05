import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import ProfileImage from '@/assets/images/profile/ProfilePhoto.png';
import backgroundSaldo from '@/assets/images/background/BackgroundSaldo.png';

const Banner: React.FC = () => {
  const [isSaldoVisible, setIsSaldoVisible] = useState(false);

  const toggleSaldoVisibility = () => {
    setIsSaldoVisible(!isSaldoVisible);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-6">
        <div className="col-span-1 md:col-span-5">
          <div className="flex flex-col">
            <img
              src={ProfileImage}
              alt="Profile"
              className="w-20 h-auto object-cover"
            />
            <h3 className="flex">Selamat Datang,</h3>
            <h3 className="flex text-3xl font-semibold">Kristanto Wibowo</h3>
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
              Rp. {isSaldoVisible ? '500000' : '••••••••'}
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
