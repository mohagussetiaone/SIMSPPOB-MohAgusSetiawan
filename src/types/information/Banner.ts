export interface Banner {
  data: {
    banner_name: string;
    banner_image: string;
    description: string;
  }[];
}

export interface BannerState {
  banner: Banner | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
