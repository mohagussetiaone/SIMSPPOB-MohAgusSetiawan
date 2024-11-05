import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import { AtSign, User, Pencil } from 'lucide-react';
import ProfileImage from '@/assets/images/profile/Profile Photo.png';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';

const schema = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
  firstName: Yup.string().required('Email wajib diisi'),
  lastName: Yup.string().required('Email wajib diisi'),
  password: Yup.string()
    .min(6, 'Password minimal 6 karakter')
    .required('Password wajib diisi'),
});

type FormData = Yup.InferType<typeof schema>;

export default function Example() {
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
    <div className="overflow-hidden">
      <div className="max-w-2xl mx-auto flex flex-col justify-center pb-10">
        <div className="flex justify-center">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-2 text-center text-sm font-medium text-black relative">
              <div className="relative w-28 h-full mx-auto">
                <img
                  src={ProfileImage}
                  className="w-28 h-full object-cover rounded-full"
                  alt="SimsLogo.jpg"
                />
                <button
                  className="absolute bottom-0 right-0 p-2 bg-white border-2 border-gray-200 rounded-full hover:bg-gray-100"
                  onClick={() => alert('Edit Image')}
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              <span className="text-2xl">Kristanto Wibowo</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-5">
          <div className="space-y-10">
            <div className=" h-10 w-full">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email">Email</label>
                    <div className="relative">
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
                    </div>
                  </div>
                )}
              />
            </div>

            <div className="h-10 w-full">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <label htmlFor="firstName">Nama Depan</label>
                    <div className="relative">
                      <User
                        className={`absolute left-2 top-2.5 w-4 h-4 
                          ${!watch('firstName') ? 'text-gray-400' : errors.firstName ? 'text-red-500' : 'text-black'}`}
                      />
                      <Input
                        {...field}
                        type="text"
                        placeholder="Nama Depan"
                        className={`pl-8 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'} border rounded-md  focus:ring-0`}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
            <div className="h-10 w-full">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-col gap-2">
                    <label htmlFor="lastName">Nama Belakang</label>
                    <div className="relative">
                      <User
                        className={`absolute left-2 top-2.5 w-4 h-4 
                          ${!watch('lastName') ? 'text-gray-400' : errors.lastName ? 'text-red-500' : 'text-black'}`}
                      />
                      <Input
                        {...field}
                        type="text"
                        placeholder="Nama Belakang"
                        className={`pl-8 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-black'} border rounded-md  focus:ring-0`}
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Button className="w-full mt-14" type="submit">
              Edit Profile
            </Button>
            <Button className="w-full" variant={'outline'} type="submit">
              Logout
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
