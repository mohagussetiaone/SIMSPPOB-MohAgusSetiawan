import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ServiceDetailState {
  serviceDetail: Record<string, any>;
  setServiceDetail: (serviceDetail: Record<string, any>) => void;
}

export const useServiceDetail = create<ServiceDetailState>()(
  persist(
    (set) => ({
      serviceDetail: {},
      setServiceDetail: (serviceDetail) => {
        set(() => ({ serviceDetail }));
      },
    }),
    {
      name: 'service-detail-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
