import { DBPhoto } from "./photo";

export interface AlbumRequest {
  title: string;
}

export interface DBAlbum {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  user_id: string;
  photos: Array<DBPhoto>;
}
