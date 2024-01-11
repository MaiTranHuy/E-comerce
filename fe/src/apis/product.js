import axios from '../axios'

export const apiGetProducts = (params) =>
  axios({
    url: '/products/',
    method: 'get',
    params
  })

export const apiGetProduct = (pid) =>
  axios({
    url: '/products/' + pid,
    method: 'get'
  })

  export const apiRatings = (data) =>
  axios({
    url: '/products/ratings',
    method: 'put',
    data
  })

  export const apiCreateProduct = (data) =>
  axios({
    url: '/products/',
    method: 'post',
    data
  })



