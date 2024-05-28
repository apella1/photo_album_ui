import { PhotoRequest } from "@/types/photo";
import { client } from "./axios";

export function updatePhotoTitle(photoId: string) {
  return client.patch(`photos/${photoId}`).then((res) => res.data);
}

export function getPhoto(photoId: string) {
  return client.get(`photos/${photoId}`).then((res) => res.data);
}

export function createPhoto(formData: PhotoRequest, albumId: string) {
  return client
    .post(`/albums/${albumId}/photos`, formData)
    .then((res) => res.data);
}
