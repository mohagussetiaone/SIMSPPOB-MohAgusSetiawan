import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionHistory } from '@/features/transaction/transactionHistoryThunks';
import { RootState, AppDispatch } from '@/store/store';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

const Transaction: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(ITEMS_PER_PAGE_OPTIONS[0]); // Default to the first option
  const [hasMore, setHasMore] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();
  const { transactionHistory, status, error } = useSelector(
    (state: RootState) => state.transactionHistory
  );

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(
        fetchTransactionHistory({ params: { offset, limit } })
      );
      if (fetchTransactionHistory.fulfilled.match(result)) {
        const { records } = result.payload.data;
        setHasMore(records.length === limit);
      }
    };

    fetchData();
  }, [dispatch, offset, limit]);

  const handleMoreClick = () => {
    setOffset((prevOffset) => prevOffset + limit); // Update offset dengan n + limit
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = Number(e.target.value);
    setLimit(newLimit);
    setOffset(0); // Reset offset ketika limit diubah
  };

  return (
    <section className="p-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl mb-6 font-semibold">Semua Transaksi</h1>
        </div>

        {/* Dropdown for selecting limit */}
        <div className="mb-4">
          <label htmlFor="limitSelect" className="mr-2 text-sm font-medium">
            Tampilkan:
          </label>
          <select
            id="limitSelect"
            value={limit}
            onChange={handleLimitChange}
            className="border border-gray-300 rounded-md py-1"
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option} item{option > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>
      {transactionHistory && transactionHistory?.data?.records.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <h2 className="text-xl text-gray-500">
            Tidak ada transaksi tersedia
          </h2>
        </div>
      ) : (
        <>
          {transactionHistory?.data?.records?.map((transaction, index) => (
            <div
              key={index}
              className="flex justify-between border border-gray-300 px-6 py-2 rounded-xl mb-4"
            >
              <div>
                <div className="flex flex-col gap-2">
                  <h1
                    className={`text-2xl font-semibold ${
                      transaction.transaction_type === 'TOPUP'
                        ? 'text-green-500'
                        : 'text-red-500'
                    }`}
                  >
                    {transaction.transaction_type === 'TOPUP' ? '+' : '-'} Rp.
                    {Math.abs(transaction.total_amount).toLocaleString('id-ID')}
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
          {hasMore && (
            <div className="flex justify-center pt-1 pb-10">
              <button
                onClick={handleMoreClick}
                className="text-sm text-primary font-bold"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default Transaction;
