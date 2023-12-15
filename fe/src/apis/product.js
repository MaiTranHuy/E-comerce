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
