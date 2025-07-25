import { getAxiosAPI } from "../axiosApi";

const axiosAPI = getAxiosAPI() 

export async function updateGame(id,formData) {
  const res = await axiosAPI.patch(`/games/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}
