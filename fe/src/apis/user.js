import axios from '../axios'

export const apiRegister = (data) =>
  axios({
    url: '/account/register',
    method: 'post',
    data
  })

  
export const apiLogin = (data) =>
axios({
  url: '/account/login',
  method: 'post',
  data
})

  
export const apiVerify = (userVerifyResetToken) =>
axios({
  url: `/account/verify/${userVerifyResetToken}`,
  method: 'get',
})
