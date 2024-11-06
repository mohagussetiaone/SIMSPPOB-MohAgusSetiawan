import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import { Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useServiceDetail } from '@/store/useServiceDetail';
import { useDispatch } from 'react-redux';
import { transactionUser } from '@/features/transaction/transactionThunks';
import { fetchBalance } from '@/features/transaction/balanceThunks';
import { AppDispatch } from '@/store/store';

const schema = Yup.object({
  total_amount: Yup.number()
    .required('Nominal wajib diisi')
    .min(10000, 'Nominal minimal adalah 10.000')
    .max(1000000, 'Nominal maksimal adalah 1.000.000'),
  service_code: Yup.string().optional(),
});

type FormData = Yup.InferType<typeof schema>;

const Payment: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { serviceDetail } = useServiceDetail();
  console.log('serviceDetail', serviceDetail);

  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      total_amount: serviceDetail?.service_tariff,
      service_code: serviceDetail?.service_code,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const paymentResults = await dispatch(transactionUser(data));
      console.log('paymentResults', paymentResults);
      if (transactionUser.fulfilled.match(paymentResults)) {
        setValue('total_amount', 0);
        dispatch(fetchBalance());
        navigate('/transaction');
        toast.success(`${paymentResults?.payload?.message}`);
      } else {
        toast.error(`${paymentResults?.payload}`);
      }
    } catch (error) {
      toast.error('Failed to payment');
    }
  };

  const onError = () => {
    Object.values(errors).forEach((error) => {
      if (error && typeof error.message === 'string') {
        toast.error(error.message);
      }
    });
  };

  return (
    <section className="py-4">
      <div className="flex flex-col justify-start">
        <h1 className="text-2xl">PemBayaran </h1>
        <div className="flex gap-2 mt-2">
          <img
            src={serviceDetail?.service_icon}
            alt={serviceDetail?.service_name}
            className="w-10"
          />
          <p className="flex justify-center items-center text-center font-semibold">
            {serviceDetail?.service_name}
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-10">
          <div className="relative h-10 w-full">
            <Controller
              name="total_amount"
              control={control}
              render={({ field }) => (
                <>
                  <Banknote
                    className={`absolute left-2 top-2.5 w-4 h-4 
                  ${!watch('total_amount') ? 'text-gray-400' : errors.total_amount ? 'text-red-500' : 'text-black'}`}
                  />
                  <Input
                    {...field}
                    type="number"
                    placeholder="Masukkan Total Amount"
                    className={`pl-8 ${errors.total_amount ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'} border rounded-md  focus:ring-0`}
                    min={10000}
                    max={1000000}
                  />
                </>
              )}
            />
          </div>
          <Button className="w-full mt-4" type="submit">
            Bayar
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Payment;
