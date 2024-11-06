import { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProfileImage from '@/assets/images/profile/ProfilePhoto.png';
import { AtSign, User, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import Loading from '@/components/loading';
import Error from '@/components/error';

const schema = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi'),
  first_name: Yup.string().required('Nama depan wajib diisi'),
  last_name: Yup.string().required('Nama belakang wajib diisi'),
  profile_image: Yup.string().optional(),
});

const Accounts: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const {
    profile,
    status: profileStatus,
    error: profileError,
  } = useSelector((state: RootState) => state.profile);
  const [profileImagePreview, setProfileImagePreview] = useState<
    string | undefined
  >(profile?.data?.profile_image ? profile?.data?.profile_image : ProfileImage);

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

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile && profileStatus === 'succeeded') {
      reset({
        email: profile?.data?.email,
        first_name: profile?.data?.first_name,
        last_name: profile?.data?.last_name,
      });
    }
  }, [profile, profileStatus, reset]);

  const onSubmit: SubmitHandler<UpdateProfileData> = async (data) => {
    const payload: UpdateProfileData = {
      first_name: data.first_name,
      last_name: data.last_name,
    };
    try {
      const resultAction = await dispatch(putProfile(payload));
      console.log('resultAction', resultAction);
      dispatch(fetchProfile());
      if (putProfile.fulfilled.match(resultAction)) {
        dispatch(fetchProfile());
        setIsEditing(false);
        toast.success(`${resultAction?.payload?.message}`);
      } else {
        toast.error(`${resultAction?.payload}`);
      }
    } catch (error) {
      toast.error('Failed to update profile' + error);
    }
  };

  const handleUpload = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setProfileImagePreview(fileReader.result as string);
    };

    try {
      fileReader.readAsDataURL(file);
      setIsModalOpen(false);
      dispatch(updateProfileImage(file))
        .unwrap()
        .then(() => {
          dispatch(fetchProfile());
          toast.success('Profile image updated successfully');
        })
        .catch((error) => {
          toast.error(`Failed to upload profile image: ${error}`);
        });
    } catch (error) {
      toast.error(`An error occurred: ${error}`);
    }
  };

  const handleCancelEdit = () => {
    if (profile) {
      reset({
        email: profile.data.email,
        first_name: profile.data.first_name,
        last_name: profile.data.last_name,
      });
    }
    setIsEditing(false);
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

  const isLoading = profileStatus === 'loading';

  const hasError = profileError;
  if (hasError) {
    return <Error />;
  }

  return (
    <section>
      {isLoading && <Loading />}
      <div className="overflow-hidden">
        <div className="max-w-2xl mx-auto flex flex-col justify-center pb-10">
          <div className="flex justify-center">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col gap-2 text-center text-sm font-medium text-black relative">
                <div className="relative w-24 h-full mx-auto">
                  <img
                    src={
                      profile?.data?.profile_image &&
                      !profile.data.profile_image.includes('null')
                        ? profile.data.profile_image
                        : profileImagePreview
                    }
                    className="w-28 h-full object-cover rounded-full"
                    alt="Profile"
                  />
                  <button
                    className="absolute -bottom-1 right-0 p-1 bg-white border-2 border-gray-200 rounded-full hover:bg-gray-100"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <UploadFile
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onUpload={handleUpload}
                  />
                </div>
                <span className="text-2xl">
                  {profile?.data?.first_name} {profile?.data?.last_name}
                </span>
              </div>
            </div>
          </div>
          <form className="my-6">
            <div className="space-y-12">
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
                          placeholder="masukan email anda"
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
                          placeholder="nama depan"
                          className={`pl-8 ${errors.first_name ? 'border-red-500' : 'border-gray-300'} border rounded-md focus:ring-0`}
                          disabled={!isEditing}
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
                          placeholder="nama belakang"
                          className={`pl-8 ${errors.last_name ? 'border-red-500' : 'border-gray-300'} border rounded-md focus:ring-0`}
                          disabled={!isEditing}
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
          </form>
          {!isEditing ? (
            <div className="flex flex-col gap-5 mt-7">
              <Button
                className="w-full"
                variant="outline"
                type="button"
                onClick={() => setIsEditing(!isEditing)}
              >
                Edit Profile
              </Button>
              <Button
                className="w-full"
                type="button"
                onClick={handleLogout}
                disabled={isEditing}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-5 mt-7">
              <Button
                className="w-full"
                type="submit"
                onClick={handleSubmit(onSubmit, onError)}
              >
                Simpan
              </Button>
              <Button
                className="w-full"
                variant="outline"
                type="button"
                onClick={handleCancelEdit}
              >
                Batalkan
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Accounts;
