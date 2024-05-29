import { AlbumRequest } from "@/types/album";
import { client } from "./axios";

export function getUserAlbums(userId: string) {
  return client.get(`users/albums/${userId}`).then((res) => res.data);
}

export function getAlbumPhotos(albumId: string) {
  return client.get(`albums/${albumId}/photos`).then((res) => res.data);
}

export function createAlbum(formData: AlbumRequest) {
  return client.post("/albums", formData).then((res) => res.data);
}

export function getAllAlbums() {
  return client.get("albums").then((res) => res.data);
}

export function getAlbumById(albumId: string) {
  return client.get(`albums/${albumId}`).then((res) => res.data);
}

export function deleteAlbum(albumId: string) {
  return client.delete(`albums/${albumId}`).then((res) => res.data);
}
