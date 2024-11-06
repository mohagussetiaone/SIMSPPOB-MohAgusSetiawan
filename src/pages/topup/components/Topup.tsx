import React from 'react';
import * as Yup from 'yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import { Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { topupUser } from '@/features/transaction/topupThunks';
import { fetchBalance } from '@/features/transaction/balanceThunks';
import { AppDispatch } from '@/store/store';

const schema = Yup.object({
  top_up_amount: Yup.number()
    .required('Nominal wajib diisi')
    .min(10000, 'Nominal minimal adalah 10.000')
    .max(1000000, 'Nominal maksimal adalah 1.000.000'),
});

type FormData = Yup.InferType<typeof schema>;

const Topup: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const topUpResults = await dispatch(topupUser(data));
      console.log('topUpResults', topUpResults);
      if (topupUser.fulfilled.match(topUpResults)) {
        dispatch(fetchBalance());
        setValue('top_up_amount', 0);
        navigate('/');
        toast.success(`${topUpResults?.payload?.message}`);
      } else {
        toast.error(`${topUpResults?.payload}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const onError = () => {
    Object.values(errors).forEach((error) => {
      if (error && typeof error.message === 'string') {
        toast.error(error.message);
      }
    });
  };

  const nominalOptions = [10000, 20000, 50000, 100000, 500000];

  const handleNominalClick = (top_up_amount: number) => {
    setValue('top_up_amount', top_up_amount);
  };

  return (
    <section>
      <div className="flex flex-col justify-start">
        <h1 className="text-xl">Silahkan Masukan </h1>
        <p className="text-3xl font-semibold">Nominal Top Up</p>
        <div className="grid grid-cols-12 gap-4 mt-10">
          <div className="col-span-12 md:col-span-7">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <div className="relative h-10 w-full">
                <Controller
                  name="top_up_amount"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Banknote
                        className={`absolute left-2 top-2.5 w-4 h-4 
                  ${!watch('top_up_amount') ? 'text-gray-400' : errors.top_up_amount ? 'text-red-500' : 'text-black'}`}
                      />
                      <Input
                        {...field}
                        type="number"
                        placeholder="masukkan nominal Top Up"
                        className={`pl-8 ${errors.top_up_amount ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'} border rounded-md  focus:ring-0`}
                        min={10000}
                        max={1000000}
                      />
                    </>
                  )}
                />
              </div>
              <Button
                className="w-full mt-4"
                type="submit"
                disabled={!watch('top_up_amount')}
              >
                Top Up
              </Button>
            </form>
          </div>
          <div className="col-span-12 md:col-span-4 flex gap-1 md:gap-2 justify-center">
            <div className="w-full h-auto grid grid-cols-3 md:grid-cols-3 gap-x-2 gap-y-4">
              {nominalOptions.map((top_up_amount) => (
                <div
                  key={top_up_amount}
                  className="flex h-10 items-center justify-center cursor-pointer border border-gray-300 hover:border-gray-600 rounded-md"
                  onClick={() => handleNominalClick(top_up_amount)}
                >
                  <span className="whitespace-nowrap text-xs md:text-sm">
                    Rp{top_up_amount.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Topup;
