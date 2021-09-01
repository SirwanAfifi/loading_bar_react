import axios, { AxiosResponse } from "axios";

const client = axios.create({});

export const getUsers = () =>
  client.get("/api/users", {}).then((res) => (res as AxiosResponse).data);
