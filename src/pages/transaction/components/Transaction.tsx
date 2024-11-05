import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionHistory } from '@/features/transaction/transactionHistoryThunks';
import { RootState, AppDispatch } from '@/store/store';

const ITEMS_PER_PAGE = 5;

const Transaction: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const dispatch = useDispatch<AppDispatch>();
  const { transactionHistory, status, error } = useSelector(
    (state: RootState) => state.transactionHistory
  );

  console.log('transactionHistory', transactionHistory);

  useEffect(() => {
    dispatch(fetchTransactionHistory());
  }, [dispatch]);

  const handleMoreClick = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  return (
    <div>
      <h1 className="text-2xl mb-6 font-semibold">Semua Transaksi</h1>
      {transactionHistory && transactionHistory?.data?.records?.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <h2 className="text-xl text-gray-500">
            Tidak ada transaksi tersedia
          </h2>
        </div>
      ) : (
        <>
          {transactionHistory?.data?.records
            ?.slice(0, visibleCount)
            .map((transaction, index) => (
              <div
                key={index}
                className="flex justify-between border border-gray-300 px-6 py-2 rounded-xl mb-4"
              >
                <div>
                  <div className="flex flex-col gap-2">
                    <h1
                      className={`text-2xl font-semibold ${transaction.transaction_type === 'TOPUP' ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {transaction.transaction_type !== 'TOPUP' ? '+' : '-'} Rp.
                      {Math.abs(transaction.total_amount).toLocaleString(
                        'id-ID'
                      )}
                    </h1>
                    <p className="text-sm text-gray-400">
                      {transaction.created_on
                        ? dayjs(transaction.created_on).format('DD MMMM YYYY')
                        : ''}
                    </p>
                  </div>
                </div>
                <div>
                  <h3>{transaction.description}</h3>
                </div>
              </div>
            ))}
          {/* {visibleCount < transactionHistory?.data?.records?.length && (
            <div className="flex justify-center pt-1 pb-10">
              <button
                onClick={handleMoreClick}
                className="text-sm text-primary font-bold"
              >
                Show More
              </button>
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default Transaction;
