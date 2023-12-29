import axios from "../axios";

export const apiGetCategories = () => axios({
    url: '/productcategory/',
    method: 'get'
})

export const apiGetBrands= () => axios({
    url: '/brand/',
    method: 'get'
})