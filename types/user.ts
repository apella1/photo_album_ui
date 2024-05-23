export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface DBUser {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_image: File | null;
}
