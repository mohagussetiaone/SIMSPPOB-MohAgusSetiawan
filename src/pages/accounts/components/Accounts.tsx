import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '@/components/ui/input';
import { AtSign, User, Pencil } from 'lucide-react';
import ProfileImage from '@/assets/images/profile/ProfilePhoto.png';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProfile,
  putProfile,
  updateProfileImage,
} from '@/features/membership/profileThunks';
import { logout } from '@/features/membership/authSlice';
import { RootState, AppDispatch } from '@/store/store';
import { UpdateProfileData } from '@/types/membership/Profile';
import UploadFile from './UploadFile';
import { clearAllStorage } from '@/store/authForage';

const schema = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
  first_name: Yup.string().required('Nama depan wajib diisi'),
  last_name: Yup.string().required('Nama belakang wajib diisi'),
  profile_image: Yup.string().optional(),
});

const Accounts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { profile, status, error } = useSelector(
    (state: RootState) => state.profile
  );

  const [profileImagePreview, setProfileImagePreview] = useState<
    string | undefined
  >(profile?.data?.profile_image ? profile?.data?.profile_image : ProfileImage);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  console.log('status', status);
  console.log('profile', profile);
  console.log('error', error);
  console.log('profileImagePreview', profileImagePreview);

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: profile?.data?.email || '',
      first_name: profile?.data?.first_name || '',
      last_name: profile?.data?.last_name || '',
      profile_image: profile?.data?.profile_image || '',
    },
  });

  // Load profile data on component mount
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // Update form fields when profile data is loaded
  useEffect(() => {
    if (profile) {
      reset({
        email: profile?.data?.email,
        first_name: profile?.data?.first_name,
        last_name: profile?.data?.last_name,
      });
    }
  }, [profile, reset]);

  const onSubmit: SubmitHandler<UpdateProfileData> = async (data) => {
    const payload: UpdateProfileData = {
      first_name: data.first_name,
      last_name: data.last_name,
    };
    try {
      const updateProfileData = await dispatch(putProfile(payload));
      console.log('updateProfileData', updateProfileData);
      dispatch(fetchProfile());
      toast.success('Updated profile successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleUpload = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setProfileImagePreview(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
    setIsModalOpen(false);
    dispatch(updateProfileImage(file))
      .unwrap()
      .then(() => {
        dispatch(fetchProfile());
      })
      .catch((error) => {
        toast.error(`Failed to upload profile image: ${error}`);
      });
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      await clearAllStorage();
      await new Promise((resolve) => {
        toast.error('Logout berhasil', {
          delay: 1500,
          onClose: resolve,
        });
        navigate('/signin');
      });
    } catch (error) {
      toast.error(`Failed to logout: ${error}`);
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
    <section className="p-4">
      <div className="overflow-hidden">
        <div className="max-w-2xl mx-auto flex flex-col justify-center pb-10">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col gap-2 text-center text-sm font-medium text-black relative">
                <div className="relative w-28 h-full mx-auto">
                  <img
                    src={profile?.data?.profile_image || profileImagePreview}
                    className="w-28 h-full object-cover rounded-full"
                    alt="Profile"
                  />
                  <button
                    className="absolute bottom-0 right-0 p-2 bg-white border-2 border-gray-200 rounded-full hover:bg-gray-100"
                    onClick={() => setIsModalOpen(true)} // Buka modal saat tombol diklik
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-2xl">
                  {profile?.data?.first_name} {profile?.data?.last_name}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-5">
            <div className="space-y-10">
              <div className="h-10 w-full">
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
                          className={`pl-8 ${errors.email ? 'border-red-500' : 'border-gray-300'} border rounded-md focus:ring-0`}
                          disabled
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                />
              </div>

              <div className="h-10 w-full">
                <Controller
                  name="first_name"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="first_name">Nama Depan</label>
                      <div className="relative">
                        <User
                          className={`absolute left-2 top-2.5 w-4 h-4 
                          ${!watch('first_name') ? 'text-gray-400' : errors.first_name ? 'text-red-500' : 'text-black'}`}
                        />
                        <Input
                          {...field}
                          type="text"
                          placeholder="Nama Depan"
                          className={`pl-8 ${errors.first_name ? 'border-red-500' : 'border-gray-300'} border rounded-md focus:ring-0`}
                        />
                        {errors.first_name && (
                          <p className="text-red-500 text-sm">
                            {errors.first_name.message}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                />
              </div>

              <div className="h-10 w-full">
                <Controller
                  name="last_name"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <label htmlFor="last_name">Nama Belakang</label>
                      <div className="relative">
                        <User
                          className={`absolute left-2 top-2.5 w-4 h-4 
                          ${!watch('last_name') ? 'text-gray-400' : errors.last_name ? 'text-red-500' : 'text-black'}`}
                        />
                        <Input
                          {...field}
                          type="text"
                          placeholder="Nama Belakang"
                          className={`pl-8 ${errors.last_name ? 'border-red-500' : 'border-gray-300'} border rounded-md focus:ring-0`}
                        />
                        {errors.last_name && (
                          <p className="text-red-500 text-sm">
                            {errors.last_name.message}
                          </p>
                        )}
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
              <Button
                className="w-full"
                variant="outline"
                type="button"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </form>
        </div>
      </div>
      <UploadFile
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Tutup modal
        onUpload={handleUpload} // Fungsi untuk menangani upload
      />
    </section>
  );
};

export default Accounts;
