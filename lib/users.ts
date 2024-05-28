import { client } from "./axios";

export function getUser() {
  return client.get("get_user").then((res) => res.data);
}

export function getUsers() {
  return client.get("users").then((res) => res.data);
}
