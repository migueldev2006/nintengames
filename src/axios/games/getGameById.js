import { getAxiosAPI } from "../axiosApi";

const axiosAPI = getAxiosAPI() 

export async function getGameById(id) {
    const res = await axiosAPI.get(`/games/${id}`)
    return res.data
}