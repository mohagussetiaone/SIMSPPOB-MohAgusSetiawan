import React from 'react';
import ListrikImg from '@/assets/images/categoryServices/Listrik.png';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import { Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

const schema = Yup.object({
  nominal: Yup.number()
    .required('Nominal wajib diisi')
    .min(10000, 'Nominal minimal adalah 10.000')
    .max(1000000, 'Nominal maksimal adalah 1.000.000'),
});

type FormData = Yup.InferType<typeof schema>;

const Payment: React.FC = () => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const onError = () => {
    Object.values(errors).forEach((error) => {
      if (error && typeof error.message === 'string') {
        toast.error(error.message);
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col justify-start">
        <h1 className="text-2xl">Pembayaran </h1>
        <div className="flex gap-2">
          <img src={ListrikImg} alt="listrikImg.png" className="w-10" />
          <p className="flex justify-center items-center text-center font-semibold">
            Listrik Prabayar
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-10">
          <div className="relative h-10 w-full">
            <Controller
              name="nominal"
              control={control}
              render={({ field }) => (
                <>
                  <Banknote
                    className={`absolute left-2 top-2.5 w-4 h-4 
                  ${!watch('nominal') ? 'text-gray-400' : errors.nominal ? 'text-red-500' : 'text-black'}`}
                  />
                  <Input
                    {...field}
                    type="number"
                    placeholder="Masukkan nominal"
                    className={`pl-8 ${errors.nominal ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'} border rounded-md  focus:ring-0`}
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
    </div>
  );
};

export default Payment;
