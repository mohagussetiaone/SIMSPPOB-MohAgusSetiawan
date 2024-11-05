import React from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
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

const Topup: React.FC = () => {
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

  const nominalOptions = [10000, 20000, 50000, 100000, 500000];

  const handleNominalClick = (nominal: number) => {
    setValue('nominal', nominal);
  };

  return (
    <>
      <div className="flex flex-col justify-start">
        <h1 className="text-xl">Silahkan Masukan </h1>
        <p className="text-3xl font-semibold">Nominal Top Up</p>
        <div className="grid grid-cols-12 gap-4 mt-10">
          <div className="col-span-12 md:col-span-8">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
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
              <Button
                className="w-full mt-4"
                type="submit"
                disabled={!watch('nominal')}
              >
                Bayar
              </Button>
            </form>
          </div>
          <div className="col-span-12 md:col-span-4 flex gap-1 md:gap-2 justify-center">
            <div className="w-full h-auto grid grid-cols-3 md:grid-cols-3 gap-x-2 gap-y-4">
              {nominalOptions.map((nominal) => (
                <div
                  key={nominal}
                  className="flex h-10 items-center justify-center cursor-pointer border border-gray-400 hover:border-gray-600 rounded-md"
                  onClick={() => handleNominalClick(nominal)}
                >
                  <span className="whitespace-nowrap text-xs md:text-sm">
                    Rp{nominal.toLocaleString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topup;
