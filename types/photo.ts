export interface PhotoRequest {
  title: string;
}

export interface DBPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  user_id: string;
  album_id: string;
  body: File;
}
