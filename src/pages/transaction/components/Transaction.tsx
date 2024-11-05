import React, { useState } from 'react';

interface TransactionData {
  nominal: number;
  date: string;
  type: 'debit' | 'credit';
  description: string;
}

const transactions: TransactionData[] = [
  {
    nominal: 40000,
    date: '17 Agustus 2023 12:10 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -15000,
    date: '20 Agustus 2023 14:45 WIB',
    type: 'credit',
    description: 'Pulsa Prabayar',
  },
  {
    nominal: 50000,
    date: '25 Agustus 2023 09:30 WIB',
    type: 'debit',
    description: 'Listrik Pascabayar',
  },
  {
    nominal: -25000,
    date: '27 Agustus 2023 18:20 WIB',
    type: 'credit',
    description: 'Topup Saldo',
  },
  {
    nominal: 100000,
    date: '30 Agustus 2023 08:00 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -20000,
    date: '01 September 2023 11:00 WIB',
    type: 'credit',
    description: 'Belanja Online',
  },
  {
    nominal: 30000,
    date: '03 September 2023 15:30 WIB',
    type: 'debit',
    description: 'Bayar Internet',
  },
  {
    nominal: -5000,
    date: '05 September 2023 09:15 WIB',
    type: 'credit',
    description: 'Kembali Saldo',
  },
  {
    nominal: 60000,
    date: '06 September 2023 12:45 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -4000,
    date: '08 September 2023 14:20 WIB',
    type: 'credit',
    description: 'Belanja Minimarket',
  },
  {
    nominal: 75000,
    date: '10 September 2023 16:10 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -30000,
    date: '12 September 2023 18:35 WIB',
    type: 'credit',
    description: 'Biaya Transfer',
  },
  {
    nominal: 120000,
    date: '15 September 2023 08:50 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -10000,
    date: '17 September 2023 10:25 WIB',
    type: 'credit',
    description: 'Beli Buku',
  },
  {
    nominal: 90000,
    date: '20 September 2023 14:15 WIB',
    type: 'debit',
    description: 'Bayar Listrik',
  },
  {
    nominal: -15000,
    date: '22 September 2023 16:45 WIB',
    type: 'credit',
    description: 'Topup Saldo',
  },
  {
    nominal: 45000,
    date: '24 September 2023 12:05 WIB',
    type: 'debit',
    description: 'Bayar Air',
  },
  {
    nominal: -20000,
    date: '26 September 2023 11:30 WIB',
    type: 'credit',
    description: 'Jasa Pengiriman',
  },
  {
    nominal: 80000,
    date: '28 September 2023 14:00 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -35000,
    date: '30 September 2023 09:50 WIB',
    type: 'credit',
    description: 'Belanja Bulanan',
  },
  {
    nominal: 30000,
    date: '02 Oktober 2023 13:30 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -45000,
    date: '05 Oktober 2023 10:20 WIB',
    type: 'credit',
    description: 'Bayar Langganan',
  },
  {
    nominal: 100000,
    date: '07 Oktober 2023 15:15 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -6000,
    date: '09 Oktober 2023 17:45 WIB',
    type: 'credit',
    description: 'Beli Snack',
  },
  {
    nominal: 25000,
    date: '11 Oktober 2023 11:05 WIB',
    type: 'debit',
    description: 'Bayar PBB',
  },
  {
    nominal: -10000,
    date: '13 Oktober 2023 12:55 WIB',
    type: 'credit',
    description: 'Topup Saldo',
  },
  {
    nominal: 70000,
    date: '15 Oktober 2023 14:30 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -3000,
    date: '17 Oktober 2023 09:15 WIB',
    type: 'credit',
    description: 'Belanja Sembako',
  },
  {
    nominal: 50000,
    date: '19 Oktober 2023 08:00 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -25000,
    date: '21 Oktober 2023 19:20 WIB',
    type: 'credit',
    description: 'Transfer ke Teman',
  },
  {
    nominal: 150000,
    date: '23 Oktober 2023 10:10 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -4000,
    date: '25 Oktober 2023 16:45 WIB',
    type: 'credit',
    description: 'Beli Makanan',
  },
  {
    nominal: 60000,
    date: '27 Oktober 2023 14:50 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -50000,
    date: '29 Oktober 2023 12:30 WIB',
    type: 'credit',
    description: 'Tagihan Telepon',
  },
  {
    nominal: 35000,
    date: '31 Oktober 2023 11:15 WIB',
    type: 'debit',
    description: 'Bayar Internet',
  },
  {
    nominal: -20000,
    date: '02 November 2023 13:40 WIB',
    type: 'credit',
    description: 'Biaya Jasa',
  },
  {
    nominal: 90000,
    date: '04 November 2023 09:05 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -7000,
    date: '06 November 2023 15:25 WIB',
    type: 'credit',
    description: 'Beli Pulsa',
  },
  {
    nominal: 50000,
    date: '08 November 2023 10:50 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -15000,
    date: '10 November 2023 18:15 WIB',
    type: 'credit',
    description: 'Topup Saldo',
  },
  {
    nominal: 120000,
    date: '12 November 2023 11:30 WIB',
    type: 'debit',
    description: 'Bayar Sewa',
  },
  {
    nominal: -5000,
    date: '14 November 2023 09:40 WIB',
    type: 'credit',
    description: 'Beli Makanan',
  },
  {
    nominal: 45000,
    date: '16 November 2023 14:25 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -30000,
    date: '18 November 2023 16:05 WIB',
    type: 'credit',
    description: 'Transfer ke Teman',
  },
  {
    nominal: 85000,
    date: '20 November 2023 10:15 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -20000,
    date: '22 November 2023 19:00 WIB',
    type: 'credit',
    description: 'Jasa Pengiriman',
  },
  {
    nominal: 35000,
    date: '24 November 2023 12:45 WIB',
    type: 'debit',
    description: 'Bayar Air',
  },
  {
    nominal: -6000,
    date: '26 November 2023 11:30 WIB',
    type: 'credit',
    description: 'Belanja Minimarket',
  },
  {
    nominal: 90000,
    date: '28 November 2023 14:50 WIB',
    type: 'debit',
    description: 'Topup Saldo',
  },
  {
    nominal: -25000,
    date: '30 November 2023 16:20 WIB',
    type: 'credit',
    description: 'Tagihan Telepon',
  },
];

const ITEMS_PER_PAGE = 5;

const Transaction: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const handleMoreClick = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  return (
    <div>
      <h1 className="text-2xl mb-6 font-semibold">Semua Transaksi</h1>
      {transactions.slice(0, visibleCount).map((transaction, index) => (
        <div
          key={index}
          className="flex justify-between border border-gray-300 px-6 py-2 rounded-xl mb-4"
        >
          <div>
            <div className="flex flex-col gap-2">
              <h1
                className={`text-2xl font-semibold ${transaction.type === 'debit' ? 'text-green-500' : 'text-red-500'}`}
              >
                {transaction.type === 'debit' ? '+' : '-'} Rp.
                {Math.abs(transaction.nominal).toLocaleString('id-ID')}
              </h1>
              <p className="text-sm text-gray-400">{transaction.date}</p>
            </div>
          </div>
          <div>
            <h3>{transaction.description}</h3>
          </div>
        </div>
      ))}
      {visibleCount < transactions.length && (
        <div className="flex justify-center pt-1 pb-10">
          <button
            onClick={handleMoreClick}
            className="text-sm text-primary font-bold"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default Transaction;
