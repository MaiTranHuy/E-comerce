import React, { useState, useCallback } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { apiRegister, apiLogin } from '../../apis/user'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import { register } from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  })

  const [isRegister, setIsRegister] = useState(false)
  const resetPayload = () => {
    setPayload({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: ''
    })
  }
  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, phoneNumber, ...data } = payload
    if (isRegister) {
      const response = await apiRegister(payload)
      if (response.success)
        Swal.fire('Chuc mung', response.message, 'success').then(() => {
          setIsRegister(false)
          resetPayload()
        })
      else Swal.fire('Loi roi', response.message, 'error')
    } else {
      const response = await apiLogin(data)
      if (response.success) {
        console.log(response);
        dispatch(
          register({
            isLoggedIn: true,
            token: response.accessToken,
            userData: response.data
          })
        )
        navigate(`/${path.HOME}`)
      } else Swal.fire('Loi roi', response.message, 'error')
    }
  }, [payload, isRegister])

  return (
    <div className="w-screen h-screen relative">
      <img
        src="https://img.freepik.com/free-vector/online-purchase-design-element-vector_53876-164168.jpg?w=826&t=st=1702336283~exp=1702336883~hmac=4d0bb28212fa87ac3160ffd25350c3a406f70a70114e47e3149a24d6e01492b1"
        alt=""
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex">
        <div className="p-8 bg-white flex flex-col items-center justify-center rounded-md min-w-[500px]">
          <h1 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? 'Register' : 'Login'}
          </h1>
          {isRegister && (
            <div>
              <div className="flex items-center gap-2">
                <InputField
                  value={payload.firstName}
                  setValue={setPayload}
                  nameKey="firstName"
                />
                <InputField
                  value={payload.lastName}
                  setValue={setPayload}
                  nameKey="lastName"
                />
              </div>
              <InputField
                value={payload.phoneNumber}
                setValue={setPayload}
                nameKey="phoneNumber"
              />
            </div>
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
          />
          <Button
            name={isRegister ? 'Register' : 'Login'}
            handleOnclick={handleSubmit}
            fw
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer">
                Forgot your account?
              </span>
            )}
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Create account
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsRegister(false)}
              >
                Go to Login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
