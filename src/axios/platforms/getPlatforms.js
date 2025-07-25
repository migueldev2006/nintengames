import { getAxiosAPI } from "../axiosApi";

const axiosAPI = getAxiosAPI();

export async function getPlatforms() {
  const res = await axiosAPI.get("/platforms");

  return res.data.Plataformas;
}
