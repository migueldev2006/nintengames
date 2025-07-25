import { getAxiosAPI } from "../axiosApi";

const axiosAPI = getAxiosAPI() 

export async function deletegame(id) {
    await axiosAPI.delete(`/games/${id}`)
    return id
}