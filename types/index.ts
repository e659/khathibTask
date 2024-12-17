declare type LoginUser = {
  email: string;
  password: string;
};

declare type UserData = {
  active: boolean;
  address: string;
  city: string;
  email: string;
  first_name: string;
  group_permission: [];
  id: string;
  image: string;
  last_name: string;
  phone: string;
  role: string;
  start_date: string;
  state: string;
  zip_code: string;
  success: boolean;
  token: string;
};

declare type token={
    token:string;
}