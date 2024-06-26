import { client } from "./axios";

export function getUser() {
  return client.get("get_user").then((res) => res.data);
}

export function getUsers() {
  return client.get("users").then((res) => res.data);
}

export function getUserById(userId: string) {
  return client.get(`users/${userId}`).then((res) => res.data);
}
