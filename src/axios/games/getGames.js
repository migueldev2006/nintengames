import { getAxiosAPI } from "../axiosApi";

const axiosAPI = getAxiosAPI() 

export async function getGames() {
    const res = await axiosAPI.get('/games')
    return res.data
}