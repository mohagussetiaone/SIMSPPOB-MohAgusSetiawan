import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices } from '@/features/information/servicesThunks';
import { RootState, AppDispatch } from '@/store/store';
import { useServiceDetail } from '@/store/useServiceDetail';

const ServiceCategory: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { setServiceDetail } = useServiceDetail();
  const { services, status, error } = useSelector(
    (state: RootState) => state.services
  );

  console.log('data services', services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <div className="w-full py-6 p-4">
      <div className="flex flex-wrap justify-start">
        {services?.data?.map((service, index) => (
          <div
            key={index}
            className="flex flex-col gap-2 items-center w-24"
            onClick={() => {
              setServiceDetail(service);
              navigate(`/payment/${service.service_code.toLowerCase()}`);
            }}
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
