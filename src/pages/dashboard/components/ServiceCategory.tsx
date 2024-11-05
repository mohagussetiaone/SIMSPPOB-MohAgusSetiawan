import React from 'react';
import { useNavigate } from 'react-router-dom';
import PbbImg from '@/assets/images/categoryServices/PBB.png';
import ListrikImg from '@/assets/images/categoryServices/Listrik.png';
import PulsaImg from '@/assets/images/categoryServices/Pulsa.png';
import PdamImg from '@/assets/images/categoryServices/PDAM.png';
import PgnImg from '@/assets/images/categoryServices/PGN.png';
import TvLanggananImg from '@/assets/images/categoryServices/Televisi.png';
import MusikImg from '@/assets/images/categoryServices/Musik.png';
import VoucherGameImg from '@/assets/images/categoryServices/Game.png';
import VoucherMakananImg from '@/assets/images/categoryServices/VoucherMakanan.png';
import KurbanImg from '@/assets/images/categoryServices/Kurban.png';
import ZakatImg from '@/assets/images/categoryServices/Zakat.png';
import PaketDataImg from '@/assets/images/categoryServices/PaketData.png';

interface ServiceCategory {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

const ServiceCategory: React.FC = () => {
  const navigate = useNavigate();
  const servicesCategory: ServiceCategory[] = [
    {
      service_code: 'PAJAK',
      service_name: 'Pajak PBB',
      service_icon: PbbImg,
      service_tariff: 40000,
    },
    {
      service_code: 'PLN',
      service_name: 'Listrik',
      service_icon: ListrikImg,
      service_tariff: 10000,
    },
    {
      service_code: 'PDAM',
      service_name: 'PDAM Berlangganan',
      service_icon: PdamImg,
      service_tariff: 40000,
    },
    {
      service_code: 'PULSA',
      service_name: 'Pulsa',
      service_icon: PulsaImg,
      service_tariff: 40000,
    },
    {
      service_code: 'PGN',
      service_name: 'PGN Berlangganan',
      service_icon: PgnImg,
      service_tariff: 50000,
    },
    {
      service_code: 'MUSIK',
      service_name: 'Musik Berlangganan',
      service_icon: MusikImg,
      service_tariff: 50000,
    },
    {
      service_code: 'TV',
      service_name: 'TV Berlangganan',
      service_icon: TvLanggananImg,
      service_tariff: 50000,
    },
    {
      service_code: 'PAKET_DATA',
      service_name: 'Paket data',
      service_icon: PaketDataImg,
      service_tariff: 50000,
    },
    {
      service_code: 'VOUCHER_GAME',
      service_name: 'Voucher Game',
      service_icon: VoucherGameImg,
      service_tariff: 100000,
    },
    {
      service_code: 'VOUCHER_MAKANAN',
      service_name: 'Voucher Makanan',
      service_icon: VoucherMakananImg,
      service_tariff: 100000,
    },
    {
      service_code: 'QURBAN',
      service_name: 'Qurban',
      service_icon: KurbanImg,
      service_tariff: 200000,
    },
    {
      service_code: 'ZAKAT',
      service_name: 'Zakat',
      service_icon: ZakatImg,
      service_tariff: 300000,
    },
  ];

  return (
    <div className="w-full py-6">
      <div className="flex flex-wrap justify-start">
        {servicesCategory.map((service, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center w-24"
            onClick={() =>
              navigate(`/payment/${service.service_code.toLowerCase()}`)
            }
          >
            <div className="rounded-xl">
              <img
                src={service.service_icon}
                alt={service.service_icon}
                className="w-12"
              />
            </div>
            <p className="block text-center whitespace-normal text-sm">
              {service.service_name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCategory;
