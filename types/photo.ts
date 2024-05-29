export interface PhotoRequest {
  data: FormData;
}

export interface DBPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  user_id: string;
  album_id: string;
  image_url: string;
  body: File;
}

export interface PhotoUpdateData {
  title: string;
}
