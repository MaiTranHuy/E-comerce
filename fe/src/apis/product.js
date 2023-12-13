import axios from "../axios";

export const apiGetProducts = (params) => axios({
    url: '/products/',
    method: 'get',
    params
})