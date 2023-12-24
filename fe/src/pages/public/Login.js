import React, { useState, useCallback, useEffect } from 'react'
import InputField from '../../components/Common/InputField'
import Button from '../../components/Common/Button'
import { apiRegister, apiLogin, apiForgotPassword } from '../../apis/user'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import path from '../../utils/path'
import { login } from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { validate } from '../../utils/helpers'
import { Link } from 'react-router-dom'
import { showModal } from 'store/app/appSlice'
import { Loading } from 'components'


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
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [inValidFields, setInValidFields] = useState([])

  const resetPayload = () => {
    setPayload({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: ''
    })
  }

  const [email, setEmail] = useState('')
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email })
    if (!response.success) {
      toast.info(response.message, { theme: 'colored' })
    } else {
      setIsForgotPassword(false)
      toast.info('Check your mail!', { theme: 'colored' })
    }
  }

  useEffect(() => {
    resetPayload()
  }, [isRegister])

  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, phoneNumber, ...data } = payload
      
    if (isRegister) {
      dispatch(showModal({isShowModal: true, modalChildren: <Loading/>}))
      const response = await apiRegister(payload)
      dispatch(showModal({isShowModal: false, modalChildren: null}))
      if (response.success)
        Swal.fire('Chuc mung', response.message, 'success').then(() => {
          setIsRegister(false)
          resetPayload()
        })
      else Swal.fire('Loi roi', response.message, 'error')
    } else {
      const response = await apiLogin(data)
      if (response.success) {
        dispatch(
          login({
            isLoggedIn: true,
            token: response.accessToken,
            userData: response.data
          })
        )
        navigate(`/${path.HOME}`)
      } else Swal.fire('Loi roi', response.message, 'error')
    }
    // }
  }, [payload, isRegister])

  return (
    <div className="w-screen h-screen relative">
      {isForgotPassword && (
        <div className="absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center justify-center py-8 z-50">
          <div className="flex flex-col gap-4">
            <label htmlFor="email"> Enter your Email</label>
            <input
              type="text"
              id="email"
              className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
              placeholder="Exp: mail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center justify-end w-full gap-4">
              <Button
                name="Cancel"
                handleOnclick={() => setIsForgotPassword(false)}
              />
              <Button
                style="px-4 py-2 rounded-md text-white my-2 bg-blue-500 text-semibold"
                name="Submit"
                handleOnclick={handleForgotPassword}
              />
            </div>
          </div>
        </div>
      )}
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
                  invalidFields={inValidFields}
                  setInvalidField={setInValidFields}
                />
                <InputField
                  value={payload.lastName}
                  setValue={setPayload}
                  nameKey="lastName"
                  invalidFields={inValidFields}
                  setInvalidField={setInValidFields}
                />
              </div>
              <InputField
                value={payload.phoneNumber}
                setValue={setPayload}
                nameKey="phoneNumber"
                invalidFields={inValidFields}
                setInvalidField={setInValidFields}
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
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsForgotPassword(true)}
              >
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
          <Link className='text-blue-500 text-sm hover:underline cursor-pointer' to={`/${path.HOME}`}>Go home?</Link> 
        </div>
      </div>
    </div>
  )
}

export default Login
