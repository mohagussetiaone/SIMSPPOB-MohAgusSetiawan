import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import { AtSign, LockKeyhole, Eye, EyeOff } from 'lucide-react';
import IlustrasiImage from '@/assets/images/signin/IllustrasiLogin.png';
import logoSims from '@/assets/images/logo/Logo.png';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const schema = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
  password: Yup.string()
    .min(6, 'Password minimal 6 karakter')
    .required('Password wajib diisi'),
});

type FormData = Yup.InferType<typeof schema>;

export default function Example() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
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
    <div className="w-full h-screen overflow-hidden">
      <div className="flex h-full">
        <div className="w-full md:w-5/12 flex flex-col justify-center px-6 md:px-24">
          <div className="flex gap-2 justify-center text-center text-sm font-medium text-black">
            <img src={logoSims} className="h-8" alt="SimsLogo.jpg" />
            <span className="flex justify-center items-center text-2xl">
              SIMS PPOB
            </span>
          </div>
          <div className="flex flex-col text-center text-xl font-medium text-black mt-10">
            <span>Masuk Atau Buat akun</span>
            <span>Untuk Memulai</span>
          </div>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-10">
            <div className="space-y-4">
              <div className="relative h-10 w-full">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <>
                      <AtSign
                        className={`absolute left-2 top-2.5 w-4 h-4 
                  ${!watch('email') ? 'text-gray-400' : errors.email ? 'text-red-500' : 'text-black'}`}
                      />
                      <Input
                        {...field}
                        type="text"
                        placeholder="Masukkan Email Anda"
                        className={`pl-8 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'} border rounded-md  focus:ring-0`}
                      />
                    </>
                  )}
                />
              </div>

              <div className="relative h-10 w-full">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <>
                      <LockKeyhole
                        className={`absolute left-2 top-2.5 w-4 h-4 
                  ${!watch('password') ? 'text-gray-400' : errors.email ? 'text-red-500' : 'text-black'}`}
                      />
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Masukkan Kata Sandi Anda"
                        className={`pl-8 ${errors.password ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'} border rounded-md  focus:ring-0 pr-8`}
                      />
                      <div
                        className={`absolute right-2 top-2.5 cursor-pointer ${field.value ? 'text-black' : 'text-gray-400'}`}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </div>
                    </>
                  )}
                />
              </div>
            </div>

            <Button className="w-full mt-10" type="submit">
              Masuk
            </Button>
            <div className="mt-6">
              <h6 className="text-gray-400">
                belum punya akun ? registrasi ke sini{' '}
                <Link to="/signup" className="text-primary hover:text-red-600">
                  di sini
                </Link>
              </h6>
            </div>
          </form>
        </div>
        <div className="w-7/12 hidden md:block h-screen">
          <img
            src={IlustrasiImage}
            className="w-full h-full object-cover"
            alt="Ilustrasi Login"
          />
        </div>
      </div>
    </div>
  );
}
