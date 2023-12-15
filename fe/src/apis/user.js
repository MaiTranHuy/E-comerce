import axios from '../axios'

export const apiRegister = (data) =>
  axios({
    url: '/account/register',
    method: 'post',
    data,
    withCredentials:true
  })

  
export const apiLogin = (data) =>
axios({
  url: '/account/login',
  method: 'post',
  data
})

export const apiForgotPassword = (data) =>
axios({
  url: '/account/forgotpassword',
  method: 'post',
  data
})

export const apiResetPassword = (data) =>
axios({
  url: '/account/resetpassword',
  method: 'put',
  data
})

export const apiGetCurrent = () =>
axios({
  url: '/users/current',
  method: 'get',
  
})