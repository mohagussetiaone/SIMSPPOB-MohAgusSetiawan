export interface Services {
  data: {
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: string;
  }[];
}

export interface ServicesState {
  services: Services | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
