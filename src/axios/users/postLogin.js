import { getAxiosAPI } from "../axiosApi";

const axiosAPI = getAxiosAPI() 

export async function login(data) {
  const res = await axiosAPI.post("/users/login", data);
  return res.data;
}
