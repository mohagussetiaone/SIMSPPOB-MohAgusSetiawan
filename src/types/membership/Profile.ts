export interface Profile {
  data: {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
  };
}

export interface UpdateProfileData {
  first_name?: string;
  last_name?: string;
}

export interface ProfileState {
  profile: Profile | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
