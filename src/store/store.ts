import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/membership/authSlice';
import profileReducer from '@/features/membership/profileSlice';
import bannerReducer from '@/features/information/bannerSlice';
import servicesReducer from '@/features/information/servicesSlice';
import balanceReducer from '@/features/transaction/balanceSlice';
import transactionHistoryReducer from '@/features/transaction/transactionHistorySlice';
import topUpReducer from '@/features/transaction/topUpSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    banner: bannerReducer,
    services: servicesReducer,
    balance: balanceReducer,
    transactionHistory: transactionHistoryReducer,
    topUp: topUpReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
