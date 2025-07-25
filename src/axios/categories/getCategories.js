import { getAxiosAPI } from "../axiosApi";

const axiosAPI = getAxiosAPI();

export async function getCategories() {
  const res = await axiosAPI.get("/categories");

  return res.data.Categorias;
}
