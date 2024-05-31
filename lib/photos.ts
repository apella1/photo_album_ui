import { PhotoRequest, PhotoUpdateData } from "@/types/photo";
import { client } from "./axios";

export function updatePhotoTitle(
  photoId: string,
  photoUpdateData: PhotoUpdateData,
) {
  return client
    .patch(`photos/${photoId}`, photoUpdateData)
    .then((res) => res.data);
}

export function getPhoto(photoId: string) {
  return client.get(`photos/${photoId}`).then((res) => res.data);
}

export function createPhoto(formData: PhotoRequest, albumId: string) {
  return client
    .post(`albums/${albumId}/photos`, formData)
    .then((res) => res.data);
}

export function getAllPhotos() {
  return client.get("photos").then((res) => res.data);
}

export function deletePhoto(photoId: string) {
  return client.delete(`photos/${photoId}`);
}
