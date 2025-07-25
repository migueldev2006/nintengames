import { getAxiosAPI } from "../axiosApi";

const axiosAPI = getAxiosAPI() 

export async function createGame(formData) {
  const res = await axiosAPI.post("/games", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
